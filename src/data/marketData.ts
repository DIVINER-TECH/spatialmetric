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

// Historical XR Market Size Data
export const xrMarketHistory: MarketDataPoint[] = [
  { date: '2020', value: 18.8 },
  { date: '2021', value: 28.5 },
  { date: '2022', value: 38.2 },
  { date: '2023', value: 52.1 },
  { date: '2024', value: 74.5 },
  { date: '2025E', value: 105.8 },
  { date: '2026E', value: 142.3 },
  { date: '2027E', value: 198.7 },
  { date: '2028E', value: 268.4 },
];

// Monthly Market Cap Data by Segment
export const monthlyMarketData: { month: string; vr: number; ar: number; mr: number }[] = [
  { month: 'Jan', vr: 42, ar: 18, mr: 8 },
  { month: 'Feb', vr: 45, ar: 20, mr: 10 },
  { month: 'Mar', vr: 48, ar: 22, mr: 12 },
  { month: 'Apr', vr: 52, ar: 25, mr: 15 },
  { month: 'May', vr: 55, ar: 28, mr: 18 },
  { month: 'Jun', vr: 58, ar: 32, mr: 22 },
  { month: 'Jul', vr: 62, ar: 35, mr: 26 },
  { month: 'Aug', vr: 65, ar: 38, mr: 30 },
  { month: 'Sep', vr: 68, ar: 42, mr: 35 },
  { month: 'Oct', vr: 72, ar: 48, mr: 42 },
  { month: 'Nov', vr: 76, ar: 52, mr: 48 },
  { month: 'Dec', vr: 80, ar: 58, mr: 55 },
];

// Market Segments
export const marketSegments: MarketSegment[] = [
  { name: 'VR Gaming', value: 28.5, growth: 24.2, color: 'hsl(var(--primary))' },
  { name: 'Enterprise AR', value: 18.3, growth: 42.8, color: 'hsl(var(--accent))' },
  { name: 'Consumer AR', value: 12.1, growth: 38.5, color: 'hsl(var(--chart-1))' },
  { name: 'XR Training', value: 9.8, growth: 52.1, color: 'hsl(var(--chart-2))' },
  { name: 'Healthcare XR', value: 7.2, growth: 61.3, color: 'hsl(var(--chart-3))' },
  { name: 'XR Collaboration', value: 5.6, growth: 48.7, color: 'hsl(var(--chart-4))' },
];

// VC Funding by Quarter
export const vcFundingData: { quarter: string; funding: number; deals: number }[] = [
  { quarter: 'Q1 2023', funding: 1.8, deals: 145 },
  { quarter: 'Q2 2023', funding: 1.5, deals: 128 },
  { quarter: 'Q3 2023', funding: 1.2, deals: 112 },
  { quarter: 'Q4 2023', funding: 1.7, deals: 134 },
  { quarter: 'Q1 2024', funding: 2.8, deals: 168 },
];

// Key Industry Metrics
export const industryMetrics: IndustryMetric[] = [
  { label: 'Total XR Market Cap', value: '$74.5B', change: 43.0, positive: true },
  { label: 'Active XR Users', value: '171M', change: 28.5, positive: true },
  { label: 'Quest Market Share', value: '72%', change: -3.2, positive: false },
  { label: 'Enterprise Adoption', value: '34%', change: 12.8, positive: true },
  { label: 'YoY Headset Growth', value: '+38%', change: 8.2, positive: true },
  { label: 'Avg. XR App Revenue', value: '$2.4M', change: 15.6, positive: true },
];

// Top Stocks for Ticker
export const tickerStocks: StockData[] = [
  { symbol: 'AAPL', name: 'Apple', price: 182.52, change: 2.34, changePercent: 1.30, volume: 52400000, marketCap: 2850000000000 },
  { symbol: 'META', name: 'Meta', price: 485.39, change: -3.21, changePercent: -0.66, volume: 18200000, marketCap: 1250000000000 },
  { symbol: 'MSFT', name: 'Microsoft', price: 415.28, change: 1.87, changePercent: 0.45, volume: 21500000, marketCap: 3100000000000 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 742.89, change: 15.62, changePercent: 2.15, volume: 48900000, marketCap: 1850000000000 },
  { symbol: 'QCOM', name: 'Qualcomm', price: 171.45, change: -1.23, changePercent: -0.71, volume: 8700000, marketCap: 192000000000 },
  { symbol: 'U', name: 'Unity', price: 28.45, change: 0.82, changePercent: 2.97, volume: 6200000, marketCap: 11200000000 },
  { symbol: 'SONY', name: 'Sony', price: 91.23, change: 0.45, changePercent: 0.50, volume: 1800000, marketCap: 115000000000 },
  { symbol: 'SNAP', name: 'Snap', price: 11.28, change: 0.34, changePercent: 3.11, volume: 24100000, marketCap: 18500000000 },
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
