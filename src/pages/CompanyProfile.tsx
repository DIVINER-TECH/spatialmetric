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
          <Link to="/companies" className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-3 w-3" />Back to Intelligence Index
          </Link>

          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-8 mb-10 border-b border-border/50 pb-10">
            <div className="flex gap-8">
              {company.logoUrl && (
                <div className="h-24 w-24 rounded-xl bg-card/50 border border-border/50 flex items-center justify-center p-4 shadow-inner">
                  <img src={company.logoUrl} alt={company.name} className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter uppercase">{company.name}</h1>
                  {company.ticker && <Badge variant="outline" className="text-xl font-mono bg-muted/30 border-border/50 px-3 py-1">{company.ticker}</Badge>}
                  <LiveIndicator label="LIVE DATA" />
                </div>
                <p className="text-xl text-primary font-mono uppercase tracking-widest mb-3">{company.tagline || company.sector}</p>
                <div className="flex items-center gap-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-2"><MapPin className="h-3 w-3 text-primary" />{company.headquarters}</span>
                  <span className="flex items-center gap-2"><Calendar className="h-3 w-3 text-primary" />Est. {company.founded}</span>
                </div>
              </div>
            </div>
            {company.ticker && (
              <div className="text-right bg-muted/20 p-6 rounded-xl border border-border/50 backdrop-blur-sm">
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Market Valuation</p>
                <p className="text-5xl font-mono font-bold tracking-tighter mb-2">${company.stockPrice.toFixed(2)}</p>
                <div className={`flex items-center justify-end gap-2 font-mono ${company.priceChangePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {company.priceChangePercent >= 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                  <span className="text-xl font-bold tracking-tighter">{company.priceChangePercent >= 0 ? '+' : ''}{company.priceChange.toFixed(2)} ({company.priceChangePercent.toFixed(2)}%)</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-border/50" />
                  <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">Strategic Profile</h2>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
                <Card className="bg-card/30 border-border/50">
                  <CardContent className="pt-8">
                    <p className="text-muted-foreground leading-relaxed text-lg font-mono tracking-tight">{company.description}</p>
                  </CardContent>
                </Card>
              </section>

              {company.detailedProducts && (
                <section>
                  <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">Core Ecosystem & Products</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {company.detailedProducts.map((product, i) => (
                      <Card key={i} className="bg-card/30 border-border/50 hover:border-primary/50 transition-all group">
                        <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                          <CardTitle className="text-sm font-mono uppercase tracking-widest group-hover:text-primary transition-colors">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
                          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded w-fit">Impact: {product.impact}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {company.breakthroughs && (
                <section>
                  <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground mb-8">Historical Breakthroughs</h2>
                  <div className="space-y-0">
                    {company.breakthroughs.map((b, i) => (
                      <div key={i} className="flex gap-8 items-start group">
                        <div className="text-2xl font-bold font-mono text-primary/50 group-hover:text-primary transition-colors pt-1 w-16 shrink-0">{b.year}</div>
                        <div className="flex-1 pb-10 border-l border-border/50 pl-8 relative">
                          <div className="absolute w-2 h-2 bg-border group-hover:bg-primary rounded-full -left-[4.5px] top-3 transition-all duration-300 shadow-[0_0_0_4px_rgba(var(--bg),1)]" />
                          <h3 className="font-mono font-bold text-lg uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{b.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">Market Intelligence</h2>
                <Card className="bg-card/30 border-border/50 overflow-hidden">
                  <CardHeader className="border-b border-border/50 bg-muted/20">
                    <CardTitle className="text-xs font-mono uppercase tracking-widest">Recent News & Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                      {company.recentNews.map((news, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-all cursor-pointer group">
                          <span className="text-xs font-mono uppercase tracking-tight group-hover:text-primary transition-colors">{news.title}</span>
                          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-tighter bg-muted/50 px-2 py-1 rounded">{format(news.date, 'MMM d, yyyy')}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <Card className="bg-card/30 border-primary/30 shadow-2xl shadow-primary/5 overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <CardTitle className="text-xs font-mono uppercase tracking-[0.2em]">Financial Intelligence</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-0 p-0">
                  {[
                    { label: 'Market Cap', value: formatValue(company.marketCap), mono: true },
                    { label: 'Ann. Revenue', value: formatValue(company.revenue), mono: true },
                    { label: 'P/E Ratio', value: company.metrics.peRatio || 'N/A', mono: true },
                    { 
                      label: 'Revenue Growth', 
                      value: `${company.metrics.revenueGrowth >= 0 ? '+' : ''}${company.metrics.revenueGrowth}%`, 
                      color: company.metrics.revenueGrowth >= 0 ? 'text-success' : 'text-destructive',
                      mono: true 
                    },
                    { label: 'R&D Intensity', value: `${((company.metrics.rAndDSpend / company.revenue) * 100).toFixed(1)}%`, mono: true },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{item.label}</span>
                      <span className={`text-sm font-bold font-mono tracking-tighter ${item.color || ''}`}>{item.value}</span>
                    </div>
                  ))}
                  
                  <div className="p-6 bg-muted/10">
                    <div className="text-[10px] font-mono text-muted-foreground mb-3 flex items-center gap-2 uppercase tracking-widest">
                      <Users className="h-3 w-3 text-primary" /> Talent Density
                    </div>
                    <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden border border-border/30">
                      <div className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" style={{ width: '85%' }} />
                    </div>
                    <div className="flex justify-between mt-3 text-[9px] font-mono text-muted-foreground uppercase tracking-tighter">
                      <span className="font-bold text-foreground">{company.employees.toLocaleString()} Professionals</span>
                      <span className="text-primary">Scale Factor: High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/30 border-border/50 overflow-hidden">
                <CardHeader className="border-b border-border/50 bg-muted/20">
                  <CardTitle className="text-xs font-mono uppercase tracking-widest">Platform Access</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Button variant="outline" size="lg" className="w-full group font-mono text-[10px] uppercase tracking-[0.2em] border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300" asChild>
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-2 group-hover:scale-110 transition-transform" />
                      Connect to {company.website}
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
