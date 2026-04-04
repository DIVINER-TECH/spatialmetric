import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useHybridArticles } from '@/hooks/useHybridArticles';
import { Globe, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SpatialUpdates = () => {
  const { articles, hasMore, loadMore, isLoading } = useHybridArticles('spatial-updates', 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 border-b border-black/5 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
              <div className="h-16 w-16 glass-premium flex items-center justify-center border-black/5 rounded-2xl shadow-sm">
                <Globe className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h1 className="text-5xl font-bold font-mono tracking-tighter uppercase leading-none">Spatial <span className="text-primary">Updates</span></h1>
                <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.5em] mt-3">
                  Global Ecosystem Displacement & Deployment Tracking
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {articles.map((article, idx) => (
                <ArticleCard key={article.id} article={article} index={idx} />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-12">
                <Button 
                  onClick={loadMore} 
                  variant="outline" 
                  disabled={isLoading}
                  className="glass-premium border-primary/20 hover:border-primary px-10 h-14 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] group"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
                  )}
                  Load More Intelligence
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SpatialUpdates;
