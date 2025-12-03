import { useQuery } from '@tanstack/react-query';
import { 
  tickerStocks, 
  industryMetrics,
  generatePriceFluctuation, 
  generateVolumeFluctuation,
  generateMetricFluctuation,
  type StockData,
  type IndustryMetric
} from '@/data/marketData';

// Simulate live stock data updates
const fetchLiveStockData = (): StockData[] => {
  return tickerStocks.map(stock => {
    const newPrice = generatePriceFluctuation(stock.price);
    const priceChange = newPrice - stock.price;
    const changePercent = (priceChange / stock.price) * 100;
    
    return {
      ...stock,
      price: newPrice,
      change: Number(priceChange.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      volume: generateVolumeFluctuation(stock.volume),
    };
  });
};

// Simulate live metric updates
const fetchLiveMetrics = (): IndustryMetric[] => {
  return industryMetrics.map(metric => ({
    ...metric,
    change: generateMetricFluctuation(metric.change),
  }));
};

export const useLiveStockData = (refetchInterval = 30000) => {
  return useQuery({
    queryKey: ['liveStockData'],
    queryFn: fetchLiveStockData,
    refetchInterval,
    staleTime: 15000,
  });
};

export const useLiveMetrics = (refetchInterval = 60000) => {
  return useQuery({
    queryKey: ['liveMetrics'],
    queryFn: fetchLiveMetrics,
    refetchInterval,
    staleTime: 30000,
  });
};

export const useMarketSummary = () => {
  const { data: stocks } = useLiveStockData();
  
  if (!stocks) return null;
  
  const gainers = stocks.filter(s => s.changePercent > 0).length;
  const losers = stocks.filter(s => s.changePercent < 0).length;
  const avgChange = stocks.reduce((acc, s) => acc + s.changePercent, 0) / stocks.length;
  
  return {
    gainers,
    losers,
    avgChange: Number(avgChange.toFixed(2)),
    totalVolume: stocks.reduce((acc, s) => acc + s.volume, 0),
  };
};
