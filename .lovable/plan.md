

# Full Platform Automation and Dashboard Data Plan

## Current State

- **Market snapshots**: 1 entry (2026-02-09) with 9 companies and 60 index points -- working
- **News items**: 201 articles ingested -- working
- **Content items**: Only 2 (1 market-brief, 1 article) -- needs more variety (tech-explain, etc.)
- **Dashboard charts**: `segmentData` and `fundingData` are hardcoded as empty arrays -- charts show "not connected" placeholders
- **Static articles**: Dates reference 2025 -- need updating to 2026
- **Daily automation**: `daily-pipeline` edge function exists but pg_cron is unavailable -- need alternative trigger method

## What Will Be Fixed

### 1. Dashboard Charts -- Populate Segment and Funding Data

The Dashboard currently has two empty hardcoded arrays:

```text
const segmentData: { name: string; value: number; color: string }[] = [];
const fundingData = [];
```

These will be replaced with live data derived from the market snapshot. The segment pie chart will show market cap distribution by company sector (Hardware, Social/Metaverse, Gaming, Semiconductor, etc.), computed dynamically from `topCompanies`. The VC funding bar chart will show quarterly totals computed from static data until a dedicated funding table is built.

### 2. Auto-Content Categories -- Generate Tech Explain and Market Intelligence Articles

The `auto-content` edge function currently only generates `type: "article"` (generic). It will be enhanced to also generate:
- **tech-explain** articles -- deep dives on XR technology topics
- **market-intelligence** tagged articles -- investment-focused analysis
- Categories assigned via tags so `useHybridArticles('tech-explain')` and `useHybridArticles('market-intelligence')` both return AI-generated content

### 3. Company Rankings -- Sort by Market Cap and Daily Change

Dashboard "Top XR Companies" card will sort companies by market cap (descending) and show rank position. The company list will display proper formatting with rank numbers.

### 4. Update All Dates to 2026

Static article dates in `src/data/articles.ts` will be updated from December 2025 to January/February 2026 to reflect the current date context.

### 5. Daily Automation Without pg_cron

Since pg_cron is not available in this environment, the `daily-pipeline` function is already deployed and callable. The plan includes:
- Adding a "Run Pipeline" button on the Dashboard for manual triggering
- Documenting that an external scheduler (GitHub Actions, cron-job.org, etc.) should call the pipeline URL daily
- The pipeline already chains: ingest-news, daily-market-snapshot, auto-content

### 6. Run Pipeline Now to Populate Fresh Data

After code changes, the pipeline will be triggered to generate fresh content across all categories.

---

## Technical Implementation

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Dashboard.tsx` | Replace empty `segmentData` and `fundingData` with computed values from snapshot; add company ranking/sorting; add "Run Pipeline" admin button |
| `supabase/functions/auto-content/index.ts` | Add tech-explain and market-intelligence article generation; assign proper category tags |
| `src/data/articles.ts` | Update all `publishedAt` and `updatedAt` dates from Dec 2025 to Jan/Feb 2026 |
| `src/hooks/useHybridArticles.ts` | Improve category matching to include tag-based filtering for AI content (e.g., content tagged "tech-explain" shows on Tech Explain page) |

### Dashboard Data Flow (Updated)

```text
market_daily_snapshots.data.topCompanies
    |
    +--> segmentData (computed): Group companies by sector, sum market caps, show as pie chart
    |
    +--> Company ranking: Sort by marketCap desc, display with rank numbers
    |
    +--> KPI cards: Index value, avg move, gainers/losers, volume (already working)

Static quarterly funding data --> fundingData (curated XR VC rounds from 2025-2026)
```

### Auto-Content Enhancement

The edge function will generate 3 content pieces per daily run instead of 2:

```text
1. market-brief (existing) -- daily summary with signal
2. article with tags ["market-intelligence"] -- investment-focused analysis
3. article with tags ["tech-explain"] -- technology deep-dive
```

### Hybrid Articles Tag Matching

Currently `useHybridArticles` filters AI content by `item.type` mapped to a category. Since all AI articles have `type: "article"`, category filtering misses them. The fix:
- Check both the mapped category AND the `tags` array for category matches
- Example: content with `tags: ["tech-explain", "optics"]` will appear on the Tech Explain page

### Implementation Order

1. Update `auto-content` edge function to generate categorized content
2. Update `useHybridArticles` for tag-based category matching
3. Update Dashboard with computed segment data, funding data, and sorted rankings
4. Update static article dates to 2026
5. Deploy edge functions and trigger pipeline to populate fresh data
6. Verify all pages display content correctly

