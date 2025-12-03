import { TrendingUp, TrendingDown } from "lucide-react";

const tickerData = [
  { symbol: "META", name: "Meta Platforms", price: "514.28", change: 2.34, positive: true },
  { symbol: "AAPL", name: "Apple Inc", price: "178.72", change: 0.85, positive: true },
  { symbol: "MSFT", name: "Microsoft", price: "378.91", change: 1.23, positive: true },
  { symbol: "SNAP", name: "Snap Inc", price: "14.56", change: -3.21, positive: false },
  { symbol: "NVDA", name: "NVIDIA", price: "495.22", change: 4.12, positive: true },
  { symbol: "QCOM", name: "Qualcomm", price: "142.33", change: -0.67, positive: false },
  { symbol: "U", name: "Unity Software", price: "28.91", change: 1.87, positive: true },
  { symbol: "RBLX", name: "Roblox", price: "41.23", change: -1.45, positive: false },
];

export function MarketTicker() {
  return (
    <div className="border-y border-border bg-card/50 overflow-hidden">
      <div className="flex animate-marquee">
        {[...tickerData, ...tickerData].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-6 py-3 border-r border-border whitespace-nowrap"
          >
            <div>
              <span className="font-semibold">{item.symbol}</span>
              <span className="text-muted-foreground text-sm ml-2">{item.name}</span>
            </div>
            <div className="text-right">
              <span className="font-mono">${item.price}</span>
              <span
                className={`flex items-center gap-1 text-sm ml-2 ${
                  item.positive ? "text-success" : "text-destructive"
                }`}
              >
                {item.positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {item.positive ? "+" : ""}{item.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
