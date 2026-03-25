# SpatialMetric

**SpatialMetric** is a professional investment intelligence platform dedicated to the Spatial Computing (XR/VR/AR) industry. It provides real-time market data, company valuations, news analysis, and ecosystem insights to help investors and developers stay ahead in the spatial computing era.

## Key Features

- **Market Ticker**: Real-time tracking of top spatial computing stocks and metrics using the Yahoo Finance API.
- **Spatial Index**: A proprietary metric tracking the overall health and growth of the spatial computing market.
- **Company Intelligence**: Detailed profiles and performance metrics for leading public and private XR companies.
- **Ecocysem Events**: A comprehensive resource hub for industry conferences, product launches, and ecosystem milestones.
- **AI-Powered Insights**: Automated daily briefs and deep-dive articles on market trends and technical innovations.

## Technology Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui.
- **Backend**: Supabase (Database & Edge Functions).
- **Data Sources**: Yahoo Finance API (Market Data), curated XR RSS feeds (News).

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or bun

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/spatialmetric.git
   cd spatialmetric
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Configure environment variables in `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `MARKET_DATA_PROVIDER=yahoo`

4. Start the development server:
   ```sh
   npm run dev
   ```

## Content Management

You can manage the platform's content through the Supabase Dashboard:
- **Articles**: Manually edit or add professional deep-dives in the `articles` table.
- **AI Insights**: Automatically populated by the `auto-content` function from the `content_items` table.
- **Market Data**: Managed via the `market_daily_snapshots` table.

## Deployment & Updates

The platform is configured for automatic deployment via GitHub Actions (`deploy.yml`). Any push to the `main` branch will trigger a build and update the site.

## Troubleshooting

- **Ticker Not Showing Stats**: Ensure the `daily-market-snapshot` function has been invoked at least once. If Supabase is empty, the site will use its built-in XR industry fallback data.
- **Articles Not Showing**: Verify that `is_published` is set to `true` in the `articles` table.

## License

MIT License - see [LICENSE](LICENSE) for details.
