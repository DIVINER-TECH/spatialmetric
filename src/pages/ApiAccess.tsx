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
      <section className="py-10 border-b border-border/50 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold font-mono tracking-tighter uppercase">API Access</h1>
                <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest bg-primary/5 text-primary border-primary/20">Coming Soon</Badge>
              </div>
              <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
                Programmatic access to SpatialMetrics intelligence for applications and research
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Database, title: 'Real-Time Data', desc: 'Access daily market snapshots, company profiles, and funding data via REST API.' },
              { icon: Zap, title: 'Webhooks', desc: 'Get notified when new companies are tracked, funding rounds are announced, or market events occur.' },
              { icon: Lock, title: 'Authenticated', desc: 'API key authentication with rate limiting. Free tier includes 1,000 requests/day.' },
            ].map(f => (
              <Card key={f.title} className="bg-card/30 border-border/50 hover:border-primary/50 transition-all group">
                <CardContent className="pt-8">
                  <f.icon className="h-6 w-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-mono font-bold text-sm uppercase tracking-tight mb-2">{f.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card/30 border-border/50 overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <CardTitle className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Endpoints Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {endpoints.map(ep => (
                  <div key={ep.path} className="flex items-center gap-4 p-4 rounded-xl bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors group">
                    <Badge variant="default" className="font-mono text-[9px] uppercase tracking-widest h-6 px-3">{ep.method}</Badge>
                    <code className="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded border border-primary/10">{ep.path}</code>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest ml-auto hidden md:block">{ep.desc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/10 text-center">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Interested in early access? Contact <span className="text-primary font-bold">api@spatialmetrics.com</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ApiAccess;
