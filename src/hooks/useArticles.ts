import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  articles, 
  getArticlesByCategory, 
  getFeaturedArticles, 
  getTrendingArticles,
  getRelatedArticles,
  getArticleBySlug,
  type Article 
} from '@/data/articles';

export const useArticles = (category?: Article['category']) => {
  const filteredArticles = useMemo(() => {
    if (category) {
      return getArticlesByCategory(category);
    }
    return articles;
  }, [category]);

  return {
    articles: filteredArticles,
    total: filteredArticles.length,
  };
};

export const useFeaturedArticles = () => {
  return useMemo(() => getFeaturedArticles(), []);
};

export const useTrendingArticles = () => {
  return useMemo(() => getTrendingArticles(), []);
};

// Hybrid article lookup: static first, then database fallback
export const useArticle = (slug: string) => {
  const staticArticle = useMemo(() => getArticleBySlug(slug), [slug]);

  const { data: dbArticle } = useQuery({
    queryKey: ['dbArticle', slug],
    queryFn: async () => {
      // Search content_items for matching slug
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('type', 'article')
        .order('published_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      // Find by slug match
      const match = (data ?? []).find((item: any) => {
        const itemSlug = (item.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return itemSlug === slug;
      });
      if (!match) return null;
      const meta = (match.metadata ?? {}) as Record<string, any>;
      const tags = (match.tags ?? []) as string[];
      // Infer category from tags
      let category: Article['category'] = 'market-intelligence';
      if (tags.includes('tech-explain')) category = 'tech-explain';
      else if (tags.includes('spatial-updates')) category = 'spatial-updates';
      else if (tags.includes('companies')) category = 'companies';
      else if (tags.includes('events')) category = 'events';

      return {
        id: match.id,
        slug: (match.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: match.title,
        excerpt: match.excerpt || '',
        content: match.content || '',
        category,
        subcategory: meta.subcategory || 'AI Generated',
        region: meta.region,
        author: {
          name: 'SpatialMetrics AI',
          avatar: 'AI',
          title: 'AI Research Analyst',
        },
        publishedAt: new Date(match.published_at ?? match.created_at),
        updatedAt: new Date(match.published_at ?? match.created_at),
        readTime: Math.ceil((match.content?.length || 0) / 1000),
        trending: false,
        featured: false,
        tags,
        imageUrl: meta.imageUrl || '/placeholder.svg',
        keyTakeaways: meta.keyTakeaways || [],
        metrics: meta.metrics,
      } as Article;
    },
    enabled: !staticArticle, // Only query DB if static not found
    staleTime: 1000 * 60 * 10,
  });

  const article = staticArticle || dbArticle || null;

  const related = useMemo(() => {
    if (staticArticle) {
      return getRelatedArticles(staticArticle);
    }
    return [];
  }, [staticArticle]);

  return {
    article,
    relatedArticles: related,
  };
};

export const useArticleFilters = (initialCategory?: Article['category']) => {
  const [category, setCategory] = useState<Article['category'] | undefined>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'trending' | 'readTime'>('date');

  const filteredArticles = useMemo(() => {
    let result = category ? getArticlesByCategory(category) : articles;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        a => a.title.toLowerCase().includes(query) || 
             a.excerpt.toLowerCase().includes(query) ||
             a.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    switch (sortBy) {
      case 'trending':
        result = [...result].sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case 'readTime':
        result = [...result].sort((a, b) => a.readTime - b.readTime);
        break;
      case 'date':
      default:
        result = [...result].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    }

    return result;
  }, [category, searchQuery, sortBy]);

  return {
    articles: filteredArticles,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  };
};
