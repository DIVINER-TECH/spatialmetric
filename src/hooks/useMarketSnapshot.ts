import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type MarketIndexPoint = {
  date: string;
  value: number;
};

export type MarketCompany = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number | null;
};

export type MarketSnapshotData = {
  asOfDate: string;
  provider: string;
  indexSeries: MarketIndexPoint[];
  topCompanies: MarketCompany[];
  fetchedAt: string;
};

const normalizeSnapshot = (row: Tables<"market_daily_snapshots">): MarketSnapshotData => {
  const data = row.data as Partial<MarketSnapshotData>;
  return {
    asOfDate: row.as_of_date,
    provider: data.provider ?? "unknown",
    indexSeries: data.indexSeries ?? [],
    topCompanies: data.topCompanies ?? [],
    fetchedAt: data.fetchedAt ?? row.created_at,
  };
};

const FALLBACK_DATA: MarketSnapshotData = {
  asOfDate: new Date().toISOString().split('T')[0],
  provider: "EMULATED_FALLBACK_V3",
  indexSeries: [
    { date: "2026-03-20", value: 98.8 },
    { date: "2026-03-21", value: 100.2 },
    { date: "2026-03-22", value: 101.5 },
    { date: "2026-03-23", value: 100.8 },
    { date: "2026-03-24", value: 102.1 },
    { date: "2026-03-25", value: 103.4 },
    { date: "2026-03-26", value: 104.2 },
  ],
  topCompanies: [
    { symbol: "AAPL", name: "Apple", price: 182.52, change: 1.25, changePercent: 0.69, volume: 54000000, marketCap: 2850000000000 },
    { symbol: "META", name: "Meta Platforms", price: 485.58, change: -2.35, changePercent: -0.48, volume: 18500000, marketCap: 1250000000000 },
    { symbol: "NVDA", name: "NVIDIA", price: 875.28, change: 15.42, changePercent: 1.79, volume: 42000000, marketCap: 1850000000000 },
    { symbol: "MSFT", name: "Microsoft", price: 415.50, change: 0.85, changePercent: 0.21, volume: 22000000, marketCap: 3100000000000 },
    { symbol: "GOOGL", name: "Alphabet", price: 152.45, change: 1.12, changePercent: 0.74, volume: 14000000, marketCap: 1950000000000 },
    { symbol: "QCOM", name: "Qualcomm", price: 168.45, change: 3.12, changePercent: 1.89, volume: 8500000, marketCap: 192000000000 },
    { symbol: "SONY", name: "Sony", price: 88.42, change: 1.25, changePercent: 1.43, volume: 1200000, marketCap: 115000000000 },
    { symbol: "U", name: "Unity", price: 28.15, change: -0.45, changePercent: -1.57, volume: 6200000, marketCap: 11200000000 },
    { symbol: "RBLX", name: "Roblox", price: 38.52, change: 0.45, changePercent: 1.18, volume: 4500000, marketCap: 32000000000 },
    { symbol: "SNAP", name: "Snap", price: 11.25, change: -0.15, changePercent: -1.32, volume: 15000000, marketCap: 18500000000 },
  ],
  fetchedAt: new Date().toISOString(),
};

export const useMarketSnapshot = () => {
  return useQuery({
    queryKey: ["marketSnapshot"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("market_daily_snapshots")
          .select("id,as_of_date,data,sources,created_at")
          .order("as_of_date", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Supabase Market Fetch Error (Permissions or Table Missing?):", error);
          console.warn("Using static fallback for market data.");
          return FALLBACK_DATA;
        }
        
        if (!data || !data.data) {
          console.warn("No market snapshot found in database. Using static fallback.");
          return FALLBACK_DATA;
        }

        const snapshot = normalizeSnapshot(data);
        if (!snapshot.topCompanies || snapshot.topCompanies.length === 0) {
          console.warn("Market snapshot data is incomplete. Using static fallback.");
          return FALLBACK_DATA;
        }
        
        return snapshot;
      } catch (err) {
        console.error("Market Data Hook Crash:", err);
        return FALLBACK_DATA;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};
