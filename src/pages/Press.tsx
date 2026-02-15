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
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Press</h1>
          </div>
          <p className="text-lg text-muted-foreground">Media resources and press releases from SpatialMetrics.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Press Releases</h2>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Media Kit</Button>
          </div>
          {pressReleases.map(pr => (
            <Card key={pr.title} className="bg-card/50">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{pr.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{pr.date}</p>
                  </div>
                  <Badge variant="secondary">{pr.category}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          <p className="text-sm text-muted-foreground mt-8">
            Media inquiries: <span className="text-primary">press@spatialmetrics.com</span>
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Press;
