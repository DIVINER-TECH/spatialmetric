
# Comprehensive Platform Enhancement Plan

## Problems Identified

### 1. Articles Not Clickable (Critical Bug)
The Article detail page (`Article.tsx`) uses `useArticle(slug)` from `useArticles.ts`, which only searches **static** articles in `src/data/articles.ts`. AI-generated articles from the database use dynamically generated slugs that don't exist in the static data, so clicking any AI article card leads to "Article Not Found."

### 2. Too Few Companies Tracked
- Market snapshot only tracks 9 publicly traded tickers (AAPL, META, MSFT, etc.)
- Static companies data has only ~15 entries
- Static unicorns has only ~15 entries
- Static startups has only ~15 entries
- No images/logos for any company profiles

### 3. Too Few VC Firms
- Static investors data has ~50 firms, which is decent but could be expanded
- No profile images or firm logos

### 4. Insufficient Daily Content Output
- Auto-content generates only 3 items per run (1 brief + 2 articles)
- Only 5 total content items in the database after multiple runs
- Should produce more articles across more categories

### 5. No Article Images
- `ArticleCard` component has no image display at all
- Article type has an `imageUrl` field but it defaults to `/placeholder.svg`
- No image generation is implemented

### 6. FeaturedInsights Component Uses Hardcoded 2024 Data
- `FeaturedInsights.tsx` has hardcoded insights array with Dec 2024 dates
- Not connected to live articles or database content

### 7. Dashboard Lacks Advanced Market Analytics
- No TAM/SAM/SOM visualization
- No market share breakdown beyond basic segment pie
- Only basic VC funding bar chart with hardcoded data
- No sector comparison, growth trends, or competitive landscape charts

### 8. Redundant/Missing Navigation
- "Spatial Updates" and "Events" pages exist in routes but are not in the navbar
- Navigation could be better organized

---

## Implementation Plan

### Phase 1: Fix Article Navigation (Critical)

**File: `src/hooks/useArticles.ts`**
- Update `useArticle(slug)` to also search database content items (via `useContentItems`)
- If slug is not found in static articles, search `content_items` table by matching the generated slug pattern
- Return a properly transformed Article object from either source

**File: `src/pages/Article.tsx`**
- Update to use a new hybrid `useArticle` that checks both static and database sources

### Phase 2: Add Article Images

**File: `src/components/articles/ArticleCard.tsx`**
- Add a featured image area at the top of each card
- Display `article.imageUrl` when available (not placeholder)
- Use a gradient overlay with category-specific colors as fallback when no image exists
- Add category icon overlay for visual differentiation

**File: `supabase/functions/auto-content/index.ts`**
- After generating each article, call the Lovable AI image generation endpoint to create a featured image
- Upload the generated image to a Supabase storage bucket
- Store the public URL in the article's metadata as `imageUrl`

**Database: Create storage bucket**
- Create a `content-images` public storage bucket for article and profile images

### Phase 3: Enhance Auto-Content Output

**File: `supabase/functions/auto-content/index.ts`**
- Increase daily output from 3 to 5-6 items per run:
  - 1 market brief
  - 2 market-intelligence articles (different angles)
  - 2 tech-explain articles
  - 1 spatial-updates / events article
- Add more varied prompts to ensure diverse topic coverage
- Include subcategory assignment (e.g., "Hardware Analysis", "Investment Thesis", "SDK Deep Dive")

### Phase 4: Expand Company and Ticker Coverage

**File: `supabase/functions/daily-market-snapshot/index.ts`**
- Expand TICKERS array from 9 to 20+ companies covering:
  - Current 9 (AAPL, META, MSFT, NVDA, QCOM, U, SONY, SNAP, GOOGL)
  - Add: RBLX (Roblox), MTTR (Matterport), VUZI (Vuzix), IMMR (Immersion), HEAR (Turtle Beach), MVIS (MicroVision), KOPN (Kopin), LIDR (AEye), LAZR (Luminar), AEVA (Aeva Technologies), IRDM (Iridium)
  - Samsung already included

**File: `src/data/companies.ts`**
- Add 10-15 more companies to bring total to ~30
- Include emerging XR pure-plays and component suppliers

**File: `src/data/startups.ts`**
- Add 10-15 more startups across all regions to bring total to ~30

**File: `src/data/unicorns.ts`**
- Add 5-10 more unicorns to bring total to ~25

### Phase 5: Enhanced Dashboard with Professional Analytics

