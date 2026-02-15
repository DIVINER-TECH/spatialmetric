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
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Careers</h1>
          <p className="text-lg text-muted-foreground">
            Join our team building the definitive intelligence platform for spatial computing.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <h2 className="text-2xl font-bold">Open Positions</h2>
          {openings.map(job => (
            <Card key={job.title} className="bg-card/50 hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{job.dept}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                    </div>
                  </div>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          <p className="text-sm text-muted-foreground mt-8">
            Don't see a role that fits? Send your resume to <span className="text-primary">careers@spatialmetrics.com</span>
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Careers;
