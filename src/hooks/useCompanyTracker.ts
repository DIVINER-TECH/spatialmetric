import { useMemo, useState } from 'react';
import { unicorns, type Unicorn } from '@/data/unicorns';
import { startups, type Startup } from '@/data/startups';
import { TrackedCompany, CompanyType, CompanyRegion } from '@/types/company';

// Transform unicorn to TrackedCompany
const transformUnicorn = (unicorn: Unicorn): TrackedCompany => ({
    id: unicorn.id,
    slug: unicorn.slug,
    name: unicorn.name,
    type: 'unicorn',
    valuation: unicorn.valuation * 1000, // Convert to millions for consistency
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

// Transform startup to TrackedCompany
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

export const useCompanyTracker = () => {
    const [companyType, setCompanyType] = useState<CompanyType>('all');
    const [selectedRegion, setSelectedRegion] = useState<CompanyRegion>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'valuation' | 'funding' | 'founded'>('valuation');

    const allCompanies = useMemo(() => {
        const unicornCompanies = unicorns.map(transformUnicorn);
        const startupCompanies = startups.map(transformStartup);
        return [...unicornCompanies, ...startupCompanies];
    }, []);

    const filteredCompanies = useMemo(() => {
        let filtered = allCompanies;

        // Filter by type
        if (companyType !== 'all') {
            filtered = filtered.filter(c => c.type === companyType);
        }

        // Filter by region
        if (selectedRegion !== 'all') {
            filtered = filtered.filter(c => c.region === selectedRegion);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.sector.toLowerCase().includes(query) ||
                c.tags?.some(t => t.toLowerCase().includes(query)) ||
                c.description.toLowerCase().includes(query)
            );
        }

        // Sort
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'valuation':
                    // Unicorns first, then by valuation/funding
                    if (a.type !== b.type) return a.type === 'unicorn' ? -1 : 1;
                    return (b.valuation || b.totalFunding) - (a.valuation || a.totalFunding);
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
        const unicornCount = filteredCompanies.filter(c => c.type === 'unicorn').length;
        const startupCount = filteredCompanies.filter(c => c.type === 'startup').length;
        const totalValuation = filteredCompanies
            .filter(c => c.valuation)
            .reduce((sum, c) => sum + (c.valuation || 0), 0);
        const totalFunding = filteredCompanies.reduce((sum, c) => sum + c.totalFunding, 0);

        return {
            total: filteredCompanies.length,
            unicornCount,
            startupCount,
            totalValuation,
            totalFunding,
        };
    }, [filteredCompanies]);

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
