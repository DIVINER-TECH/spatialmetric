import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info, AlertCircle, TrendingUp } from 'lucide-react';

interface ArticleRendererProps {
  content: string;
}

const ArticleRenderer: React.FC<ArticleRendererProps> = ({ content }) => {
  // Pre-process content to handle custom [INSIGHT] and [NOTE] tags
  // Actually, we can handle them by replacing them with something react-markdown recognizes
  // or just by using a custom component if we can target them.
  // A simple way is to replace [INSIGHT] with <div className="insight">...</div> 
  // but react-markdown treats HTML differently based on settings.
  // Let's use a more "markdown-native" approach: we'll convert them to special blockquotes or similar.
  
  const processedContent = content
    .replace(/\[INSIGHT\]([\s\S]*?)\[\/INSIGHT\]/g, ':::insight\n$1\n:::')
    .replace(/\[NOTE\]([\s\S]*?)\[\/NOTE\]/g, ':::note\n$1\n:::');

  return (
    <div className="article-content prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Header styles
          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold tracking-tighter uppercase mb-8 mt-12 border-b-2 border-primary/20 pb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold tracking-tight uppercase mb-6 mt-12 text-foreground/90 flex items-center gap-3 before:content-[''] before:w-1 before:h-8 before:bg-primary before:inline-block" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-4 mt-8 text-primary/90" {...props} />,
          
          // Paragraph styles
          p: ({ node, children, ...props }) => {
            const textContent = React.Children.toArray(children).join('');
            
            // Handle our custom ::: containers
            if (typeof textContent === 'string' && textContent.startsWith(':::insight')) {
                const innerText = textContent.replace(':::insight', '').replace(':::', '').trim();
                return (
                    <div className="my-10 p-6 bg-primary/5 border-l-4 border-primary rounded-r-2xl relative overflow-hidden group transition-all hover:bg-primary/10">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp className="h-12 w-12" />
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-primary text-xs font-mono uppercase tracking-widest font-bold">
                            <TrendingUp className="h-4 w-4" />
                            Analyst Insight
                        </div>
                        <div className="text-foreground/90 leading-relaxed italic relative z-10">
                            {innerText}
                        </div>
                    </div>
                );
            }
            
            if (typeof textContent === 'string' && textContent.startsWith(':::note')) {
                const innerText = textContent.replace(':::note', '').replace(':::', '').trim();
                return (
                    <div className="my-10 p-6 bg-secondary/30 border border-black/5 dark:border-white/5 rounded-2xl flex gap-4 items-start">
                        <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center border border-black/5 shrink-0">
                            <Info className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Strategic Note</div>
                            <div className="text-foreground/80 leading-relaxed italic">
                                {innerText}
                            </div>
                        </div>
                    </div>
                );
            }

            if (typeof textContent === 'string' && textContent.startsWith(':::metrics')) {
                const innerText = textContent.replace(':::metrics', '').replace(':::', '').trim();
                const metricLines = innerText.split('\n').filter(l => l.includes(':'));
                return (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
                        {metricLines.map((line, i) => {
                            const [label, value] = line.split(':').map(s => s.trim());
                            return (
                                <div key={i} className="bg-secondary/30 border border-black/5 rounded-xl p-4 transition-all hover:border-primary/30">
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
                                    <div className="text-xl font-bold font-mono tracking-tighter text-primary">{value}</div>
                                </div>
                            );
                        })}
                    </div>
                );
            }

            if (typeof textContent === 'string' && textContent.startsWith(':::chart')) {
                const innerText = textContent.replace(':::chart', '').replace(':::', '').trim();
                const chartLines = innerText.split('\n').filter(l => l.includes(':'));
                const chartData = chartLines.map(line => {
                    const [name, val] = line.split(':').map(s => s.trim());
                    return { name, value: parseFloat(val.replace(/[^0-9.]/g, '')) };
                });
                return (
                    <div className="h-[300px] w-full my-12 p-6 bg-secondary/20 border border-black/5 rounded-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Market Momentum Index</div>
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 10, fill: '#666', fontFamily: 'monospace' }} 
                                />
                                <YAxis hide />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontFamily: 'monospace', fontSize: '10px' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? 'var(--primary)' : 'rgba(var(--primary), 0.4)'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                );
            }

            return <p className="text-base leading-8 mb-6 text-foreground/80 selection:bg-primary/30" {...props}>{children}</p>;
          },
          
          // Blockquote styles
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary/40 pl-6 italic my-8 text-xl text-foreground/70" {...props} />
          ),
          
          // List styles
          ul: ({ node, ...props }) => <ul className="list-none space-y-3 mb-8 ml-4" {...props} />,
          li: ({ node, children, ...props }) => (
            <li className="flex gap-3 text-foreground/80 leading-relaxed" {...props}>
              <span className="text-primary mt-1.5">•</span>
              <span>{children}</span>
            </li>
          ),
          
          // Table styles
          table: ({ node, ...props }) => (
            <div className="my-10 overflow-hidden border border-black/10 dark:border-white/10 rounded-2xl shadow-sm">
                <table className="w-full border-collapse" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-muted/50 border-b border-black/10 dark:border-white/10" {...props} />,
          th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-xs font-mono uppercase tracking-widest text-muted-foreground" {...props} />,
          td: ({ node, ...props }) => <td className="px-4 py-3 text-sm border-b border-black/5 dark:border-white/5" {...props} />,
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleRenderer;
