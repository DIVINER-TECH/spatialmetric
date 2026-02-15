
# Comprehensive Platform Cleanup and Enhancement Plan

## Issues Identified

### Hardcoded / Mock Data to Remove
1. **`src/data/marketData.ts`** -- Contains entirely fake stock prices, fake market segments, fake VC funding data, and random number generators (`generatePriceFluctuation`, `generateVolumeFluctuation`). This is the primary source of mock data.
2. **`src/hooks/useLiveMarketData.ts`** -- Imports from `marketData.ts` and simulates "live" price updates using random fluctuations. Not used anywhere outside itself -- dead code.
3. **`src/pages/Dashboard.tsx`** -- Contains hardcoded arrays:
   - `fundingData` (lines 85-91) -- fake quarterly VC funding
   - `tamSamSomData` (lines 94-98) -- hardcoded TAM/SAM/SOM values
   - `growthProjections` (lines 101-107) -- fabricated growth numbers
   - `fundingFunnelData` (lines 110-117) -- made-up funnel numbers
   - `competitiveRadarData` (lines 120-127) -- fabricated competitive scores
4. **`src/components/home/MarketOverview.tsx`** -- Shows "Gainers / Losers" and "XR Market Index" as KPI stats (user dislikes these)
5. **`src/pages/Companies.tsx`** -- Standalone page duplicating Company Tracker functionality, using static `companies` data with hardcoded stock prices

### Missing Pages (Footer Links Leading to 404)
- `/api` -- API Access
- `/reports` -- Reports
- `/newsletter` -- Newsletter
- `/about` -- About Us
- `/careers` -- Careers
- `/contact` -- Contact
- `/press` -- Press
- `/privacy` -- Privacy Policy
- `/terms` -- Terms of Service

### Overlap: Companies vs Company Tracker
- `/companies` (Companies.tsx) shows static company cards with hardcoded prices
- `/company-tracker` (CompanyTracker.tsx) shows unified tracker with startups + unicorns
- These should be merged into one unified page at `/company-tracker`

---

## Implementation Plan

### Phase 1: Remove Mock Data and Dead Code

**Delete files:**
- `src/data/marketData.ts` -- all mock data and random generators
- `src/hooks/useLiveMarketData.ts` -- dead code, never imported

**Modify `src/pages/Dashboard.tsx`:**
- Remove hardcoded `fundingData`, replace with data computed from static `vcFundingData` in `src/data/investors.ts` or move curated research data to a proper constants file
- Keep `tamSamSomData` and `growthProjections` but label them clearly as "Industry Research Estimates" (these are market sizing projections, not fake -- they represent published analyst forecasts)
- Remove `competitiveRadarData` hardcoded values; compute radar scores from actual company metrics in `src/data/companies.ts` (market cap, R&D spend, revenue growth, etc.)
- Remove "XR Market Index" chart and "Gainers/Losers" KPI card per user preference
- Replace top KPIs with more meaningful metrics: Total Tracked Market Cap, Sector Count, Total XR Investment, YoY Growth Rate

**Modify `src/components/home/MarketOverview.tsx`:**
- Remove "Gainers / Losers" and "XR Market Index" stats
- Replace with: Total Tracked Market Cap, Companies Tracked, Sectors Covered, Total Daily Volume
- Keep the area chart but relabel as "Market Performance Trend" instead of "XR Public Market Index"

### Phase 2: Merge Companies into Company Tracker

**Delete:** `src/pages/Companies.tsx`

**Modify `src/pages/CompanyTracker.tsx`:**
- Add a new tab "Public Companies" alongside existing Unicorns/Emerging tabs
- In the Public Companies tab, show data from `src/data/companies.ts` with stock prices, market cap, revenue, and key metrics
- Add sector distribution pie chart and market cap breakdown within the page
- Add link from company cards to `/company/${slug}` profile pages

**Modify `src/App.tsx`:**
- Remove `/companies` route
- Redirect `/companies` to `/company-tracker`

**Modify `src/components/layout/Header.tsx`:**
- Remove "Companies" from nav items (already have "Company Tracker")

**Modify `src/components/layout/Footer.tsx`:**
- Update "Company Structure" link to point to `/company-tracker`

### Phase 3: Create Missing Footer Pages

Create simple, professional info pages:

