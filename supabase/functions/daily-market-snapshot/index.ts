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
  providerSymbol?: { stooq?: string; alphavantage?: string; yahoo?: string };
};

type DailyPoint = { date: string; close: number; volume: number };
type TickerSeries = { 
  symbol: string; 
  name: string; 
  marketCap?: number; 
  series: DailyPoint[];
  providerSymbol?: { stooq?: string; alphavantage?: string; yahoo?: string };
};

const TICKERS: TickerConfig[] = [
  { symbol: "AAPL", name: "Apple", marketCap: 2850000000000, providerSymbol: { stooq: "aapl.us", yahoo: "AAPL" } },
  { symbol: "META", name: "Meta Platforms", marketCap: 1250000000000, providerSymbol: { stooq: "meta.us", yahoo: "META" } },
  { symbol: "MSFT", name: "Microsoft", marketCap: 3100000000000, providerSymbol: { stooq: "msft.us", yahoo: "MSFT" } },
  { symbol: "NVDA", name: "NVIDIA", marketCap: 1850000000000, providerSymbol: { stooq: "nvda.us", yahoo: "NVDA" } },
  { symbol: "QCOM", name: "Qualcomm", marketCap: 192000000000, providerSymbol: { stooq: "qcom.us", yahoo: "QCOM" } },
  { symbol: "U", name: "Unity", marketCap: 11200000000, providerSymbol: { stooq: "u.us", yahoo: "U" } },
  { symbol: "SONY", name: "Sony", marketCap: 115000000000, providerSymbol: { stooq: "sony.us", yahoo: "SONY" } },
  { symbol: "SNAP", name: "Snap", marketCap: 18500000000, providerSymbol: { stooq: "snap.us", yahoo: "SNAP" } },
  { symbol: "GOOGL", name: "Alphabet", marketCap: 1950000000000, providerSymbol: { stooq: "googl.us", yahoo: "GOOGL" } },
  { symbol: "005930.KS", name: "Samsung Electronics", marketCap: 320000000000, providerSymbol: { stooq: "005930.ks", yahoo: "005930.KS" } },
  { symbol: "RBLX", name: "Roblox", marketCap: 32000000000, providerSymbol: { stooq: "rblx.us", yahoo: "RBLX" } },
  { symbol: "MTTR", name: "Matterport", marketCap: 1800000000, providerSymbol: { stooq: "mttr.us", yahoo: "MTTR" } },
  { symbol: "VUZI", name: "Vuzix", marketCap: 350000000, providerSymbol: { stooq: "vuzi.us", yahoo: "VUZI" } },
  { symbol: "IMMR", name: "Immersion", marketCap: 350000000, providerSymbol: { stooq: "immr.us", yahoo: "IMMR" } },
  { symbol: "MVIS", name: "MicroVision", marketCap: 260000000, providerSymbol: { stooq: "mvis.us", yahoo: "MVIS" } },
  { symbol: "KOPN", name: "Kopin", marketCap: 180000000, providerSymbol: { stooq: "kopn.us", yahoo: "KOPN" } },
  { symbol: "LAZR", name: "Luminar", marketCap: 1100000000, providerSymbol: { stooq: "lazr.us", yahoo: "LAZR" } },
  { symbol: "AEVA", name: "Aeva Technologies", marketCap: 600000000, providerSymbol: { stooq: "aeva.us", yahoo: "AEVA" } },
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
  return lines.slice(1)
    .map((line) => line.split(","))
    .filter((parts) => parts.length >= 6)
    .map((parts) => ({ date: parts[0], close: Number(parts[4]), volume: Number(parts[5]) }))
    .filter((row) => row.date && !Number.isNaN(row.close))
    .sort((a, b) => a.date.localeCompare(b.date));
};

