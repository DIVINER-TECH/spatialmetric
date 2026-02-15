import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Target, Users, Globe } from 'lucide-react';

const About = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">About SpatialMetrics</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            SpatialMetrics is the premier intelligence platform for the spatial computing ecosystem.
            We track companies, investments, and market trends across VR, AR, mixed reality, and the broader XR landscape.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { icon: Target, title: 'Our Mission', desc: 'To provide the most comprehensive, real-time intelligence on the spatial computing industry — helping investors, founders, and analysts make informed decisions.' },
              { icon: Users, title: 'Who We Serve', desc: 'Venture capitalists, institutional investors, startup founders, enterprise strategists, and technology analysts tracking the XR ecosystem.' },
              { icon: Globe, title: 'Global Coverage', desc: 'We track companies and investments across North America, Europe, Asia-Pacific, South Asia, ASEAN, and the MENA region.' },
              { icon: BarChart3, title: 'Methodology', desc: 'Our data combines daily market snapshots, AI-powered content generation, curated editorial analysis, and real-time news ingestion.' },
            ].map(item => (
              <Card key={item.title} className="bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2024, SpatialMetrics emerged from a gap in the market for comprehensive XR industry intelligence.
              While traditional financial platforms track public equities, the spatial computing ecosystem spans private startups,
              sovereign wealth funds, corporate ventures, and emerging markets that require specialized coverage.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we track over 50 companies, 30+ VC firms, and provide daily market snapshots that power investment
              decisions across the spatial computing value chain — from silicon and optics to content and enterprise applications.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
