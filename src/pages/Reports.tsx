import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { useContentItems } from '@/hooks/useContentItems';
import { format } from 'date-fns';

const Reports = () => {
  const { data: items, isLoading } = useContentItems();
  const reports = items?.filter(i => i.type === 'market-brief' || i.type === 'report') ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Reports</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              AI-generated market briefs and research reports on the spatial computing industry.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {isLoading ? (
              <p className="text-muted-foreground">Loading reports...</p>
            ) : reports.length > 0 ? (
              <div className="space-y-4">
                {reports.map(report => (
                  <Card key={report.id} className="bg-card/50">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{report.title}</h3>
                          {report.excerpt && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{report.excerpt}</p>}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">{report.type}</Badge>
                            {report.publishedAt && (
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(report.publishedAt), 'MMM d, yyyy')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-card/50">
                <CardContent className="pt-6 text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reports available yet. Reports are auto-generated daily from market data.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reports;
