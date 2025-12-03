import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { useArticles } from '@/hooks/useArticles';
import { useLiveMetrics } from '@/hooks/useLiveMarketData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const MarketIntelligence = () => {
  const { articles } = useArticles('market-intelligence');
  const { data: metrics } = useLiveMetrics();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Market Intelligence</h1>
              <LiveIndicator />
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Deep analysis of XR market dynamics, investment trends, valuations, and strategic insights for spatial computing investors.
            </p>
          </div>
        </section>

        {/* Live Metrics */}
        <section className="py-8 border-b border-border/50 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {metrics?.slice(0, 6).map((metric, i) => (
                <Card key={i} className="bg-card/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-lg font-bold">{metric.value}</p>
                    <div className={`flex items-center gap-1 text-xs ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
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

export default MarketIntelligence;
