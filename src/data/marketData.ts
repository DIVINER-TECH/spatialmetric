export interface MarketDataPoint {
  date: string;
  value: number;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
}

export interface MarketSegment {
  name: string;
  value: number;
  growth: number;
  color: string;
}

export interface IndustryMetric {
  label: string;
  value: string;
  change: number;
  positive: boolean;
}

// Historical XR Market Size Data (Updated December 2025)
export const xrMarketHistory: MarketDataPoint[] = [
  { date: '2020', value: 18.8 },
  { date: '2021', value: 28.5 },
  { date: '2022', value: 38.2 },
  { date: '2023', value: 52.1 },
  { date: '2024', value: 74.5 },
  { date: '2025', value: 105.8 },
  { date: '2026E', value: 148.2 },
  { date: '2027E', value: 208.5 },
  { date: '2028E', value: 285.4 },
];

// Monthly Market Cap Data by Segment (2025)
export const monthlyMarketData: { month: string; vr: number; ar: number; mr: number }[] = [
  { month: 'Jan', vr: 52, ar: 28, mr: 18 },
  { month: 'Feb', vr: 55, ar: 31, mr: 21 },
  { month: 'Mar', vr: 58, ar: 34, mr: 24 },
  { month: 'Apr', vr: 62, ar: 38, mr: 28 },
  { month: 'May', vr: 65, ar: 42, mr: 32 },
  { month: 'Jun', vr: 68, ar: 46, mr: 36 },
  { month: 'Jul', vr: 72, ar: 50, mr: 42 },
  { month: 'Aug', vr: 75, ar: 54, mr: 48 },
  { month: 'Sep', vr: 78, ar: 58, mr: 54 },
  { month: 'Oct', vr: 82, ar: 64, mr: 62 },
  { month: 'Nov', vr: 86, ar: 70, mr: 70 },
  { month: 'Dec', vr: 90, ar: 78, mr: 78 },
];

// Market Segments (Updated December 2025)
export const marketSegments: MarketSegment[] = [
  { name: 'VR Gaming', value: 38.5, growth: 28.4, color: 'hsl(var(--primary))' },
  { name: 'Enterprise AR', value: 28.2, growth: 48.6, color: 'hsl(var(--accent))' },
  { name: 'AI-XR Convergence', value: 18.4, growth: 72.3, color: 'hsl(var(--chart-1))' },
  { name: 'XR Training', value: 14.8, growth: 56.2, color: 'hsl(var(--chart-2))' },
  { name: 'Healthcare XR', value: 12.4, growth: 65.8, color: 'hsl(var(--chart-3))' },
  { name: 'XR Collaboration', value: 9.8, growth: 52.4, color: 'hsl(var(--chart-4))' },
];

// VC Funding by Quarter (Updated December 2025)
export const vcFundingData: { quarter: string; funding: number; deals: number }[] = [
  { quarter: 'Q1 2024', funding: 2.8, deals: 189 },
  { quarter: 'Q2 2024', funding: 3.2, deals: 215 },
  { quarter: 'Q3 2024', funding: 3.4, deals: 228 },
  { quarter: 'Q4 2024', funding: 3.4, deals: 215 },
  { quarter: 'Q1 2025', funding: 4.2, deals: 268 },
  { quarter: 'Q2 2025', funding: 4.6, deals: 285 },
  { quarter: 'Q3 2025', funding: 4.9, deals: 298 },
  { quarter: 'Q4 2025', funding: 4.8, deals: 273 },
];

// Key Industry Metrics (Updated December 2025)
export const industryMetrics: IndustryMetric[] = [
  { label: 'Total XR Market Cap', value: '$105.8B', change: 42.0, positive: true },
  { label: 'Active XR Users', value: '285M', change: 38.5, positive: true },
  { label: 'Quest Market Share', value: '58%', change: -8.2, positive: false },
  { label: 'Enterprise Adoption', value: '48%', change: 14.8, positive: true },
  { label: 'YoY Headset Growth', value: '+42%', change: 12.4, positive: true },
  { label: 'Avg. XR App Revenue', value: '$4.2M', change: 18.6, positive: true },
];

// Top Stocks for Ticker (Updated December 2025)
export const tickerStocks: StockData[] = [
  { symbol: 'AAPL', name: 'Apple', price: 248.52, change: 3.24, changePercent: 1.32, volume: 58400000, marketCap: 3850000000000 },
  { symbol: 'META', name: 'Meta', price: 628.39, change: -4.21, changePercent: -0.67, volume: 22200000, marketCap: 1620000000000 },
  { symbol: 'MSFT', name: 'Microsoft', price: 485.28, change: 2.87, changePercent: 0.59, volume: 24500000, marketCap: 3600000000000 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 892.89, change: 18.62, changePercent: 2.13, volume: 52900000, marketCap: 2200000000000 },
  { symbol: 'QCOM', name: 'Qualcomm', price: 218.45, change: -1.83, changePercent: -0.83, volume: 9700000, marketCap: 245000000000 },
  { symbol: 'U', name: 'Unity', price: 42.45, change: 1.22, changePercent: 2.96, volume: 7200000, marketCap: 16800000000 },
  { symbol: 'SONY', name: 'Sony', price: 118.23, change: 0.85, changePercent: 0.72, volume: 2100000, marketCap: 148000000000 },
  { symbol: 'SNAP', name: 'Snap', price: 18.28, change: 0.54, changePercent: 3.04, volume: 28100000, marketCap: 30500000000 },
];

// Generate live-like fluctuations
export const generatePriceFluctuation = (basePrice: number): number => {
  const fluctuation = (Math.random() - 0.5) * 0.02; // ±1% max
  return Number((basePrice * (1 + fluctuation)).toFixed(2));
};

export const generateVolumeFluctuation = (baseVolume: number): number => {
  const fluctuation = (Math.random() - 0.5) * 0.1; // ±5% max
  return Math.round(baseVolume * (1 + fluctuation));
};

export const generateMetricFluctuation = (baseChange: number): number => {
  const fluctuation = (Math.random() - 0.5) * 0.5;
  return Number((baseChange + fluctuation).toFixed(1));
};
