import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Privacy = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="py-16 border-b border-border/50 bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Data Governance</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-tighter uppercase mb-4">Privacy Policy</h1>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Last updated: February 15, 2026 // Version 2.4.0</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl space-y-12 text-muted-foreground font-mono text-sm uppercase tracking-tight leading-relaxed">
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">01. Information Collection</h2>
            <p className="opacity-80">We collect information provided directly, including operator email addresses for intelligence transmissions, and telemetry data including session duration and feature interaction metrics.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">02. Strategic Utilization</h2>
            <p className="opacity-80">Data is utilized to optimize platform delivery, transmit strategic briefings, and enhance analytical precision. Personal identifiers are never commercialized to third-party entities.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">03. Security Protocols</h2>
            <p className="opacity-80">SpatialMetrics implements enterprise-grade encryption for data at rest and in transit. Access to sensitive data is restricted to authorized intelligence personnel via multi-factor authentication.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">04. Telemetry & Cookies</h2>
            <p className="opacity-80">Essential cookies are deployed for session persistence. Analytical telemetry is used to monitor system performance and usage patterns. Configuration is manageable via browser interface.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card/30 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4 tracking-tighter">05. Operator Rights</h2>
            <p className="opacity-80">Operators maintain the right to request data extraction, rectification, or termination of records. Direct inquiries to the privacy desk at privacy@spatialmetrics.com.</p>
          </div>
          <div className="text-center pt-10">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              Privacy Desk: <span className="text-primary font-bold">privacy@spatialmetrics.com</span>
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Privacy;
