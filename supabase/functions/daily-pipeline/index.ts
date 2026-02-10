import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * Orchestrator that runs the full daily pipeline in sequence:
 *   1. ingest-news   – fetch RSS feeds into news_items
 *   2. daily-market-snapshot – fetch stock data into market_daily_snapshots
 *   3. auto-content  – generate AI market brief + article from news
 *
 * Call this once per day via pg_cron or any external scheduler.
 */
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(JSON.stringify({ error: "Missing Supabase config" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const results: Record<string, { status: string; detail?: unknown }> = {};

  const callFunction = async (name: string, body: Record<string, unknown> = {}) => {
    const url = `${supabaseUrl}/functions/v1/${name}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`${name} failed (${res.status}): ${JSON.stringify(data)}`);
    }
    return data;
  };

  // Step 1: Ingest news
  try {
    const data = await callFunction("ingest-news");
    results["ingest-news"] = { status: "success", detail: data };
  } catch (e) {
    results["ingest-news"] = {
      status: "failure",
      detail: e instanceof Error ? e.message : "Unknown error",
    };
  }

  // Step 2: Market snapshot
  try {
    const data = await callFunction("daily-market-snapshot");
    results["daily-market-snapshot"] = { status: "success", detail: data?.data ? "ok" : data };
  } catch (e) {
    results["daily-market-snapshot"] = {
      status: "failure",
      detail: e instanceof Error ? e.message : "Unknown error",
    };
  }

  // Step 3: Auto-content (only if news was ingested)
  if (results["ingest-news"].status === "success") {
    try {
      const data = await callFunction("auto-content");
      results["auto-content"] = { status: "success", detail: data };
    } catch (e) {
      results["auto-content"] = {
        status: "failure",
        detail: e instanceof Error ? e.message : "Unknown error",
      };
    }
  } else {
    results["auto-content"] = { status: "skipped", detail: "No news ingested" };
  }

  // Log the pipeline run
  try {
    const allSucceeded = Object.values(results).every((r) => r.status === "success");
    await supabase.from("function_runs").insert({
      function_name: "daily-pipeline",
      status: allSucceeded ? "success" : "partial",
      duration_ms: Date.now() - startTime,
      details: results,
    });
  } catch {
    // ignore logging failure
  }

  return new Response(JSON.stringify({ success: true, results, duration_ms: Date.now() - startTime }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
