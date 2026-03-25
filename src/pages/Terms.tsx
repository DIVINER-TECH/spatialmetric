import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Terms = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="py-16 border-b border-border/50 bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Legal Framework</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-tighter uppercase mb-4">Terms of Service</h1>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Last updated: February 15, 2026 // Protocol 1.0.4</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl space-y-12 text-muted-foreground font-mono text-sm uppercase tracking-tight leading-relaxed">
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">01. Acceptance of Protocol</h2>
            <p className="opacity-80">By accessing the SpatialMetrics intelligence interface, you acknowledge and agree to these Terms of Service. Non-compliance necessitates immediate termination of platform access.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">02. Intelligence Scope</h2>
            <p className="opacity-80">SpatialMetrics provides strategic market intelligence, entity tracking, and analytical content. Data is for informational purposes only and does not constitute financial or investment advice.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">03. Intellectual Assets</h2>
            <p className="opacity-80">All proprietary content, datasets, and visual representations are protected under global copyright. Unauthorized extraction or redistribution is strictly prohibited without explicit authorization.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">04. Liability Disclaimer</h2>
            <p className="opacity-80">Market valuations and investment metrics are provided "as-is". SpatialMetrics disclaims all liability for strategic decisions made based on platform intelligence. Consult qualified financial counsel.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">05. Operator Conduct</h2>
            <p className="opacity-80">Operators are prohibited from scraping, reverse-engineering, or attempting unauthorized system entry. API utilization is governed by separate technical protocols.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">06. Protocol Modifications</h2>
            <p className="opacity-80">We reserve the right to modify these protocols at any time. Continued system interaction following updates constitutes acceptance of the revised legal framework.</p>
          </div>
          <div className="text-center pt-10">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              Legal Council: <span className="text-primary font-bold">legal@spatialmetrics.com</span>
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Terms;
