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

const groqAIRequest = async (apiKey: string, systemPrompt: string, userPrompt: string) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.status} ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  return JSON.parse(content);
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const startTime = Date.now();

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const groqKey = Deno.env.get("GROQ_API_KEY") ?? "";
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role not configured");
    if (!groqKey) throw new Error("GROQ_API_KEY is not configured");

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

    const jsonInstructions = "Return the response as a JSON object matching the requested schema. Use plain text, no markdown bold/italic.";

    // 1. Market brief
    const brief = await groqAIRequest(groqKey,
      `You are a senior financial analyst producing a concise daily market brief for XR/VR/AR/Spatial Computing investors. ${jsonInstructions}`,
      `Analyze these recent XR news items and create a market brief:
      
      ${sourceContext}
      
      Format: { "headline": "string", "summary": "string", "metrics": [{"label": "string", "value": "string", "change": "string"}], "signal": "bullish|bearish|neutral", "reasoning": "string" }`
    );
    inserts.push({ type: "market-brief", title: brief.headline ?? "Daily Market Brief", excerpt: brief.summary ?? null, content: brief.summary ?? null, tags: ["market-brief"], sources: newsItems, metadata: brief });

    // 2. Market Intelligence article #1
    const mi1 = await groqAIRequest(groqKey,
      `You are a senior analyst at SpatialMetrics writing for institutional investors. ${jsonInstructions}`,
      `Write a 600-word market intelligence article about investment trends using these sources:
      
      ${sourceContext}
      
      Format: { "title": "string", "excerpt": "string", "content": "600 words text", "tags": ["string"], "keyTakeaways": ["string"], "subcategory": "string" }`
    );
    inserts.push({ type: "article", title: mi1.title, excerpt: mi1.excerpt, content: mi1.content, tags: [...(mi1.tags ?? []), "market-intelligence"], sources: newsItems, metadata: { cadence: mode, keyTakeaways: mi1.keyTakeaways ?? [], subcategory: mi1.subcategory ?? "Market Analysis" } });

    // 3. Tech Explain article
    const tech1 = await groqAIRequest(groqKey,
      `You are a technology analyst at SpatialMetrics. ${jsonInstructions}`,
      `Write a 600-word technology deep-dive explainer about current XR innovations using these sources:
      
      ${sourceContext}
      
      Format: { "title": "string", "excerpt": "string", "content": "600 words text", "tags": ["string"], "keyTakeaways": ["string"], "subcategory": "string" }`
    );
    inserts.push({ type: "article", title: tech1.title, excerpt: tech1.excerpt, content: tech1.content, tags: [...(tech1.tags ?? []), "tech-explain"], sources: newsItems, metadata: { cadence: mode, keyTakeaways: tech1.keyTakeaways ?? [], subcategory: tech1.subcategory ?? "Technology Deep Dive" } });

    // 4. Spatial Updates article
    const spatial = await groqAIRequest(groqKey,
      `You are a journalist at SpatialMetrics covering XR industry news. ${jsonInstructions}`,
      `Write a 600-word industry update article using these sources:
      
      ${sourceContext}
      
      Format: { "title": "string", "excerpt": "string", "content": "600 words text", "tags": ["string"], "keyTakeaways": ["string"], "subcategory": "string" }`
    );
    inserts.push({ type: "article", title: spatial.title, excerpt: spatial.excerpt, content: spatial.content, tags: [...(spatial.tags ?? []), "spatial-updates"], sources: newsItems, metadata: { cadence: mode, keyTakeaways: spatial.keyTakeaways ?? [], subcategory: spatial.subcategory ?? "Industry Update" } });

    const { error: insertError } = await supabase.from("content_items").insert(inserts);
    if (insertError) throw insertError;

    try {
      await supabase.from("function_runs").insert({ function_name: "auto-content", status: "success", duration_ms: Date.now() - startTime, details: { mode, news_items: newsItems.length, created: inserts.length } });
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
