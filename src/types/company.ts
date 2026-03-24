export interface TrackedCompany {
    id: string;
    slug: string;
    name: string;
    type: 'unicorn' | 'startup' | 'public';
    valuation?: number;
    totalFunding: number;
    stage: string;
    sector: string;
    region: 'na' | 'eu' | 'asean' | 'pacific' | 'south-asia' | 'mena';
    headquarters: string;
    founded: number;
    employees: number;
    investors: string[];
    fundingRounds: Array<{
        round: string;
        date: Date;
        amount: number;
        valuation?: number;
    }>;
    products: string[];
    description: string;
    ceo?: string;
    keyMetrics?: Array<{ label: string; value: string }>;
    tags?: string[];
    traction?: Array<{ metric: string; value: string }>;
    ticker?: string;
    marketCap?: number;
    stockPrice?: number;
    priceChangePercent?: number;
    revenue?: number;
    metrics?: {
        peRatio?: number;
        revenueGrowth: number;
        grossMargin: number;
        rAndDSpend: number;
    };
    logoUrl?: string;
    tagline?: string;
    detailedProducts?: Array<{ name: string; description: string; impact: string }>;
    breakthroughs?: Array<{ year: number; title: string; description: string }>;
}

export type CompanyType = 'all' | 'unicorn' | 'startup' | 'public';
export type CompanyStage = string;
export type CompanyRegion = 'all' | 'na' | 'eu' | 'asean' | 'pacific' | 'south-asia' | 'mena';
