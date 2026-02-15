import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, TrendingUp, BarChart3, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('newsletter_subscribers' as any).insert({ email });
      if (error) {
        if (error.code === '23505') {
          toast.info('You\'re already subscribed!');
        } else {
          throw error;
        }
      } else {
        setSubscribed(true);
        toast.success('Successfully subscribed!');
      }
    } catch {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">XR Market Newsletter</h1>
            <p className="text-lg text-muted-foreground">
              Weekly insights on spatial computing investments, market trends, and emerging companies — delivered to your inbox.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-xl">
            {subscribed ? (
              <Card className="bg-card/50 text-center">
                <CardContent className="pt-8 pb-8">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">You're Subscribed!</h2>
                  <p className="text-muted-foreground">Look out for our next edition in your inbox.</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/50">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubscribe} className="flex gap-3">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      maxLength={255}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Subscribing...' : 'Subscribe'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { icon: TrendingUp, label: 'Market Moves', desc: 'Weekly XR index recap' },
                { icon: BarChart3, label: 'Deal Flow', desc: 'Latest funding rounds' },
                { icon: Zap, label: 'Insights', desc: 'AI-curated analysis' },
              ].map(f => (
                <Card key={f.label} className="bg-card/50 text-center">
                  <CardContent className="pt-6">
                    <f.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <h3 className="text-sm font-semibold">{f.label}</h3>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Newsletter;