const fetchStooqSeries = async (symbol: string): Promise<DailyPoint[]> => {
  const end = new Date();
  const start = new Date(Date.now() - 1000 * 60 * 60 * 24 * 200);
  const url = `https://stooq.com/q/d/l/?s=${symbol}&d1=${toYYYYMMDD(start)}&d2=${toYYYYMMDD(end)}&i=d`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Stooq fetch failed for ${symbol}: ${res.status}`);
  return parseCsvSeries(await res.text());
};

const fetchYahooSeries = async (symbol: string): Promise<DailyPoint[]> => {
  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=6mo`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "Accept": "application/json",
      "Referer": "https://finance.yahoo.com"
    }
  });
  if (!res.ok) throw new Error(`Yahoo fetch failed for ${symbol}: ${res.status}`);
  const data = await res.json();
  const result = data.chart.result[0];
  const timestamps = result.timestamp;
  const quotes = result.indicators.quote[0];
  
  return timestamps.map((ts: number, i: number) => ({
    date: new Date(ts * 1000).toISOString().split('T')[0],
    close: Number(quotes.close[i]),
    volume: Number(quotes.volume[i] ?? 0)
  })).filter((p: any) => p.close !== null && !Number.isNaN(p.close));
};

const fetchYahooQuotes = async (symbols: string[]): Promise<Map<string, { price: number; changePercent: number; volume: number; marketCap: number }>> => {
  const url = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "Accept": "application/json",
      "Referer": "https://finance.yahoo.com"
    }
  });
  if (!res.ok) throw new Error(`Yahoo Quotes fetch failed: ${res.status}`);
  const data = await res.json();
  const quoteMap = new Map();
  data.quoteResponse.result.forEach((quote: any) => {
    quoteMap.set(quote.symbol, {
      price: quote.regularMarketPrice,
      changePercent: quote.regularMarketChangePercent,
      volume: quote.regularMarketVolume,
      marketCap: quote.marketCap
    });
  });
  return quoteMap;
};

