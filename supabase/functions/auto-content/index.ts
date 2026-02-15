import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type NewsItem = {
  title: string;
  url: string;
  summary: string | null;
  published_at: string | null;
  source?: { name?: string } | null;
};

const buildSourceContext = (items: NewsItem[]) => {
  return items.map((item, idx) => {
    const published = item.published_at ? new Date(item.published_at).toISOString().split("T")[0] : "unknown";
    const source = item.source?.name ?? "unknown source";
    const summary = item.summary ? ` - ${item.summary}` : "";
    return `${idx + 1}. ${item.title} (${source}, ${published})${summary} [${item.url}]`;
  }).join("\n");
};

const lovableAIRequest = async (apiKey: string, systemPrompt: string, userPrompt: string, toolName: string, toolDescription: string, toolParameters: Record<string, unknown>) => {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      tools: [{ type: "function", function: { name: toolName, description: toolDescription, parameters: toolParameters } }],
      tool_choice: { type: "function", function: { name: toolName } }
    }),
  });
  if (!response.ok) {
    if (response.status === 429) throw new Error("Rate limit exceeded. Please try again later.");
    if (response.status === 402) throw new Error("Payment required. Please add credits to your Lovable AI workspace.");
    const errorText = await response.text();
    throw new Error(`Lovable AI error: ${response.status} ${errorText}`);
  }
  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) throw new Error("No tool call response from AI");
  return JSON.parse(toolCall.function.arguments);
};

