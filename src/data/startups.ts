export interface Startup {
  id: string;
  slug: string;
  name: string;
  description: string;
  founded: number;
  headquarters: string;
  region: 'na' | 'eu' | 'asean' | 'pacific' | 'south-asia' | 'mena';
  sector: string;
  stage: 'Seed' | 'Series A' | 'Series B' | 'Series C' | 'Series D+' | 'Growth';
  totalFunding: number; // USD millions
  lastRoundSize: number;
  lastRoundDate: Date;
  employees: number;
  investors: string[];
  founders: { name: string; role: string }[];
  products: string[];
  website: string;
  tags: string[];
  traction: {
    metric: string;
    value: string;
  }[];
  aiDiscovered?: boolean;
  discoveredAt?: Date;
}

export const startups: Startup[] = [
  // North America Startups
  {
    id: 's1',
    slug: 'anduril-industries',
    name: 'Anduril Industries',
    description: 'Defense technology company using XR for autonomous systems and battlefield awareness. Their Lattice platform provides real-time 3D visualization for military operations with AI-powered threat detection.',
    founded: 2017,
    headquarters: 'Irvine, CA',
    region: 'na',
    sector: 'Defense Tech',
    stage: 'Series D+',
    totalFunding: 4200,
    lastRoundSize: 1500,
    lastRoundDate: new Date('2025-08-15'),
    employees: 3200,
    investors: ['Andreessen Horowitz', 'Founders Fund', 'General Catalyst', 'Valor Equity'],
    founders: [{ name: 'Palmer Luckey', role: 'Founder' }, { name: 'Trae Stephens', role: 'Co-founder' }],
    products: ['Lattice AI', 'Ghost UAV', 'Sentry Tower', 'Anvil', 'Roadrunner'],
    website: 'anduril.com',
    tags: ['Defense', 'AR', 'Autonomous Systems', 'Government', 'AI'],
    traction: [
      { metric: 'Government Contracts', value: '$12B+' },
      { metric: 'Countries Deployed', value: '8' },
    ]
  },
  {
    id: 's2',
    slug: 'immersivetouch',
    name: 'ImmersiveTouch',
    description: 'Surgical planning and training platform using VR/AR for complex medical procedures. Integrated with major hospital EHR systems and used by top medical centers for neurosurgery and orthopedic planning.',
    founded: 2015,
    headquarters: 'Chicago, IL',
    region: 'na',
    sector: 'Healthcare',
    stage: 'Series C',
    totalFunding: 145,
    lastRoundSize: 65,
    lastRoundDate: new Date('2025-06-12'),
    employees: 185,
    investors: ['Obvious Ventures', 'OSF Ventures', 'Jump Capital', 'GV'],
    founders: [{ name: 'Jay Banerjee', role: 'CEO' }],
    products: ['ImmersiveView Pro', 'SurgicalPlan VR', 'Training Simulator', 'OR Integration Suite'],
    website: 'immersivetouch.com',
    tags: ['Healthcare', 'VR', 'Surgical Planning', 'Medical Training', 'AI'],
    traction: [
      { metric: 'Procedures Planned', value: '125,000+' },
      { metric: 'Hospital Partners', value: '280+' },
    ]
  },
  {
    id: 's3',
    slug: 'mojo-vision',
    name: 'Mojo Vision',
    description: 'Building the first true AR contact lens with a built-in microLED display. Pushing miniaturization boundaries for invisible computing with medical and consumer applications.',
    founded: 2015,
    headquarters: 'Saratoga, CA',
    region: 'na',
    sector: 'Hardware',
    stage: 'Series C',
    totalFunding: 285,
    lastRoundSize: 75,
    lastRoundDate: new Date('2025-04-20'),
    employees: 220,
    investors: ['NEA', 'Gradient Ventures', 'Khosla Ventures', 'Liberty Global', 'LG Electronics'],
    founders: [{ name: 'Drew Perkins', role: 'CEO' }],
    products: ['Mojo Lens', 'Mojo Vision Platform'],
    website: 'mojo.vision',
    tags: ['AR Contact Lens', 'Wearables', 'Display Tech', 'Healthcare', 'Consumer'],
    traction: [
      { metric: 'Patents Filed', value: '150+' },
      { metric: 'Clinical Trials', value: 'Phase 2' },
    ]
  },
  {
    id: 's4',
    slug: 'campfire-3d',
    name: 'Campfire 3D',
    description: 'Holographic collaboration platform for enterprise design review. Enables distributed teams to visualize and interact with 3D models in shared physical and virtual spaces.',
    founded: 2018,
    headquarters: 'Santa Cruz, CA',
    region: 'na',
    sector: 'Enterprise',
    stage: 'Series B',
    totalFunding: 58,
    lastRoundSize: 32,
    lastRoundDate: new Date('2025-03-28'),
    employees: 72,
    investors: ['True Ventures', 'Lerer Hippeau', 'Salesforce Ventures', 'Dell Technologies Capital'],
    founders: [{ name: 'Jay Wright', role: 'CEO' }],
    products: ['Campfire Console', 'Campfire Pack', 'Cloud Collaboration', 'Design Review Suite'],
    website: 'campfire3d.com',
    tags: ['Collaboration', 'Holographic', 'Enterprise', 'Design', 'CAD'],
    traction: [
      { metric: 'Enterprise Customers', value: '350+' },
      { metric: 'Design Sessions', value: '2.5M+' },
    ]
  },
  {
    id: 's5',
    slug: 'tilt-five',
    name: 'Tilt Five',
    description: 'Tabletop AR gaming system transforming board games into holographic experiences. Making AR gaming accessible, social, and affordable for mainstream consumers.',
    founded: 2017,
    headquarters: 'San Mateo, CA',
    region: 'na',
    sector: 'Gaming',
    stage: 'Series A',
    totalFunding: 48,
    lastRoundSize: 28,
    lastRoundDate: new Date('2025-01-15'),
    employees: 85,
    investors: ['Arm', 'SOSV', 'Republic', 'Galaxy Interactive'],
    founders: [{ name: 'Jeri Ellsworth', role: 'CEO' }],
    products: ['Tilt Five XE Glasses', 'Game Board Pro', 'Developer Kit 2.0'],
    website: 'tiltfive.com',
    tags: ['Gaming', 'AR', 'Tabletop', 'Consumer', 'Entertainment'],
    traction: [
      { metric: 'Units Shipped', value: '120,000+' },
      { metric: 'Games Available', value: '45+' },
    ]
  },
  // European Startups
  {
    id: 's6',
    slug: 'varjo',
    name: 'Varjo',
    description: 'Finnish company building the highest resolution VR/XR headsets for professional use. Human-eye resolution displays used in aerospace simulation, automotive design, and military training.',
    founded: 2016,
    headquarters: 'Helsinki, Finland',
    region: 'eu',
    sector: 'Enterprise Hardware',
    stage: 'Series D+',
    totalFunding: 220,
    lastRoundSize: 70,
    lastRoundDate: new Date('2025-05-10'),
    employees: 320,
    investors: ['Atomico', 'EQT Ventures', 'NordicNinja', 'Volvo Cars Tech Fund'],
    founders: [{ name: 'Urho Konttori', role: 'CEO' }],
    products: ['XR-4 Focal', 'VR-4', 'Aero 2', 'Reality Cloud Platform'],
    website: 'varjo.com',
    tags: ['Enterprise VR', 'High Resolution', 'Simulation', 'Training', 'Automotive'],
    traction: [
      { metric: 'Enterprise Customers', value: '750+' },
      { metric: 'Simulator Programs', value: '1,500+' },
    ]
  },
  {
    id: 's7',
    slug: 'ultraleap',
    name: 'Ultraleap',
    description: 'UK-based leader in hand tracking and mid-air haptics technology. Their sensors power hand tracking in numerous XR devices and automotive interfaces.',
    founded: 2013,
    headquarters: 'Bristol, UK',
    region: 'eu',
    sector: 'Input Technology',
    stage: 'Series D+',
    totalFunding: 185,
    lastRoundSize: 55,
    lastRoundDate: new Date('2025-02-22'),
    employees: 260,
    investors: ['Tencent', 'CMC Capital', 'IP Group', 'Mayfair Equity Partners'],
    founders: [{ name: 'Steve Cliffe', role: 'CEO' }],
    products: ['Leap Motion Controller 3', 'Stratos Inspire', 'TouchFree 2.0', 'Hyperion'],
    website: 'ultraleap.com',
    tags: ['Hand Tracking', 'Haptics', 'Input', 'OEM', 'Automotive'],
    traction: [
      { metric: 'Devices Shipped', value: '800,000+' },
      { metric: 'Developer Community', value: '550,000+' },
    ]
  },
  {
    id: 's8',
    slug: 'lynx-mixed-reality',
    name: 'Lynx Mixed Reality',
    description: 'French startup building affordable standalone MR headsets with unique four-element catadioptric optics offering both VR and AR at consumer-friendly prices.',
    founded: 2019,
    headquarters: 'Paris, France',
    region: 'eu',
    sector: 'Consumer Hardware',
    stage: 'Series A',
    totalFunding: 22,
    lastRoundSize: 15,
    lastRoundDate: new Date('2025-07-05'),
    employees: 45,
    investors: ['BPI France', 'Kima Ventures', 'Business Angels Europe'],
    founders: [{ name: 'Stan Larroque', role: 'CEO' }],
    products: ['Lynx-R2', 'Lynx-R2 Pro'],
    website: 'lynx-r.com',
    tags: ['Mixed Reality', 'Standalone', 'Affordable', 'Open Source', 'Consumer'],
    traction: [
      { metric: 'Pre-orders', value: '18,000+' },
      { metric: 'Developer Partnerships', value: '120+' },
    ]
  },
  {
    id: 's9',
    slug: 'gravity-sketch',
    name: 'Gravity Sketch',
    description: 'VR-native 3D design tool used by major automotive and product designers. Intuitive interfaces for creating professional-grade designs in immersive environments.',
    founded: 2014,
    headquarters: 'London, UK',
    region: 'eu',
    sector: 'Design Software',
    stage: 'Series B',
    totalFunding: 92,
    lastRoundSize: 42,
    lastRoundDate: new Date('2025-04-01'),
    employees: 110,
    investors: ['Point Nine', 'Forward Partners', 'Foundry Group', 'Autodesk'],
    founders: [{ name: 'Oluwaseyi Sosanya', role: 'CEO' }],
    products: ['Gravity Sketch Pro', 'LandingPad Enterprise', 'Sketch Cloud'],
    website: 'gravitysketch.com',
    tags: ['Design', 'VR', 'CAD', 'Automotive', 'Product Design'],
    traction: [
      { metric: 'Enterprise Users', value: '180,000+' },
      { metric: 'Fortune 500 Clients', value: '75+' },
    ]
  },
  // ASEAN Startups
  {
    id: 's10',
    slug: 'virtualtech-frontier',
    name: 'Virtualtech Frontier',
    description: 'Singapore-based XR solutions provider focusing on enterprise training and tourism experiences across Southeast Asia with AI-powered content generation.',
    founded: 2018,
    headquarters: 'Singapore',
    region: 'asean',
    sector: 'Enterprise Solutions',
    stage: 'Series B',
    totalFunding: 38,
    lastRoundSize: 22,
    lastRoundDate: new Date('2025-05-20'),
    employees: 95,
    investors: ['Golden Gate Ventures', 'East Ventures', 'Temasek', 'Vertex Ventures'],
    founders: [{ name: 'Kenny Tan', role: 'CEO' }],
    products: ['VTF Training Pro', 'VTF Tourism', 'VTF Events', 'AI Content Studio'],
    website: 'virtualtechfrontier.com',
    tags: ['Enterprise', 'Training', 'Tourism', 'ASEAN', 'AI'],
    traction: [
      { metric: 'Corporate Clients', value: '280+' },
      { metric: 'Users Trained', value: '1.2M+' },
    ]
  },
  {
    id: 's11',
    slug: 'xctuality',
    name: 'XCTUALITY',
    description: 'Malaysian XR company creating immersive experiences for retail and real estate visualization across Southeast Asian markets with focus on Islamic finance compliance.',
    founded: 2019,
    headquarters: 'Kuala Lumpur, Malaysia',
    region: 'asean',
    sector: 'Real Estate / Retail',
    stage: 'Series A',
    totalFunding: 12,
    lastRoundSize: 8,
    lastRoundDate: new Date('2025-03-15'),
    employees: 55,
    investors: ['Cradle Fund', '500 Global', 'MyStartr', 'MDEC'],
    founders: [{ name: 'Ahmad Rizal', role: 'CEO' }],
    products: ['XCTUALITY Showroom', 'Property Viz Pro', 'Retail XR', 'Islamic Finance VR'],
    website: 'xctuality.com',
    tags: ['Real Estate', 'Retail', 'Visualization', 'Malaysia', 'Islamic Finance'],
    traction: [
      { metric: 'Properties Visualized', value: '3,500+' },
      { metric: 'Retail Partners', value: '120+' },
    ]
  },
  // Pacific Startups
  {
    id: 's12',
    slug: 'xreal',
    name: 'Xreal',
    description: 'Consumer AR glasses maker known for lightweight, affordable AR glasses. Partnering with carriers and OEMs globally for mass market distribution with Android XR integration.',
    founded: 2017,
    headquarters: 'Beijing, China',
    region: 'pacific',
    sector: 'Consumer Hardware',
    stage: 'Series D+',
    totalFunding: 420,
    lastRoundSize: 100,
    lastRoundDate: new Date('2025-06-08'),
    employees: 680,
    investors: ['Alibaba', 'Sequoia China', 'Hillhouse', 'SK Hynix'],
    founders: [{ name: 'Chi Xu', role: 'CEO' }],
    products: ['Air 3 Ultra', 'Air 3 Pro', 'Beam Pro 2', 'One Pro'],
    website: 'xreal.com',
    tags: ['AR Glasses', 'Consumer', 'Mobile AR', 'Entertainment', 'Android XR'],
    traction: [
      { metric: 'Units Sold', value: '1.2M+' },
      { metric: 'Carrier Partners', value: '35+' },
    ]
  },
  {
    id: 's13',
    slug: 'pimax',
    name: 'Pimax',
    description: 'Shanghai-based VR headset maker known for ultra-wide FOV headsets. Targeting enthusiast PC VR gamers and simulation professionals.',
    founded: 2015,
    headquarters: 'Shanghai, China',
    region: 'pacific',
    sector: 'Gaming Hardware',
    stage: 'Series C',
    totalFunding: 85,
    lastRoundSize: 35,
    lastRoundDate: new Date('2025-02-12'),
    employees: 280,
    investors: ['ZhenFund', 'Shunwei Capital', 'ByteDance'],
    founders: [{ name: 'Robin Weng', role: 'CEO' }],
    products: ['Crystal Super', 'Crystal Light 2', '12K QLED', 'Portal 2'],
    website: 'pimax.com',
    tags: ['PC VR', 'Gaming', 'Wide FOV', 'Enthusiast', 'Simulation'],
    traction: [
      { metric: 'Units Shipped', value: '180,000+' },
      { metric: 'Community Members', value: '250,000+' },
    ]
  },
  // South Asia Startups
  {
    id: 's14',
    slug: 'ajnalens',
    name: 'AjnaLens',
    description: 'Indian enterprise AR glasses company with defense contracts and manufacturing applications. Made in India initiative with focus on indigenous development.',
    founded: 2014,
    headquarters: 'Mumbai, India',
    region: 'south-asia',
    sector: 'Enterprise Hardware',
    stage: 'Series B',
    totalFunding: 28,
    lastRoundSize: 18,
    lastRoundDate: new Date('2025-04-05'),
    employees: 120,
    investors: ['InfoEdge Ventures', 'GVFL', 'Unicorn India Ventures', 'Defence Innovation Fund'],
    founders: [{ name: 'Pankaj Raut', role: 'CEO' }],
    products: ['AjnaLite Pro', 'AjnaBolt 2', 'AjnaXR Platform', 'Defence Suite'],
    website: 'ajnalens.com',
    tags: ['Enterprise AR', 'Defense', 'Made in India', 'Manufacturing', 'Government'],
    traction: [
      { metric: 'Defense Contracts', value: '12+' },
      { metric: 'Enterprise Deployments', value: '250+' },
    ]
  },
  {
    id: 's15',
    slug: 'smartvizx',
    name: 'SmartVizX',
    description: 'Indian VR/AR real estate visualization company helping developers showcase properties before construction with AI-powered virtual staging.',
    founded: 2015,
    headquarters: 'Gurgaon, India',
    region: 'south-asia',
    sector: 'Real Estate Tech',
    stage: 'Series B',
    totalFunding: 18,
    lastRoundSize: 12,
    lastRoundDate: new Date('2025-01-18'),
    employees: 95,
    investors: ['pi Ventures', 'LetsVenture', 'Blume Ventures', 'PropTech Capital'],
    founders: [{ name: 'Gautam Tewari', role: 'CEO' }],
    products: ['PropVR Pro', 'AR Brochure 2.0', 'Virtual Site Visit', 'AI Staging'],
    website: 'smartvizx.com',
    tags: ['Real Estate', 'VR', 'Visualization', 'India', 'AI'],
    traction: [
      { metric: 'Properties Visualized', value: '12,000+' },
      { metric: 'Developer Partners', value: '380+' },
    ]
  },
  // MENA Startups
  {
    id: 's16',
    slug: 'xr-hub-dubai',
    name: 'XR Hub Dubai',
    description: 'UAE-based XR studio creating immersive experiences for tourism, entertainment, and government projects across the Middle East with NEOM partnership.',
    founded: 2020,
    headquarters: 'Dubai, UAE',
    region: 'mena',
    sector: 'Content Studio',
    stage: 'Series A',
    totalFunding: 18,
    lastRoundSize: 12,
    lastRoundDate: new Date('2025-07-25'),
    employees: 65,
    investors: ['Flat6Labs', 'DIFC FinTech Hive', 'NEOM Investment Fund', 'Mubadala'],
    founders: [{ name: 'Omar Hassan', role: 'CEO' }],
    products: ['Tourism XR Platform', 'Museum AR Suite', 'Event Experiences', 'Government Digital Twin'],
    website: 'xrhubdubai.com',
    tags: ['Content', 'Tourism', 'Government', 'UAE', 'Smart City'],
    traction: [
      { metric: 'Projects Delivered', value: '120+' },
      { metric: 'Museum Partners', value: '28+' },
    ]
  },
  {
    id: 's17',
    slug: 'metaverse-arabia',
    name: 'Metaverse Arabia',
    description: 'Saudi startup building Arabic-first metaverse experiences and virtual event platforms for the MENA market with Vision 2030 alignment.',
    founded: 2022,
    headquarters: 'Riyadh, Saudi Arabia',
    region: 'mena',
    sector: 'Social/Events',
    stage: 'Series A',
    totalFunding: 25,
    lastRoundSize: 18,
    lastRoundDate: new Date('2025-08-10'),
    employees: 55,
    investors: ['Saudi Venture Capital', 'Sanabil Investments', 'PIF', 'STV'],
    founders: [{ name: 'Mohammed Al-Rashid', role: 'CEO' }],
    products: ['Arabia Worlds', 'Virtual Majlis Pro', 'Event Platform', 'Hajj VR Experience'],
    website: 'metaversearabia.com',
    tags: ['Metaverse', 'Arabic', 'Events', 'Saudi', 'Vision 2030'],
    traction: [
      { metric: 'Virtual Events', value: '280+' },
      { metric: 'Active Users', value: '150,000+' },
    ]
  }
];

export const getStartupBySlug = (slug: string): Startup | undefined => {
  return startups.find(s => s.slug === slug);
};

export const getStartupsByRegion = (region: string): Startup[] => {
  return startups.filter(s => s.region === region);
};

export const getStartupsBySector = (sector: string): Startup[] => {
  return startups.filter(s => s.sector.toLowerCase().includes(sector.toLowerCase()));
};

export const getRecentlyFundedStartups = (limit: number = 10): Startup[] => {
  return [...startups]
    .sort((a, b) => b.lastRoundDate.getTime() - a.lastRoundDate.getTime())
    .slice(0, limit);
};
