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
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      tools: [
        {
          type: "function",
          function: {
            name: toolName,
            description: toolDescription,
            parameters: toolParameters
          }
        }
      ],
      tool_choice: { type: "function", function: { name: toolName } }
    }),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (response.status === 402) {
      throw new Error("Payment required. Please add credits to your Lovable AI workspace.");
    }
    const errorText = await response.text();
    throw new Error(`Lovable AI error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
  if (!toolCall?.function?.arguments) {
    throw new Error("No tool call response from AI");
  }
  return JSON.parse(toolCall.function.arguments);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const lovableKey = Deno.env.get("LOVABLE_API_KEY") ?? "";

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase service role not configured");
    }
    if (!lovableKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const payload = await req.json().catch(() => ({}));
    const mode = payload?.mode === "weekly" ? "weekly" : "daily";

    const since = new Date(Date.now() - 1000 * 60 * 60 * 24);
    const { data: news, error: newsError } = await supabase
      .from("news_items")
      .select("title,url,summary,published_at, news_sources(name)")
      .gte("published_at", since.toISOString())
      .order("published_at", { ascending: false })
      .limit(20);

    if (newsError) throw newsError;
    const newsItems = (news ?? []).map((item: Record<string, unknown>) => ({
      title: item.title as string,
      url: item.url as string,
      summary: (item.summary as string) ?? null,
      published_at: (item.published_at as string) ?? null,
      source: item.news_sources ?? null,
    })) as NewsItem[];

    if (newsItems.length === 0) {
      throw new Error("No recent news items found");
    }

    const sourceContext = buildSourceContext(newsItems);

    // Generate market brief
    const briefSystem = `You are a senior financial analyst producing a concise daily market brief for XR/VR/AR/Spatial Computing investors. Use the sources provided. Focus on investment implications, market movements, and actionable insights.`;
    const briefUser = `Analyze these recent XR/VR/AR industry news items and create a professional market brief:\n\n${sourceContext}\n\nGenerate a market brief with headline, summary, key metrics, and market signal.`;

    const brief = await lovableAIRequest(
      lovableKey,
      briefSystem,
      briefUser,
      "create_market_brief",
      "Create a structured market brief for XR investors",
      {
        type: "object",
        properties: {
          headline: { type: "string", description: "Compelling headline under 80 characters" },
          summary: { type: "string", description: "3-4 sentence market summary" },
          metrics: {
            type: "array",
            items: {
              type: "object",
              properties: {
                label: { type: "string" },
                value: { type: "string" },
                change: { type: "string" }
              },
              required: ["label", "value"]
            },
            description: "2-3 key market metrics"
          },
          signal: { type: "string", enum: ["bullish", "bearish", "neutral"], description: "Overall market sentiment" },
          reasoning: { type: "string", description: "2-3 sentences explaining the signal" }
        },
        required: ["headline", "summary", "metrics", "signal", "reasoning"]
      }
    );

    // Generate article
    const articleSystem = `You are a senior analyst at SpatialMetrics writing a professional XR/VR/AR market article. Write in a formal, data-driven style suitable for institutional investors and industry professionals. Use the sources provided. Include specific numbers, company names, and investment implications.`;
    const articleUser = `Write a comprehensive 600-900 word market intelligence article using these sources:\n\n${sourceContext}\n\nFocus on: market trends, company developments, investment implications, and future outlook. Include executive summary, analysis sections, and key takeaways.`;

    const article = await lovableAIRequest(
      lovableKey,
      articleSystem,
      articleUser,
      "create_article",
      "Create a structured market intelligence article",
      {
        type: "object",
        properties: {
          title: { type: "string", description: "Professional headline under 100 characters" },
          excerpt: { type: "string", description: "2-3 sentence summary" },
          content: { type: "string", description: "Full article content 600-900 words" },
          tags: {
            type: "array",
            items: { type: "string" },
            description: "4-6 relevant tags"
          },
          keyTakeaways: {
            type: "array",
            items: { type: "string" },
            description: "3-5 key takeaways for investors"
          }
        },
        required: ["title", "excerpt", "content", "tags", "keyTakeaways"]
      }
    );

    const inserts = [
      {
        type: "market-brief",
        title: brief.headline ?? "Daily Market Brief",
        excerpt: brief.summary ?? null,
        content: brief.summary ?? null,
        tags: ["market-brief"],
        sources: newsItems,
        metadata: brief,
      },
      {
        type: "article",
        title: article.title ?? "Daily XR Market Article",
        excerpt: article.excerpt ?? null,
        content: article.content ?? null,
        tags: article.tags ?? ["xr", "market"],
        sources: newsItems,
        metadata: { 
          cadence: mode,
          keyTakeaways: article.keyTakeaways ?? []
        },
      }
    ];

    const { error: insertError } = await supabase.from("content_items").insert(inserts);
    if (insertError) throw insertError;

    if (mode === "weekly") {
      const startupSystem = `You are a venture capital analyst at SpatialMetrics. Use the sources provided to draft a detailed startup profile for an emerging XR company mentioned in the news.`;
      const startupUser = `Based on these XR/VR/AR industry news items, identify and profile a promising startup:\n\n${sourceContext}\n\nCreate a comprehensive startup profile suitable for investor due diligence.`;

      const startup = await lovableAIRequest(
        lovableKey,
        startupSystem,
        startupUser,
        "create_startup_profile",
        "Create a detailed startup profile for investor analysis",
        {
          type: "object",
          properties: {
            name: { type: "string", description: "Company name" },
            description: { type: "string", description: "150+ word company description" },
            sector: { type: "string", description: "Primary sector (e.g., Hardware, Software, Enterprise, Gaming)" },
            stage: { type: "string", enum: ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Series D+"], description: "Funding stage" },
            headquarters: { type: "string", description: "City, Country" },
            metrics: {
              type: "object",
              properties: {
                funding: { type: "string" },
                employees: { type: "string" },
                customers: { type: "string" },
                arr: { type: "string" },
                growth: { type: "string" }
              }
            },
            investors: {
              type: "array",
              items: { type: "string" },
              description: "List of notable investors"
            },
            products: {
              type: "array",
              items: { type: "string" },
              description: "Key products or solutions"
            },
            investmentThesis: { type: "string", description: "Investment thesis paragraph" },
            risks: {
              type: "array",
              items: { type: "string" },
              description: "Key investment risks"
            }
          },
          required: ["name", "description", "sector", "stage", "headquarters", "investmentThesis"]
        }
      );

      await supabase.from("content_items").insert({
        type: "startup-profile",
        title: startup.name ?? "Startup Profile",
        excerpt: startup.description ?? null,
        content: startup.description ?? null,
        tags: ["startup", startup.sector ?? "xr"],
        sources: newsItems,
        metadata: startup,
      });
    }

    try {
      await supabase.from("function_runs").insert({
        function_name: "auto-content",
        status: "success",
        duration_ms: Date.now() - startTime,
        details: {
          mode,
          news_items: newsItems.length,
          created: inserts.length + (mode === "weekly" ? 1 : 0),
        },
      });
    } catch {
      // ignore logging failure
    }

    return new Response(JSON.stringify({ success: true, created: inserts.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      if (supabaseUrl && serviceRoleKey) {
        const supabase = createClient(supabaseUrl, serviceRoleKey, {
          auth: { persistSession: false },
        });
        await supabase.from("function_runs").insert({
          function_name: "auto-content",
          status: "failure",
          duration_ms: Date.now() - startTime,
          details: {
            error: error instanceof Error ? error.message : "Unknown error",
          },
        });
      }
    } catch {
      // ignore logging failure
    }

    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
