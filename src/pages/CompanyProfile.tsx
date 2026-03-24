import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, Users, Calendar, MapPin } from 'lucide-react';
import { getCompanyBySlug } from '@/data/companies';
import { format } from 'date-fns';

const CompanyProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const company = getCompanyBySlug(slug || '');

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
            <Link to="/companies"><Button>View All Companies</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatValue = (val: number) => {
    if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(0)}M`;
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link to="/companies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />Back to Companies
          </Link>

          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-6 mb-8 border-b border-border/50 pb-8">
            <div className="flex gap-6">
              {company.logoUrl && (
                <div className="h-20 w-20 rounded-xl bg-card border border-border flex items-center justify-center p-2">
                  <img src={company.logoUrl} alt={company.name} className="max-h-full max-w-full object-contain" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold tracking-tight">{company.name}</h1>
                  {company.ticker && <Badge variant="outline" className="text-lg font-mono">{company.ticker}</Badge>}
                  <LiveIndicator label="Real-time" />
                </div>
                <p className="text-xl text-primary font-medium mb-1">{company.tagline || company.sector}</p>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{company.headquarters}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />Founded {company.founded}</span>
                </div>
              </div>
            </div>
            {company.ticker && (
              <div className="text-right bg-primary/5 p-4 rounded-xl border border-primary/10">
                <p className="text-4xl font-mono font-bold tracking-tight">${company.stockPrice.toFixed(2)}</p>
                <div className={`flex items-center justify-end gap-1.5 ${company.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {company.priceChangePercent >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                  <span className="text-lg font-bold">{company.priceChangePercent >= 0 ? '+' : ''}{company.priceChange.toFixed(2)} ({company.priceChangePercent.toFixed(2)}%)</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">About {company.name}</h2>
                <Card className="bg-gradient-to-br from-card to-card/50">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground leading-relaxed text-lg">{company.description}</p>
                  </CardContent>
                </Card>
              </section>

              {company.detailedProducts && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Core Ecosystem & Products</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {company.detailedProducts.map((product, i) => (
                      <Card key={i} className="hover:border-primary/30 transition-all group">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                          <div className="text-xs font-semibold uppercase tracking-wider text-accent">Impact: {product.impact}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {company.breakthroughs && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Historical Breakthroughs</h2>
                  <div className="space-y-4">
                    {company.breakthroughs.map((b, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="text-xl font-bold font-mono text-primary pt-1">{b.year}</div>
                        <div className="flex-1 pb-4 border-l-2 border-border/50 pl-6 relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                          <h3 className="font-bold text-lg mb-1">{b.title}</h3>
                          <p className="text-muted-foreground">{b.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="text-2xl font-bold mb-4">Market Intelligence</h2>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Recent News & Analysis</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {company.recentNews.map((news, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors px-2 rounded-md">
                          <span className="font-medium">{news.title}</span>
                          <span className="text-sm text-muted-foreground font-mono">{format(news.date, 'MMM d, yyyy')}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-primary/20 shadow-lg shadow-primary/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">Financials</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="font-bold text-lg">{formatValue(company.marketCap)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Ann. Revenue</span>
                    <span className="font-bold">{formatValue(company.revenue)}</span>
                  </div>
                  {company.metrics.peRatio && (
                    <div className="flex justify-between items-center py-2 border-b border-border/30">
                      <span className="text-muted-foreground">P/E Ratio</span>
                      <span className="font-mono">{company.metrics.peRatio}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Revenue Growth</span>
                    <span className={`font-bold ${company.metrics.revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {company.metrics.revenueGrowth >= 0 ? '+' : ''}{company.metrics.revenueGrowth}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">R&D Intensity</span>
                    <span className="font-bold">{((company.metrics.rAndDSpend / company.revenue) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="pt-4">
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Users className="h-3 w-3" /> Talent Density
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '85%' }} />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                      <span>{company.employees.toLocaleString()} Professionals</span>
                      <span>Scale Factor: High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Platform Links</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button variant="outline" size="lg" className="w-full group shadow-sm hover:shadow-md transition-all active:scale-[0.98]" asChild>
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2 group-hover:text-primary transition-colors" />
                      Visit {company.website}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyProfile;
