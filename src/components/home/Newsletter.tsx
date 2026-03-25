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
    <section className="container py-20 md:py-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-card/30 border border-border/50 p-10 md:p-16 backdrop-blur-md">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -ml-48 -mb-48" />
        
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mx-auto mb-8 group hover:scale-110 transition-transform duration-500">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Strategic Briefings</span>
            <div className="h-px w-8 bg-primary/50" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter uppercase mb-6 leading-tight">
            Subscribe to <br />
            <span className="text-primary">Intelligence Stream</span>
          </h2>
          
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-12 max-w-xl mx-auto leading-relaxed opacity-80">
            Weekly transmissions on spatial computing investments, market shifts, 
            and emerging strategic opportunities delivered to your terminal.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <Input
              type="email"
              placeholder="OPERATOR EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-muted/20 border-border/50 font-mono text-xs uppercase tracking-widest focus:border-primary/50 transition-colors"
              required
            />
            <Button type="submit" className="h-12 px-8 gap-3 font-mono uppercase text-xs tracking-widest shrink-0">
              Initialize
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                12,402 Active Operators
              </p>
            </div>
            <div className="h-4 w-px bg-border/50" />
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              Secure Transmission
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
