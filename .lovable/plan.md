

# Bringing SpatialMetrics to Life: Automation and Freshness Plan

## The Core Problem

The platform currently feels static because:

1. **No automated scheduling exists.** The pipeline functions (news ingestion, market snapshots, AI content) have only been run manually -- last on Feb 15 and Feb 10. There is no cron job or scheduled trigger to run them daily.
2. **The UI does not communicate freshness.** There are no "last updated" timestamps, no live news ticker, no "just now" relative times, and no visual pulse showing the platform is alive.
3. **The homepage lacks dynamic content.** It shows a chart and static category cards, but no live news feed, no AI brief widget, and no sense of recency.
4. **Data queries use long stale times** (10 minutes), and there is no background refetching to keep the UI current during a session.

## What Will Be Done

### 1. Set Up Automated Daily Scheduling via pg_cron

Install a database cron job that triggers the daily-pipeline function automatically every day at 06:00 UTC. This ensures:
- News is ingested from all 8 RSS feeds
- Market snapshots are fetched from Stooq
- 6 AI-generated content items are created

This requires enabling the `pg_cron` and `pg_net` extensions, then scheduling a `net.http_post` call to the `daily-pipeline` edge function.

A second cron job will run `ingest-news` every 6 hours to keep news fresh throughout the day.

### 2. Add a Live News Feed to the Homepage

Create a new `LatestNewsFeed` component on the homepage (between MarketOverview and FeaturedInsights) that:
- Pulls the 5 most recent news items from `news_items`
- Shows relative timestamps ("2 hours ago", "yesterday")
- Includes the source name and a link to the original article
- Has a pulsing "Live" indicator using the existing `LiveIndicator` component
- Uses a shorter `staleTime` (2 minutes) and `refetchInterval` (60 seconds) to feel alive

### 3. Add the AI Market Brief to the Homepage

Place the existing `AIInsightsFeed` component on the homepage (after the news feed), so visitors immediately see the latest AI-generated market signal with its bullish/bearish badge and key metrics.

### 4. Add "Last Updated" Timestamps Everywhere

- **MarketOverview**: Already shows "Last updated" but with a fallback message about deploying. Replace the fallback with a more graceful "Loading..." state.
- **FeaturedInsights**: Add a subtitle showing the most recent article's publish date.
- **Hero**: Add a small "Data as of [date]" line below the stats grid.
- **Market Ticker**: Show a subtle "as of [date]" next to the ticker.

### 5. Reduce Stale Times and Add Background Refetching

Update React Query hooks to feel more alive:
- `useMarketSnapshot`: Reduce `staleTime` to 5 minutes, add `refetchInterval: 5 * 60 * 1000`
- `useNewsItems`: Reduce `staleTime` to 2 minutes, add `refetchInterval: 60 * 1000`
- `useContentItems`: Reduce `staleTime` to 5 minutes, add `refetchInterval: 5 * 60 * 1000`
- `useHybridArticles`: Add `refetchInterval: 5 * 60 * 1000`

### 6. Fix CategoryCards Link

The "Company Structure" category card still links to `/companies` (deleted page). Update it to link to `/company-tracker`.

### 7. Add a Pipeline Status Widget to the Dashboard

Create a small `PipelineStatus` component on the Dashboard that queries `function_runs` and shows:
- Last successful run of each function (ingest-news, daily-market-snapshot, auto-content)
- Time since last run with color coding (green if under 24h, yellow if 24-48h, red if over 48h)
- A "Run Pipeline Now" button (calls the daily-pipeline edge function)

This gives visibility into whether automation is working.

---

## Technical Details

### Files to Create
| File | Purpose |
|------|---------|
| `src/components/home/LatestNewsFeed.tsx` | Live news feed component with relative timestamps and LiveIndicator |
| `src/components/dashboard/PipelineStatus.tsx` | Pipeline health monitor with last-run times and manual trigger button |

### Files to Modify
| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Add LatestNewsFeed and AIInsightsFeed components between existing sections |
| `src/hooks/useMarketSnapshot.ts` | Reduce staleTime, add refetchInterval |
| `src/hooks/useNewsItems.ts` | Reduce staleTime, add refetchInterval |
| `src/hooks/useContentItems.ts` | Reduce staleTime, add refetchInterval |
| `src/components/home/Hero.tsx` | Add "Data as of [date]" subtitle from snapshot |
| `src/components/home/MarketTicker.tsx` | Add "as of" date indicator |
| `src/components/home/CategoryCards.tsx` | Fix /companies link to /company-tracker |
| `src/pages/Dashboard.tsx` | Add PipelineStatus component |

### Database Changes (SQL to run directly, not migration)
Enable `pg_cron` and `pg_net` extensions and schedule two cron jobs:
1. `daily-pipeline` at 06:00 UTC daily
2. `ingest-news` every 6 hours

### Implementation Order
1. Set up pg_cron scheduling (database SQL)
2. Create LatestNewsFeed component
3. Create PipelineStatus component
4. Update Index.tsx with new homepage sections
5. Update all React Query hooks with shorter stale times
6. Add timestamps and freshness indicators to Hero, Ticker, CategoryCards
7. Add PipelineStatus to Dashboard
8. Trigger the pipeline manually to populate fresh data immediately

