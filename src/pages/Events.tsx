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
            <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map(event => (
                <Card key={event.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={typeColors[event.type]}>{event.type.replace('-', ' ')}</Badge>
                      {event.featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{format(event.date, 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.attendees.toLocaleString()} expected</span>
                        </div>
                      )}
                    </div>
                    {event.registrationUrl && (
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />Register
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Recent Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {past.slice(0, 4).map(event => (
                <Card key={event.id} className="bg-card/50">
                  <CardContent className="p-4">
                    <Badge className={`${typeColors[event.type]} mb-2`} variant="outline">{event.type.replace('-', ' ')}</Badge>
                    <h3 className="font-semibold text-sm mb-2">{event.title}</h3>
                    <p className="text-xs text-muted-foreground">{format(event.date, 'MMM d, yyyy')}</p>
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

export default Events;
