import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useHybridArticles } from "@/hooks/useHybridArticles";
import { ArticleCard } from "@/components/articles/ArticleCard";

export function FeaturedInsights() {
  const { articles, isLoading } = useHybridArticles(undefined, 6);

  return (
    <section className="container py-20 md:py-28">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Strategic Analysis</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter uppercase mb-2">Featured Insights</h2>
          <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">In-depth market intelligence and technical analysis</p>
        </div>
        <Link
          to="/market-intelligence"
          className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-all group font-bold"
        >
          View Full Archive
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-muted/10 border border-border/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
