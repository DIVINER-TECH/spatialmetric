import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { events, getUpcomingEvents, getPastEvents } from '@/data/events';
import { format } from 'date-fns';

const Events = () => {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

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
        <section className="py-10 border-b border-border/50 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold font-mono tracking-tighter uppercase">Ecosystem Milestones</h1>
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
                  Global conferences, product launches, and strategic industry events
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-3 flex-1">
                <div className="h-px flex-1 bg-border/50" />
                Upcoming Industry Milestones (2026-2027)
                <div className="h-px flex-1 bg-border/50" />
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map(event => (
                <Card key={event.id} className="bg-card/30 border-border/50 hover:border-primary/50 transition-all group overflow-hidden flex flex-col">
                  {event.thumbnailUrl && (
                    <div className="h-48 overflow-hidden bg-muted relative">
                      <img src={event.thumbnailUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <Badge className={`absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest ${typeColors[event.type]}`}>{event.type.replace('-', ' ')}</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-mono font-bold uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pt-0">
                    <p className="text-xs text-muted-foreground mb-6 line-clamp-3 font-mono leading-relaxed italic flex-1">"{event.description}"</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-muted/30 rounded-lg p-3 border border-border/30 group-hover:bg-muted/50 transition-colors">
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Date</p>
                        <p className="text-xs font-bold font-mono tracking-tight">{format(event.date, 'MMM d, yyyy')}</p>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 border border-border/30 group-hover:bg-muted/50 transition-colors">
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Location</p>
                        <p className="text-xs font-bold font-mono tracking-tight truncate">{event.location}</p>
                      </div>
                    </div>

                    {event.speakers && event.speakers.length > 0 && (
                      <div className="mb-6">
                        <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-3 border-b border-border/30 pb-1">Strategic Speakers</p>
                        <div className="flex -space-x-2">
                          {event.speakers.map((s, idx) => (
                            <div key={idx} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden ring-1 ring-border/50" title={`${s.name} (${s.company})`}>
                              {s.avatar ? <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" /> : s.name.charAt(0)}
                            </div>
                          ))}
                          {event.speakers.length > 3 && (
                            <div className="h-8 w-8 rounded-full border-2 border-background bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold font-mono">
                              +{event.speakers.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {event.registrationUrl && (
                        <Button className="flex-1 font-mono text-[10px] uppercase tracking-widest h-10" asChild>
                          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-2" />Register
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="icon" className="shrink-0 h-10 w-10 border-border/50 hover:bg-primary hover:text-primary-foreground transition-all">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ecosystem Resources */}
        <section className="py-16 bg-muted/20 border-y border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-10 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              Intelligence & Research Assets
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {past.map(event => (
                event.resources && event.resources.length > 0 ? (
                  <Card key={event.id} className="bg-card/30 border-border/50 hover:border-primary/50 transition-all group">
                    <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest border-border/50">{event.type}</Badge>
                        <span className="text-[10px] text-muted-foreground font-mono">{format(event.date, 'yyyy')}</span>
                      </div>
                      <CardTitle className="text-xs font-mono font-bold uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-1">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-3">
                        {event.resources.map((res, i) => (
                          <li key={i}>
                            <a href={res.url} className="text-[10px] font-mono uppercase tracking-widest text-primary hover:text-primary/80 flex items-center gap-2 group/link">
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-10 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              Historical Ecosystem Highlights
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {past.slice(0, 12).map(event => (
                <div key={event.id} className="p-4 bg-muted/10 border border-border/50 rounded-xl hover:border-primary/50 hover:bg-muted/20 transition-all cursor-default text-center group">
                  <div className="text-[9px] font-mono font-bold text-muted-foreground uppercase tracking-widest mb-2">{format(event.date, 'MMM yyyy')}</div>
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
