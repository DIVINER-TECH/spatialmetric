import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const Privacy = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: February 15, 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-8 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly, such as your email address when subscribing to our newsletter, and usage data including page views and feature interactions through standard analytics.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>Your information is used to deliver our services, send newsletter updates, improve platform functionality, and communicate important changes. We do not sell personal data to third parties.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data, including encryption in transit and at rest. Access to personal data is restricted to authorized personnel only.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Cookies</h2>
            <p>We use essential cookies for site functionality and analytics cookies to understand usage patterns. You can manage cookie preferences through your browser settings.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at privacy@spatialmetrics.com.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Contact</h2>
            <p>For privacy-related inquiries, contact us at <span className="text-primary">privacy@spatialmetrics.com</span>.</p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Privacy;
