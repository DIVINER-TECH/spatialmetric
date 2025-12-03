export interface Company {
  id: string;
  slug: string;
  name: string;
  ticker?: string;
  description: string;
  sector: string;
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
  recentNews: {
    title: string;
    date: Date;
  }[];
}

export const companies: Company[] = [
  {
    id: '1',
    slug: 'apple',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    description: 'Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories. With Vision Pro, Apple entered the spatial computing market, positioning itself at the premium end with a focus on productivity and entertainment.',
    sector: 'Consumer Electronics',
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
    metrics: {
      peRatio: 28.5,
      revenueGrowth: -2.8,
      grossMargin: 44.1,
      rAndDSpend: 29500000000
    },
    xrProducts: ['Vision Pro', 'ARKit', 'RealityKit', 'Reality Composer Pro'],
    recentNews: [
      { title: 'Vision Pro Launches in 8 New Countries', date: new Date('2024-02-15') },
      { title: 'visionOS 2.0 Announced at WWDC', date: new Date('2024-02-10') },
      { title: 'Apple Acquires AR Startup for $200M', date: new Date('2024-01-28') }
    ]
  },
  {
    id: '2',
    slug: 'meta',
    name: 'Meta Platforms Inc.',
    ticker: 'META',
    description: 'Meta Platforms develops products that enable people to connect through mobile devices, PCs, and VR headsets. The company\'s Reality Labs division is the largest investor in consumer XR, with Quest headsets leading the market.',
    sector: 'Social Media / Technology',
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
    metrics: {
      peRatio: 32.1,
      revenueGrowth: 16.0,
      grossMargin: 80.8,
      rAndDSpend: 35338000000
    },
    xrProducts: ['Quest 3', 'Quest Pro', 'Ray-Ban Meta', 'Horizon Worlds', 'Presence Platform'],
    recentNews: [
      { title: 'Quest 3 Surpasses 10M Sales', date: new Date('2024-02-18') },
      { title: 'Reality Labs Q4 Losses at $4.6B', date: new Date('2024-02-01') },
      { title: 'Meta Partners with LG for Next-Gen Display', date: new Date('2024-01-15') }
    ]
  },
  {
    id: '3',
    slug: 'microsoft',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    description: 'Microsoft develops and supports software, services, devices, and solutions. In XR, Microsoft focuses on enterprise applications through HoloLens and the Mesh platform, with significant partnerships including the U.S. military IVAS contract.',
    sector: 'Software / Cloud',
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
    metrics: {
      peRatio: 36.2,
      revenueGrowth: 7.0,
      grossMargin: 69.4,
      rAndDSpend: 27195000000
    },
    xrProducts: ['HoloLens 2', 'Mesh', 'IVAS (Military)', 'AltspaceVR', 'Mixed Reality Toolkit'],
    recentNews: [
      { title: 'Microsoft Mesh Generally Available', date: new Date('2024-02-12') },
      { title: 'IVAS Contract Extended to $21.9B', date: new Date('2024-01-22') },
      { title: 'Partnership with Meta Deepens', date: new Date('2024-01-10') }
    ]
  },
  {
    id: '4',
    slug: 'nvidia',
    name: 'NVIDIA Corporation',
    ticker: 'NVDA',
    description: 'NVIDIA designs GPUs for gaming, professional visualization, data centers, and automotive markets. The company\'s technology underpins most high-end XR experiences, from PC VR rendering to AI-powered spatial computing features.',
    sector: 'Semiconductors',
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
    metrics: {
      peRatio: 65.8,
      revenueGrowth: 122.0,
      grossMargin: 74.0,
      rAndDSpend: 8675000000
    },
    xrProducts: ['GeForce RTX', 'Omniverse', 'CloudXR', 'DLSS', 'Maxine'],
    recentNews: [
      { title: 'NVIDIA Announces XR-Specific Chip', date: new Date('2024-02-19') },
      { title: 'Omniverse Cloud Expands to Vision Pro', date: new Date('2024-02-05') },
      { title: 'RTX 50 Series to Transform PC VR', date: new Date('2024-01-30') }
    ]
  },
  {
    id: '5',
    slug: 'qualcomm',
    name: 'Qualcomm Inc.',
    ticker: 'QCOM',
    description: 'Qualcomm develops and licenses wireless technology and designs semiconductors. The Snapdragon XR platform powers the vast majority of standalone XR headsets, making Qualcomm the dominant chip supplier in the market.',
    sector: 'Semiconductors',
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
    metrics: {
      peRatio: 22.4,
      revenueGrowth: -19.0,
      grossMargin: 55.8,
      rAndDSpend: 8832000000
    },
    xrProducts: ['Snapdragon XR2 Gen 2', 'Snapdragon AR2', 'Snapdragon Spaces', 'XR Reference Design'],
    recentNews: [
      { title: 'Snapdragon XR2+ Gen 2 for Samsung', date: new Date('2024-02-20') },
      { title: 'AR2 Chip Enables Slim Glasses', date: new Date('2024-02-08') },
      { title: 'Qualcomm Extends XR Reference Program', date: new Date('2024-01-25') }
    ]
  },
  {
    id: '6',
    slug: 'unity',
    name: 'Unity Technologies',
    ticker: 'U',
    description: 'Unity provides a platform for creating and operating real-time 3D content. The company\'s engine powers approximately 70% of XR applications, making it essential infrastructure for the spatial computing ecosystem.',
    sector: 'Software',
    marketCap: 11200000000,
    stockPrice: 28.45,
    priceChange: 0.82,
    priceChangePercent: 2.97,
    revenue: 2190000000,
    employees: 7200,
    founded: 2004,
    headquarters: 'San Francisco, CA',
    ceo: 'Jim Whitehurst (Interim)',
    website: 'unity.com',
    tags: ['Game Engine', 'XR Development', '3D', 'Tools'],
    metrics: {
      peRatio: undefined,
      revenueGrowth: 8.0,
      grossMargin: 72.0,
      rAndDSpend: 925000000
    },
    xrProducts: ['Unity XR Plugin', 'PolySpatial', 'MARS', 'XR Interaction Toolkit'],
    recentNews: [
      { title: 'PolySpatial for visionOS GA', date: new Date('2024-02-14') },
      { title: 'Runtime Fee Revisions Announced', date: new Date('2024-01-18') },
      { title: 'Unity 6 Preview with XR Focus', date: new Date('2024-01-05') }
    ]
  },
  {
    id: '7',
    slug: 'sony',
    name: 'Sony Group Corporation',
    ticker: 'SONY',
    description: 'Sony is a diversified electronics and entertainment conglomerate. In XR, Sony provides critical display components (micro-OLED for Vision Pro) and develops PlayStation VR, the leading console-based VR platform.',
    sector: 'Consumer Electronics / Entertainment',
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
    metrics: {
      peRatio: 16.8,
      revenueGrowth: 17.0,
      grossMargin: 34.2,
      rAndDSpend: 6800000000
    },
    xrProducts: ['PlayStation VR2', 'Micro-OLED Displays', 'Spatial Reality Display', 'Mocopi'],
    recentNews: [
      { title: 'PSVR2 PC Adapter Announced', date: new Date('2024-02-16') },
      { title: 'Sony Expands Micro-OLED Production', date: new Date('2024-02-02') },
      { title: 'Vision Pro Display Partnership Details', date: new Date('2024-01-20') }
    ]
  },
  {
    id: '8',
    slug: 'google',
    name: 'Alphabet Inc.',
    ticker: 'GOOGL',
    description: 'Alphabet is a collection of companies including Google, which dominates search, advertising, and mobile OS. After stepping back from consumer AR hardware, Google is re-entering XR through Android XR and partnerships with Samsung.',
    sector: 'Technology / Advertising',
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
    metrics: {
      peRatio: 24.6,
      revenueGrowth: 9.0,
      grossMargin: 57.5,
      rAndDSpend: 39500000000
    },
    xrProducts: ['Android XR', 'ARCore', 'Project Starline', 'Google Lens', 'Immersive Stream'],
    recentNews: [
      { title: 'Android XR Announced with Samsung', date: new Date('2024-02-21') },
      { title: 'Gemini AI for Spatial Computing', date: new Date('2024-02-08') },
      { title: 'Project Starline Partners Revealed', date: new Date('2024-01-12') }
    ]
  },
  {
    id: '9',
    slug: 'magic-leap',
    name: 'Magic Leap',
    ticker: undefined,
    description: 'Magic Leap is a private company developing AR headsets and spatial computing technology. After pivoting from consumer to enterprise, the company has found success in healthcare, manufacturing, and defense applications.',
    sector: 'XR Hardware / Software',
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
    metrics: {
      peRatio: undefined,
      revenueGrowth: 45.0,
      grossMargin: 25.0,
      rAndDSpend: 450000000
    },
    xrProducts: ['Magic Leap 2', 'Lumin OS', 'Enterprise Suite', 'Healthcare Visualization'],
    recentNews: [
      { title: 'Magic Leap Raises $500M Series F', date: new Date('2024-02-11') },
      { title: 'FDA Approval for Surgical AR', date: new Date('2024-01-28') },
      { title: 'Defense Contract with NATO Announced', date: new Date('2024-01-15') }
    ]
  },
  {
    id: '10',
    slug: 'snap',
    name: 'Snap Inc.',
    ticker: 'SNAP',
    description: 'Snap Inc. operates Snapchat, the visual messaging application. The company is a leader in mobile AR through Lens Studio, with AR advertising representing a growing portion of revenue. Snap is also developing AR glasses (Spectacles).',
    sector: 'Social Media / AR',
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
    metrics: {
      peRatio: undefined,
      revenueGrowth: -5.0,
      grossMargin: 54.2,
      rAndDSpend: 2100000000
    },
    xrProducts: ['Lens Studio', 'Spectacles', 'AR Enterprise Services', 'SnapML'],
    recentNews: [
      { title: 'Spectacles 5 Developer Program', date: new Date('2024-02-17') },
      { title: 'AR Advertising Hits $2.1B', date: new Date('2024-02-03') },
      { title: 'Lens Studio 5.0 with AI Features', date: new Date('2024-01-22') }
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
  return companies.filter(c => c.sector.includes(sector));
};
