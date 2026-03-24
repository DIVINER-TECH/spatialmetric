import { TrendingUp, TrendingDown } from "lucide-react";
import { useMarketSnapshot } from "@/hooks/useMarketSnapshot";

export function MarketTicker() {
  const { data: snapshot } = useMarketSnapshot();
  const tickerData = snapshot?.topCompanies?.slice(0, 8) ?? [];

  if (tickerData.length === 0) {
    return (
      <div className="border-y border-border bg-card/50">
        <div className="px-6 py-3 text-sm text-muted-foreground">
          Ticker data not available yet. Run the daily snapshot to populate.
        </div>
      </div>
    );
  }

  return (
    <div className="border-y border-border bg-card/50 overflow-hidden relative">
      {snapshot?.asOfDate && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/60 z-10 hidden md:block">
          as of {new Date(snapshot.asOfDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      )}
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
              <span className="font-mono">${(item.price ?? 0).toFixed(2)}</span>
              <span
                className={`flex items-center gap-1 text-sm ml-2 ${
                  (item.changePercent ?? 0) >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {(item.changePercent ?? 0) >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {(item.changePercent ?? 0) >= 0 ? "+" : ""}{(item.changePercent ?? 0).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
