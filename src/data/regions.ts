export interface RegionalMetrics {
  region: string;
  regionCode: 'global' | 'na' | 'eu' | 'asean' | 'pacific' | 'south-asia' | 'mena';
  displayName: string;
  totalInvestment: number; // USD millions
  dealCount: number;
  avgDealSize: number;
  yoyGrowth: number;
  topSectors: string[];
  activeVCs: number;
  unicornCount: number;
  exitCount: number;
  marketSize: number;
  adoptionRate: number;
  keyPlayers: string[];
  emergingStartups: string[];
  regulatoryScore: number; // 1-10
  talentPoolScore: number; // 1-10
  quarterlyData: { quarter: string; investment: number; deals: number }[];
}

export const regionalData: RegionalMetrics[] = [
  {
    region: 'Global',
    regionCode: 'global',
    displayName: 'Global Overview',
    totalInvestment: 18500,
    dealCount: 1124,
    avgDealSize: 16.5,
    yoyGrowth: 34.2,
    topSectors: ['Enterprise XR', 'AI-XR Convergence', 'Healthcare', 'Training', 'Gaming'],
    activeVCs: 428,
    unicornCount: 24,
    exitCount: 38,
    marketSize: 89400,
    adoptionRate: 14.8,
    keyPlayers: ['Meta', 'Apple', 'Microsoft', 'Google', 'Sony', 'Samsung'],
    emergingStartups: ['Magic Leap', 'Varjo', 'Xreal', 'ImmersiveTouch', 'Spatial'],
    regulatoryScore: 7,
    talentPoolScore: 8,
    quarterlyData: [
      { quarter: 'Q1 2025', investment: 4200, deals: 268 },
      { quarter: 'Q2 2025', investment: 4650, deals: 285 },
      { quarter: 'Q3 2025', investment: 4900, deals: 298 },
      { quarter: 'Q4 2025', investment: 4750, deals: 273 },
    ]
  },
  {
    region: 'North America',
    regionCode: 'na',
    displayName: 'North America',
    totalInvestment: 8420,
    dealCount: 418,
    avgDealSize: 20.1,
    yoyGrowth: 28.5,
    topSectors: ['Enterprise', 'Healthcare', 'Defense', 'AI-XR', 'Gaming'],
    activeVCs: 234,
    unicornCount: 16,
    exitCount: 22,
    marketSize: 35800,
    adoptionRate: 18.2,
    keyPlayers: ['Meta', 'Apple', 'Microsoft', 'Magic Leap', 'Snap', 'Google'],
    emergingStartups: ['Anduril', 'ImmersiveTouch', 'Mojo Vision', 'Campfire', 'Tilt Five'],
    regulatoryScore: 8,
    talentPoolScore: 9,
    quarterlyData: [
      { quarter: 'Q1 2025', investment: 1920, deals: 98 },
      { quarter: 'Q2 2025', investment: 2150, deals: 108 },
      { quarter: 'Q3 2025', investment: 2280, deals: 115 },
      { quarter: 'Q4 2025', investment: 2070, deals: 97 },
    ]
  },
  {
    region: 'Europe',
    regionCode: 'eu',
    displayName: 'European Union',
    totalInvestment: 3480,
    dealCount: 278,
    avgDealSize: 12.5,
    yoyGrowth: 38.2,
    topSectors: ['Industrial', 'Automotive', 'Healthcare', 'Cultural Heritage', 'Education'],
    activeVCs: 98,
    unicornCount: 4,
    exitCount: 8,
    marketSize: 18200,
    adoptionRate: 12.4,
    keyPlayers: ['Varjo', 'Ultraleap', 'SenseGlove', 'TeamViewer', 'HTC Europe'],
    emergingStartups: ['Lynx', 'Gravity Sketch', 'VRdirect', 'Imverse', 'Dimension10'],
    regulatoryScore: 9,
    talentPoolScore: 8,
    quarterlyData: [
      { quarter: 'Q1 2025', investment: 780, deals: 64 },
      { quarter: 'Q2 2025', investment: 880, deals: 72 },
      { quarter: 'Q3 2025', investment: 950, deals: 76 },
      { quarter: 'Q4 2025', investment: 870, deals: 66 },
    ]
  },
  {
    region: 'ASEAN',
    regionCode: 'asean',
    displayName: 'ASEAN Region',
    totalInvestment: 2180,
    dealCount: 186,
    avgDealSize: 11.7,
    yoyGrowth: 52.4,
    topSectors: ['Gaming', 'E-commerce', 'Tourism', 'Education', 'Manufacturing'],
    activeVCs: 56,
    unicornCount: 2,
    exitCount: 4,
    marketSize: 9800,
    adoptionRate: 8.6,
    keyPlayers: ['Sea Limited', 'Grab', 'GoTo', 'Razer', 'Ant Group'],
    emergingStartups: ['Virtualtech Frontier', 'XCTUALITY', 'V-Cube', 'AmazeVR Asia', 'Matterverse'],
    regulatoryScore: 6,
    talentPoolScore: 7,
    quarterlyData: [
      { quarter: 'Q1 2025', investment: 480, deals: 42 },
      { quarter: 'Q2 2025', investment: 550, deals: 48 },
      { quarter: 'Q3 2025', investment: 620, deals: 54 },
      { quarter: 'Q4 2025', investment: 530, deals: 42 },
    ]
  },
  {
    region: 'Pacific',
    regionCode: 'pacific',
    displayName: 'Asia-Pacific',
    totalInvestment: 2840,
    dealCount: 212,
    avgDealSize: 13.4,
    yoyGrowth: 35.8,
    topSectors: ['Gaming', 'Enterprise', 'Retail', 'Entertainment', 'Healthcare'],
    activeVCs: 82,
    unicornCount: 3,
    exitCount: 6,
    marketSize: 14200,
    adoptionRate: 10.8,
    keyPlayers: ['Sony', 'Samsung', 'LG', 'Panasonic', 'Nintendo'],
    emergingStartups: ['Pico (ByteDance)', 'Xreal', 'Rokid', 'Pimax', 'NOLO VR'],
    regulatoryScore: 7,
    talentPoolScore: 8,
    quarterlyData: [
      { quarter: 'Q1 2025', investment: 640, deals: 48 },
      { quarter: 'Q2 2025', investment: 720, deals: 55 },
      { quarter: 'Q3 2025', investment: 780, deals: 60 },
      { quarter: 'Q4 2025', investment: 700, deals: 49 },
    ]
  },
  {
    region: 'South Asia',
    regionCode: 'south-asia',
    displayName: 'South Asia',
    totalInvestment: 1120,
    dealCount: 134,
    avgDealSize: 8.4,
    yoyGrowth: 58.6,
    topSectors: ['Education', 'Healthcare', 'Real Estate', 'Manufacturing', 'Retail'],
    activeVCs: 38,
    unicornCount: 1,
    exitCount: 2,
    marketSize: 5400,
    adoptionRate: 5.2,
    keyPlayers: ['Reliance Jio', 'Infosys', 'TCS', 'Wipro', 'HCL'],
    emergingStartups: ['SmartVizX', 'Scapic', 'AjnaLens', 'Tesseract', 'Merxius'],
    regulatoryScore: 5,
    talentPoolScore: 8,
    quarterlyData: [
      { quarter: 'Q1 2025', investment: 240, deals: 30 },
      { quarter: 'Q2 2025', investment: 280, deals: 35 },
      { quarter: 'Q3 2025', investment: 320, deals: 38 },
      { quarter: 'Q4 2025', investment: 280, deals: 31 },
    ]
  },
  {
    region: 'MENA',
    regionCode: 'mena',
    displayName: 'Middle East & North Africa',
    totalInvestment: 1460,
    dealCount: 96,
    avgDealSize: 15.2,
    yoyGrowth: 72.8,
    topSectors: ['Tourism', 'Real Estate', 'Entertainment', 'Government', 'Oil & Gas'],
    activeVCs: 32,
    unicornCount: 1,
    exitCount: 2,
    marketSize: 4800,
    adoptionRate: 6.4,
    keyPlayers: ['NEOM', 'Mubadala', 'Saudi Aramco', 'Etisalat', 'du'],
    emergingStartups: ['XR Hub Dubai', 'Metaverse Arabia', 'Immersive Labs ME', 'Hologram ME', 'Virtuzone'],
    regulatoryScore: 6,
    talentPoolScore: 5,
    quarterlyData: [
      { quarter: 'Q1 2025', investment: 320, deals: 22 },
      { quarter: 'Q2 2025', investment: 380, deals: 25 },
      { quarter: 'Q3 2025', investment: 420, deals: 28 },
      { quarter: 'Q4 2025', investment: 340, deals: 21 },
    ]
  }
];

export const getRegionByCode = (code: string): RegionalMetrics | undefined => {
  return regionalData.find(r => r.regionCode === code);
};

export const getAllRegions = (): RegionalMetrics[] => {
  return regionalData;
};

export const getRegionalComparison = (metric: keyof RegionalMetrics): { region: string; value: number }[] => {
  return regionalData
    .filter(r => r.regionCode !== 'global')
    .map(r => ({ region: r.region, value: r[metric] as number }))
    .sort((a, b) => b.value - a.value);
};