**File: `src/pages/Dashboard.tsx`**
Major additions:
- **TAM/SAM/SOM Chart**: Nested donut chart showing Total Addressable Market ($280B by 2030), Serviceable Addressable Market ($85B), and Serviceable Obtainable Market ($24B) for spatial computing
- **Market Share by Company**: Horizontal bar chart showing market share percentage for top companies
- **Sector Performance Heatmap**: Grid showing daily/weekly performance by sector (Hardware, Software, Gaming, Enterprise, etc.)
- **Revenue vs Market Cap Scatter**: Bubble chart comparing revenue to market cap with company size as bubble radius
- **YoY Growth Comparison**: Multi-bar chart comparing YoY growth across sectors
- **Expand company list** from 9 to 20+ with proper ranking
- **Add sector filter tabs** to the company ranking list

### Phase 6: Connect FeaturedInsights to Live Data

**File: `src/components/home/FeaturedInsights.tsx`**
- Replace hardcoded `insights` array with data from `useHybridArticles(undefined, 6)`
- Display latest articles from all categories with proper dates
- Link cards to `/article/:slug` routes

### Phase 7: Company/Startup/Unicorn Profile Images

**File: `src/pages/CompanyTracker.tsx`**
- Add placeholder avatar/logo area using company initials with colored backgrounds
- Use sector-specific color coding for visual differentiation

**File: `src/pages/VCDirectory.tsx`**
- Add firm type icon/avatar with type-specific styling

---

## Technical Details

### Storage Bucket Setup
A new `content-images` public storage bucket will be created for storing AI-generated article images. The auto-content edge function will:
1. Generate an image using `google/gemini-2.5-flash-image` via the Lovable AI gateway
2. Convert the base64 response to a file
3. Upload to the `content-images` bucket
4. Store the public URL in the content_item's metadata

### Article Slug Resolution
The hybrid article lookup will:
1. First search static articles by slug (fast, in-memory)
2. If not found, query `content_items` table where a computed slug matches
3. Transform the database result to the Article type format

### Dashboard Data Sources
- TAM/SAM/SOM: Curated market sizing data (updated quarterly in static constants)
- Market share: Computed from `topCompanies` market cap data
- Sector performance: Computed from `topCompanies` grouped by SECTOR_MAP
- Revenue data: From static `companies.ts` revenue fields

### Files to Create
| File | Purpose |
|------|---------|
| Storage bucket `content-images` | Store AI-generated article images |

### Files to Modify
| File | Changes |
|------|---------|
| `src/pages/Article.tsx` | Use hybrid article lookup (static + database) |
| `src/hooks/useArticles.ts` | Add database fallback for `useArticle()` |
| `src/components/articles/ArticleCard.tsx` | Add featured image with fallback gradient |
| `src/components/home/FeaturedInsights.tsx` | Connect to live hybrid articles data |
| `src/pages/Dashboard.tsx` | Add TAM/SAM/SOM, market share, sector heatmap, scatter charts |
| `supabase/functions/auto-content/index.ts` | Generate more articles per run + image generation |
| `supabase/functions/daily-market-snapshot/index.ts` | Expand to 20+ tickers |
| `src/data/companies.ts` | Add 10-15 more companies |
| `src/data/startups.ts` | Add 10-15 more startups |
| `src/data/unicorns.ts` | Add 5-10 more unicorns |
| `src/pages/CompanyTracker.tsx` | Add company avatar/logo placeholders |
| `src/pages/VCDirectory.tsx` | Add firm type avatars |

### Implementation Order
1. Fix article navigation bug (Phase 1) -- unblocks content viewing
2. Connect FeaturedInsights to live data (Phase 6)
3. Add article images to cards (Phase 2 - card UI)
4. Enhance dashboard charts (Phase 5)
5. Expand static data (Phase 4 - companies, startups, unicorns)
6. Expand ticker coverage (Phase 4 - edge function)
7. Enhance auto-content output volume (Phase 3)
8. Add AI image generation to pipeline (Phase 2 - edge function)
9. Add company/VC profile visuals (Phase 7)

### Additional Improvements to Consider for Future
- **Search functionality**: Global search across articles, companies, and VCs
- **Watchlist/favorites**: Let users save companies and articles
- **Email digest**: Weekly summary email via edge function
- **Comparison tool**: Side-by-side company comparison charts
- **API endpoint**: Public REST API for market data access
- **Dark/light theme toggle**: Currently only dark, add theme switching
- **Social sharing**: Open Graph meta tags for article sharing
- **RSS feed output**: Generate platform RSS feed for subscribers
- **PDF report generation**: Downloadable market reports
- **Real-time notifications**: Toast alerts for significant market moves
