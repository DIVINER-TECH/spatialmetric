import { useMemo } from 'react';
import { useContentItems, type ContentItem } from '@/hooks/useContentItems';
import { articles, type Article } from '@/data/articles';

// Infer category from tags for AI-generated content
const inferCategory = (item: ContentItem): Article['category'] => {
    const tags = item.tags ?? [];
    if (tags.includes('market-intelligence')) return 'market-intelligence';
    if (tags.includes('tech-explain')) return 'tech-explain';
    if (tags.includes('spatial-updates')) return 'spatial-updates';
    if (tags.includes('companies')) return 'companies';
    if (tags.includes('events')) return 'events';
    return 'market-intelligence'; // default for generic articles
};

// Transform ContentItem from database to Article type
const transformContentItem = (item: ContentItem): Article => ({
    id: item.id,
    slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: item.title,
    excerpt: item.excerpt || '',
    content: item.content || '',
    category: inferCategory(item),
    subcategory: item.metadata?.subcategory || 'AI Generated',
    region: item.metadata?.region,
    author: {
        name: 'SpatialMetrics AI',
        avatar: 'AI',
        title: 'AI Research Analyst',
    },
    publishedAt: new Date(item.publishedAt),
    updatedAt: new Date(item.publishedAt),
    readTime: Math.ceil((item.content?.length || 0) / 1000),
    trending: false,
    featured: false,
    tags: item.tags || [],
    imageUrl: item.metadata?.imageUrl || '/placeholder.svg',
    keyTakeaways: item.metadata?.keyTakeaways || [],
    metrics: item.metadata?.metrics,
});

export const useHybridArticles = (category?: Article['category'], limit?: number) => {
    // Get ALL AI-generated articles (not filtered by type) so tag-based filtering works
    const { data: contentItems, isLoading } = useContentItems('article', 50);

    const hybridArticles = useMemo(() => {
        // Transform database content items to Article type
        const dbArticles = (contentItems || []).map(transformContentItem);

        // Get static articles
        const staticArticles = articles;

        // Merge both sources
        let merged = [...staticArticles, ...dbArticles];

        // Deduplicate by slug (prefer database version)
        const seen = new Set<string>();
        merged = merged.filter((article) => {
            const key = article.slug || article.title.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

        // Filter by category if provided — match both inferred category AND tags
        if (category) {
            merged = merged.filter((a) =>
                a.category === category || (a.tags && a.tags.includes(category))
            );
        }

        // Sort by publishedAt descending
        merged.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

        // Apply limit if provided
        if (limit) {
            merged = merged.slice(0, limit);
        }

        return merged;
    }, [contentItems, category, limit]);

    return {
        articles: hybridArticles,
        isLoading,
        total: hybridArticles.length,
    };
};
