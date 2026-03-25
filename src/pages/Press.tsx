import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pressReleases = [
  { title: 'SpatialMetrics Launches Real-Time XR Market Index', date: 'Feb 10, 2026', category: 'Product' },
  { title: 'Platform Now Tracks 50+ Companies Across 6 Regions', date: 'Jan 15, 2026', category: 'Milestone' },
  { title: 'AI-Powered Content Pipeline Goes Live', date: 'Dec 20, 2025', category: 'Technology' },
  { title: 'SpatialMetrics Raises Seed Round to Democratize XR Intelligence', date: 'Oct 5, 2025', category: 'Funding' },
];

const Press = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="py-16 border-b border-border/50 bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Newspaper className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-5xl font-bold font-mono tracking-tighter uppercase">Press Center</h1>
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
                Official strategic communications and media assets
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Strategic Releases</h2>
            </div>
            <Button variant="outline" size="sm" className="font-mono text-[10px] uppercase tracking-widest border-border/50 hover:bg-primary hover:text-primary-foreground transition-all">
              <Download className="h-3 w-3 mr-2" />Download Media Kit
            </Button>
          </div>
          
          <div className="space-y-4">
            {pressReleases.map(pr => (
              <Card key={pr.title} className="bg-card/30 border-border/50 hover:border-primary/30 transition-all group">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <h3 className="font-mono font-bold text-sm uppercase tracking-tight group-hover:text-primary transition-colors">{pr.title}</h3>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{pr.date}</p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-[9px] uppercase tracking-widest bg-muted/50 border-border/50 w-fit">{pr.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-xl bg-muted/10 border border-border/50 text-center">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              Media inquiries: <span className="text-primary font-bold">press@spatialmetrics.com</span>
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Press;
