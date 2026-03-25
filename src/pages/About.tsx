import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Target, Users, Globe } from 'lucide-react';

const About = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="py-16 border-b border-border/50 bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Intelligence Mandate</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-tighter uppercase mb-6">About SpatialMetrics</h1>
          <p className="text-xl text-muted-foreground font-mono leading-relaxed max-w-3xl uppercase tracking-tight">
            The premier strategic intelligence platform for the global spatial computing ecosystem.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {[
              { icon: Target, title: 'Our Mission', desc: 'To provide the most comprehensive, real-time intelligence on the spatial computing industry — helping investors, founders, and analysts make informed decisions.' },
              { icon: Users, title: 'Who We Serve', desc: 'Venture capitalists, institutional investors, startup founders, enterprise strategists, and technology analysts tracking the XR ecosystem.' },
              { icon: Globe, title: 'Global Coverage', desc: 'We track companies and investments across North America, Europe, Asia-Pacific, South Asia, ASEAN, and the MENA region.' },
              { icon: BarChart3, title: 'Methodology', desc: 'Our data combines daily market snapshots, AI-powered content generation, curated editorial analysis, and real-time news ingestion.' },
            ].map(item => (
              <Card key={item.title} className="bg-card/30 border-border/50 hover:border-primary/50 transition-all group">
                <CardContent className="pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-mono font-bold uppercase tracking-widest mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed uppercase tracking-tighter opacity-80">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto space-y-10 border-t border-border/50 pt-20">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold font-mono uppercase tracking-tighter">Strategic History</h2>
              <div className="h-px flex-1 bg-border/50" />
            </div>
            <div className="space-y-6 text-muted-foreground font-mono text-sm uppercase tracking-tight leading-relaxed">
              <p>
                Founded in 2024, SpatialMetrics emerged from a critical intelligence gap in the spatial computing sector.
                While traditional financial platforms track public equities, the spatial computing ecosystem spans private startups,
                sovereign wealth funds, corporate ventures, and emerging markets that require specialized coverage.
              </p>
              <p>
                Today, we monitor over 50 core companies, 30+ specialized VC firms, and provide daily market snapshots that power investment
                decisions across the spatial computing value chain — from silicon and optics to content and enterprise applications.
              </p>
            </div>
            <div className="pt-10 flex justify-center">
              <div className="px-6 py-3 border border-primary/30 bg-primary/5 rounded-full text-[10px] font-mono text-primary uppercase tracking-[0.3em] animate-pulse">
                System Status: Operational // Data Feed: Active
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
