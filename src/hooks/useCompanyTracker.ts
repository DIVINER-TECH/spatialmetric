import { useMemo, useState } from 'react';
import { unicorns, type Unicorn } from '@/data/unicorns';
import { startups, type Startup } from '@/data/startups';
import { companies as publicCompanies, type Company } from '@/data/companies';
import { TrackedCompany, CompanyType, CompanyRegion } from '@/types/company';

const transformUnicorn = (unicorn: Unicorn): TrackedCompany => ({
    id: unicorn.id,
    slug: unicorn.slug,
    name: unicorn.name,
    type: 'unicorn',
    valuation: unicorn.valuation * 1000,
    totalFunding: unicorn.totalRaised,
    stage: unicorn.status === 'public' ? 'Public' : 'Unicorn',
    sector: unicorn.sector,
    region: unicorn.region,
    headquarters: unicorn.headquarters,
    founded: unicorn.foundedYear,
    employees: unicorn.employees,
    investors: unicorn.investors,
    fundingRounds: unicorn.fundingRounds,
    products: unicorn.products,
    description: unicorn.description,
    ceo: unicorn.ceo,
    keyMetrics: unicorn.keyMetrics,
});

const transformStartup = (startup: Startup): TrackedCompany => ({
    id: startup.id,
    slug: startup.slug,
    name: startup.name,
    type: 'startup',
    valuation: undefined,
    totalFunding: startup.totalFunding,
    stage: startup.stage,
    sector: startup.sector,
    region: startup.region,
    headquarters: startup.headquarters,
    founded: startup.founded,
    employees: startup.employees,
    investors: startup.investors,
    fundingRounds: [{
        round: startup.stage,
        date: startup.lastRoundDate,
        amount: startup.lastRoundSize,
        valuation: undefined,
    }],
    products: startup.products,
    description: startup.description,
    ceo: startup.founders[0]?.name,
    tags: startup.tags,
    traction: startup.traction,
});

const transformPublicCompany = (company: Company): TrackedCompany => ({
    id: company.id,
    slug: company.slug,
    name: company.name,
    type: 'public',
    valuation: company.marketCap / 1e6, // to millions
    totalFunding: 0,
    stage: 'Public',
    sector: company.sector,
    region: company.region,
    headquarters: company.headquarters,
    founded: company.founded,
    employees: company.employees,
    investors: [],
    fundingRounds: [],
    products: company.xrProducts,
    description: company.description,
    ceo: company.ceo,
    ticker: company.ticker,
    marketCap: company.marketCap,
    stockPrice: company.stockPrice,
    priceChangePercent: company.priceChangePercent,
    revenue: company.revenue,
    metrics: company.metrics,
    tags: company.tags,
    keyMetrics: [
        { label: 'Revenue', value: company.revenue >= 1e9 ? `$${(company.revenue / 1e9).toFixed(1)}B` : `$${(company.revenue / 1e6).toFixed(0)}M` },
        { label: 'Gross Margin', value: `${company.metrics.grossMargin}%` },
        { label: 'Rev Growth', value: `${company.metrics.revenueGrowth > 0 ? '+' : ''}${company.metrics.revenueGrowth}%` },
    ],
});

export const useCompanyTracker = () => {
    const [companyType, setCompanyType] = useState<CompanyType>('all');
    const [selectedRegion, setSelectedRegion] = useState<CompanyRegion>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'valuation' | 'funding' | 'founded'>('valuation');

    const allCompanies = useMemo(() => {
        const unicornCompanies = unicorns.map(transformUnicorn);
        const startupCompanies = startups.map(transformStartup);
        const pubCompanies = publicCompanies.map(transformPublicCompany);
        return [...pubCompanies, ...unicornCompanies, ...startupCompanies];
    }, []);

    const filteredCompanies = useMemo(() => {
        let filtered = allCompanies;

        if (companyType !== 'all') {
            filtered = filtered.filter(c => c.type === companyType);
        }

        if (selectedRegion !== 'all') {
            filtered = filtered.filter(c => c.region === selectedRegion);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.sector.toLowerCase().includes(query) ||
                c.tags?.some(t => t.toLowerCase().includes(query)) ||
                c.description.toLowerCase().includes(query) ||
                c.ticker?.toLowerCase().includes(query)
            );
        }

        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'valuation': {
                    const typeOrder = { public: 0, unicorn: 1, startup: 2 };
                    if (a.type !== b.type) return typeOrder[a.type] - typeOrder[b.type];
                    return (b.valuation || b.totalFunding) - (a.valuation || a.totalFunding);
                }
                case 'funding':
                    return b.totalFunding - a.totalFunding;
                case 'founded':
                    return b.founded - a.founded;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [allCompanies, companyType, selectedRegion, searchQuery, sortBy]);

    const stats = useMemo(() => {
        const publicCount = allCompanies.filter(c => c.type === 'public').length;
        const unicornCount = allCompanies.filter(c => c.type === 'unicorn').length;
        const startupCount = allCompanies.filter(c => c.type === 'startup').length;
        const totalMarketCap = allCompanies
            .filter(c => c.marketCap)
            .reduce((sum, c) => sum + (c.marketCap || 0), 0);
        const totalFunding = allCompanies
            .filter(c => c.type !== 'public')
            .reduce((sum, c) => sum + c.totalFunding, 0);

        return {
            total: filteredCompanies.length,
            publicCount,
            unicornCount,
            startupCount,
            totalMarketCap,
            totalFunding,
        };
    }, [allCompanies, filteredCompanies]);

    return {
        companies: filteredCompanies,
        stats,
        filters: {
            companyType,
            setCompanyType,
            selectedRegion,
            setSelectedRegion,
            searchQuery,
            setSearchQuery,
            sortBy,
            setSortBy,
        },
    };
};
