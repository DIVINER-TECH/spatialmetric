export interface Company {
  id: string;
  slug: string;
  name: string;
  ticker?: string;
  description: string;
  sector: string;
  region: 'na' | 'eu' | 'asean' | 'pacific' | 'south-asia' | 'mena';
  marketCap: number;
  stockPrice: number;
  priceChange: number;
  priceChangePercent: number;
  revenue: number;
  employees: number;
  founded: number;
  headquarters: string;
  ceo: string;
  website: string;
  tags: string[];
  metrics: {
    peRatio?: number;
    revenueGrowth: number;
    grossMargin: number;
    rAndDSpend: number;
  };
  xrProducts: string[];
  recentNews: { title: string; date: Date }[];
}

export const companies: Company[] = [
  // NORTH AMERICA
  {
    id: '1',
    slug: 'apple',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    description: 'Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories. With Vision Pro, Apple entered spatial computing at the premium end.',
    sector: 'Consumer Electronics',
    region: 'na',
    marketCap: 2850000000000,
    stockPrice: 182.52,
    priceChange: 2.34,
    priceChangePercent: 1.30,
    revenue: 383000000000,
    employees: 164000,
    founded: 1976,
    headquarters: 'Cupertino, CA',
    ceo: 'Tim Cook',
    website: 'apple.com',
    tags: ['Hardware', 'Software', 'Services', 'Vision Pro'],
    metrics: { peRatio: 28.5, revenueGrowth: -2.8, grossMargin: 44.1, rAndDSpend: 29500000000 },
    xrProducts: ['Vision Pro', 'ARKit', 'RealityKit', 'Reality Composer Pro'],
    recentNews: [
      { title: 'Vision Pro Launches in 8 New Countries', date: new Date('2024-02-15') },
      { title: 'visionOS 2.0 Announced at WWDC', date: new Date('2024-02-10') },
    ]
  },
  {
    id: '2',
    slug: 'meta',
    name: 'Meta Platforms Inc.',
    ticker: 'META',
    description: 'Meta develops products that enable people to connect through mobile devices, PCs, and VR headsets. Reality Labs is the largest investor in consumer XR.',
    sector: 'Social Media / Technology',
    region: 'na',
    marketCap: 1250000000000,
    stockPrice: 485.39,
    priceChange: -3.21,
    priceChangePercent: -0.66,
    revenue: 134900000000,
    employees: 67317,
    founded: 2004,
    headquarters: 'Menlo Park, CA',
    ceo: 'Mark Zuckerberg',
    website: 'meta.com',
    tags: ['Social Media', 'VR', 'Metaverse', 'Quest'],
    metrics: { peRatio: 32.1, revenueGrowth: 16.0, grossMargin: 80.8, rAndDSpend: 35338000000 },
    xrProducts: ['Quest 3', 'Quest Pro', 'Ray-Ban Meta', 'Horizon Worlds'],
    recentNews: [
      { title: 'Quest 3 Surpasses 10M Sales', date: new Date('2024-02-18') },
      { title: 'Reality Labs Q4 Losses at $4.6B', date: new Date('2024-02-01') },
    ]
  },
  {
    id: '3',
    slug: 'microsoft',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    description: 'Microsoft develops software, services, devices, and solutions. In XR, Microsoft focuses on enterprise through HoloLens and Mesh platform.',
    sector: 'Software / Cloud',
    region: 'na',
    marketCap: 3100000000000,
    stockPrice: 415.28,
    priceChange: 1.87,
    priceChangePercent: 0.45,
    revenue: 211900000000,
    employees: 221000,
    founded: 1975,
    headquarters: 'Redmond, WA',
    ceo: 'Satya Nadella',
    website: 'microsoft.com',
    tags: ['Cloud', 'Enterprise', 'HoloLens', 'Mesh'],
    metrics: { peRatio: 36.2, revenueGrowth: 7.0, grossMargin: 69.4, rAndDSpend: 27195000000 },
    xrProducts: ['HoloLens 2', 'Mesh', 'IVAS', 'Mixed Reality Toolkit'],
    recentNews: [
      { title: 'Microsoft Mesh Generally Available', date: new Date('2024-02-12') },
      { title: 'IVAS Contract Extended to $21.9B', date: new Date('2024-01-22') },
    ]
  },
  {
    id: '4',
    slug: 'nvidia',
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    description: 'NVIDIA designs GPUs for gaming, professional visualization, data centers, and automotive. Technology underpins most high-end XR experiences.',
    sector: 'Semiconductors',
    region: 'na',
    marketCap: 1850000000000,
    stockPrice: 742.89,
    priceChange: 15.62,
    priceChangePercent: 2.15,
    revenue: 60900000000,
    employees: 26196,
    founded: 1993,
    headquarters: 'Santa Clara, CA',
    ceo: 'Jensen Huang',
    website: 'nvidia.com',
    tags: ['GPUs', 'AI', 'Gaming', 'Omniverse'],
    metrics: { peRatio: 65.8, revenueGrowth: 122.0, grossMargin: 74.0, rAndDSpend: 8675000000 },
    xrProducts: ['GeForce RTX', 'Omniverse', 'CloudXR', 'DLSS'],
    recentNews: [
      { title: 'NVIDIA Announces XR-Specific Chip', date: new Date('2024-02-19') },
      { title: 'Omniverse Cloud Expands', date: new Date('2024-02-05') },
    ]
  },
  {
    id: '5',
    slug: 'qualcomm',
    name: 'Qualcomm Inc.',
    ticker: 'QCOM',
    description: 'Qualcomm develops wireless technology and semiconductors. Snapdragon XR powers most standalone XR headsets.',
    sector: 'Semiconductors',
    region: 'na',
    marketCap: 192000000000,
    stockPrice: 171.45,
    priceChange: -1.23,
    priceChangePercent: -0.71,
    revenue: 35820000000,
    employees: 51000,
    founded: 1985,
    headquarters: 'San Diego, CA',
    ceo: 'Cristiano Amon',
    website: 'qualcomm.com',
    tags: ['Chips', 'XR Platform', '5G', 'Snapdragon'],
    metrics: { peRatio: 22.4, revenueGrowth: -19.0, grossMargin: 55.8, rAndDSpend: 8832000000 },
    xrProducts: ['Snapdragon XR2 Gen 2', 'Snapdragon AR2', 'Snapdragon Spaces'],
    recentNews: [
      { title: 'Snapdragon XR2+ Gen 2 for Samsung', date: new Date('2024-02-20') },
      { title: 'AR2 Chip Enables Slim Glasses', date: new Date('2024-02-08') },
    ]
  },
  {
    id: '6',
    slug: 'unity',
    name: 'Unity Technologies',
    ticker: 'U',
    description: 'Unity provides a platform for creating real-time 3D content. Powers ~70% of XR applications.',
    sector: 'Software',
    region: 'na',
    marketCap: 11200000000,
    stockPrice: 28.45,
    priceChange: 0.82,
    priceChangePercent: 2.97,
    revenue: 2190000000,
    employees: 7200,
    founded: 2004,
    headquarters: 'San Francisco, CA',
    ceo: 'Jim Whitehurst',
    website: 'unity.com',
    tags: ['Game Engine', 'XR Development', '3D', 'Tools'],
    metrics: { peRatio: undefined, revenueGrowth: 8.0, grossMargin: 72.0, rAndDSpend: 925000000 },
    xrProducts: ['Unity XR Plugin', 'PolySpatial', 'MARS', 'XR Interaction Toolkit'],
    recentNews: [
      { title: 'PolySpatial for visionOS GA', date: new Date('2024-02-14') },
      { title: 'Unity 6 Preview with XR Focus', date: new Date('2024-01-05') },
    ]
  },
  {
    id: '7',
    slug: 'snap',
    name: 'Snap Inc.',
    ticker: 'SNAP',
    description: 'Snap operates Snapchat, a visual messaging app. Leader in mobile AR through Lens Studio.',
    sector: 'Social Media / AR',
    region: 'na',
    marketCap: 18500000000,
    stockPrice: 11.28,
    priceChange: 0.34,
    priceChangePercent: 3.11,
    revenue: 4600000000,
    employees: 5300,
    founded: 2011,
    headquarters: 'Santa Monica, CA',
    ceo: 'Evan Spiegel',
    website: 'snap.com',
    tags: ['Social Media', 'AR Filters', 'Advertising', 'Spectacles'],
    metrics: { peRatio: undefined, revenueGrowth: -5.0, grossMargin: 54.2, rAndDSpend: 2100000000 },
    xrProducts: ['Lens Studio', 'Spectacles', 'AR Enterprise Services'],
    recentNews: [
      { title: 'Spectacles 5 Developer Program', date: new Date('2024-02-17') },
      { title: 'AR Advertising Hits $2.1B', date: new Date('2024-02-03') },
    ]
  },
  {
    id: '8',
    slug: 'magic-leap',
    name: 'Magic Leap',
    ticker: undefined,
    description: 'Magic Leap develops AR headsets and spatial computing technology. Pivoted to enterprise with success in healthcare and defense.',
    sector: 'XR Hardware / Software',
    region: 'na',
    marketCap: 2000000000,
    stockPrice: 0,
    priceChange: 0,
    priceChangePercent: 0,
    revenue: 250000000,
    employees: 1500,
    founded: 2010,
    headquarters: 'Plantation, FL',
    ceo: 'Peggy Johnson',
    website: 'magicleap.com',
    tags: ['AR Glasses', 'Enterprise', 'Healthcare', 'Private'],
    metrics: { peRatio: undefined, revenueGrowth: 45.0, grossMargin: 25.0, rAndDSpend: 450000000 },
    xrProducts: ['Magic Leap 2', 'Lumin OS', 'Enterprise Suite'],
    recentNews: [
      { title: 'Magic Leap Raises $500M Series F', date: new Date('2024-02-11') },
      { title: 'FDA Approval for Surgical AR', date: new Date('2024-01-28') },
    ]
  },
  // PACIFIC (Japan, Korea)
  {
    id: '9',
    slug: 'sony',
    name: 'Sony Group Corporation',
    ticker: 'SONY',
    description: 'Sony is a diversified electronics and entertainment conglomerate. Provides micro-OLED displays for Vision Pro and develops PlayStation VR.',
    sector: 'Consumer Electronics / Entertainment',
    region: 'pacific',
    marketCap: 115000000000,
    stockPrice: 91.23,
    priceChange: 0.45,
    priceChangePercent: 0.50,
    revenue: 88700000000,
    employees: 113000,
    founded: 1946,
    headquarters: 'Tokyo, Japan',
    ceo: 'Kenichiro Yoshida',
    website: 'sony.com',
    tags: ['Gaming', 'Displays', 'Entertainment', 'PlayStation VR'],
    metrics: { peRatio: 16.8, revenueGrowth: 17.0, grossMargin: 34.2, rAndDSpend: 6800000000 },
    xrProducts: ['PlayStation VR2', 'Micro-OLED Displays', 'Spatial Reality Display'],
    recentNews: [
      { title: 'PSVR2 PC Adapter Announced', date: new Date('2024-02-16') },
      { title: 'Sony Expands Micro-OLED Production', date: new Date('2024-02-02') },
    ]
  },
  {
    id: '10',
    slug: 'samsung',
    name: 'Samsung Electronics',
    ticker: '005930.KS',
    description: 'Samsung is a global leader in electronics. Partnering with Google for Android XR headset.',
    sector: 'Consumer Electronics',
    region: 'pacific',
    marketCap: 320000000000,
    stockPrice: 52.80,
    priceChange: 1.20,
    priceChangePercent: 2.32,
    revenue: 234000000000,
    employees: 267937,
    founded: 1969,
    headquarters: 'Seoul, South Korea',
    ceo: 'Jong-Hee Han',
    website: 'samsung.com',
    tags: ['Electronics', 'Displays', 'Android XR', 'Components'],
    metrics: { peRatio: 12.5, revenueGrowth: -14.0, grossMargin: 35.8, rAndDSpend: 18500000000 },
    xrProducts: ['Galaxy XR (Project Moohan)', 'Display Panels', 'Memory/Storage'],
    recentNews: [
      { title: 'Android XR Headset Unveiled', date: new Date('2024-02-21') },
      { title: 'Samsung-Google Partnership Deepens', date: new Date('2024-02-15') },
    ]
  },
  {
    id: '11',
    slug: 'google',
    name: 'Alphabet Inc.',
    ticker: 'GOOGL',
    description: 'Alphabet includes Google, which dominates search and mobile OS. Re-entering XR through Android XR platform.',
    sector: 'Technology / Advertising',
    region: 'na',
    marketCap: 1950000000000,
    stockPrice: 155.72,
    priceChange: 2.18,
    priceChangePercent: 1.42,
    revenue: 307400000000,
    employees: 182502,
    founded: 1998,
    headquarters: 'Mountain View, CA',
    ceo: 'Sundar Pichai',
    website: 'abc.xyz',
    tags: ['Android XR', 'Search', 'Cloud', 'AI'],
    metrics: { peRatio: 24.6, revenueGrowth: 9.0, grossMargin: 57.5, rAndDSpend: 39500000000 },
    xrProducts: ['Android XR', 'ARCore', 'Project Starline', 'Immersive Stream'],
    recentNews: [
      { title: 'Android XR Announced with Samsung', date: new Date('2024-02-21') },
      { title: 'Gemini AI for Spatial Computing', date: new Date('2024-02-08') },
    ]
  },
  // EUROPE
  {
    id: '12',
    slug: 'varjo',
    name: 'Varjo Technologies',
    ticker: undefined,
    description: 'Finnish company building highest resolution VR/XR headsets for professional use in aerospace, automotive, and training.',
    sector: 'Enterprise Hardware',
    region: 'eu',
    marketCap: 500000000,
    stockPrice: 0,
    priceChange: 0,
    priceChangePercent: 0,
    revenue: 80000000,
    employees: 250,
    founded: 2016,
    headquarters: 'Helsinki, Finland',
    ceo: 'Urho Konttori',
    website: 'varjo.com',
    tags: ['Enterprise VR', 'High Resolution', 'Simulation', 'Training'],
    metrics: { peRatio: undefined, revenueGrowth: 35.0, grossMargin: 45.0, rAndDSpend: 30000000 },
    xrProducts: ['XR-4', 'VR-3', 'Aero', 'Reality Cloud'],
    recentNews: [
      { title: 'XR-4 Launches with Eye Tracking', date: new Date('2024-02-10') },
      { title: '$54M Series D Raised', date: new Date('2024-01-15') },
    ]
  },
  {
    id: '13',
    slug: 'ultraleap',
    name: 'Ultraleap',
    ticker: undefined,
    description: 'UK company specializing in hand tracking and mid-air haptics technology for XR devices.',
    sector: 'Input Technology',
    region: 'eu',
    marketCap: 300000000,
    stockPrice: 0,
    priceChange: 0,
    priceChangePercent: 0,
    revenue: 45000000,
    employees: 200,
    founded: 2013,
    headquarters: 'Bristol, UK',
    ceo: 'Steve Cliffe',
    website: 'ultraleap.com',
    tags: ['Hand Tracking', 'Haptics', 'Input', 'OEM'],
    metrics: { peRatio: undefined, revenueGrowth: 28.0, grossMargin: 52.0, rAndDSpend: 18000000 },
    xrProducts: ['Leap Motion Controller 2', 'Stratos Platform', 'TouchFree'],
    recentNews: [
      { title: 'Leap Motion Controller 2 Ships', date: new Date('2024-02-08') },
      { title: 'New Haptics Partnership', date: new Date('2024-01-20') },
    ]
  },
  // PACIFIC (China)
  {
    id: '14',
    slug: 'pico',
    name: 'Pico (ByteDance)',
    ticker: undefined,
    description: 'Chinese VR headset maker owned by ByteDance, competing in consumer and enterprise markets globally.',
    sector: 'Consumer Electronics',
    region: 'pacific',
    marketCap: 3000000000,
    stockPrice: 0,
    priceChange: 0,
    priceChangePercent: 0,
    revenue: 800000000,
    employees: 2000,
    founded: 2015,
    headquarters: 'Beijing, China',
    ceo: 'Zhou Hongwei',
    website: 'pico-interactive.com',
    tags: ['VR Headsets', 'Consumer', 'Enterprise', 'ByteDance'],
    metrics: { peRatio: undefined, revenueGrowth: 25.0, grossMargin: 20.0, rAndDSpend: 200000000 },
    xrProducts: ['Pico 4', 'Pico 4 Enterprise', 'Pico Neo 3'],
    recentNews: [
      { title: 'Pico 5 Development Confirmed', date: new Date('2024-02-12') },
      { title: 'EU Market Expansion', date: new Date('2024-01-25') },
    ]
  },
  {
    id: '15',
    slug: 'xreal',
    name: 'Xreal (Nreal)',
    ticker: undefined,
    description: 'Chinese AR glasses maker known for lightweight consumer AR glasses with global carrier partnerships.',
    sector: 'Consumer AR',
    region: 'pacific',
    marketCap: 1500000000,
    stockPrice: 0,
    priceChange: 0,
    priceChangePercent: 0,
    revenue: 350000000,
    employees: 500,
    founded: 2017,
    headquarters: 'Beijing, China',
    ceo: 'Chi Xu',
    website: 'xreal.com',
    tags: ['AR Glasses', 'Consumer', 'Mobile AR', 'Entertainment'],
    metrics: { peRatio: undefined, revenueGrowth: 85.0, grossMargin: 30.0, rAndDSpend: 80000000 },
    xrProducts: ['Air 2 Ultra', 'Air 2 Pro', 'Air 2', 'Beam Pro'],
    recentNews: [
      { title: 'Air 2 Ultra with 6DoF Ships', date: new Date('2024-02-05') },
      { title: '$60M Series C Raised', date: new Date('2024-01-08') },
    ]
  },
  // SOUTH ASIA
  {
    id: '16',
    slug: 'reliance-jio',
    name: 'Reliance Jio',
    ticker: 'RELIANCE.NS',
    description: 'India\'s largest telecom operator with significant XR and metaverse investments.',
    sector: 'Telecommunications',
    region: 'south-asia',
    marketCap: 92000000000,
    stockPrice: 2850.00,
    priceChange: 45.00,
    priceChangePercent: 1.60,
    revenue: 95000000000,
    employees: 400000,
    founded: 2016,
    headquarters: 'Mumbai, India',
    ceo: 'Mukesh Ambani',
    website: 'jio.com',
    tags: ['Telecom', '5G', 'Metaverse', 'India'],
    metrics: { peRatio: 28.5, revenueGrowth: 12.0, grossMargin: 42.0, rAndDSpend: 2500000000 },
    xrProducts: ['JioGlass', 'JioMeet VR', 'JioMart XR'],
    recentNews: [
      { title: 'JioGlass 2.0 Announced', date: new Date('2024-02-10') },
      { title: 'Metaverse Partnership with Meta', date: new Date('2024-01-22') },
    ]
  },
  // ASEAN
  {
    id: '17',
    slug: 'sea-limited',
    name: 'Sea Limited',
    ticker: 'SE',
    description: 'Singapore-based tech conglomerate with gaming (Garena), e-commerce, and fintech. Exploring XR for gaming and commerce.',
    sector: 'Technology',
    region: 'asean',
    marketCap: 28000000000,
    stockPrice: 48.50,
    priceChange: 1.20,
    priceChangePercent: 2.54,
    revenue: 13000000000,
    employees: 60000,
    founded: 2009,
    headquarters: 'Singapore',
    ceo: 'Forrest Li',
    website: 'sea.com',
    tags: ['Gaming', 'E-commerce', 'Fintech', 'ASEAN'],
    metrics: { peRatio: undefined, revenueGrowth: 5.0, grossMargin: 40.0, rAndDSpend: 1200000000 },
    xrProducts: ['Garena VR Games', 'Shopee AR Try-On'],
    recentNews: [
      { title: 'VR Gaming Studio Acquired', date: new Date('2024-02-08') },
      { title: 'AR Shopping Features Launch', date: new Date('2024-01-15') },
    ]
  },
  // MENA
  {
    id: '18',
    slug: 'neom',
    name: 'NEOM',
    ticker: undefined,
    description: 'Saudi mega-project building a futuristic city with XR integrated into infrastructure.',
    sector: 'Real Estate / Technology',
    region: 'mena',
    marketCap: 0,
    stockPrice: 0,
    priceChange: 0,
    priceChangePercent: 0,
    revenue: 0,
    employees: 5000,
    founded: 2017,
    headquarters: 'NEOM, Saudi Arabia',
    ceo: 'Nadhmi Al-Nasr',
    website: 'neom.com',
    tags: ['Smart City', 'Vision 2030', 'XR Infrastructure', 'Government'],
    metrics: { peRatio: undefined, revenueGrowth: 0, grossMargin: 0, rAndDSpend: 5000000000 },
    xrProducts: ['City-wide AR', 'VR Tourism', 'Digital Twin'],
    recentNews: [
      { title: 'XR Experience Center Opens', date: new Date('2024-02-18') },
      { title: '$2B Tech Investment Announced', date: new Date('2024-01-30') },
    ]
  },
  // More companies...
  {
    id: '19',
    slug: 'htc',
    name: 'HTC Corporation',
    ticker: '2498.TW',
    description: 'Taiwanese electronics company, pioneer in VR with Vive line of headsets.',
    sector: 'Consumer Electronics',
    region: 'pacific',
    marketCap: 1200000000,
    stockPrice: 38.50,
    priceChange: 0.85,
    priceChangePercent: 2.26,
    revenue: 520000000,
    employees: 3000,
    founded: 1997,
    headquarters: 'Taoyuan, Taiwan',
    ceo: 'Yves Maitre',
    website: 'htc.com',
    tags: ['VR', 'Vive', 'Enterprise', 'Consumer'],
    metrics: { peRatio: undefined, revenueGrowth: -12.0, grossMargin: 28.0, rAndDSpend: 150000000 },
    xrProducts: ['Vive XR Elite', 'Vive Focus 3', 'Vive Pro 2', 'Viverse'],
    recentNews: [
      { title: 'Vive XR Elite Update', date: new Date('2024-02-05') },
      { title: 'Enterprise Focus Deepens', date: new Date('2024-01-18') },
    ]
  },
  {
    id: '20',
    slug: 'epic-games',
    name: 'Epic Games',
    ticker: undefined,
    description: 'Creator of Unreal Engine and Fortnite. Unreal powers high-end XR experiences.',
    sector: 'Software / Gaming',
    region: 'na',
    marketCap: 32000000000,
    stockPrice: 0,
    priceChange: 0,
    priceChangePercent: 0,
    revenue: 6000000000,
    employees: 3000,
    founded: 1991,
    headquarters: 'Cary, NC',
    ceo: 'Tim Sweeney',
    website: 'epicgames.com',
    tags: ['Game Engine', 'Gaming', 'Metaverse', 'Tools'],
    metrics: { peRatio: undefined, revenueGrowth: 8.0, grossMargin: 65.0, rAndDSpend: 800000000 },
    xrProducts: ['Unreal Engine 5', 'MetaHuman', 'Fortnite XR'],
    recentNews: [
      { title: 'UE5.4 with XR Improvements', date: new Date('2024-02-12') },
      { title: 'Vision Pro Support Added', date: new Date('2024-02-01') },
    ]
  }
];

export const getCompanyBySlug = (slug: string): Company | undefined => {
  return companies.find(c => c.slug === slug);
};

export const getPublicCompanies = (): Company[] => {
  return companies.filter(c => c.ticker);
};

export const getCompaniesBySector = (sector: string): Company[] => {
  return companies.filter(c => c.sector.toLowerCase().includes(sector.toLowerCase()));
};

export const getCompaniesByRegion = (region: string): Company[] => {
  return companies.filter(c => c.region === region);
};
