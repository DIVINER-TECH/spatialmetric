import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ExternalLink, Loader2, ChevronDown } from 'lucide-react';
import { getUpcomingEvents, getPastEvents } from '@/data/events';
import { format } from 'date-fns';
import { useHybridArticles } from '@/hooks/useHybridArticles';
import { ArticleCard } from '@/components/articles/ArticleCard';

const Events = () => {
  const upcomingStatic = getUpcomingEvents();
  const pastStatic = getPastEvents();
  const { articles: liveEvents, hasMore, loadMore, isLoading } = useHybridArticles('events', 6);

  const typeColors: Record<string, string> = {
    conference: 'bg-primary/20 text-primary',
    webinar: 'bg-blue-500/20 text-blue-400',
    'product-launch': 'bg-accent/20 text-accent',
    earnings: 'bg-yellow-500/20 text-yellow-400',
    partnership: 'bg-purple-500/20 text-purple-400',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-24 border-b border-black/5 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
              <div className="h-16 w-16 glass-premium flex items-center justify-center border-black/5 rounded-2xl shadow-sm">
                <Calendar className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h1 className="text-5xl font-bold font-mono tracking-tighter uppercase leading-none">Ecosystem <span className="text-primary">Milestones</span></h1>
                <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.5em] mt-3">
                  Global conferences, product launches, and strategic industry events
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-4 flex-1">
                <div className="h-px flex-1 bg-border/50" />
                Live Ecosystem Tracking
                <div className="h-px flex-1 bg-border/50" />
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Mix of static upcoming and live articles */}
              {upcomingStatic.map(event => (
                <Card key={event.id} className="glass-premium border-black/5 hover:border-primary/50 transition-all group overflow-hidden flex flex-col shadow-sm">
                  {event.thumbnailUrl && (
                    <div className="h-48 overflow-hidden bg-muted relative border-b border-black/5">
                      <img src={event.thumbnailUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <Badge className={`absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest ${typeColors[event.type]}`}>{event.type.replace('-', ' ')}</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4 pt-6 px-6">
                    <CardTitle className="text-lg font-mono font-bold uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pt-0 px-6 pb-6">
                    <p className="text-[10px] text-muted-foreground mb-6 line-clamp-3 font-mono leading-relaxed uppercase tracking-wider flex-1 opacity-70">"{event.description}"</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-secondary/30 rounded-xl p-3 border border-black/5 group-hover:bg-primary/5 transition-colors">
                        <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Timeline</p>
                        <p className="text-[10px] font-black font-mono tracking-tight">{format(event.date, 'MMM d, yyyy')}</p>
                      </div>
                      <div className="bg-secondary/30 rounded-xl p-3 border border-black/5 group-hover:bg-primary/5 transition-colors">
                        <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Vector</p>
                        <p className="text-[10px] font-black font-mono tracking-tight truncate">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {event.registrationUrl && (
                        <Button className="flex-1 font-mono text-[10px] uppercase tracking-widest h-11 rounded-xl shadow-[0_0_15px_rgba(var(--primary),0.2)]" asChild>
                          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 mr-2" />Access Protocol
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="icon" className="shrink-0 h-11 w-11 rounded-xl glass-premium border-black/5 hover:bg-primary hover:text-black transition-all">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {liveEvents.map((article, idx) => (
                <ArticleCard key={article.id} article={article} index={idx + upcomingStatic.length} />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-12 pb-20">
                <Button 
                  onClick={loadMore} 
                  variant="outline" 
                  disabled={isLoading}
                  className="glass-premium border-primary/20 hover:border-primary px-10 h-14 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] group"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
                  )}
                  Expand Regional Feed
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Ecosystem Resources */}
        <section className="py-24 bg-secondary/10 border-y border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mb-12 flex items-center gap-4">
              <div className="h-px w-10 bg-primary" />
              Intelligence Research Assets
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastStatic.map(event => (
                event.resources && event.resources.length > 0 ? (
                  <Card key={event.id} className="glass-premium border-black/5 hover:border-primary/50 transition-all group shadow-sm bg-white/40">
                    <CardHeader className="pb-3 border-b border-black/5 bg-black/[0.02] px-5 pt-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-[8px] font-mono uppercase tracking-widest border-primary/20 text-primary-text">{event.type}</Badge>
                        <span className="text-[9px] text-muted-foreground font-mono">{format(event.date, 'yyyy')}</span>
                      </div>
                      <CardTitle className="text-xs font-mono font-bold uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-1">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5 px-5 pb-5">
                      <ul className="space-y-3">
                        {event.resources.map((res, i) => (
                          <li key={i}>
                            <a href={res.url} className="text-[9px] font-mono uppercase tracking-widest text-primary-text hover:text-primary flex items-center gap-2 group/link font-bold">
                              <ExternalLink className="h-3 w-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                              {res.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ) : null
              ))}
            </div>
          </div>
        </section>

        {/* Past Events Recap */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mb-12 flex items-center gap-4">
              <div className="h-px w-10 bg-primary" />
              Historical Ecosystem Highlights
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {pastStatic.slice(0, 12).map(event => (
                <div key={event.id} className="p-5 glass-premium border-black/5 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default text-center group shadow-sm">
                  <div className="text-[8px] font-mono font-bold text-muted-foreground uppercase tracking-widest mb-2 opacity-60">{format(event.date, 'MMM yyyy')}</div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-tight group-hover:text-primary transition-colors leading-snug">{event.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
