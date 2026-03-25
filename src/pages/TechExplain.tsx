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
        <section className="py-12 border-b border-border/50 bg-muted/5">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-mono tracking-tighter uppercase">Technical Specifications</h1>
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
                  Deep dives into spatial computing hardware, software, and XR innovations
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
