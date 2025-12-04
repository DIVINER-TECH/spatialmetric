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
    description: 'Defense technology company using XR for autonomous systems and battlefield awareness. Their Lattice platform provides real-time 3D visualization for military operations.',
    founded: 2017,
    headquarters: 'Irvine, CA',
    region: 'na',
    sector: 'Defense Tech',
    stage: 'Series D+',
    totalFunding: 2800,
    lastRoundSize: 1480,
    lastRoundDate: new Date('2024-01-15'),
    employees: 2500,
    investors: ['Andreessen Horowitz', 'Founders Fund', 'General Catalyst'],
    founders: [{ name: 'Palmer Luckey', role: 'Founder' }, { name: 'Trae Stephens', role: 'Co-founder' }],
    products: ['Lattice', 'Ghost UAV', 'Sentry Tower', 'Anvil'],
    website: 'anduril.com',
    tags: ['Defense', 'AR', 'Autonomous Systems', 'Government'],
    traction: [
      { metric: 'Government Contracts', value: '$8B+' },
      { metric: 'Countries Deployed', value: '5' },
    ]
  },
  {
    id: 's2',
    slug: 'immersivetouch',
    name: 'ImmersiveTouch',
    description: 'Surgical planning and training platform using VR/AR for complex medical procedures. Used by top medical centers for neurosurgery and orthopedic planning.',
    founded: 2015,
    headquarters: 'Chicago, IL',
    region: 'na',
    sector: 'Healthcare',
    stage: 'Series B',
    totalFunding: 85,
    lastRoundSize: 45,
    lastRoundDate: new Date('2024-02-08'),
    employees: 120,
    investors: ['Obvious Ventures', 'OSF Ventures', 'Jump Capital'],
    founders: [{ name: 'Jay Banerjee', role: 'CEO' }],
    products: ['ImmersiveView', 'SurgicalPlan VR', 'Training Simulator'],
    website: 'immersivetouch.com',
    tags: ['Healthcare', 'VR', 'Surgical Planning', 'Medical Training'],
    traction: [
      { metric: 'Procedures Planned', value: '50,000+' },
      { metric: 'Hospital Partners', value: '150+' },
    ]
  },
  {
    id: 's3',
    slug: 'mojo-vision',
    name: 'Mojo Vision',
    description: 'Developing the world\'s first true AR contact lens with a built-in display. Pushing the boundaries of miniaturization for invisible computing.',
    founded: 2015,
    headquarters: 'Saratoga, CA',
    region: 'na',
    sector: 'Hardware',
    stage: 'Series C',
    totalFunding: 205,
    lastRoundSize: 45,
    lastRoundDate: new Date('2023-11-20'),
    employees: 180,
    investors: ['NEA', 'Gradient Ventures', 'Khosla Ventures', 'Liberty Global'],
    founders: [{ name: 'Drew Perkins', role: 'CEO' }],
    products: ['Mojo Lens'],
    website: 'mojo.vision',
    tags: ['AR Contact Lens', 'Wearables', 'Display Tech', 'Healthcare'],
    traction: [
      { metric: 'Patents Filed', value: '100+' },
      { metric: 'First Human Trials', value: 'Completed' },
    ]
  },
  {
    id: 's4',
    slug: 'campfire-3d',
    name: 'Campfire 3D',
    description: 'Holographic collaboration platform for enterprise design review. Enables teams to visualize and interact with 3D models in shared space.',
    founded: 2018,
    headquarters: 'Santa Cruz, CA',
    region: 'na',
    sector: 'Enterprise',
    stage: 'Series A',
    totalFunding: 25,
    lastRoundSize: 18,
    lastRoundDate: new Date('2024-01-28'),
    employees: 45,
    investors: ['True Ventures', 'Lerer Hippeau', 'Salesforce Ventures'],
    founders: [{ name: 'Jay Wright', role: 'CEO' }],
    products: ['Campfire Console', 'Campfire Pack', 'Cloud Collaboration'],
    website: 'campfire3d.com',
    tags: ['Collaboration', 'Holographic', 'Enterprise', 'Design'],
    traction: [
      { metric: 'Enterprise Customers', value: '200+' },
      { metric: 'Design Sessions', value: '1M+' },
    ]
  },
  {
    id: 's5',
    slug: 'tilt-five',
    name: 'Tilt Five',
    description: 'Tabletop AR gaming system that transforms board games into holographic experiences. Making AR gaming accessible and social.',
    founded: 2017,
    headquarters: 'San Mateo, CA',
    region: 'na',
    sector: 'Gaming',
    stage: 'Series A',
    totalFunding: 32,
    lastRoundSize: 22,
    lastRoundDate: new Date('2023-09-15'),
    employees: 65,
    investors: ['Arm', 'SOSV', 'Kickstarter backers'],
    founders: [{ name: 'Jeri Ellsworth', role: 'CEO' }],
    products: ['Tilt Five Glasses', 'Game Board', 'Developer Kit'],
    website: 'tiltfive.com',
    tags: ['Gaming', 'AR', 'Tabletop', 'Consumer'],
    traction: [
      { metric: 'Units Shipped', value: '50,000+' },
      { metric: 'Games Available', value: '25+' },
    ]
  },
  // European Startups
  {
    id: 's6',
    slug: 'varjo',
    name: 'Varjo',
    description: 'Finnish company building the world\'s highest resolution VR/XR headsets for professional use. Used in aerospace, automotive, and training.',
    founded: 2016,
    headquarters: 'Helsinki, Finland',
    region: 'eu',
    sector: 'Enterprise Hardware',
    stage: 'Series D+',
    totalFunding: 150,
    lastRoundSize: 54,
    lastRoundDate: new Date('2024-01-10'),
    employees: 250,
    investors: ['Atomico', 'EQT Ventures', 'NordicNinja'],
    founders: [{ name: 'Urho Konttori', role: 'CEO' }],
    products: ['XR-4', 'VR-3', 'Aero', 'Reality Cloud'],
    website: 'varjo.com',
    tags: ['Enterprise VR', 'High Resolution', 'Simulation', 'Training'],
    traction: [
      { metric: 'Enterprise Customers', value: '500+' },
      { metric: 'Simulator Programs', value: '1000+' },
    ]
  },
  {
    id: 's7',
    slug: 'ultraleap',
    name: 'Ultraleap',
    description: 'UK-based company specializing in hand tracking and mid-air haptics technology. Their sensors power hand tracking in many XR devices.',
    founded: 2013,
    headquarters: 'Bristol, UK',
    region: 'eu',
    sector: 'Input Technology',
    stage: 'Series D+',
    totalFunding: 130,
    lastRoundSize: 82,
    lastRoundDate: new Date('2023-08-22'),
    employees: 200,
    investors: ['Tencent', 'CMC Capital', 'IP Group'],
    founders: [{ name: 'Steve Cliffe', role: 'CEO' }],
    products: ['Leap Motion Controller 2', 'Stratos Platform', 'TouchFree'],
    website: 'ultraleap.com',
    tags: ['Hand Tracking', 'Haptics', 'Input', 'OEM'],
    traction: [
      { metric: 'Devices Shipped', value: '500,000+' },
      { metric: 'Developer Community', value: '400,000+' },
    ]
  },
  {
    id: 's8',
    slug: 'lynx-mixed-reality',
    name: 'Lynx Mixed Reality',
    description: 'French startup building affordable standalone MR headsets. The Lynx-R1 offers both VR and AR at a competitive price point.',
    founded: 2019,
    headquarters: 'Paris, France',
    region: 'eu',
    sector: 'Consumer Hardware',
    stage: 'Seed',
    totalFunding: 8,
    lastRoundSize: 4,
    lastRoundDate: new Date('2023-12-05'),
    employees: 25,
    investors: ['Kickstarter backers', 'Angel investors'],
    founders: [{ name: 'Stan Larroque', role: 'CEO' }],
    products: ['Lynx-R1'],
    website: 'lynx-r.com',
    tags: ['Mixed Reality', 'Standalone', 'Affordable', 'Open Source'],
    traction: [
      { metric: 'Kickstarter Raised', value: '€1.5M' },
      { metric: 'Pre-orders', value: '5,000+' },
    ]
  },
  {
    id: 's9',
    slug: 'gravity-sketch',
    name: 'Gravity Sketch',
    description: 'VR-native 3D design tool used by major automotive and product designers. Intuitive interface for creating professional designs in VR.',
    founded: 2014,
    headquarters: 'London, UK',
    region: 'eu',
    sector: 'Design Software',
    stage: 'Series B',
    totalFunding: 65,
    lastRoundSize: 33,
    lastRoundDate: new Date('2024-02-01'),
    employees: 85,
    investors: ['Point Nine', 'Forward Partners', 'Foundry Group'],
    founders: [{ name: 'Oluwaseyi Sosanya', role: 'CEO' }],
    products: ['Gravity Sketch', 'LandingPad'],
    website: 'gravitysketch.com',
    tags: ['Design', 'VR', 'CAD', 'Automotive'],
    traction: [
      { metric: 'Enterprise Users', value: '100,000+' },
      { metric: 'Fortune 500 Clients', value: '50+' },
    ]
  },
  // ASEAN Startups
  {
    id: 's10',
    slug: 'virtualtech-frontier',
    name: 'Virtualtech Frontier',
    description: 'Singapore-based XR solutions provider focusing on enterprise training and tourism experiences across Southeast Asia.',
    founded: 2018,
    headquarters: 'Singapore',
    region: 'asean',
    sector: 'Enterprise Solutions',
    stage: 'Series A',
    totalFunding: 18,
    lastRoundSize: 12,
    lastRoundDate: new Date('2024-01-20'),
    employees: 65,
    investors: ['Golden Gate Ventures', 'East Ventures', 'Temasek'],
    founders: [{ name: 'Kenny Tan', role: 'CEO' }],
    products: ['VTF Training', 'VTF Tourism', 'VTF Events'],
    website: 'virtualtechfrontier.com',
    tags: ['Enterprise', 'Training', 'Tourism', 'ASEAN'],
    traction: [
      { metric: 'Corporate Clients', value: '150+' },
      { metric: 'Users Trained', value: '500,000+' },
    ]
  },
  {
    id: 's11',
    slug: 'xctuality',
    name: 'XCTUALITY',
    description: 'Malaysian XR company creating immersive experiences for retail and real estate visualization in Southeast Asian markets.',
    founded: 2019,
    headquarters: 'Kuala Lumpur, Malaysia',
    region: 'asean',
    sector: 'Real Estate / Retail',
    stage: 'Seed',
    totalFunding: 5,
    lastRoundSize: 3,
    lastRoundDate: new Date('2023-11-15'),
    employees: 35,
    investors: ['Cradle Fund', '500 Global', 'MyStartr'],
    founders: [{ name: 'Ahmad Rizal', role: 'CEO' }],
    products: ['XCTUALITY Showroom', 'Property Viz', 'Retail XR'],
    website: 'xctuality.com',
    tags: ['Real Estate', 'Retail', 'Visualization', 'Malaysia'],
    traction: [
      { metric: 'Properties Visualized', value: '1,000+' },
      { metric: 'Retail Partners', value: '50+' },
    ]
  },
  // Pacific Startups
  {
    id: 's12',
    slug: 'xreal',
    name: 'Xreal (formerly Nreal)',
    description: 'Chinese AR glasses maker known for lightweight consumer AR glasses. Partnering with carriers globally for distribution.',
    founded: 2017,
    headquarters: 'Beijing, China',
    region: 'pacific',
    sector: 'Consumer Hardware',
    stage: 'Series C',
    totalFunding: 230,
    lastRoundSize: 60,
    lastRoundDate: new Date('2024-01-08'),
    employees: 500,
    investors: ['Alibaba', 'Sequoia China', 'Hillhouse'],
    founders: [{ name: 'Chi Xu', role: 'CEO' }],
    products: ['Air 2 Ultra', 'Air 2 Pro', 'Air 2', 'Beam Pro'],
    website: 'xreal.com',
    tags: ['AR Glasses', 'Consumer', 'Mobile AR', 'Entertainment'],
    traction: [
      { metric: 'Units Sold', value: '500,000+' },
      { metric: 'Carrier Partners', value: '20+' },
    ]
  },
  {
    id: 's13',
    slug: 'pimax',
    name: 'Pimax',
    description: 'Shanghai-based VR headset maker known for ultra-wide FOV headsets targeting enthusiast PC VR gamers.',
    founded: 2015,
    headquarters: 'Shanghai, China',
    region: 'pacific',
    sector: 'Gaming Hardware',
    stage: 'Series B',
    totalFunding: 45,
    lastRoundSize: 20,
    lastRoundDate: new Date('2023-10-12'),
    employees: 200,
    investors: ['ZhenFund', 'Shunwei Capital'],
    founders: [{ name: 'Robin Weng', role: 'CEO' }],
    products: ['Crystal', 'Crystal Light', '8K X', 'Portal'],
    website: 'pimax.com',
    tags: ['PC VR', 'Gaming', 'Wide FOV', 'Enthusiast'],
    traction: [
      { metric: 'Units Shipped', value: '100,000+' },
      { metric: 'Kickstarter Records', value: '2' },
    ]
  },
  // South Asia Startups
  {
    id: 's14',
    slug: 'ajnalens',
    name: 'AjnaLens',
    description: 'Indian enterprise AR glasses company focused on defense, manufacturing, and healthcare applications in the South Asian market.',
    founded: 2014,
    headquarters: 'Mumbai, India',
    region: 'south-asia',
    sector: 'Enterprise Hardware',
    stage: 'Series A',
    totalFunding: 12,
    lastRoundSize: 8,
    lastRoundDate: new Date('2024-02-05'),
    employees: 75,
    investors: ['InfoEdge Ventures', 'GVFL', 'Unicorn India Ventures'],
    founders: [{ name: 'Pankaj Raut', role: 'CEO' }],
    products: ['AjnaLite', 'AjnaBolt', 'AjnaXR Platform'],
    website: 'ajnalens.com',
    tags: ['Enterprise AR', 'Defense', 'Made in India', 'Manufacturing'],
    traction: [
      { metric: 'Defense Contracts', value: '5+' },
      { metric: 'Enterprise Deployments', value: '100+' },
    ]
  },
  {
    id: 's15',
    slug: 'smartvizx',
    name: 'SmartVizX',
    description: 'Indian VR/AR real estate visualization company helping developers showcase properties before construction.',
    founded: 2015,
    headquarters: 'Gurgaon, India',
    region: 'south-asia',
    sector: 'Real Estate Tech',
    stage: 'Series A',
    totalFunding: 8,
    lastRoundSize: 5,
    lastRoundDate: new Date('2023-12-18'),
    employees: 60,
    investors: ['pi Ventures', 'LetsVenture', 'Angel investors'],
    founders: [{ name: 'Gautam Tewari', role: 'CEO' }],
    products: ['PropVR', 'AR Brochure', 'Virtual Site Visit'],
    website: 'smartvizx.com',
    tags: ['Real Estate', 'VR', 'Visualization', 'India'],
    traction: [
      { metric: 'Properties Visualized', value: '5,000+' },
      { metric: 'Developer Partners', value: '200+' },
    ]
  },
  // MENA Startups
  {
    id: 's16',
    slug: 'xr-hub-dubai',
    name: 'XR Hub Dubai',
    description: 'UAE-based XR studio creating immersive experiences for tourism, entertainment, and government projects in the Middle East.',
    founded: 2020,
    headquarters: 'Dubai, UAE',
    region: 'mena',
    sector: 'Content Studio',
    stage: 'Seed',
    totalFunding: 6,
    lastRoundSize: 4,
    lastRoundDate: new Date('2024-01-25'),
    employees: 40,
    investors: ['Flat6Labs', 'DIFC FinTech Hive', 'Family offices'],
    founders: [{ name: 'Omar Hassan', role: 'CEO' }],
    products: ['Tourism XR', 'Museum AR', 'Event Experiences'],
    website: 'xrhubdubai.com',
    tags: ['Content', 'Tourism', 'Government', 'UAE'],
    traction: [
      { metric: 'Projects Delivered', value: '50+' },
      { metric: 'Museum Partners', value: '15+' },
    ]
  },
  {
    id: 's17',
    slug: 'metaverse-arabia',
    name: 'Metaverse Arabia',
    description: 'Saudi startup building Arabic-first metaverse experiences and virtual event platforms for the MENA market.',
    founded: 2022,
    headquarters: 'Riyadh, Saudi Arabia',
    region: 'mena',
    sector: 'Social/Events',
    stage: 'Seed',
    totalFunding: 8,
    lastRoundSize: 8,
    lastRoundDate: new Date('2024-02-10'),
    employees: 30,
    investors: ['Saudi Venture Capital', 'Sanabil Investments'],
    founders: [{ name: 'Mohammed Al-Rashid', role: 'CEO' }],
    products: ['Arabia Worlds', 'Virtual Majlis', 'Event Platform'],
    website: 'metaversearabia.com',
    tags: ['Metaverse', 'Arabic', 'Events', 'Saudi'],
    traction: [
      { metric: 'Virtual Events', value: '100+' },
      { metric: 'Active Users', value: '50,000+' },
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
