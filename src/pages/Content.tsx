import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { useContentItem } from "@/hooks/useContentItem";
import { format } from "date-fns";

const typeLabels: Record<string, { label: string; backHref: string; backLabel: string }> = {
  article: { label: "Article", backHref: "/market-intelligence", backLabel: "Market Intelligence" },
  "market-brief": { label: "Market Brief", backHref: "/market-intelligence", backLabel: "Market Intelligence" },
  "startup-profile": { label: "Startup Profile", backHref: "/company-tracker", backLabel: "Company Tracker" },
  "company-profile": { label: "Company Profile", backHref: "/company-tracker", backLabel: "Company Tracker" },
  "tech-explain": { label: "Tech Explain", backHref: "/tech-explain", backLabel: "Tech Explain" },
};

const splitParagraphs = (text: string) => {
  return text
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean);
};

const Content = () => {
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading } = useContentItem(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8 max-w-4xl">
          <div className="h-7 bg-muted/40 rounded w-2/3 mb-4 animate-pulse" />
          <div className="h-4 bg-muted/30 rounded w-1/2 mb-8 animate-pulse" />
          <div className="h-40 bg-muted/20 rounded animate-pulse" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-3">Content Not Found</h1>
            <Link to="/">
              <Button size="sm">Return Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const meta = typeLabels[item.type] ?? { label: "Insight", backHref: "/", backLabel: "Home" };
  const publishedLabel = item.publishedAt ? format(new Date(item.publishedAt), "MMM d, yyyy") : "—";
  const paragraphs = item.content ? splitParagraphs(item.content) : [];

  const sources: { title?: string; url?: string; source?: { name?: string } }[] = Array.isArray(item.sources)
    ? item.sources
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <Link
            to={meta.backHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {meta.backLabel}
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="text-xs">{meta.label}</Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">AI</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {publishedLabel}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold mb-3">{item.title}</h1>
            {item.excerpt ? (
              <p className="text-base text-muted-foreground leading-relaxed">{item.excerpt}</p>
            ) : null}
          </header>

          <div className="prose prose-base max-w-none mb-10 [&_p]:text-base [&_p]:leading-7 [&_p]:mb-4 [&_p]:font-normal">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
            ) : (
              <p className="text-muted-foreground">No content available.</p>
            )}
          </div>

          {item.tags && item.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-10">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          ) : null}

          {sources.length > 0 ? (
            <Card className="bg-card/50">
              <CardContent className="p-5">
                <h3 className="font-medium text-base mb-3">Sources</h3>
                <div className="space-y-3">
                  {sources.slice(0, 10).map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between gap-3 text-sm hover:text-primary transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="line-clamp-2">{s.title || s.url || "Source"}</p>
                        {s.source?.name ? (
                          <p className="text-xs text-muted-foreground mt-1">{s.source.name}</p>
                        ) : null}
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Content;

