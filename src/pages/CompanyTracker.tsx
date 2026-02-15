import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
    Rocket, MapPin, DollarSign, Users, Calendar, Search, Building2,
    TrendingUp, TrendingDown, ChevronDown, ChevronUp, BarChart3,
} from 'lucide-react';
import { useCompanyTracker } from '@/hooks/useCompanyTracker';
import { TrackedCompany } from '@/types/company';
import { format } from 'date-fns';
import {
    PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, Legend,
} from 'recharts';

const regionLabels: Record<string, string> = {
    all: 'All Regions', na: 'North America', eu: 'Europe',
    asean: 'ASEAN', pacific: 'Pacific', 'south-asia': 'South Asia', mena: 'MENA',
};

const SECTOR_COLORS: Record<string, string> = {
    'Defense': 'bg-red-900/30 text-red-400',
    'Healthcare': 'bg-emerald-900/30 text-emerald-400',
    'Hardware': 'bg-blue-900/30 text-blue-400',
    'Enterprise': 'bg-violet-900/30 text-violet-400',
    'Gaming': 'bg-orange-900/30 text-orange-400',
    'Consumer': 'bg-cyan-900/30 text-cyan-400',
    'Software': 'bg-indigo-900/30 text-indigo-400',
    'AI': 'bg-pink-900/30 text-pink-400',
    'Infrastructure': 'bg-amber-900/30 text-amber-400',
};

const CHART_COLORS = [
    'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))',
    'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(210, 70%, 50%)',
    'hsl(280, 60%, 55%)', 'hsl(340, 60%, 50%)',
];

const getSectorColor = (sector: string) => {
    const key = Object.keys(SECTOR_COLORS).find(k => sector.toLowerCase().includes(k.toLowerCase()));
    return SECTOR_COLORS[key || ''] || 'bg-primary/10 text-primary';
};

const formatMarketCap = (cap: number) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
    return `$${(cap / 1e6).toFixed(0)}M`;
};

