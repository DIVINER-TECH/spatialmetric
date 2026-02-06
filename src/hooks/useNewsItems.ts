import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  summary: string | null;
  publishedAt: string | null;
  source: string | null;
};

export const useNewsItems = (limit = 30) => {
  return useQuery({
    queryKey: ["newsItems", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news_items")
        .select("id,title,url,summary,published_at, news_sources(name)")
        .order("published_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data ?? []).map((item: any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        summary: item.summary ?? null,
        publishedAt: item.published_at ?? null,
        source: item.news_sources?.name ?? null,
      })) as NewsItem[];
    },
    staleTime: 1000 * 60 * 10,
  });
};
