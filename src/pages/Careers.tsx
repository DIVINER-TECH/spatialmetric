import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin } from 'lucide-react';

const openings = [
  { title: 'Senior Data Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'XR Market Analyst', dept: 'Research', location: 'San Francisco', type: 'Full-time' },
  { title: 'Frontend Developer (React)', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Content Strategist', dept: 'Editorial', location: 'Remote', type: 'Contract' },
];

const Careers = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="py-16 border-b border-border/50 bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-primary font-bold">Talent Acquisition</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-mono tracking-tighter uppercase mb-6">Join the Mission</h1>
          <p className="text-xl text-muted-foreground font-mono leading-relaxed max-w-3xl uppercase tracking-tight">
            Building the definitive intelligence platform for the spatial computing era.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-bold font-mono uppercase tracking-tighter">Open Positions</h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          
          <div className="space-y-4">
            {openings.map(job => (
              <Card key={job.title} className="bg-card/30 border-border/50 hover:border-primary/50 transition-all group cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3">
                      <h3 className="font-mono font-bold text-xl uppercase tracking-tight group-hover:text-primary transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-6 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Briefcase className="h-3 w-3 text-primary" />{job.dept}</span>
                        <span className="flex items-center gap-2"><MapPin className="h-3 w-3 text-primary" />{job.location}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-widest bg-muted/50 border-border/50 px-4 py-1 h-fit w-fit">{job.type}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 p-10 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em] leading-relaxed">
              Don't see a role that fits? Submit your credentials to <span className="text-primary font-bold">careers@spatialmetrics.com</span>
              <br />
              <span className="opacity-50 mt-2 block text-[10px]">We are always looking for exceptional talent in data engineering and spatial analysis.</span>
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Careers;
