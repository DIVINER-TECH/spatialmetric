import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our weekly spatial computing insights.",
      });
      setEmail("");
    }
  };

  return (
    <section className="container py-16 md:py-24">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/20 border border-border/50 p-8 md:p-12">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-6">
            <Mail className="h-7 w-7 text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Ahead of the Curve
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Get weekly insights on spatial computing investments, market trends, 
            and emerging opportunities delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 border-border/50"
              required
            />
            <Button type="submit" className="gap-2">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            Join 12,000+ investors. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
