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
        <section className="py-12 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Tech Explain</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Deep dives into spatial computing technology—hardware, software, and the innovations shaping the future of XR.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
