import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, FileText, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface GeneratedArticle {
  title: string;
  excerpt: string;
  content: string;
  keyTakeaways: string[];
  tags: string[];
  metrics?: { label: string; value: string }[];
}

export const ArticleGenerator = () => {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('market-intelligence');
  const [region, setRegion] = useState('Global');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);

  const generateArticle = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setIsGenerating(true);
    setGeneratedArticle(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { type: 'article', topic, category, region }
      });

      if (error) throw error;

      if (data?.success && data?.data) {
        setGeneratedArticle(data.data);
        toast.success('Article generated successfully');
      } else {
        throw new Error('Failed to generate article');
      }
    } catch (err) {
      console.error('Error generating article:', err);
      toast.error('Failed to generate article. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2 font-medium">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Article Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Topic</label>
            <Input
              placeholder="e.g., Apple Vision Pro 2 enterprise adoption trends"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market-intelligence">Market Intelligence</SelectItem>
                  <SelectItem value="tech-explain">Tech Explain</SelectItem>
                  <SelectItem value="companies">Company Analysis</SelectItem>
                  <SelectItem value="spatial-updates">Spatial Updates</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Region</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Global">Global</SelectItem>
                  <SelectItem value="NA">North America</SelectItem>
                  <SelectItem value="EU">Europe</SelectItem>
                  <SelectItem value="ASEAN">ASEAN</SelectItem>
                  <SelectItem value="Pacific">Pacific</SelectItem>
                  <SelectItem value="South Asia">South Asia</SelectItem>
                  <SelectItem value="MENA">MENA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateArticle} 
            disabled={isGenerating || !topic.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Article...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Article
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedArticle && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="outline" className="text-xs">{category}</Badge>
              <Badge variant="secondary" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />{region}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />AI Generated
              </Badge>
            </div>

            <h2 className="text-xl font-semibold mb-3">{generatedArticle.title}</h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{generatedArticle.excerpt}</p>

            {generatedArticle.metrics && generatedArticle.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {generatedArticle.metrics.slice(0, 3).map((m, i) => (
                  <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                    <p className="text-sm font-medium">{m.value}</p>
                  </div>
                ))}
              </div>
            )}

            <Card className="mb-6 border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-3">Key Takeaways</h4>
                <ul className="space-y-2">
                  {generatedArticle.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="prose prose-base prose-invert max-w-none [&_p]:text-base [&_p]:leading-7 [&_p]:mb-4 [&_p]:font-normal [&_h2]:text-lg [&_h2]:font-medium [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2">
              <div dangerouslySetInnerHTML={{ 
                __html: generatedArticle.content
                  .replace(/\n/g, '<br/>')
                  .replace(/## /g, '<h2>')
                  .replace(/### /g, '<h3>')
                  .replace(/\*\*(.*?)\*\*/g, '$1')
              }} />
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {generatedArticle.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
