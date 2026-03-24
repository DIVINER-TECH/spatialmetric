import yfinance as yf
import json
from datetime import datetime, timedelta

def get_spatial_market_data(tickers):
    """
    Fetches historical data for a list of spatial computing tickers.
    """
    data_points = {}
    for ticker_symbol in tickers:
        print(f"Fetching data for {ticker_symbol}...")
        ticker = yf.Ticker(ticker_symbol)
        
        # Get historical market data (last 6 months)
        hist = ticker.history(period="6mo")
        
        series = []
        for date, row in hist.iterrows():
            series.append({
                "date": date.strftime('%Y-%m-%d'),
                "close": round(row['Close'], 2),
                "volume": int(row['Volume'])
            })
        
        data_points[ticker_symbol] = {
            "name": ticker.info.get('longName', ticker_symbol),
            "marketCap": ticker.info.get('marketCap'),
            "series": series
        }
        
    return data_points

if __name__ == "__main__":
    # Example spatial computing tickers
    spatial_tickers = ["AAPL", "META", "MSFT", "NVDA", "QCOM", "U", "SONY", "SNAP"]
    
    results = get_spatial_market_data(spatial_tickers)
    
    # Save to JSON for reference
    output_file = "spatial_market_data.json"
    with open(output_file, "w") as f:
        json.dump(results, f, indent=2)
        
    print(f"\nData successfully saved to {output_file}")
    print("Example Data (AAPL):")
    if "AAPL" in results:
        latest = results["AAPL"]["series"][-1]
        print(f"  Date: {latest['date']}")
        print(f"  Close: ${latest['close']}")
        print(f"  Volume: {latest['volume']:,}")
