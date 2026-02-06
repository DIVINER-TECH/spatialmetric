import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { Building2, TrendingUp, TrendingDown } from 'lucide-react';
import { companies } from '@/data/companies';

const Companies = () => {
  const formatMarketCap = (cap: number) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
    return `$${(cap / 1e6).toFixed(0)}M`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Company Structure</h1>
              <LiveIndicator label="Snapshot" />
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Curated profiles and analysis of key players in the spatial computing ecosystem - from hardware giants to XR-native startups.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map(company => (
                <Link key={company.id} to={`/company/${company.slug}`}>
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        {company.ticker && <Badge variant="outline">{company.ticker}</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{company.sector}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>

                      {company.ticker && (
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Stock Price</p>
                            <p className="font-mono font-semibold">${company.stockPrice.toFixed(2)}</p>
                            <div className={`flex items-center gap-1 text-xs ${company.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {company.priceChangePercent >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {company.priceChangePercent >= 0 ? '+' : ''}{company.priceChangePercent.toFixed(2)}%
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Market Cap</p>
                            <p className="font-mono font-semibold">{formatMarketCap(company.marketCap)}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {company.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Companies;
