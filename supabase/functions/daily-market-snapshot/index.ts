import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type TickerConfig = {
  symbol: string;
  name: string;
  marketCap?: number;
  providerSymbol?: {
    stooq?: string;
    alphavantage?: string;
  };
};

type DailyPoint = {
  date: string;
  close: number;
  volume: number;
};

type TickerSeries = {
  symbol: string;
  name: string;
  marketCap?: number;
  series: DailyPoint[];
};

const TICKERS: TickerConfig[] = [
  { symbol: "AAPL", name: "Apple", marketCap: 2850000000000, providerSymbol: { stooq: "aapl.us" } },
  { symbol: "META", name: "Meta Platforms", marketCap: 1250000000000, providerSymbol: { stooq: "meta.us" } },
  { symbol: "MSFT", name: "Microsoft", marketCap: 3100000000000, providerSymbol: { stooq: "msft.us" } },
  { symbol: "NVDA", name: "NVIDIA", marketCap: 1850000000000, providerSymbol: { stooq: "nvda.us" } },
  { symbol: "QCOM", name: "Qualcomm", marketCap: 192000000000, providerSymbol: { stooq: "qcom.us" } },
  { symbol: "U", name: "Unity", marketCap: 11200000000, providerSymbol: { stooq: "u.us" } },
  { symbol: "SONY", name: "Sony", marketCap: 115000000000, providerSymbol: { stooq: "sony.us" } },
  { symbol: "SNAP", name: "Snap", marketCap: 18500000000, providerSymbol: { stooq: "snap.us" } },
  { symbol: "GOOGL", name: "Alphabet", marketCap: 1950000000000, providerSymbol: { stooq: "googl.us" } },
  { symbol: "005930.KS", name: "Samsung Electronics", marketCap: 320000000000, providerSymbol: { stooq: "005930.ks" } },
];

const toYYYYMMDD = (date: Date) => {
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
};

const parseCsvSeries = (csvText: string): DailyPoint[] => {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length <= 1) return [];
  const rows = lines.slice(1);
  return rows
    .map((line) => line.split(","))
    .filter((parts) => parts.length >= 6)
    .map((parts) => ({
      date: parts[0],
      close: Number(parts[4]),
      volume: Number(parts[5]),
    }))
    .filter((row) => row.date && !Number.isNaN(row.close))
    .sort((a, b) => a.date.localeCompare(b.date));
};

const fetchStooqSeries = async (symbol: string): Promise<DailyPoint[]> => {
  const end = new Date();
  const start = new Date(Date.now() - 1000 * 60 * 60 * 24 * 200);
  const url = `https://stooq.com/q/d/l/?s=${symbol}&d1=${toYYYYMMDD(start)}&d2=${toYYYYMMDD(end)}&i=d`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Stooq fetch failed for ${symbol}: ${res.status}`);
  }
  const csvText = await res.text();
  return parseCsvSeries(csvText);
};

const fetchAlphaVantageSeries = async (symbol: string, apiKey: string): Promise<DailyPoint[]> => {
  const url = new URL("https://www.alphavantage.co/query");
  url.searchParams.set("function", "TIME_SERIES_DAILY");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("outputsize", "compact");
  url.searchParams.set("apikey", apiKey);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Alpha Vantage fetch failed for ${symbol}: ${res.status}`);
  }
  const json = await res.json();
  if (json["Error Message"]) {
    throw new Error(`Alpha Vantage error for ${symbol}: ${json["Error Message"]}`);
  }
  if (json["Note"]) {
    throw new Error(`Alpha Vantage rate limit: ${json["Note"]}`);
  }

  const series = json["Time Series (Daily)"];
  if (!series) return [];

  const points = Object.entries(series).map(([date, values]) => {
    const v = values as Record<string, string>;
    const close = Number(v["4. close"]);
    const volume = Number(v["5. volume"] ?? 0);
    return { date, close, volume };
  });

  return points
    .filter((row) => row.date && !Number.isNaN(row.close))
    .sort((a, b) => a.date.localeCompare(b.date));
};