const articleToolParams = {
  type: "object",
  properties: {
    title: { type: "string", description: "Professional headline under 100 characters" },
    excerpt: { type: "string", description: "2-3 sentence summary" },
    content: { type: "string", description: "Full article content 600-900 words, plain text no markdown emphasis" },
    tags: { type: "array", items: { type: "string" }, description: "4-6 relevant tags" },
    keyTakeaways: { type: "array", items: { type: "string" }, description: "3-5 key takeaways for investors" },
    subcategory: { type: "string", description: "Specific subcategory like 'Hardware Analysis', 'SDK Deep Dive', 'Investment Thesis'" }
  },
  required: ["title", "excerpt", "content", "tags", "keyTakeaways", "subcategory"]
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const startTime = Date.now();

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const lovableKey = Deno.env.get("LOVABLE_API_KEY") ?? "";
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role not configured");
    if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");

    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const payload = await req.json().catch(() => ({}));
    const mode = payload?.mode === "weekly" ? "weekly" : "daily";

    const since = new Date(Date.now() - 1000 * 60 * 60 * 72);
    const { data: news, error: newsError } = await supabase
      .from("news_items")
      .select("title,url,summary,published_at, news_sources(name)")
      .gte("published_at", since.toISOString())
      .order("published_at", { ascending: false })
      .limit(25);
    if (newsError) throw newsError;

    const newsItems = (news ?? []).map((item: Record<string, unknown>) => ({
      title: item.title as string, url: item.url as string,
      summary: (item.summary as string) ?? null, published_at: (item.published_at as string) ?? null,
      source: item.news_sources ?? null,
    })) as NewsItem[];
    if (newsItems.length === 0) throw new Error("No recent news items found");

    const sourceContext = buildSourceContext(newsItems);
    const inserts: any[] = [];

    // 1. Market brief
    const brief = await lovableAIRequest(lovableKey,
      `You are a senior financial analyst producing a concise daily market brief for XR/VR/AR/Spatial Computing investors. Use plain text, no markdown emphasis.`,
      `Analyze these recent XR/VR/AR industry news items and create a professional market brief:\n\n${sourceContext}`,
      "create_market_brief", "Create a structured market brief for XR investors",
      { type: "object", properties: { headline: { type: "string" }, summary: { type: "string" }, metrics: { type: "array", items: { type: "object", properties: { label: { type: "string" }, value: { type: "string" }, change: { type: "string" } }, required: ["label", "value"] } }, signal: { type: "string", enum: ["bullish", "bearish", "neutral"] }, reasoning: { type: "string" } }, required: ["headline", "summary", "metrics", "signal", "reasoning"] }
    );
    inserts.push({ type: "market-brief", title: brief.headline ?? "Daily Market Brief", excerpt: brief.summary ?? null, content: brief.summary ?? null, tags: ["market-brief"], sources: newsItems, metadata: brief });

    // 2. Market Intelligence article #1
    const mi1 = await lovableAIRequest(lovableKey,
      `You are a senior analyst at SpatialMetrics writing a professional XR market intelligence article for institutional investors. Write in formal, data-driven style. Include specific numbers, company names, investment implications. Plain text only. Current date: February 2026.`,
      `Write a 600-900 word market intelligence article about investment trends using these sources:\n\n${sourceContext}\n\nFocus on: market trends, valuation analysis, and investment implications.`,
      "create_article", "Create a market intelligence article", articleToolParams
    );
    inserts.push({ type: "article", title: mi1.title, excerpt: mi1.excerpt, content: mi1.content, tags: [...(mi1.tags ?? []), "market-intelligence"], sources: newsItems, metadata: { cadence: mode, keyTakeaways: mi1.keyTakeaways ?? [], subcategory: mi1.subcategory ?? "Market Analysis" } });

    // 3. Market Intelligence article #2 (different angle)
    const mi2 = await lovableAIRequest(lovableKey,
      `You are a senior analyst at SpatialMetrics writing about company strategy and competitive dynamics in XR. Formal, data-driven style. Plain text only. Current date: February 2026.`,
      `Write a 600-900 word competitive analysis article using these sources:\n\n${sourceContext}\n\nFocus on: company strategies, competitive positioning, M&A activity, and market share shifts.`,
      "create_article", "Create a competitive analysis article", articleToolParams
    );
    inserts.push({ type: "article", title: mi2.title, excerpt: mi2.excerpt, content: mi2.content, tags: [...(mi2.tags ?? []), "market-intelligence"], sources: newsItems, metadata: { cadence: mode, keyTakeaways: mi2.keyTakeaways ?? [], subcategory: mi2.subcategory ?? "Competitive Analysis" } });

    // 4. Tech Explain article #1
    const tech1 = await lovableAIRequest(lovableKey,
      `You are a technology analyst at SpatialMetrics writing deep-dive explainer articles about XR/VR/AR technology. Explain how tech works, current state, limitations, future potential. Plain text only. Current date: February 2026.`,
      `Write a 600-900 word technology deep-dive using these sources:\n\n${sourceContext}\n\nPick the most interesting technology topic and explain it thoroughly.`,
      "create_article", "Create a technology explainer article", articleToolParams
    );
    inserts.push({ type: "article", title: tech1.title, excerpt: tech1.excerpt, content: tech1.content, tags: [...(tech1.tags ?? []), "tech-explain"], sources: newsItems, metadata: { cadence: mode, keyTakeaways: tech1.keyTakeaways ?? [], subcategory: tech1.subcategory ?? "Technology Deep Dive" } });

    // 5. Tech Explain article #2
    const tech2 = await lovableAIRequest(lovableKey,
      `You are a technology analyst at SpatialMetrics specializing in XR hardware, optics, and display technology. Explain components, architectures, and innovations. Plain text only. Current date: February 2026.`,
      `Write a 600-900 word article about XR hardware or display technology using these sources:\n\n${sourceContext}\n\nFocus on: hardware innovations, component technology, or manufacturing advances.`,
      "create_article", "Create a hardware technology article", articleToolParams
    );
    inserts.push({ type: "article", title: tech2.title, excerpt: tech2.excerpt, content: tech2.content, tags: [...(tech2.tags ?? []), "tech-explain"], sources: newsItems, metadata: { cadence: mode, keyTakeaways: tech2.keyTakeaways ?? [], subcategory: tech2.subcategory ?? "Hardware Analysis" } });

    // 6. Spatial Updates article
    const spatial = await lovableAIRequest(lovableKey,
      `You are a journalist at SpatialMetrics covering XR industry news, partnerships, product launches, and ecosystem developments. Write in an engaging, informative style. Plain text only. Current date: February 2026.`,
      `Write a 600-900 word industry update article using these sources:\n\n${sourceContext}\n\nCover: recent launches, partnerships, regulatory updates, and ecosystem developments.`,
      "create_article", "Create a spatial updates article", articleToolParams
    );
    inserts.push({ type: "article", title: spatial.title, excerpt: spatial.excerpt, content: spatial.content, tags: [...(spatial.tags ?? []), "spatial-updates"], sources: newsItems, metadata: { cadence: mode, keyTakeaways: spatial.keyTakeaways ?? [], subcategory: spatial.subcategory ?? "Industry Update" } });

    const { error: insertError } = await supabase.from("content_items").insert(inserts);
    if (insertError) throw insertError;

    // Weekly: add startup profile
    if (mode === "weekly") {
      const startup = await lovableAIRequest(lovableKey,
        `You are a venture capital analyst at SpatialMetrics. Profile a promising XR startup. Plain text only.`,
        `Based on these XR news items, identify and profile a promising startup:\n\n${sourceContext}`,
        "create_startup_profile", "Create a startup profile",
        { type: "object", properties: { name: { type: "string" }, description: { type: "string" }, sector: { type: "string" }, stage: { type: "string" }, headquarters: { type: "string" }, metrics: { type: "object", properties: { funding: { type: "string" }, employees: { type: "string" }, customers: { type: "string" }, arr: { type: "string" }, growth: { type: "string" } } }, investors: { type: "array", items: { type: "string" } }, products: { type: "array", items: { type: "string" } }, investmentThesis: { type: "string" }, risks: { type: "array", items: { type: "string" } } }, required: ["name", "description", "sector", "stage", "headquarters", "investmentThesis"] }
      );
      await supabase.from("content_items").insert({ type: "startup-profile", title: startup.name ?? "Startup Profile", excerpt: startup.description, content: startup.description, tags: ["startup", startup.sector ?? "xr"], sources: newsItems, metadata: startup });
    }

    try {
      await supabase.from("function_runs").insert({ function_name: "auto-content", status: "success", duration_ms: Date.now() - startTime, details: { mode, news_items: newsItems.length, created: inserts.length + (mode === "weekly" ? 1 : 0) } });
    } catch { /* ignore */ }

    return new Response(JSON.stringify({ success: true, created: inserts.length }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      if (supabaseUrl && serviceRoleKey) {
        const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
        await supabase.from("function_runs").insert({ function_name: "auto-content", status: "failure", duration_ms: Date.now() - startTime, details: { error: error instanceof Error ? error.message : "Unknown error" } });
      }
    } catch { /* ignore */ }
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error", timestamp: new Date().toISOString() }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
