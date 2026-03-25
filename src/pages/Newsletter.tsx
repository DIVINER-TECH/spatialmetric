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
        <section className="py-16 border-b border-border/50 bg-muted/10">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mx-auto mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold font-mono tracking-tighter uppercase mb-4">Intelligence Briefing</h1>
            <p className="text-muted-foreground font-mono text-sm uppercase tracking-[0.2em] max-w-xl mx-auto leading-relaxed">
              Weekly strategic insights on spatial computing investments, market shifts, and emerging ecosystems
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            {subscribed ? (
              <Card className="bg-card/30 border-primary/30 text-center overflow-hidden shadow-2xl shadow-primary/5">
                <CardContent className="pt-12 pb-12">
                  <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center border border-success/20 mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold font-mono tracking-tight uppercase mb-2">Registration Confirmed</h2>
                  <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Awaiting next intelligence transmission</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/30 border-border/50 shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="OPERATOR_EMAIL@DOMAIN.COM"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      maxLength={255}
                      className="flex-1 font-mono text-xs uppercase tracking-widest bg-muted/20 border-border/50 h-12"
                    />
                    <Button type="submit" disabled={loading} className="h-12 px-8 font-mono text-xs uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 transition-all">
                      {loading ? 'Processing...' : 'Initialize Access'}
                    </Button>
                  </form>
                  <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-tighter mt-4 text-center opacity-50">
                    By subscribing, you agree to receive strategic intelligence updates. Opt-out anytime.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
              {[
                { icon: TrendingUp, label: 'Market Moves', desc: 'Weekly XR index recap' },
                { icon: BarChart3, label: 'Deal Flow', desc: 'Latest funding rounds' },
                { icon: Zap, label: 'Insights', desc: 'AI-curated analysis' },
              ].map(f => (
                <Card key={f.label} className="bg-card/30 border-border/50 text-center hover:border-primary/30 transition-all group">
                  <CardContent className="pt-8 pb-8">
                    <f.icon className="h-6 w-6 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-2">{f.label}</h3>
                    <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-tighter leading-tight">{f.desc}</p>
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
