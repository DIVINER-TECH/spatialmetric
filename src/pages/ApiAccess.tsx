import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Zap, Lock } from 'lucide-react';

const endpoints = [
  { method: 'GET', path: '/api/v1/companies', desc: 'List all tracked XR companies' },
  { method: 'GET', path: '/api/v1/market/snapshot', desc: 'Latest daily market snapshot' },
  { method: 'GET', path: '/api/v1/articles', desc: 'Published articles and analysis' },
  { method: 'GET', path: '/api/v1/investors', desc: 'VC directory with portfolios' },
];

const ApiAccess = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">API Access</h1>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
          <p className="text-lg text-muted-foreground">
            Programmatic access to SpatialMetrics data for your applications and research.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Database, title: 'Real-Time Data', desc: 'Access daily market snapshots, company profiles, and funding data via REST API.' },
              { icon: Zap, title: 'Webhooks', desc: 'Get notified when new companies are tracked, funding rounds are announced, or market events occur.' },
              { icon: Lock, title: 'Authenticated', desc: 'API key authentication with rate limiting. Free tier includes 1,000 requests/day.' },
            ].map(f => (
              <Card key={f.title} className="bg-card/50">
                <CardContent className="pt-6">
                  <f.icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card/50">
            <CardHeader><CardTitle>Endpoints Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {endpoints.map(ep => (
                  <div key={ep.path} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Badge variant="default" className="font-mono text-xs">{ep.method}</Badge>
                    <code className="text-sm font-mono text-primary">{ep.path}</code>
                    <span className="text-sm text-muted-foreground ml-auto hidden sm:block">{ep.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Interested in early access? Contact <span className="text-primary">api@spatialmetrics.com</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ApiAccess;
