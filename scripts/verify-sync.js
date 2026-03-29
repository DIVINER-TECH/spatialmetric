/**
 * Multi-Provider Sync Verification
 * 
 * Run this with: node scripts/verify-sync.js
 */

async function verifySync() {
  const symbols = ["AAPL", "META", "MSFT", "NVDA"];
  console.log(`\n🔍 Mass Revalidation: Testing Multi-Provider Connectivity...\n`);

  const providers = [
    { name: "Yahoo Finance", url: `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}` },
    { name: "Stooq (Backup)", url: `https://stooq.com/q/d/l/?s=aapl.us&i=d` }
  ];

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Referer': 'https://finance.yahoo.com'
  };

  for (const provider of providers) {
    console.log(`📡 Testing Provider: ${provider.name}...`);
    try {
      const res = await fetch(provider.url, { headers });
      if (res.ok) {
        console.log(`✅ ${provider.name} is ONLINE (HTTP ${res.status})`);
        if (provider.name === "Yahoo Finance") {
          const data = await res.json();
          console.log(`   Data Depth: ${data.quoteResponse.result.length} tickers retrieved.`);
        } else {
          const text = await res.text();
          console.log(`   Data Depth: ${text.split('\n').length} CSV lines retrieved.`);
        }
      } else {
        console.log(`❌ ${provider.name} FAILED (HTTP ${res.status})`);
      }
    } catch (err) {
      console.log(`❌ ${provider.name} ERROR: ${err.message}`);
    }
    console.log("");
  }

  console.log("🛠️  Platform Update: The system now uses automatic failover.");
  console.log("   If Yahoo blocks the terminal, the platform will silently switch to Stooq.");
}

verifySync();
