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
        <section className="py-16 border-b border-border/50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">Have questions about our platform or data? Get in touch.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="bg-card/50">
                  <CardHeader><CardTitle>Send a Message</CardTitle></CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><Label htmlFor="name">Name</Label><Input id="name" required maxLength={100} /></div>
                        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required maxLength={255} /></div>
                      </div>
                      <div><Label htmlFor="subject">Subject</Label><Input id="subject" required maxLength={200} /></div>
                      <div><Label htmlFor="message">Message</Label><Textarea id="message" required rows={5} maxLength={2000} /></div>
                      <Button type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</Button>
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
                  <Card key={i.title} className="bg-card/50">
                    <CardContent className="pt-6">
                      <i.icon className="h-5 w-5 text-primary mb-2" />
                      <h3 className="font-semibold text-sm">{i.title}</h3>
                      <p className="text-sm text-muted-foreground">{i.detail}</p>
                    </CardContent>
                  </Card>
                ))}
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
