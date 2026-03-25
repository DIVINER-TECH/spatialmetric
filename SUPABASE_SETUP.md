# Supabase Setup Guide for SpatialMetric

To fully enable the automated data pipeline, you need to deploy the Edge Functions and configure the necessary secrets in your Supabase project.

## 1. Deploy Edge Functions

If you don't have the Supabase CLI installed, you can follow these steps:

### Option A: Install CLI (Recommended)
1. Install via npm: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link --project-ref your-project-id` (Get this from your Supabase URL `https://your-project-id.supabase.co`)
4. Deploy: `supabase functions deploy daily-market-snapshot ingest-news auto-content daily-pipeline`

### Option B: GitHub Actions
If you have GitHub Actions set up with the `SUPABASE_ACCESS_TOKEN`, pushing to the `main` branch might already trigger deployment if configured in your workflow.

## 2. Configure Secrets

The following secrets **MUST** be set in your Supabase project for the functions to work:

```bash
# AI Engine (Used for article generation and intelligence)
supabase secrets set GROQ_API_KEY="your_groq_key"

# Market Data Provider (Set to 'yahoo' for reliability)
supabase secrets set MARKET_DATA_PROVIDER=yahoo

# Optional: Live Search Integration
supabase secrets set TAVILY_API_KEY="your_tavily_key"
```

## 3. Database Schema & RLS

You must initialize the database tables and Row Level Security (RLS) policies. Run the following migration files in the **Supabase SQL Editor**:

1.  [`20260206_market_and_news.sql`](file:///c:/diviner%20code/spatialmetric/supabase/migrations/20260206_market_and_news.sql) — Creates market snapshots, news sources, and news items tables.
2.  [`20260206_content_items.sql`](file:///c:/diviner%20code/spatialmetric/supabase/migrations/20260206_content_items.sql) — Creates the AI-generated content table.
3.  [`20260206_function_runs.sql`](file:///c:/diviner%20code/spatialmetric/supabase/migrations/20260206_function_runs.sql) — Creates the audit log for functions.

## 4. Seeding News Sources

The `ingest-news` function requires active sources. The migrations above should seed three default sources (Road to VR, UploadVR, TechCrunch). Verify them in the `news_sources` table.

## 5. Automation (Cron Job)

To run the pipeline every 24 hours, run this in the **Supabase SQL Editor**:

```sql
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
  'daily-pipeline-sync',
  '0 1 * * *',
  $$ SELECT net.http_post(
       url:='https://your-project-id.supabase.co/functions/v1/daily-pipeline',
       headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'
     ) $$
);
```

## 6. Verification

- Check **Edge Function Logs** in the Supabase Dashboard.
- Check the `function_runs` table for execution history.
- Ensure `market_daily_snapshots` and `content_items` have rows with today's date.
