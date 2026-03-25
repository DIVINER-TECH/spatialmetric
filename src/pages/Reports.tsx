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
        <section className="py-12 border-b border-border/50 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-mono tracking-tighter uppercase">Intelligence Reports</h1>
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
                  AI-generated market briefs and research reports on spatial computing
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            {isLoading ? (
              <div className="flex items-center gap-3 text-muted-foreground font-mono text-xs uppercase animate-pulse">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Initializing data retrieval...
              </div>
            ) : reports.length > 0 ? (
              <div className="grid gap-6">
                {reports.map(report => (
                  <Card key={report.id} className="bg-card/30 border-border/50 hover:border-primary/50 transition-all group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest bg-primary/5 text-primary border-primary/20">{report.type}</Badge>
                            {report.publishedAt && (
                              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                {format(new Date(report.publishedAt), 'MMM d, yyyy')}
                              </span>
                            )}
                          </div>
                          <h3 className="font-mono font-bold text-lg uppercase tracking-tight group-hover:text-primary transition-colors">{report.title}</h3>
                          {report.excerpt && <p className="text-xs text-muted-foreground mt-3 line-clamp-2 font-mono leading-relaxed italic">"{report.excerpt}"</p>}
                        </div>
                        <div className="md:w-48 bg-muted/20 border-l border-border/50 flex items-center justify-center p-6 group-hover:bg-primary/5 transition-colors">
                          <div className="text-center">
                            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                            <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">Access Report</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-card/30 border-border/50 border-dashed">
                <CardContent className="pt-6 text-center py-20">
                  <div className="h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">No reports available in the current index.</p>
                  <p className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest mt-2">Reports are auto-generated daily from market data streams.</p>
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
