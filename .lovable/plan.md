
# Comprehensive Auto-Updating Platform Implementation Plan

## Current State Analysis

### What Exists Today
1. **Database Tables** (3 tables in Supabase):
   - `market_daily_snapshots` - Stores daily market data
   - `news_items` - Stores ingested news articles
   - `news_sources` - RSS feed sources for news ingestion

2. **Edge Functions** (4 functions):
   - `daily-market-snapshot` - Fetches stock prices from Stooq/Alpha Vantage (has TypeScript errors)
   - `ingest-news` - Fetches RSS feeds and stores news items
   - `auto-content` - Uses Groq API to generate market briefs and articles from news (requires GROQ_API_KEY)
   - `generate-content` - On-demand AI content generation using Lovable AI

3. **Static Data Files** (8 files in src/data/):
   - articles.ts, companies.ts, startups.ts, investors.ts, unicorns.ts, events.ts, marketData.ts, regions.ts
   - All currently hardcoded, dates still show 2024 in many places

4. **Known Issues**:
   - `content_items` table referenced in types.ts but doesn't exist in database
   - `function_runs` table referenced in edge functions but doesn't exist
   - TypeScript errors in daily-market-snapshot (line 102-104: type assertion)
   - Missing import in StartupTracker.tsx (TrendingUp)
   - useMarketSnapshot.ts type mismatch (missing id, sources fields)
   - Lovable AI credits exhausted (402 error)

---

## Phase 1: Fix Build Errors (Immediate)

### 1.1 Fix daily-market-snapshot TypeScript Error
```text
File: supabase/functions/daily-market-snapshot/index.ts
Lines 102-104 need type assertion for Alpha Vantage response
```

### 1.2 Fix useMarketSnapshot Type Mismatch
```text
File: src/hooks/useMarketSnapshot.ts
Line 52: Select query returns partial fields, update return type or select all fields
```

### 1.3 Fix StartupTracker Missing Import
```text
File: src/pages/StartupTracker.tsx
Line 164: Add TrendingUp to lucide-react imports
```

---

## Phase 2: Database Schema Setup

### 2.1 Create Missing Tables

```text
+---------------------------+
| content_items             |  <-- For AI-generated articles, market briefs
+---------------------------+
| id (uuid, PK)             |
| type (text)               |  'article', 'market-brief', 'startup-profile'
| title (text)              |
| excerpt (text)            |
| content (text)            |
| tags (text[])             |
| sources (jsonb)           |
| metadata (jsonb)          |
| published_at (timestamptz)|
| created_at (timestamptz)  |
+---------------------------+

+---------------------------+
| function_runs             |  <-- For monitoring scheduled functions
+---------------------------+
| id (uuid, PK)             |
| function_name (text)      |
| status (text)             |
| duration_ms (int)         |
| details (jsonb)           |
| created_at (timestamptz)  |
+---------------------------+

+---------------------------+
| articles                  |  <-- For admin-managed articles
+---------------------------+
| id (uuid, PK)             |
| slug (text, unique)       |
| title (text)              |
| excerpt (text)            |
| content (text)            |
| category (text)           |
| subcategory (text)        |
| region (text)             |
| author_type (text)        |  'ai' or 'human'
| author_name (text)        |
| author_title (text)       |
| read_time (int)           |
| is_featured (bool)        |
| is_trending (bool)        |
| is_published (bool)       |
| tags (text[])             |
| key_takeaways (text[])    |
| metrics (jsonb)           |
| image_url (text)          |
| created_at (timestamptz)  |
| updated_at (timestamptz)  |
+---------------------------+
```

### 2.2 Add RLS Policies
- Public read for published articles
- Service role write for edge functions
- Admin write for authenticated admin users

---

## Phase 3: Automated Content Pipeline

### 3.1 Data Flow Architecture

```text
+-------------------+     +------------------+     +-------------------+
|   News Sources    | --> | ingest-news      | --> | news_items        |
|   (RSS Feeds)     |     | (Edge Function)  |     | (Database)        |
+-------------------+     +------------------+     +-------------------+
                                                           |
                                                           v
+-------------------+     +------------------+     +-------------------+
| Scheduled Cron    | --> | auto-content     | --> | content_items     |
| (pg_cron)         |     | (Edge Function)  |     | (Database)        |
+-------------------+     +------------------+     +-------------------+
                                                           |
                                                           v
+-------------------+     +------------------+     +-------------------+
| Market Data APIs  | --> | daily-market-    | --> | market_daily_     |
| (Stooq)           |     | snapshot         |     | snapshots         |
+-------------------+     +------------------+     +-------------------+
```