const PublicCompanyCard = ({ company }: { company: TrackedCompany }) => {
    const sectorColor = getSectorColor(company.sector);
    const positive = (company.priceChangePercent ?? 0) >= 0;

    return (
        <Link to={`/company/${company.slug}`}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold shrink-0 ${sectorColor}`}>
                                {company.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
                            </div>
                            <div>
                                <CardTitle className="text-base">{company.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{company.sector}</p>
                            </div>
                        </div>
                        {company.ticker && <Badge variant="outline" className="font-mono">{company.ticker}</Badge>}
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>
                    {company.ticker && (
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-xs text-muted-foreground">Stock Price</p>
                                <p className="font-mono font-semibold">${company.stockPrice?.toFixed(2)}</p>
                                <div className={`flex items-center gap-1 text-xs ${positive ? 'text-success' : 'text-destructive'}`}>
                                    {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                    {positive ? '+' : ''}{company.priceChangePercent?.toFixed(2)}%
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Market Cap</p>
                                <p className="font-mono font-semibold">{formatMarketCap(company.marketCap!)}</p>
                            </div>
                        </div>
                    )}
                    {company.tags && (
                        <div className="flex flex-wrap gap-1">
                            {company.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
};

const CompanyCard = ({ company }: { company: TrackedCompany }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const formatFunding = (amount: number) => amount >= 1000 ? `$${(amount / 1000).toFixed(1)}B` : `$${amount}M`;
    const sectorColor = getSectorColor(company.sector);
    const initials = company.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

    return (
        <Card className="hover:border-primary/50 transition-colors h-full">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold shrink-0 ${sectorColor}`}>
                            {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <CardTitle className="text-base font-medium truncate">{company.name}</CardTitle>
                                {company.type === 'unicorn' && (
                                    <Badge variant="default" className="text-xs bg-primary/20 text-primary shrink-0">🦄</Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" /><span className="truncate">{company.headquarters}</span>
                            </div>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">{company.stage}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{company.description}</p>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">{company.valuation ? 'Valuation' : 'Total Raised'}</p>
                            <p className="text-sm font-medium">{formatFunding(company.valuation || company.totalFunding)}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Employees</p>
                            <p className="text-sm font-medium">{company.employees.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                {company.fundingRounds.length > 0 && (
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            Last round: {formatFunding(company.fundingRounds[company.fundingRounds.length - 1].amount)} ({format(company.fundingRounds[company.fundingRounds.length - 1].date, 'MMM yyyy')})
                        </span>
                    </div>
                )}
                {company.tags && company.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {company.tags.slice(0, 4).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                    </div>
                )}
                <div className="pt-2 border-t border-border/50">
                    <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2 text-sm text-primary hover:underline w-full">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        {isExpanded ? 'Show less' : 'Show more details'}
                    </button>
                    {isExpanded && (
                        <div className="mt-4 space-y-4">
                            {company.fundingRounds.length > 0 && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2 font-medium">Funding History</p>
                                    <div className="space-y-2">
                                        {company.fundingRounds.slice(-4).reverse().map((round, i) => (
                                            <div key={i} className="flex justify-between text-xs bg-muted/30 rounded px-3 py-2">
                                                <div>
                                                    <span className="font-medium">{round.round}</span>
                                                    <span className="text-muted-foreground ml-2">{format(round.date, 'MMM yyyy')}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-semibold">{formatFunding(round.amount)}</span>
                                                    {round.valuation && <span className="text-muted-foreground ml-2">@ {formatFunding(round.valuation)}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {company.investors.length > 0 && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2 font-medium">Investors</p>
                                    <div className="flex flex-wrap gap-1">
                                        {company.investors.slice(0, 8).map(investor => (
                                            <Badge key={investor} variant="outline" className="text-xs">{investor}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {company.products.length > 0 && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2 font-medium">Products</p>
                                    <div className="flex flex-wrap gap-1">
                                        {company.products.map(product => (
                                            <Badge key={product} variant="secondary" className="text-xs">{product}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {company.keyMetrics && company.keyMetrics.length > 0 && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2 font-medium">Key Metrics</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {company.keyMetrics.map((metric, i) => (
                                            <div key={i} className="bg-muted/50 rounded p-2 text-center">
                                                <p className="text-sm font-bold text-primary">{metric.value}</p>
                                                <p className="text-xs text-muted-foreground">{metric.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {company.traction && company.traction.length > 0 && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2 font-medium">Traction</p>
                                    <div className="space-y-1">
                                        {company.traction.map((t, i) => (
                                            <div key={i} className="flex justify-between text-xs">
                                                <span className="text-muted-foreground">{t.metric}</span>
                                                <span className="font-medium">{t.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const CompanyTracker = () => {
    const { companies, stats, filters } = useCompanyTracker();
    const { companyType, setCompanyType, selectedRegion, setSelectedRegion, searchQuery, setSearchQuery } = filters;

    // Compute sector distribution for charts
    const sectorDistribution = (() => {
        const sectorMap: Record<string, number> = {};
        companies.forEach(c => {
            const sector = c.sector.split('/')[0].trim();
            sectorMap[sector] = (sectorMap[sector] || 0) + 1;
        });
        return Object.entries(sectorMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([name, value], idx) => ({ name, value, color: CHART_COLORS[idx % CHART_COLORS.length] }));
    })();

    // Stage distribution
    const stageDistribution = (() => {
        const stageMap: Record<string, number> = {};
        companies.forEach(c => {
            stageMap[c.stage] = (stageMap[c.stage] || 0) + 1;
        });
        return Object.entries(stageMap)
            .sort((a, b) => b[1] - a[1])
            .map(([name, value]) => ({ name, value }));
    })();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <section className="py-10 border-b border-border/50">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Rocket className="h-8 w-8 text-primary" />
                            <h1 className="text-3xl md:text-4xl font-semibold">Company Tracker</h1>
                        </div>
                        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
                            Track XR companies across all stages — from public market leaders to billion-dollar unicorns and emerging startups.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-6 border-b border-border/50 bg-muted/20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { icon: Building2, label: 'Total Companies', value: stats.total },
                                { icon: BarChart3, label: 'Public Companies', value: stats.publicCount },
                                { icon: TrendingUp, label: 'Unicorns', value: stats.unicornCount },
                                { icon: Rocket, label: 'Startups', value: stats.startupCount },
                                { icon: DollarSign, label: 'Total Market Cap', value: stats.totalMarketCap > 0 ? formatMarketCap(stats.totalMarketCap) : `$${(stats.totalFunding / 1000).toFixed(1)}B raised` },
                            ].map(s => (
                                <Card key={s.label} className="bg-card/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2 mb-1">
                                            <s.icon className="h-4 w-4 text-primary" />
                                            <p className="text-xs text-muted-foreground">{s.label}</p>
                                        </div>
                                        <p className="text-2xl font-semibold">{s.value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Search */}
                <section className="py-6 border-b border-border/50">
                    <div className="container mx-auto px-4">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search companies, sectors, tickers..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 text-sm" />
                        </div>
                    </div>
                </section>

                {/* Charts */}
                <section className="py-8 border-b border-border/50">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card className="bg-card/50">
                                <CardHeader><CardTitle className="text-base">Sector Distribution</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="h-[250px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={sectorDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} dataKey="value">
                                                    {sectorDistribution.map((entry, idx) => (
                                                        <Cell key={idx} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 mt-2">
                                        {sectorDistribution.map(s => (
                                            <div key={s.name} className="flex items-center gap-2 text-xs">
                                                <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                                                <span className="text-muted-foreground truncate">{s.name}</span>
                                                <span className="font-medium ml-auto">{s.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50">
                                <CardHeader><CardTitle className="text-base">Stage Distribution</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="h-[280px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={stageDistribution} layout="vertical" margin={{ left: 70 }}>
                                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                                                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} width={65} />
                                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Company Grid with Tabs */}
                <section className="py-10">
                    <div className="container mx-auto px-4">
                        <Tabs value={companyType} onValueChange={(v) => setCompanyType(v as any)}>
                            <TabsList className="mb-6">
                                <TabsTrigger value="all">All Companies</TabsTrigger>
                                <TabsTrigger value="public">Public Companies</TabsTrigger>
                                <TabsTrigger value="unicorn">Unicorns</TabsTrigger>
                                <TabsTrigger value="startup">Emerging Startups</TabsTrigger>
                            </TabsList>

                            <div className="mb-6">
                                <p className="text-sm text-muted-foreground mb-3">Filter by Region:</p>
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(regionLabels).map(([code, label]) => (
                                        <Badge
                                            key={code}
                                            variant={selectedRegion === code ? 'default' : 'outline'}
                                            className="cursor-pointer text-xs"
                                            onClick={() => setSelectedRegion(code as any)}
                                        >
                                            {label}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <TabsContent value={companyType} className="mt-0">
                                {companies.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {companies.map(company => (
                                            company.type === 'public'
                                                ? <PublicCompanyCard key={company.id} company={company} />
                                                : <CompanyCard key={company.id} company={company} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-muted-foreground">No companies found matching your criteria</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CompanyTracker;
