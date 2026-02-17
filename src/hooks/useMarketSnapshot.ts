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

export const useMarketSnapshot = () => {
  return useQuery({
    queryKey: ["marketSnapshot"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("market_daily_snapshots")
        .select("id,as_of_date,data,sources,created_at")
        .order("as_of_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      return normalizeSnapshot(data);
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  });
};
