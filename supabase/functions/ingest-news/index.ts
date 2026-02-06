import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { XMLParser } from "https://esm.sh/fast-xml-parser@4.4.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ParsedItem = {
  title: string;
  url: string;
  summary?: string;
  publishedAt?: string;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

const normalizeSummary = (value?: string) => {
  if (!value) return undefined;
  const cleaned = value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return cleaned.slice(0, 280);
};

const parseRss = (feed: any): ParsedItem[] => {
  const items = feed?.rss?.channel?.item ?? [];
  const list = Array.isArray(items) ? items : [items];
  return list
    .map((item) => ({
      title: item?.title?.trim?.() ?? item?.title,
      url: item?.link?.trim?.() ?? item?.link,
      summary: normalizeSummary(item?.description),
      publishedAt: item?.pubDate,
    }))
    .filter((item) => item.title && item.url);
};

const parseAtom = (feed: any): ParsedItem[] => {
  const entries = feed?.feed?.entry ?? [];
  const list = Array.isArray(entries) ? entries : [entries];
  return list
    .map((entry) => ({
      title: entry?.title?.trim?.() ?? entry?.title,
      url: entry?.link?.href ?? entry?.link?.[0]?.href ?? entry?.link?.[0],
      summary: normalizeSummary(entry?.summary ?? entry?.content),
      publishedAt: entry?.updated ?? entry?.published,
    }))
    .filter((item) => item.title && item.url);
};

const parseFeed = (xmlText: string): ParsedItem[] => {
  const parsed = parser.parse(xmlText);
  const rssItems = parseRss(parsed);
  if (rssItems.length > 0) return rssItems;
  return parseAtom(parsed);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase service role not configured");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const { data: sources, error: sourcesError } = await supabase
      .from("news_sources")
      .select("id,name,feed_url")
      .eq("active", true);

    if (sourcesError) throw sourcesError;
    if (!sources || sources.length === 0) {
      throw new Error("No active news sources configured");
    }

    const results: Record<string, number> = {};

    for (const source of sources) {
      try {
        const res = await fetch(source.feed_url, {
          headers: { "User-Agent": "SpatialMetrics/1.0" },
        });
        if (!res.ok) {
          results[source.name] = 0;
          continue;
        }
        const xmlText = await res.text();
        const items = parseFeed(xmlText);
        if (items.length === 0) {
          results[source.name] = 0;
          continue;
        }

        const payload = items.map((item) => {
          const parsedDate = item.publishedAt ? new Date(item.publishedAt) : null;
          const publishedAt = parsedDate && !Number.isNaN(parsedDate.getTime())
            ? parsedDate.toISOString()
            : null;
          return {
            source_id: source.id,
            title: item.title,
            url: item.url,
            summary: item.summary ?? null,
            published_at: publishedAt,
          };
        });

        const { error: upsertError } = await supabase
          .from("news_items")
          .upsert(payload, { onConflict: "url" });

        if (upsertError) {
          results[source.name] = 0;
          continue;
        }

        results[source.name] = payload.length;
      } catch {
        results[source.name] = 0;
      }
    }

    try {
      const totalItems = Object.values(results).reduce((sum, value) => sum + value, 0);
      await supabase.from("function_runs").insert({
        function_name: "ingest-news",
        status: "success",
        duration_ms: Date.now() - startTime,
        details: {
          sources: results,
          total_items: totalItems,
        },
      });
    } catch {
      // Ignore logging failures to avoid failing the main function
    }

    return new Response(JSON.stringify({ success: true, results }), {
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
          function_name: "ingest-news",
          status: "failure",
          duration_ms: Date.now() - startTime,
          details: {
            error: error instanceof Error ? error.message : "Unknown error",
          },
        });
      }
    } catch {
      // Ignore logging failures
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
