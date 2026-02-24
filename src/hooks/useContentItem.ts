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

export const useContentItem = (id?: string) => {
  return useQuery({
    queryKey: ["contentItem", id],
    enabled: Boolean(id),
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("content_items")
        .select("id,type,title,excerpt,content,tags,sources,metadata,published_at")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        type: data.type,
        title: data.title,
        excerpt: data.excerpt ?? null,
        content: data.content ?? null,
        tags: data.tags ?? null,
        sources: data.sources ?? null,
        metadata: data.metadata ?? null,
        publishedAt: data.published_at,
      } as ContentItem;
    },
    staleTime: 1000 * 60 * 5,
  });
};
