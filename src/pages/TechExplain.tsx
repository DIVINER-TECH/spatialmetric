import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useHybridArticles } from '@/hooks/useHybridArticles';
import { Cpu } from 'lucide-react';

const TechExplain = () => {
  const { articles } = useHybridArticles('tech-explain');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 border-b border-black/5 bg-secondary/30 relative overflow-hidden">
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

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TechExplain;