const computeIndexSeries = (seriesList: TickerSeries[], limit = 60) => {
  const dateSet = new Set<string>();
  const seriesMap = new Map<string, Map<string, DailyPoint>>();

  for (const ticker of seriesList) {
    const dateMap = new Map<string, DailyPoint>();
    ticker.series.forEach((point) => {
      dateMap.set(point.date, point);
      dateSet.add(point.date);
    });
    seriesMap.set(ticker.symbol, dateMap);
  }

  const dates = Array.from(dateSet).sort();
  const rawSeries = dates.map((date) => {
    const closes: number[] = [];
    for (const ticker of seriesList) {
      const point = seriesMap.get(ticker.symbol)?.get(date);
      if (point) closes.push(point.close);
    }
    if (closes.length === 0) return null;
    const avg = closes.reduce((sum, v) => sum + v, 0) / closes.length;
    return { date, value: avg };
  }).filter(Boolean) as { date: string; value: number }[];

  if (rawSeries.length === 0) return [];
  const base = rawSeries[0].value || 1;
  const normalized = rawSeries.map((point) => ({
    date: point.date,
    value: Number(((point.value / base) * 100).toFixed(2)),
  }));

  return normalized.slice(Math.max(0, normalized.length - limit));
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

    let provider = (Deno.env.get("MARKET_DATA_PROVIDER") ?? "stooq").toLowerCase();
    const alphaKey = Deno.env.get("ALPHAVANTAGE_API_KEY") ?? "";
    if (provider === "alphavantage" && !alphaKey) {
      provider = "stooq";
    }

    const seriesList: TickerSeries[] = [];

    for (const ticker of TICKERS) {
      const symbol =
        provider === "alphavantage"
          ? (ticker.providerSymbol?.alphavantage ?? ticker.symbol)
          : (ticker.providerSymbol?.stooq ?? ticker.symbol.toLowerCase());

      const series =
        provider === "alphavantage"
          ? await fetchAlphaVantageSeries(symbol, alphaKey)
          : await fetchStooqSeries(symbol);

      if (series.length === 0) continue;
      seriesList.push({
        symbol: ticker.symbol,
        name: ticker.name,
        marketCap: ticker.marketCap,
        series,
      });
    }

    if (seriesList.length === 0) {
      throw new Error("No market data returned from provider");
    }

    const indexSeries = computeIndexSeries(seriesList, 60);
    const latestDates = seriesList
      .map((ticker) => ticker.series[ticker.series.length - 1]?.date)
      .filter(Boolean);
    const asOfDate = latestDates.sort().slice(-1)[0];
    if (!asOfDate) {
      throw new Error("Unable to determine snapshot date");
    }

    const topCompanies = seriesList.map((ticker) => {
      const latest = ticker.series[ticker.series.length - 1];
      const previous = ticker.series[ticker.series.length - 2];
      const change = latest && previous ? latest.close - previous.close : 0;
      const changePercent = latest && previous && previous.close !== 0
        ? (change / previous.close) * 100
        : 0;
      return {
        symbol: ticker.symbol,
        name: ticker.name,
        price: Number(latest?.close ?? 0),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        volume: Number(latest?.volume ?? 0),
        marketCap: ticker.marketCap ?? null,
      };
    });

    const payload = {
      asOfDate,
      provider,
      indexSeries,
      topCompanies,
      fetchedAt: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("market_daily_snapshots")
      .upsert({
        as_of_date: asOfDate,
        data: payload,
        sources: { provider },
      }, { onConflict: "as_of_date" });

    if (error) {
      throw error;
    }

    try {
      await supabase.from("function_runs").insert({
        function_name: "daily-market-snapshot",
        status: "success",
        duration_ms: Date.now() - startTime,
        details: {
          provider,
          as_of_date: asOfDate,
          tickers: seriesList.length,
          points: indexSeries.length,
        },
      });
    } catch {
      // Ignore logging failures to avoid failing the main function
    }

    return new Response(JSON.stringify({ success: true, data: payload }), {
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
          function_name: "daily-market-snapshot",
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
