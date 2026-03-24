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
        <section className="py-12 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Events & Ecosystem</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Stay updated on conferences, product launches, partnerships, and key dates in the spatial computing industry.
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              Upcoming Industry Milestones
              <Badge variant="secondary" className="text-sm">2026-2027</Badge>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map(event => (
                <Card key={event.id} className="group hover:border-primary/50 transition-all shadow-md hover:shadow-primary/5 overflow-hidden flex flex-col">
                  {event.thumbnailUrl && (
                    <div className="h-48 overflow-hidden bg-muted">
                      <img src={event.thumbnailUrl} alt={event.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={typeColors[event.type]}>{event.type.replace('-', ' ')}</Badge>
                      {event.featured && (
                        <Badge variant="outline" className="border-primary/50 text-primary">Featured</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-6 line-clamp-3 text-sm flex-1">{event.description}</p>
                    
                    <div className="space-y-3 mb-6 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{format(event.date, 'MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center gap-3 text-sm">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{event.attendees.toLocaleString()} Ecosystem Partners</span>
                        </div>
                      )}
                    </div>

                    {event.speakers && event.speakers.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 leading-none">Featured Speakers</h4>
                        <div className="flex -space-x-2">
                          {event.speakers.map((s, idx) => (
                            <div key={idx} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden" title={`${s.name} (${s.company})`}>
                              {s.avatar ? <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" /> : s.name.charAt(0)}
                            </div>
                          ))}
                          {event.speakers.length > 3 && (
                            <div className="h-8 w-8 rounded-full border-2 border-background bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                              +{event.speakers.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {event.registrationUrl && (
                        <Button className="flex-1 shadow-sm" asChild>
                          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />Register
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="icon" className="shrink-0">
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
            <h2 className="text-2xl font-bold mb-8">Ecosystem & Intelligence Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {past.map(event => (
                event.resources && event.resources.length > 0 ? (
                  <Card key={event.id} className="bg-card/50 hover:bg-card transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">{event.type}</Badge>
                        <span className="text-[10px] text-muted-foreground font-mono">{format(event.date, 'yyyy')}</span>
                      </div>
                      <CardTitle className="text-base line-clamp-1">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {event.resources.map((res, i) => (
                          <li key={i}>
                            <a href={res.url} className="text-sm text-primary hover:underline flex items-center gap-2 group">
                              <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
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
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Recent Industry Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {past.slice(0, 12).map(event => (
                <div key={event.id} className="p-3 bg-card border border-border/50 rounded-lg hover:border-primary/30 transition-all cursor-default text-center group">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{format(event.date, 'MMM yyyy')}</div>
                  <div className="text-xs font-semibold group-hover:text-primary transition-colors leading-snug">{event.title}</div>
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