| Route | File | Content |
|-------|------|---------|
| `/about` | `src/pages/About.tsx` | Platform mission, team description, methodology |
| `/contact` | `src/pages/Contact.tsx` | Contact form (name, email, message), office info |
| `/careers` | `src/pages/Careers.tsx` | Open positions placeholder, culture description |
| `/press` | `src/pages/Press.tsx` | Press releases, media kit info |
| `/reports` | `src/pages/Reports.tsx` | Auto-generated content from `content_items` filtered by "market-brief" type |
| `/newsletter` | `src/pages/Newsletter.tsx` | Email signup form with Supabase storage |
| `/api` | `src/pages/ApiAccess.tsx` | API documentation placeholder, usage examples |
| `/privacy` | `src/pages/Privacy.tsx` | Privacy policy content |
| `/terms` | `src/pages/Terms.tsx` | Terms of service content |

All pages will use Header + Footer layout consistently. The Reports page will pull live data from `content_items` (market briefs). Newsletter will store subscriptions in a new `newsletter_subscribers` table.

### Phase 4: Enhanced Dashboard Analytics

Replace removed charts with more valuable analytics:

**New KPI Cards (replacing Index/Gainers):**
- Total XR Market Cap (sum from snapshot companies)
- Total Investment Tracked (from VC + startup data)
- Active Sectors (count of unique sectors)
- Companies Tracked (total from all data sources)

**New/Improved Charts:**
- **Stock Performance Ranking Table**: Sortable table of all tracked tickers with price, change %, market cap, volume, sector -- replaces the simple company list
- **Sector Allocation Pie**: Already exists, keep it
- **Market Cap Treemap**: Visual treemap showing relative company sizes
- **Revenue vs R&D Scatter**: Using actual company data from `companies.ts` metrics
- **Funding Stage Distribution**: Computed from actual startups + unicorns data counts
- Keep TAM/SAM/SOM (labeled as industry estimates)

**Modify `src/pages/Dashboard.tsx`:**
- Compute `competitiveRadarData` from actual company metrics (normalize market cap, R&D, revenue growth, gross margin, employee count to 0-100 scale)
- Compute `fundingFunnelData` from actual startup/unicorn counts by stage
- Add stock performance ranking table with sortable columns
- Remove all "gainers/losers" language

### Phase 5: Company Tracker Enhancements

**Add to merged Company Tracker page:**
- Sector distribution pie chart (public companies by sector)
- Market cap vs revenue scatter chart
- Funding stage distribution bar chart (startups by stage)
- Region distribution donut chart
- Differentiate clearly between "Established Companies" (public, large) and "Emerging Startups" (pre-IPO, startup) with visual separation

### Phase 6: Database Table for Newsletter

**New migration:**
```text
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Public insert, no auth required
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Read own subscription" ON newsletter_subscribers FOR SELECT USING (true);
```

---

## Files Summary

### Files to Delete
| File | Reason |
|------|--------|
| `src/data/marketData.ts` | All mock/fake data |
| `src/hooks/useLiveMarketData.ts` | Dead code using mock data |
| `src/pages/Companies.tsx` | Merged into Company Tracker |

### Files to Create
| File | Purpose |
|------|---------|
| `src/pages/About.tsx` | About Us page |
| `src/pages/Contact.tsx` | Contact page |
| `src/pages/Careers.tsx` | Careers page |
| `src/pages/Press.tsx` | Press page |
| `src/pages/Reports.tsx` | Auto-reports from content_items |
| `src/pages/Newsletter.tsx` | Newsletter signup |
| `src/pages/ApiAccess.tsx` | API documentation |
| `src/pages/Privacy.tsx` | Privacy policy |
| `src/pages/Terms.tsx` | Terms of service |

### Files to Modify
| File | Changes |
|------|---------|
| `src/pages/Dashboard.tsx` | Remove mock data, compute from real sources, replace Index/Gainers with better metrics, add stock ranking table |
| `src/pages/CompanyTracker.tsx` | Add "Public Companies" tab with companies data, add charts (sector pie, stage distribution), differentiate established vs emerging |
| `src/components/home/MarketOverview.tsx` | Remove Index/Gainers stats, replace with Total Market Cap, Sectors, Volume |
| `src/components/layout/Header.tsx` | Remove "Companies" nav item |
| `src/components/layout/Footer.tsx` | Update Company Structure link to /company-tracker |
| `src/App.tsx` | Add new routes, redirect /companies to /company-tracker |

### Implementation Order
1. Delete mock data files and dead code
2. Merge Companies into Company Tracker (route changes, nav updates)
3. Create all missing footer pages (parallel)
4. Enhance Dashboard with real-data-only analytics
5. Add newsletter_subscribers table migration
6. Enhance Company Tracker with charts and public company tab
7. Update MarketOverview homepage section
