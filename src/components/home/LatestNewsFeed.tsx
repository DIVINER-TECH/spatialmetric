import { motion } from "framer-motion";
import { ExternalLink, Newspaper, Zap, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LiveIndicator } from "@/components/shared/LiveIndicator";
import { useNewsItems } from "@/hooks/useNewsItems";
import { formatDistanceToNow } from "date-fns";

export function LatestNewsFeed() {
  const { data: newsItems, isLoading } = useNewsItems(5);

  return (
    <section className="container py-24 md:py-32 relative">
      <div className="absolute top-0 left-10 w-px h-32 bg-gradient-to-b from-primary/30 to-transparent opacity-20" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-5"
        >
          <div className="h-12 w-12 glass-premium border-black flex items-center justify-center rounded-xl bg-black">
            <Newspaper className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-tighter uppercase leading-none">Intelligence <span className="text-primary">Staging</span></h2>
            <div className="flex items-center gap-3 mt-3">
              <LiveIndicator />
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.4em] font-bold">Real-time Node Monitoring</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 px-4 py-2 glass-premium border-black rounded-full bg-black/40"
        >
          <Zap className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-[9px] font-mono text-primary uppercase tracking-[0.2em] font-bold">Priority Logic Enabled</span>
        </motion.div>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="glass-premium border-black bg-black/20 animate-pulse h-24" />
          ))
        ) : newsItems && newsItems.length > 0 ? (
          newsItems.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="block group relative"
            >
              <Card className="glass-premium group-hover:bg-white/[0.03] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
                <CardContent className="p-5 md:p-6 flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      {item.source && (
                        <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-[0.2em] bg-black border-white/10 text-primary px-3 py-1 group-hover:border-primary/40 transition-colors">
                          {item.source}
                        </Badge>
                      )}
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                        {item.publishedAt
                          ? formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })
                          : "RECOGNIZING..."}
                      </span>
                    </div>
                    <p className="font-mono font-bold text-lg group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight leading-tight">
                      {item.title}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500 shrink-0">
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))
        ) : (
          <Card className="glass-premium border-black border-dashed bg-black/20">
            <CardContent className="py-20 text-center">
              <Activity className="h-8 w-8 text-primary/20 mx-auto mb-6 animate-pulse" />
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em] font-bold">Scanning neural pathways for intelligence... no signals detected.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
