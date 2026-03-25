import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success('Message sent! We\'ll get back to you within 48 hours.');
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 border-b border-border/50 bg-muted/10">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Communication Channel</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-tighter uppercase mb-6">Contact Intelligence</h1>
            <p className="text-xl text-muted-foreground font-mono leading-relaxed max-w-3xl uppercase tracking-tight">
              Direct uplink to our strategic analysis and data engineering teams.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <Card className="bg-card/30 border-border/50 shadow-xl overflow-hidden">
                  <CardHeader className="border-b border-border/50 bg-muted/20">
                    <CardTitle className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Transmission Protocol</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Operator Name</Label>
                          <Input id="name" required maxLength={100} className="bg-muted/20 border-border/50 font-mono text-xs uppercase tracking-widest h-11" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Uplink Email</Label>
                          <Input id="email" type="email" required maxLength={255} className="bg-muted/20 border-border/50 font-mono text-xs uppercase tracking-widest h-11" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Subject Classification</Label>
                        <Input id="subject" required maxLength={200} className="bg-muted/20 border-border/50 font-mono text-xs uppercase tracking-widest h-11" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Message Body</Label>
                        <Textarea id="message" required rows={5} maxLength={2000} className="bg-muted/20 border-border/50 font-mono text-xs uppercase tracking-widest leading-relaxed" />
                      </div>
                      <Button type="submit" disabled={sending} className="w-full sm:w-auto h-12 px-10 font-mono text-[10px] uppercase tracking-[0.3em] bg-primary hover:bg-primary/90 transition-all">
                        {sending ? 'Transmitting...' : 'Send Transmission'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                {[
                  { icon: Mail, title: 'Email', detail: 'hello@spatialmetrics.com' },
                  { icon: MapPin, title: 'Location', detail: 'San Francisco, CA' },
                  { icon: Clock, title: 'Response Time', detail: 'Within 48 hours' },
                ].map(i => (
                  <Card key={i.title} className="bg-card/30 border-border/50 hover:border-primary/30 transition-all group">
                    <CardContent className="pt-8 pb-8">
                      <i.icon className="h-6 w-6 text-primary mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-2">{i.title}</h3>
                      <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">{i.detail}</p>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 text-center">
                  <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest opacity-50">
                    System Status: Online // Response Priority: Standard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
