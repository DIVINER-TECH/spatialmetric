import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useHybridArticles } from "@/hooks/useHybridArticles";
import { ArticleCard } from "@/components/articles/ArticleCard";

export function FeaturedInsights() {
  const { articles, isLoading } = useHybridArticles(undefined, 6);

  return (
    <section className="container py-16 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Insights</h2>
          <p className="text-muted-foreground">Latest analysis and market intelligence</p>
        </div>
        <Link
          to="/market-intelligence"
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          View All Insights
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 rounded-lg bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
