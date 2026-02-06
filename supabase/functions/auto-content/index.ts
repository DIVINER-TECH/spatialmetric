import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

const groqRequest = async (apiKey: string, systemPrompt: string, userPrompt: string) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.6,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? "";
  const cleanContent = content.replace(/```json\n?|\n?```/g, "");
  return JSON.parse(cleanContent);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const groqKey = Deno.env.get("GROQ_API_KEY") ?? "";

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase service role not configured");
    }
    if (!groqKey) {
      throw new Error("GROQ_API_KEY is not configured");
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
    const newsItems = (news ?? []).map((item: any) => ({
      title: item.title,
      url: item.url,
      summary: item.summary ?? null,
      published_at: item.published_at ?? null,
      source: item.news_sources ?? null,
    })) as NewsItem[];

    if (newsItems.length === 0) {
      throw new Error("No recent news items found");
    }

    const sourceContext = buildSourceContext(newsItems);

    const briefSystem = `You are an analyst producing a concise daily market brief for XR/VR/AR investors. Use the sources provided. Output JSON only.`;
    const briefUser = `Create a market brief using these sources:\n${sourceContext}\n\nReturn JSON with:
{
  "headline": "Short headline",
  "summary": "3-4 sentences",
  "metrics": [{"label":"Metric","value":"Value","change":"+X%"}],
  "signal": "bullish|bearish|neutral",
  "reasoning": "2-3 sentences"
}`;

    const brief = await groqRequest(groqKey, briefSystem, briefUser);

    const articleSystem = `You are a senior analyst writing a daily XR/VR/AR market article. Use the sources provided. Output JSON only.`;
    const articleUser = `Write a 600-900 word article using these sources:\n${sourceContext}\n\nReturn JSON with:
{
  "title": "Headline",
  "excerpt": "2-3 sentence summary",
  "content": "Full article content",
  "tags": ["tag1","tag2","tag3"]
}`;

    const article = await groqRequest(groqKey, articleSystem, articleUser);

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
        metadata: { cadence: mode },
      }
    ];

    const { error: insertError } = await supabase.from("content_items").insert(inserts);
    if (insertError) throw insertError;

    if (mode === "weekly") {
      const startupSystem = `You are a venture analyst. Use the sources provided to draft a startup profile. Output JSON only.`;
      const startupUser = `Create a startup profile based on recent XR/VR/AR news:\n${sourceContext}\n\nReturn JSON with:
{
  "name": "Company Name",
  "description": "150+ words",
  "sector": "Sector",
  "stage": "Seed/Series A/B/C/D",
  "headquarters": "City, Country",
  "metrics": {"funding":"$XXM","employees":XX,"customers":XX,"arr":"$XM","growth":"XX% YoY"},
  "investors": ["Investor 1","Investor 2"],
  "products": ["Product 1","Product 2"],
  "investmentThesis": "Paragraph",
  "risks": ["Risk 1","Risk 2"]
}`;

      const startup = await groqRequest(groqKey, startupSystem, startupUser);
      await supabase.from("content_items").insert({
        type: "startup-profile",
        title: startup.name ?? "Startup Profile",
        excerpt: startup.description ?? null,
        content: startup.description ?? null,
        tags: ["startup"],
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