const fetchAlphaVantageSeries = async (symbol: string, apiKey: string): Promise<DailyPoint[]> => {
  const url = new URL("https://www.alphavantage.co/query");
  url.searchParams.set("function", "TIME_SERIES_DAILY");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("outputsize", "compact");
  url.searchParams.set("apikey", apiKey);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Alpha Vantage fetch failed for ${symbol}: ${res.status}`);
  const json = await res.json();
  if (json["Error Message"]) throw new Error(`Alpha Vantage error for ${symbol}: ${json["Error Message"]}`);
  if (json["Note"]) throw new Error(`Alpha Vantage rate limit: ${json["Note"]}`);
  const series = json["Time Series (Daily)"];
  if (!series) return [];
  return Object.entries(series)
    .map(([date, values]) => {
      const v = values as Record<string, string>;
      return { date, close: Number(v["4. close"]), volume: Number(v["5. volume"] ?? 0) };
    })
    .filter((row) => row.date && !Number.isNaN(row.close))
    .sort((a, b) => a.date.localeCompare(b.date));
};

const computeIndexSeries = (seriesList: TickerSeries[], limit = 60) => {
  const dateSet = new Set<string>();
  const seriesMap = new Map<string, Map<string, DailyPoint>>();
  for (const ticker of seriesList) {
    const dateMap = new Map<string, DailyPoint>();
    ticker.series.forEach((p) => { dateMap.set(p.date, p); dateSet.add(p.date); });
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
    return { date, value: closes.reduce((s, v) => s + v, 0) / closes.length };
  }).filter(Boolean) as { date: string; value: number }[];
  if (rawSeries.length === 0) return [];
  const base = rawSeries[0].value || 1;
  return rawSeries
    .map((p) => ({ date: p.date, value: Number(((p.value / base) * 100).toFixed(2)) }))
    .slice(Math.max(0, rawSeries.length - limit));
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const startTime = Date.now();
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role not configured");
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });

    let provider = (Deno.env.get("MARKET_DATA_PROVIDER") ?? "yahoo").toLowerCase();
    const alphaKey = Deno.env.get("ALPHAVANTAGE_API_KEY") ?? "";
    if (provider === "alphavantage" && !alphaKey) provider = "stooq";

    const seriesList: TickerSeries[] = [];
    const usedProviders: Record<string, string> = {};

    for (const ticker of TICKERS) {
      let series: DailyPoint[] = [];
      let usedProvider = provider;

      // Try Preferred Provider
      try {
        if (provider === "yahoo") {
          series = await fetchYahooSeries(ticker.providerSymbol?.yahoo ?? ticker.symbol);
        } else if (provider === "alphavantage") {
          series = await fetchAlphaVantageSeries(ticker.providerSymbol?.alphavantage ?? ticker.symbol, alphaKey);
        } else {
          series = await fetchStooqSeries(ticker.providerSymbol?.stooq ?? ticker.symbol.toLowerCase());
        }
      } catch (e) {
        console.warn(`Preferred provider ${provider} failed for ${ticker.symbol}, falling back to stooq...`);
        try {
          series = await fetchStooqSeries(ticker.providerSymbol?.stooq ?? ticker.symbol.toLowerCase());
          usedProvider = "stooq";
        } catch (stooqErr) {
          console.error(`All providers failed for ${ticker.symbol}:`, stooqErr);
        }
      }
      
      if (series.length > 0) {
        seriesList.push({ 
          symbol: ticker.symbol, name: ticker.name, marketCap: ticker.marketCap, series, providerSymbol: ticker.providerSymbol
        });
        usedProviders[ticker.symbol] = usedProvider;
      }
    }

    let quoteMap = new Map();
    if (provider === "yahoo") {
      const symbols = TICKERS.map(t => t.providerSymbol?.yahoo ?? t.symbol);
      try {
        quoteMap = await fetchYahooQuotes(symbols);
      } catch (e) {
        console.warn("Failed to fetch primary Yahoo quotes, individual ticker updates will rely on series data.");
      }
    }

    if (seriesList.length === 0) throw new Error("No market data returned from provider");

    const indexSeries = computeIndexSeries(seriesList, 60);
    const latestDates = seriesList.map((t) => t.series[t.series.length - 1]?.date).filter(Boolean);
    const asOfDate = latestDates.sort().slice(-1)[0];
    if (!asOfDate) throw new Error("Unable to determine snapshot date");

    const topCompanies = seriesList.map((ticker) => {
      const latest = ticker.series[ticker.series.length - 1];
      const previous = ticker.series[ticker.series.length - 2];
      
      const quote = quoteMap.get(ticker.providerSymbol?.yahoo ?? ticker.symbol);
      const price = quote ? quote.price : Number(latest?.close ?? 0);
      const changePercent = quote ? quote.changePercent : (latest && previous && previous.close !== 0 ? ((latest.close - previous.close) / previous.close) * 100 : 0);
      const change = quote ? (price * (changePercent / 100)) : (latest && previous ? latest.close - previous.close : 0);
      
      return {
        symbol: ticker.symbol, name: ticker.name,
        price: Number(price.toFixed(2)), 
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)), 
        volume: Number(quote?.volume ?? latest?.volume ?? 0),
        marketCap: quote?.marketCap ?? ticker.marketCap ?? null,
      };
    });

    const payload = { 
      asOfDate, 
      provider, 
      providers_used: usedProviders,
      indexSeries, 
      topCompanies, 
      fetchedAt: new Date().toISOString() 
    };
    const { error } = await supabase.from("market_daily_snapshots").upsert({ as_of_date: asOfDate, data: payload, sources: { provider } }, { onConflict: "as_of_date" });
    if (error) throw error;

    try {
      await supabase.from("function_runs").insert({ function_name: "daily-market-snapshot", status: "success", duration_ms: Date.now() - startTime, details: { provider, as_of_date: asOfDate, tickers: seriesList.length, points: indexSeries.length } });
    } catch { /* ignore */ }

    return new Response(JSON.stringify({ success: true, data: payload }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      if (supabaseUrl && serviceRoleKey) {
        const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
        await supabase.from("function_runs").insert({ function_name: "daily-market-snapshot", status: "failure", duration_ms: Date.now() - startTime, details: { error: error instanceof Error ? error.message : "Unknown error" } });
      }
    } catch { /* ignore */ }
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error", timestamp: new Date().toISOString() }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
