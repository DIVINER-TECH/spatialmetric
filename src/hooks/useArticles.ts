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
      console.log('Searching for article by slug:', slug);
      
      // 1. Try the dedicated 'articles' table first (more robust)
      const { data: articleData, error: articleError } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (articleData) {
        return {
          ...articleData,
          publishedAt: new Date(articleData.published_at),
          updatedAt: new Date(articleData.updated_at),
          author: {
            name: articleData.author_name || 'SpatialMetrics AI',
            avatar: articleData.author_type === 'ai' ? 'AI' : (articleData.author_name?.charAt(0) || 'A'),
            title: articleData.author_title || 'Expert Analyst',
          },
          category: articleData.category as Article['category'],
          keyTakeaways: articleData.key_takeaways || [],
          imageUrl: articleData.image_url || '/placeholder.svg'
        } as Article;
      }

      // 2. Fallback to generic 'content_items' if not in dedicated table
      // We'll fetch more items and be more flexible with slug generation
      const { data: items, error: itemsError } = await supabase
        .from('content_items')
        .select('*')
        .eq('type', 'article')
        .order('published_at', { ascending: false })
        .limit(100); 

      if (itemsError) throw itemsError;

      const match = (items ?? []).find((item: any) => {
        const itemSlug = (item.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        // Check both exact match and partial match if the slug was truncated
        return itemSlug === slug || itemSlug.startsWith(slug.substring(0, 20));
      });

      if (!match) return null;
      
      const meta = (match.metadata ?? {}) as Record<string, any>;
      const tags = (match.tags ?? []) as string[];
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
    enabled: !staticArticle,
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
