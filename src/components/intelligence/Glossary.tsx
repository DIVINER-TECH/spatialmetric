import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, ChevronRight, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";

const GLOSSARY_ITEMS = [
  {
    term: "6DoF (Six Degrees of Freedom)",
    definition: "Tracking that accounts for both rotational and translational movement (forward/back, up/down, left/right).",
    category: "Perception"
  },
  {
    term: "Augmented Reality (AR)",
    definition: "Digital overlays on the physical world, maintaining user connection to their environment.",
    category: "Interface"
  },
  {
    term: "Foveated Rendering",
    definition: "Optimization technique that reduces rendering workload by reducing image quality in peripheral vision.",
    category: "Graphics"
  },
  {
    term: "Gaussian Splatting",
    definition: "A method for representing 3D scenes using a collection of 3D Gaussians for real-time, photorealistic rendering.",
    category: "Graphics"
  },
  {
    term: "Haptic Feedback",
    definition: "Kinesthetic communication or 3D touch technology which recreates the sense of touch by applying forces, vibrations, or motions.",
    category: "Interaction"
  },
  {
    term: "Inside-Out Tracking",
    definition: "Tracking capability where sensors are located on the headset rather than using external base stations.",
    category: "Perception"
  },
  {
    term: "Micro-OLED",
    definition: "Display technology using a silicon backplane to achieve extremely high pixel density and contrast in small form factors.",
    category: "Hardware"
  },
  {
    term: "Mixed Reality (MR)",
    definition: "The blending of physical and digital worlds where real and virtual objects co-exist and interact in real time.",
    category: "Interface"
  },
  {
    term: "Neural Radiance Fields (NeRF)",
    definition: "A method that uses deep learning to synthesize highly detailed 3D scenes from a set of 2D images.",
    category: "Graphics"
  },
  {
    term: "Occlusion",
    definition: "The ability of a digital object to be hidden behind a physical object, or vice versa, essential for depth perception.",
    category: "Perception"
  },
  {
    term: "Passthrough",
    definition: "Using cameras to digitize the real world and show it on the headset's internal displays.",
    category: "Hardware"
  },
  {
    term: "SLAM (Simultaneous Localization and Mapping)",
    definition: "The process of tracking a device's position while simultaneously building a map of its environment.",
    category: "Perception"
  },
  {
    term: "Spatial Audio",
    definition: "Sound that is procedurally processed to sound like it is coming from dynamic 3D locations in physical space.",
    category: "Hardware"
  },
  {
    term: "Virtual Reality (VR)",
    definition: "Complete digital immersion that replaces the user's entire physical environment.",
    category: "Interface"
  },
  {
    term: "Volumetric Video",
    definition: "Video capture technology that records a person or object in 3D, allowing viewing from any angle.",
    category: "Graphics"
  }
];

export const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(GLOSSARY_ITEMS.map(item => item.category)));

  const filteredItems = GLOSSARY_ITEMS.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search spatial terminology..." 
            className="pl-12 bg-secondary/20 border-border h-12 rounded-xl focus-visible:ring-primary/30 font-mono text-[10px] uppercase tracking-widest"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg font-mono text-[8px] uppercase tracking-widest transition-all border ${
              !selectedCategory 
                ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                : "bg-secondary/40 border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            All
          </button>
          {categories.sort().map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-mono text-[8px] uppercase tracking-widest transition-all border ${
                selectedCategory === cat
                  ? "bg-primary text-black border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                  : "bg-secondary/40 border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.term}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="glass-premium p-6 group hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20 text-primary">
                    <BookOpen className="h-3 w-3" />
                  </div>
                  <span className="text-[8px] font-mono font-bold text-primary/60 uppercase tracking-[0.2em]">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold font-mono tracking-tight uppercase mb-3 group-hover:text-primary transition-colors">
                  {item.term}
                </h3>
                <p className="text-[10px] font-mono text-muted-foreground leading-relaxed">
                  {item.definition}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-mono text-primary/40 uppercase tracking-widest font-bold">Ref: SM-TS-{idx + 100}</span>
                <ChevronRight className="h-3 w-3 text-primary translate-x-[-4px] group-hover:translate-x-0 transition-transform" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center glass-premium rounded-3xl"
        >
          <Hash className="h-12 w-12 text-primary/20 mx-auto mb-4" />
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.4em]">
            No matching terminology discovered in central database
          </p>
        </motion.div>
      )}
    </div>
  );
};