### 3.2 Update Edge Functions for Lovable AI
Since `auto-content` currently uses Groq API (requires GROQ_API_KEY which isn't configured), migrate to use Lovable AI gateway instead:

```text
File: supabase/functions/auto-content/index.ts
Changes:
- Replace Groq API calls with Lovable AI gateway
- Use LOVABLE_API_KEY (already configured)
- Update prompts for structured output
- Handle 402/429 rate limit errors gracefully
```

### 3.3 Set Up Scheduled Jobs (pg_cron)

```text
Schedule                 | Function              | Purpose
-------------------------|----------------------|------------------------
Every 6 hours            | ingest-news          | Fetch latest RSS feeds
Once daily (6 AM UTC)    | daily-market-snapshot| Fetch stock prices
Once daily (7 AM UTC)    | auto-content (daily) | Generate market brief + article
Once weekly (Monday 8 AM)| auto-content (weekly)| Generate startup profile
```

---

## Phase 4: Seed Default News Sources

Add active RSS feeds for XR/spatial computing news:

```text
Source Name              | Feed URL
-------------------------|------------------------------------------
Road to VR               | https://www.roadtovr.com/feed/
UploadVR                 | https://www.uploadvr.com/feed/
The Verge (VR tag)       | https://www.theverge.com/rss/vr/index.xml
TechCrunch (AR/VR)       | https://techcrunch.com/tag/ar-vr/feed/
VentureBeat (XR)         | https://venturebeat.com/tag/xr/feed/
Next Reality News        | https://next.reality.news/rss/
```

---

## Phase 5: Update All Static Data to 2025

### 5.1 Files to Update

| File | Updates Required |
|------|------------------|
| `src/data/articles.ts` | All dates to Dec 2025, AI author |
| `src/data/companies.ts` | News dates to 2025, stock prices |
| `src/data/startups.ts` | Funding dates to 2025 |
| `src/data/investors.ts` | Deal dates to 2025 |
| `src/data/unicorns.ts` | Valuation dates to 2025 |
| `src/data/events.ts` | Event dates to 2025-2026 |

### 5.2 Add More Content

| Category | Current | Target |
|----------|---------|--------|
| Tech Explain articles | 2 | 12+ |
| Market Intelligence | 6 | 15+ |
| Events/Ecosystem | 0 | 6+ |
| Spatial Updates | 0 | 5+ |
| VC Directory | 25 | 50+ |
| Companies | 20 | 30+ |

---

## Phase 6: Admin CMS System

### 6.1 Admin Authentication
- Use Supabase Auth with email/password
- Create admin role check (store admin flag in user metadata or separate admins table)
- Protected routes: /admin/*

### 6.2 Admin Pages

```text
/admin/login       - Admin login page
/admin/dashboard   - Overview with stats, recent content
/admin/articles    - Article list with CRUD
/admin/articles/new     - Create new article
/admin/articles/:id     - Edit existing article
/admin/sources    - Manage news RSS sources
/admin/functions  - View function run logs
```

### 6.3 Article Editor Features
- Rich text or markdown editor
- Category/region selection
- Tag management
- Preview mode
- Save draft / Publish toggle
- Auto-calculate reading time
- Image upload (Supabase Storage)

---

## Phase 7: Hybrid Content System

### 7.1 Content Priority Order
1. Database articles (admin uploaded) - highest priority
2. AI-generated content_items - daily auto-generated
3. Static data fallback - seed data when database is empty

### 7.2 Update useArticles Hook
```text
File: src/hooks/useArticles.ts
Logic:
1. Query 'articles' table for admin articles
2. Query 'content_items' for AI articles where type='article'
3. Merge with static articles as fallback
4. Sort by published_at descending
5. Apply category/region filters
```

---

## Implementation Order

### Week 1: Foundation
1. Fix all build errors (Phase 1)
2. Create missing database tables (Phase 2)
3. Seed news sources (Phase 4)
4. Update edge functions for Lovable AI (Phase 3.2)

### Week 2: Automation
5. Set up pg_cron scheduled jobs (Phase 3.3)
6. Test automated content pipeline
7. Update all static data to 2025 (Phase 5.1)

### Week 3: Content Expansion
8. Add 10+ Tech Explain articles (Phase 5.2)
9. Add Events/Spatial Updates articles
10. Expand VC Directory to 50+ firms

### Week 4: Admin System
11. Create admin authentication (Phase 6.1)
12. Build admin dashboard and article editor (Phase 6.2-6.3)
13. Implement hybrid content system (Phase 7)

---

## Files to Create

| File Path | Purpose |
|-----------|---------|
| `src/pages/admin/Login.tsx` | Admin login page |
| `src/pages/admin/Dashboard.tsx` | Admin dashboard |
| `src/pages/admin/ArticleEditor.tsx` | Create/edit articles |
| `src/pages/admin/SourceManager.tsx` | Manage RSS feeds |
| `src/components/admin/AdminLayout.tsx` | Admin layout wrapper |
| `src/components/admin/RichTextEditor.tsx` | Article content editor |
| `src/hooks/useAdmin.ts` | Admin auth hook |

## Files to Modify

| File Path | Changes |
|-----------|---------|
| `supabase/functions/daily-market-snapshot/index.ts` | Fix TypeScript errors |
| `supabase/functions/auto-content/index.ts` | Migrate to Lovable AI |
| `src/hooks/useMarketSnapshot.ts` | Fix type mismatch |
| `src/pages/StartupTracker.tsx` | Add missing import |
| `src/data/articles.ts` | Add 30+ articles, fix dates |
| `src/data/companies.ts` | Update to 2025 dates |
| `src/data/startups.ts` | Update to 2025 dates |
| `src/data/investors.ts` | Add 25+ VCs, fix dates |
| `src/App.tsx` | Add admin routes |

---

## Secrets Required

| Secret | Status | Purpose |
|--------|--------|---------|
| `LOVABLE_API_KEY` | Configured | AI content generation |
| `SUPABASE_SERVICE_ROLE_KEY` | Auto-provided | Edge function DB access |
| `SUPABASE_URL` | Auto-provided | Edge function DB access |

Note: GROQ_API_KEY is NOT configured - auto-content function will be migrated to use Lovable AI instead.

---

## Expected Outcome

After implementation:
- Platform auto-updates daily with fresh market data
- AI generates market briefs and articles automatically
- News is ingested from 6+ XR industry RSS feeds
- Admin can login and upload/edit articles directly
- All dates reflect December 2025
- 50+ articles across all categories
- 50+ VC firms in directory
- Zero build errors
- Graceful fallback when AI credits exhausted
