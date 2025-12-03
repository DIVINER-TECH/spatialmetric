import { useMemo, useState } from 'react';
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

export const useArticle = (slug: string) => {
  const article = useMemo(() => getArticleBySlug(slug), [slug]);
  const related = useMemo(() => {
    if (article) {
      return getRelatedArticles(article);
    }
    return [];
  }, [article]);

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
