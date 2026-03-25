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
# Set provider to Yahoo for best performance
supabase secrets set MARKET_DATA_PROVIDER=yahoo

# API Keys (Required for content and news)
supabase secrets set GROQ_API_KEY="your_groq_key"
supabase secrets set TAVILY_API_KEY="your_tavily_key"

# Built-in Supabase Secrets (Should be present, but verify)
# SUPABASE_URL
# SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY
```

## 3. Automation (Cron Job)

To run the pipeline every 24 hours, go to the **Supabase SQL Editor** and run:

```sql
-- Enable pg_cron if not enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the daily pipeline at 1 AM UTC
SELECT cron.schedule(
  'daily-market-sync',
  '0 1 * * *',
  $$ SELECT net.http_post(
       url:='https://your-project-id.supabase.co/functions/v1/daily-pipeline',
       headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'
     ) $$
);
```

## 4. Verification

- go to the **Function Runs** table in your Supabase database after a few hours.
- Or check the **Database -> Edge Functions** logs in the Supabase Dashboard.
