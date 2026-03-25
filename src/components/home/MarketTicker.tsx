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
    <div className="border-y border-border/50 bg-muted/5 overflow-hidden relative backdrop-blur-sm">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      
      {snapshot?.asOfDate && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-background/80 border border-border/50 backdrop-blur-md">
          <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest">
            LIVE: {new Date(snapshot.asOfDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
      )}

      <div className="flex animate-marquee py-1">
        {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 px-8 py-4 border-r border-border/30 whitespace-nowrap group hover:bg-primary/5 transition-colors cursor-default"
          >
            <div className="flex flex-col">
              <span className="font-mono font-bold text-primary text-sm tracking-tighter uppercase">{item.symbol}</span>
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{item.name}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono font-bold text-sm tracking-tighter">${(item.price ?? 0).toFixed(2)}</span>
              <div
                className={`flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest ${
                  (item.changePercent ?? 0) >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {(item.changePercent ?? 0) >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {(item.changePercent ?? 0) >= 0 ? "+" : ""}{(item.changePercent ?? 0).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
