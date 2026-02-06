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
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{company.name}</h1>
                {company.ticker && <Badge variant="outline" className="text-lg">{company.ticker}</Badge>}
                <LiveIndicator label="Snapshot" />
              </div>
              <p className="text-muted-foreground">{company.sector}</p>
            </div>
            {company.ticker && (
              <div className="text-right">
                <p className="text-3xl font-mono font-bold">${company.stockPrice.toFixed(2)}</p>
                <div className={`flex items-center justify-end gap-1 ${company.priceChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {company.priceChangePercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="font-semibold">{company.priceChangePercent >= 0 ? '+' : ''}{company.priceChange.toFixed(2)} ({company.priceChangePercent.toFixed(2)}%)</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">{company.description}</p></CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>XR Products & Platforms</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {company.xrProducts.map(product => (
                      <Badge key={product} variant="secondary">{product}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Recent News</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {company.recentNews.map((news, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <span>{news.title}</span>
                        <span className="text-sm text-muted-foreground">{format(news.date, 'MMM d')}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Key Metrics</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between"><span className="text-muted-foreground">Market Cap</span><span className="font-semibold">{formatValue(company.marketCap)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span className="font-semibold">{formatValue(company.revenue)}</span></div>
                  {company.metrics.peRatio && <div className="flex justify-between"><span className="text-muted-foreground">P/E Ratio</span><span className="font-semibold">{company.metrics.peRatio}</span></div>}
                  <div className="flex justify-between"><span className="text-muted-foreground">Revenue Growth</span><span className={`font-semibold ${company.metrics.revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`}>{company.metrics.revenueGrowth >= 0 ? '+' : ''}{company.metrics.revenueGrowth}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Gross Margin</span><span className="font-semibold">{company.metrics.grossMargin}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">R&D Spend</span><span className="font-semibold">{formatValue(company.metrics.rAndDSpend)}</span></div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Company Info</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span>{company.employees.toLocaleString()} employees</span></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Founded {company.founded}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><span>{company.headquarters}</span></div>
                  <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                    <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />{company.website}
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
