import { motion } from "framer-motion";
import { regionalData } from "@/data/regions";

interface RegionalIntelligenceMapProps {
  activeRegion: string;
  onRegionChange: (regionCode: string) => void;
}

export function RegionalIntelligenceMap({ activeRegion, onRegionChange }: RegionalIntelligenceMapProps) {
  // Simplified coordinates for a stylistic HUD map
  const regions = [
    { id: 'na', label: 'North America', x: '20%', y: '30%', size: 100 },
    { id: 'europe', label: 'Europe', x: '50%', y: '25%', size: 80 },
    { id: 'asia', label: 'Asia Pacific', x: '75%', y: '40%', size: 110 },
    { id: 'asean', label: 'ASEAN', x: '70%', y: '60%', size: 70 },
    { id: 'global', label: 'Global Network', x: '45%', y: '50%', size: 40 },
  ];

  return (
    <div className="relative w-full aspect-[2/1] glass-premium border-black/5 rounded-3xl overflow-hidden bg-white/70 group shadow-lg">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary),0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* HUD Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_2px]" />

      <svg viewBox="0 0 1000 500" className="w-full h-full relative z-10">
        {/* Connection Lines (Stylized) */}
        <g opacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="5,5">
          <line x1="200" y1="150" x2="500" y2="125" />
          <line x1="500" y1="125" x2="750" y2="200" />
          <line x1="750" y1="200" x2="700" y2="300" />
          <line x1="700" y1="300" x2="450" y2="250" />
          <line x1="450" y1="250" x2="200" y2="150" />
        </g>

        {regions.map((region) => (
          <motion.g
            key={region.id}
            initial={false}
            animate={{
              opacity: activeRegion === region.id ? 1 : 0.6,
              scale: activeRegion === region.id ? 1.1 : 1,
            }}
            className="cursor-pointer"
            onClick={() => onRegionChange(region.id)}
          >
            {/* Hotspot Pulse */}
            <circle
              cx={region.x}
              cy={region.y}
              r={activeRegion === region.id ? 25 : 15}
              fill="hsl(var(--primary))"
              className="opacity-20 animate-ping"
            />
            {/* Core Node */}
            <circle
              cx={region.x}
              cy={region.y}
              r={ activeRegion === region.id ? 12 : 8}
              fill="hsl(var(--primary))"
              className="shadow-[0_0_20px_rgba(var(--primary),0.5)]"
            />
            {/* Label HUD */}
            <foreignObject x={parseFloat(region.x) * 10 - 60} y={parseFloat(region.y) * 5 + 20} width="200" height="60">
              <div className={`text-[9px] font-mono uppercase tracking-[.2em] transition-all ${activeRegion === region.id ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                {region.label}
                {activeRegion === region.id && (
                  <motion.div 
                    layoutId="underline"
                    className="h-[1px] bg-primary w-1/2 mt-1" 
                  />
                )}
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>

      {/* Targeting Overlay */}
      <div className="absolute top-10 left-10 p-6 glass-premium border-black/5 bg-white/90 backdrop-blur-xl shadow-lg">
        <h3 className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] font-bold mb-4">Node Selection Matrix</h3>
        <div className="space-y-3">
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => onRegionChange(r.id)}
              className={`flex items-center gap-4 group/btn w-full text-left transition-all ${activeRegion === r.id ? 'text-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <div className={`h-1.5 w-1.5 rounded-full ${activeRegion === r.id ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary),1)]' : 'bg-black/10'}`} />
              <span className="text-[9px] font-mono uppercase tracking-widest">{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 right-10 flex items-center gap-6">
        <div className="text-right">
          <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.4em]">Sector Saturation</p>
          <p className="text-lg font-bold font-mono text-foreground group-hover:text-primary transition-colors">84.2%</p>
        </div>
        <div className="h-10 w-px bg-black/10" />
        <div className="text-right">
          <p className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.4em]">Signal Latency</p>
          <p className="text-lg font-bold font-mono text-primary">12ms</p>
        </div>
      </div>
    </div>
  );
}
