import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ContentItem = {
  id: string;
  type: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  tags: string[] | null;
  sources: any | null;
  metadata: any | null;
  publishedAt: string;
};

export const useContentItems = (type?: string, limit = 12) => {
  return useQuery({
    queryKey: ["contentItems", type, limit],
    queryFn: async () => {
      let query = supabase
        .from("content_items")
        .select("id,type,title,excerpt,content,tags,sources,metadata,published_at")
        .order("published_at", { ascending: false })
        .limit(limit);

      if (type) {
        query = query.eq("type", type);
      }

      const { data, error } = await query;
      if (error) throw error;

      return (data ?? []).map((item: any) => ({
        id: item.id,
        type: item.type,
        title: item.title,
        excerpt: item.excerpt ?? null,
        content: item.content ?? null,
        tags: item.tags ?? null,
        sources: item.sources ?? null,
        metadata: item.metadata ?? null,
        publishedAt: item.published_at,
      })) as ContentItem[];
    },
    staleTime: 1000 * 60 * 10,
  });
};
