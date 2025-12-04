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
    totalInvestment: 12800,
    dealCount: 847,
    avgDealSize: 15.1,
    yoyGrowth: 23.5,
    topSectors: ['Enterprise XR', 'Gaming', 'Healthcare', 'Training', 'Retail'],
    activeVCs: 342,
    unicornCount: 18,
    exitCount: 24,
    marketSize: 52400,
    adoptionRate: 8.2,
    keyPlayers: ['Meta', 'Apple', 'Microsoft', 'Google', 'Sony'],
    emergingStartups: ['Magic Leap', 'Varjo', 'Niantic', 'ImmersiveTouch', 'Spatial'],
    regulatoryScore: 7,
    talentPoolScore: 8,
    quarterlyData: [
      { quarter: 'Q1 2024', investment: 2800, deals: 189 },
      { quarter: 'Q2 2024', investment: 3200, deals: 215 },
      { quarter: 'Q3 2024', investment: 3400, deals: 228 },
      { quarter: 'Q4 2024', investment: 3400, deals: 215 },
    ]
  },
  {
    region: 'North America',
    regionCode: 'na',
    displayName: 'North America',
    totalInvestment: 5890,
    dealCount: 312,
    avgDealSize: 18.9,
    yoyGrowth: 18.2,
    topSectors: ['Enterprise', 'Healthcare', 'Gaming', 'Defense', 'Real Estate'],
    activeVCs: 186,
    unicornCount: 12,
    exitCount: 15,
    marketSize: 21500,
    adoptionRate: 12.4,
    keyPlayers: ['Meta', 'Apple', 'Microsoft', 'Magic Leap', 'Snap'],
    emergingStartups: ['Anduril', 'ImmersiveTouch', 'Mojo Vision', 'Campfire', 'Tilt Five'],
    regulatoryScore: 8,
    talentPoolScore: 9,
    quarterlyData: [
      { quarter: 'Q1 2024', investment: 1320, deals: 72 },
      { quarter: 'Q2 2024', investment: 1480, deals: 81 },
      { quarter: 'Q3 2024', investment: 1590, deals: 85 },
      { quarter: 'Q4 2024', investment: 1500, deals: 74 },
    ]
  },
  {
    region: 'Europe',
    regionCode: 'eu',
    displayName: 'European Union',
    totalInvestment: 2340,
    dealCount: 198,
    avgDealSize: 11.8,
    yoyGrowth: 31.5,
    topSectors: ['Industrial', 'Automotive', 'Healthcare', 'Cultural Heritage', 'Education'],
    activeVCs: 78,
    unicornCount: 3,
    exitCount: 5,
    marketSize: 12800,
    adoptionRate: 9.1,
    keyPlayers: ['Varjo', 'Ultraleap', 'SenseGlove', 'TeamViewer', 'HTC Europe'],
    emergingStartups: ['Lynx', 'Dimension10', 'VRdirect', 'Gravity Sketch', 'Imverse'],
    regulatoryScore: 9,
    talentPoolScore: 8,
    quarterlyData: [
      { quarter: 'Q1 2024', investment: 520, deals: 45 },
      { quarter: 'Q2 2024', investment: 580, deals: 52 },
      { quarter: 'Q3 2024', investment: 640, deals: 54 },
      { quarter: 'Q4 2024', investment: 600, deals: 47 },
    ]
  },
  {
    region: 'ASEAN',
    regionCode: 'asean',
    displayName: 'ASEAN Region',
    totalInvestment: 1280,
    dealCount: 124,
    avgDealSize: 10.3,
    yoyGrowth: 45.2,
    topSectors: ['Gaming', 'E-commerce', 'Tourism', 'Education', 'Manufacturing'],
    activeVCs: 42,
    unicornCount: 1,
    exitCount: 2,
    marketSize: 6200,
    adoptionRate: 5.8,
    keyPlayers: ['Sea Limited', 'Grab', 'GoTo', 'Razer', 'Ant Group'],
    emergingStartups: ['Virtualtech Frontier', 'XCTUALITY', 'V-Cube', 'AmazeVR Asia', 'Matterverse'],
    regulatoryScore: 6,
    talentPoolScore: 7,
    quarterlyData: [
      { quarter: 'Q1 2024', investment: 280, deals: 28 },
      { quarter: 'Q2 2024', investment: 320, deals: 32 },
      { quarter: 'Q3 2024', investment: 360, deals: 35 },
      { quarter: 'Q4 2024', investment: 320, deals: 29 },
    ]
  },
  {
    region: 'Pacific',
    regionCode: 'pacific',
    displayName: 'Asia-Pacific',
    totalInvestment: 1890,
    dealCount: 156,
    avgDealSize: 12.1,
    yoyGrowth: 28.7,
    topSectors: ['Gaming', 'Enterprise', 'Retail', 'Entertainment', 'Healthcare'],
    activeVCs: 64,
    unicornCount: 2,
    exitCount: 4,
    marketSize: 9400,
    adoptionRate: 7.2,
    keyPlayers: ['Sony', 'Samsung', 'LG', 'Panasonic', 'Nintendo'],
    emergingStartups: ['Pico (ByteDance)', 'NOLO VR', 'Rokid', 'Xreal', 'Pimax'],
    regulatoryScore: 7,
    talentPoolScore: 8,
    quarterlyData: [
      { quarter: 'Q1 2024', investment: 420, deals: 36 },
      { quarter: 'Q2 2024', investment: 480, deals: 41 },
      { quarter: 'Q3 2024', investment: 520, deals: 44 },
      { quarter: 'Q4 2024', investment: 470, deals: 35 },
    ]
  },
  {
    region: 'South Asia',
    regionCode: 'south-asia',
    displayName: 'South Asia',
    totalInvestment: 680,
    dealCount: 89,
    avgDealSize: 7.6,
    yoyGrowth: 52.3,
    topSectors: ['Education', 'Healthcare', 'Real Estate', 'Manufacturing', 'Retail'],
    activeVCs: 28,
    unicornCount: 0,
    exitCount: 1,
    marketSize: 3200,
    adoptionRate: 3.4,
    keyPlayers: ['Reliance Jio', 'Infosys', 'TCS', 'Wipro', 'HCL'],
    emergingStartups: ['SmartVizX', 'Scapic', 'AjnaLens', 'Tesseract', 'Merxius'],
    regulatoryScore: 5,
    talentPoolScore: 8,
    quarterlyData: [
      { quarter: 'Q1 2024', investment: 150, deals: 20 },
      { quarter: 'Q2 2024', investment: 170, deals: 23 },
      { quarter: 'Q3 2024', investment: 190, deals: 25 },
      { quarter: 'Q4 2024', investment: 170, deals: 21 },
    ]
  },
  {
    region: 'MENA',
    regionCode: 'mena',
    displayName: 'Middle East & North Africa',
    totalInvestment: 720,
    dealCount: 68,
    avgDealSize: 10.6,
    yoyGrowth: 67.4,
    topSectors: ['Tourism', 'Real Estate', 'Entertainment', 'Government', 'Oil & Gas'],
    activeVCs: 24,
    unicornCount: 0,
    exitCount: 1,
    marketSize: 2800,
    adoptionRate: 4.1,
    keyPlayers: ['NEOM', 'Mubadala', 'Saudi Aramco', 'Etisalat', 'du'],
    emergingStartups: ['Virtuzone', 'Immersive Labs ME', 'XR Hub Dubai', 'Hologram ME', 'Metaverse Arabia'],
    regulatoryScore: 6,
    talentPoolScore: 5,
    quarterlyData: [
      { quarter: 'Q1 2024', investment: 160, deals: 15 },
      { quarter: 'Q2 2024', investment: 180, deals: 17 },
      { quarter: 'Q3 2024', investment: 200, deals: 19 },
      { quarter: 'Q4 2024', investment: 180, deals: 17 },
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
