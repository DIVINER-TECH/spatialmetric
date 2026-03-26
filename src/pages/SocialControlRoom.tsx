import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Share2, 
    Linkedin, 
    Instagram, 
    Layout, 
    CheckCircle2, 
    Clock, 
    AlertCircle,
    Settings,
    Database,
    ExternalLink,
    RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

const SocialControlRoom = () => {
    const [isConnecting, setIsConnecting] = useState<string | null>(null);
    const [integrations, setIntegrations] = useState<any[]>([]);
    const [recentPosts, setRecentPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data: intData } = await supabase.from('integrations' as any).select('*');
            const { data: postData } = await supabase.from('social_posts' as any).select('*, content_items(title)').order('created_at', { ascending: false }).limit(10);
            
            setIntegrations(intData || []);
            setRecentPosts(postData || []);
        } catch (error) {
            console.error("Fetch data error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const platforms = [
        { id: 'canva', name: 'Canva Enterprise', icon: Layout, description: 'Autofill API for carousel generation' },
        { id: 'linkedin', name: 'LinkedIn Prof.', icon: Linkedin, description: 'Native publishing' },
        { id: 'meta', name: 'Meta (IG/FB)', icon: Instagram, description: 'Instagram Graph API' },
    ];

    const getStatus = (id: string) => {
        const int = integrations.find(i => i.platform === id);
        return int?.access_token ? 'connected' : 'disconnected';
    };

    const connectPlatform = (id: string) => {
        setIsConnecting(id);
        toast.info(`Initiating OAuth flow for ${id}...`);
        // Mocking OAuth redirect
        setTimeout(() => {
            setIsConnecting(null);
            toast.error("OAuth configuration incomplete. Please set up environment variables.");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <section className="py-20 border-b border-black/5 bg-secondary/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-subtle opacity-10 pointer-events-none" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-6">
                            <div className="h-16 w-16 glass-premium flex items-center justify-center border-black/5 rounded-2xl shadow-sm">
                                <Share2 className="h-8 w-8 text-primary animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-5xl font-bold font-mono tracking-tighter uppercase leading-none">Social <span className="text-primary">Control</span></h1>
                                <p className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.5em] mt-3">
                                    Automated Content Distribution Pipeline
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Status Grid */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="grid md:grid-cols-3 gap-4">
                                {platforms.map((platform) => {
                                    const status = getStatus(platform.id);
                                    return (
                                        <Card key={platform.id} className="glass-premium border-black/5 shadow-sm overflow-hidden group">
                                            <CardHeader className="pb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <platform.icon className={`h-6 w-6 ${status === 'connected' ? 'text-primary' : 'text-muted-foreground'}`} />
                                                    <Badge variant={status === 'connected' ? 'default' : 'outline'} className="text-[9px] font-mono uppercase tracking-tighter">
                                                        {status}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-sm font-mono uppercase tracking-widest">{platform.name}</CardTitle>
                                                <CardDescription className="text-[10px] uppercase font-mono tracking-tight leading-relaxed">
                                                    {platform.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <Button 
                                                    variant={status === 'connected' ? 'outline' : 'default'}
                                                    className="w-full h-8 text-[9px] font-mono uppercase tracking-widest border-black/5"
                                                    onClick={() => connectPlatform(platform.id)}
                                                    disabled={isConnecting === platform.id}
                                                >
                                                    {status === 'connected' ? 'Reconnect' : 'Connect'}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            {/* Recent Activity */}
                            <Card className="glass-premium border-black/5 shadow-sm overflow-hidden">
                                <CardHeader className="border-b border-black/5 bg-black/[0.02]">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xs font-mono uppercase tracking-[0.3em]">Pipeline Activity Monitor</CardTitle>
                                        <div className="flex items-center gap-2">
                                            {isLoading && <RefreshCw className="h-3 w-3 text-muted-foreground animate-spin" />}
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={fetchData} disabled={isLoading}>
                                                <RefreshCw className={`h-3 w-3 text-muted-foreground ${isLoading ? 'animate-spin' : ''}`} />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-black/5">
                                        {recentPosts.length > 0 ? recentPosts.map((post) => (
                                            <div key={post.id} className="p-4 flex items-center justify-between hover:bg-black/[0.01] transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2 rounded-lg ${
                                                        post.status === 'published' ? 'bg-success/10 text-success' : 
                                                        post.status === 'failed' ? 'bg-destructive/10 text-destructive' : 
                                                        'bg-primary/10 text-primary'
                                                    }`}>
                                                        {post.status === 'published' ? <CheckCircle2 className="h-4 w-4" /> : 
                                                         post.status === 'failed' ? <AlertCircle className="h-4 w-4" /> : 
                                                         <Clock className="h-4 w-4" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs font-bold font-mono uppercase tracking-tight">{post.content_items?.title || 'Unknown Post'}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-[9px] font-mono text-muted-foreground uppercase">{post.status}</span>
                                                            <span className="h-1 w-1 rounded-full bg-muted/40" />
                                                            <span className="text-[9px] font-mono text-muted-foreground uppercase">{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5">
                                                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                                                </Button>
                                            </div>
                                        )) : (
                                            <div className="p-8 text-center text-muted-foreground text-[10px] uppercase font-mono tracking-widest">
                                                No activity records found
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Config Sidebar */}
                        <div className="space-y-6">
                            <Card className="glass-premium border-black/5 shadow-sm">
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Settings className="h-4 w-4 text-primary" />
                                        <CardTitle className="text-xs font-mono uppercase tracking-widest">Global Automation Settings</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] border border-black/5">
                                        <span className="text-[10px] font-mono uppercase tracking-tight">Auto-Generation</span>
                                        <Badge className="bg-success text-white">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/[0.02] border border-black/5">
                                        <span className="text-[10px] font-mono uppercase tracking-tight">Auto-Publish</span>
                                        <Badge variant="outline" className="opacity-50">Manual</Badge>
                                    </div>
                                    <p className="text-[9px] font-mono text-muted-foreground uppercase leading-relaxed text-center px-2">
                                        *Auto-Publish requires verified OAuth tokens and approved Canva templates.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="glass-premium border-black/5 shadow-sm bg-primary/5">
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Database className="h-4 w-4 text-primary" />
                                        <CardTitle className="text-xs font-mono uppercase tracking-widest">System Health</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-muted-foreground uppercase">Groq 70B</span>
                                            <span className="text-success font-bold">ONLINE</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-muted-foreground uppercase">Supabase Edge</span>
                                            <span className="text-success font-bold">STABLE</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-mono">
                                            <span className="text-muted-foreground uppercase">Canva API</span>
                                            <span className="text-primary font-bold">IDLE</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SocialControlRoom;
