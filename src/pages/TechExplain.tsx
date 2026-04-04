import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useHybridArticles } from '@/hooks/useHybridArticles';
import { Glossary } from '@/components/intelligence/Glossary';
import { Button } from '@/components/ui/button';
import { Cpu, Terminal, Book, ChevronDown, Loader2 } from 'lucide-react';

const TechExplain = () => {
  const { articles, hasMore, loadMore, isLoading } = useHybridArticles('tech-explain', 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 border-b border-black/5 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
              <div className="h-16 w-16 glass-premium flex items-center justify-center border-black/5 rounded-2xl shadow-sm">
                <Cpu className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h1 className="text-5xl font-bold font-mono tracking-tighter uppercase leading-none">Tech <span className="text-primary">Explain</span></h1>
                <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.5em] mt-3">
                  Technical Specifications & Innovation Deep Dives
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <Terminal className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-bold font-mono uppercase tracking-[0.3em]">Latest Specifications</h2>
              <div className="h-px flex-1 bg-border/50" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  Expand Research Loop
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="py-24 bg-secondary/10 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-20 justify-center">
              <div className="h-px w-20 bg-primary/30" />
              <Book className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold font-mono uppercase tracking-[0.5em] text-center">Intelligence Glossary</h2>
              <div className="h-px w-20 bg-primary/30" />
            </div>
            
            <Glossary />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TechExplain;
