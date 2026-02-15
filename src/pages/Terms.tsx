import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Terms = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: February 15, 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-8 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By accessing SpatialMetrics, you agree to these Terms of Service. If you do not agree, please discontinue use of the platform.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Service Description</h2>
            <p>SpatialMetrics provides market intelligence, company tracking, and analytical content related to the spatial computing industry. Data is provided for informational purposes and should not be construed as financial advice.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Intellectual Property</h2>
            <p>All content, data, analysis, and visual materials on SpatialMetrics are protected by copyright. Unauthorized reproduction or redistribution is prohibited without written consent.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Disclaimer</h2>
            <p>Market data, company valuations, and investment information are provided as-is. SpatialMetrics does not guarantee accuracy and is not liable for investment decisions made based on our content. Always consult a qualified financial advisor.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. User Conduct</h2>
            <p>Users agree not to scrape, reverse-engineer, or attempt unauthorized access to the platform. API access is governed by separate terms available upon request.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance of updated terms.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Contact</h2>
            <p>Questions about these terms? Email <span className="text-primary">legal@spatialmetrics.com</span>.</p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Terms;
