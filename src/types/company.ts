export interface TrackedCompany {
    id: string;
    slug: string;
    name: string;
    type: 'unicorn' | 'startup';
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
}

export type CompanyType = 'all' | 'unicorn' | 'startup';
export type CompanyStage = string;
export type CompanyRegion = 'all' | 'na' | 'eu' | 'asean' | 'pacific' | 'south-asia' | 'mena';
