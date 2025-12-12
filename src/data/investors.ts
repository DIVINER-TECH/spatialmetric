export interface VCFirm {
  id: string;
  slug: string;
  name: string;
  type: 'VC' | 'CVC' | 'PE' | 'Angel' | 'Family Office' | 'Sovereign';
  aum: number; // Assets under management in billions USD
  founded: number;
  headquarters: string;
  region: 'na' | 'eu' | 'asean' | 'pacific' | 'south-asia' | 'mena' | 'global';
  partners: { name: string; focus: string }[];
  xrInvestments: number;
  xrPortfolio: string[];
  fundSize: number; // Latest fund in millions
  investmentRange: { min: number; max: number }; // in millions
  sectors: string[];
  notableExits: string[];
  website: string;
  description: string;
  investmentThesis: string;
}

export const investors: VCFirm[] = [
  // TIER 1 GLOBAL VCs
  {
    id: 'vc1',
    slug: 'andreessen-horowitz',
    name: 'Andreessen Horowitz (a16z)',
    type: 'VC',
    aum: 42,
    founded: 2009,
    headquarters: 'Menlo Park, CA',
    region: 'na',
    partners: [
      { name: 'Marc Andreessen', focus: 'General Partner' },
      { name: 'Ben Horowitz', focus: 'General Partner' },
      { name: 'Andrew Chen', focus: 'Games & XR' },
      { name: 'Arianna Simpson', focus: 'Crypto & Metaverse' }
    ],
    xrInvestments: 28,
    xrPortfolio: ['Anduril', 'Magic Leap', 'Sandbox VR', 'Spatial', 'Mojo Vision', 'Osso VR'],
    fundSize: 9000,
    investmentRange: { min: 5, max: 500 },
    sectors: ['XR Hardware', 'Enterprise', 'Gaming', 'Defense', 'Healthcare'],
    notableExits: ['Oculus (Meta)', 'GitHub (Microsoft)', 'Figma (Adobe)'],
    website: 'a16z.com',
    description: 'Leading venture capital firm backing bold entrepreneurs building the future. Pioneer investor in spatial computing since 2012.',
    investmentThesis: 'We believe spatial computing represents the next major computing platform, similar to mobile and cloud. Focus on category-defining companies with strong technical moats.'
  },
  {
    id: 'vc2',
    slug: 'sequoia-capital',
    name: 'Sequoia Capital',
    type: 'VC',
    aum: 85,
    founded: 1972,
    headquarters: 'Menlo Park, CA',
    region: 'global',
    partners: [
      { name: 'Roelof Botha', focus: 'Managing Partner' },
      { name: 'Alfred Lin', focus: 'Consumer & Gaming' },
      { name: 'Stephanie Zhan', focus: 'Healthcare' }
    ],
    xrInvestments: 22,
    xrPortfolio: ['Unity', 'Xreal', 'Roblox', 'Niantic', 'Varjo'],
    fundSize: 8500,
    investmentRange: { min: 1, max: 1000 },
    sectors: ['Gaming', 'Consumer', 'Enterprise', 'AI+XR'],
    notableExits: ['Nvidia', 'Apple', 'Google', 'Unity'],
    website: 'sequoiacap.com',
    description: 'Global venture capital firm that has partnered with founders from idea to IPO for over 50 years.',
    investmentThesis: 'Investing in durable companies with massive markets. XR investments focus on platforms and infrastructure that enable the broader ecosystem.'
  },
  {
    id: 'vc3',
    slug: 'founders-fund',
    name: 'Founders Fund',
    type: 'VC',
    aum: 11,
    founded: 2005,
    headquarters: 'San Francisco, CA',
    region: 'na',
    partners: [
      { name: 'Peter Thiel', focus: 'Founder' },
      { name: 'Brian Singerman', focus: 'Deep Tech' },
      { name: 'Keith Rabois', focus: 'Consumer' }
    ],
    xrInvestments: 15,
    xrPortfolio: ['Anduril', 'Magic Leap', 'SpaceX', 'Oculus'],
    fundSize: 3400,
    investmentRange: { min: 3, max: 300 },
    sectors: ['Defense XR', 'Deep Tech', 'Consumer'],
    notableExits: ['Oculus (Meta)', 'SpaceX', 'Palantir'],
    website: 'foundersfund.com',
    description: 'Venture capital firm investing in transformative technologies. Early backer of Oculus before Meta acquisition.',
    investmentThesis: 'Backing revolutionary technology that transforms industries. XR focus on defense, industrial, and breakthrough consumer applications.'
  },
  {
    id: 'vc4',
    slug: 'lightspeed-venture',
    name: 'Lightspeed Venture Partners',
    type: 'VC',
    aum: 25,
    founded: 2000,
    headquarters: 'Menlo Park, CA',
    region: 'global',
    partners: [
      { name: 'Jeremy Liew', focus: 'Consumer & Gaming' },
      { name: 'Amy Wu', focus: 'Consumer' }
    ],
    xrInvestments: 18,
    xrPortfolio: ['Snap', 'Epic Games', 'Mojo Vision', 'Within'],
    fundSize: 7100,
    investmentRange: { min: 1, max: 500 },
    sectors: ['Consumer AR', 'Gaming', 'Social'],
    notableExits: ['Snap (IPO)', 'Mulesoft (Salesforce)'],
    website: 'lsvp.com',
    description: 'Multi-stage venture capital firm investing globally in enterprise and consumer technology.',
    investmentThesis: 'Consumer-first approach to XR, focusing on social experiences and mobile AR that reach mass market adoption.'
  },
  {
    id: 'vc5',
    slug: 'khosla-ventures',
    name: 'Khosla Ventures',
    type: 'VC',
    aum: 15,
    founded: 2004,
    headquarters: 'Menlo Park, CA',
    region: 'na',
    partners: [
      { name: 'Vinod Khosla', focus: 'Founder' },
      { name: 'Samir Kaul', focus: 'Deep Tech' }
    ],
    xrInvestments: 12,
    xrPortfolio: ['Mojo Vision', 'Osso VR', 'ImmersiveTouch'],
    fundSize: 3000,
    investmentRange: { min: 1, max: 200 },
    sectors: ['Healthcare XR', 'Deep Tech', 'Hardware'],
    notableExits: ['Impossible Foods', 'DoorDash'],
    website: 'khoslaventures.com',
    description: 'Venture firm focused on breakthrough technologies with emphasis on healthcare and deep tech XR applications.',
    investmentThesis: 'Investing in technically ambitious XR companies solving real problems, particularly in healthcare training and medical visualization.'
  },
  // ENTERPRISE FOCUSED VCs
  {
    id: 'vc6',
    slug: 'general-catalyst',
    name: 'General Catalyst',
    type: 'VC',
    aum: 25,
    founded: 2000,
    headquarters: 'Cambridge, MA',
    region: 'na',
    partners: [
      { name: 'Hemant Taneja', focus: 'Managing Partner' },
      { name: 'Deep Nishar', focus: 'Enterprise' }
    ],
    xrInvestments: 16,
    xrPortfolio: ['Anduril', 'Snap', 'HubSpot', 'Stripe'],
    fundSize: 4500,
    investmentRange: { min: 5, max: 300 },
    sectors: ['Enterprise', 'Defense', 'B2B'],
    notableExits: ['Snap (IPO)', 'HubSpot (IPO)'],
    website: 'generalcatalyst.com',
    description: 'Venture capital firm with strong enterprise focus, particularly in B2B XR applications and defense technology.',
    investmentThesis: 'Enterprise XR adoption is accelerating faster than consumer. Focus on B2B applications with clear ROI metrics.'
  },
  {
    id: 'vc7',
    slug: 'nea',
    name: 'New Enterprise Associates (NEA)',
    type: 'VC',
    aum: 25,
    founded: 1977,
    headquarters: 'Menlo Park, CA',
    region: 'na',
    partners: [
      { name: 'Scott Sandell', focus: 'Technology' },
      { name: 'Mohamad Makhzoumi', focus: 'Healthcare' }
    ],
    xrInvestments: 20,
    xrPortfolio: ['Magic Leap', 'Mojo Vision', 'Varjo', 'Strivr'],
    fundSize: 3600,
    investmentRange: { min: 2, max: 250 },
    sectors: ['Enterprise', 'Healthcare', 'Training'],
    notableExits: ['Workday (IPO)', 'Tableau (Salesforce)'],
    website: 'nea.com',
    description: 'One of the largest venture capital firms globally with significant XR portfolio focused on enterprise applications.',
    investmentThesis: 'XR will transform enterprise operations. Focus on training, visualization, and collaboration platforms.'
  },
  // EUROPEAN VCs
  {
    id: 'vc8',
    slug: 'atomico',
    name: 'Atomico',
    type: 'VC',
    aum: 5,
    founded: 2006,
    headquarters: 'London, UK',
    region: 'eu',
    partners: [
      { name: 'Niklas Zennström', focus: 'Founder' },
      { name: 'Carolina Brochado', focus: 'Consumer' }
    ],
    xrInvestments: 14,
    xrPortfolio: ['Varjo', 'Ultraleap', 'Improbable', 'Gravity Sketch'],
    fundSize: 1350,
    investmentRange: { min: 1, max: 100 },
    sectors: ['Enterprise', 'Gaming', 'Industrial'],
    notableExits: ['Supercell (Tencent)', 'Graphcore'],
    website: 'atomico.com',
    description: 'Leading European technology investor founded by Skype co-founder. Strong focus on European XR ecosystem.',
    investmentThesis: 'Europe leads in industrial and enterprise XR. Backing companies with deep technical differentiation.'
  },
  {
    id: 'vc9',
    slug: 'eqt-ventures',
    name: 'EQT Ventures',
    type: 'VC',
    aum: 3,
    founded: 2016,
    headquarters: 'Stockholm, Sweden',
    region: 'eu',
    partners: [
      { name: 'Lars Jörnow', focus: 'Partner' },
      { name: 'Doreen Huber', focus: 'Deep Tech' }
    ],
    xrInvestments: 10,
    xrPortfolio: ['Varjo', 'Wolt', 'MessageBird'],
    fundSize: 900,
    investmentRange: { min: 1, max: 75 },
    sectors: ['Enterprise', 'Industrial', 'Automotive'],
    notableExits: ['Wolt (DoorDash)'],
    website: 'eqtventures.com',
    description: 'Nordic venture fund backed by EQT, focused on European technology companies with global ambitions.',
    investmentThesis: 'Industrial XR in Europe represents a massive opportunity given strong manufacturing base.'
  },
  // ASIA PACIFIC VCs
  {
    id: 'vc10',
    slug: 'temasek',
    name: 'Temasek Holdings',
    type: 'Sovereign',
    aum: 287,
    founded: 1974,
    headquarters: 'Singapore',
    region: 'asean',
    partners: [
      { name: 'Dilhan Pillay', focus: 'CEO' },
      { name: 'Rohit Sipahimalani', focus: 'CIO' }
    ],
    xrInvestments: 25,
    xrPortfolio: ['Virtualtech Frontier', 'Sea Limited', 'Unity', 'Bytedance'],
    fundSize: 50000,
    investmentRange: { min: 50, max: 5000 },
    sectors: ['Consumer', 'Gaming', 'Enterprise'],
    notableExits: ['Sea Limited', 'Grab'],
    website: 'temasek.com.sg',
    description: 'Singapore sovereign wealth fund with significant technology portfolio including XR investments across Asia.',
    investmentThesis: 'XR will drive the next wave of digital transformation in Asia. Focus on platforms and infrastructure.'
  },
  {
    id: 'vc11',
    slug: 'softbank-vision',
    name: 'SoftBank Vision Fund',
    type: 'VC',
    aum: 100,
    founded: 2017,
    headquarters: 'Tokyo, Japan',
    region: 'pacific',
    partners: [
      { name: 'Masayoshi Son', focus: 'Chairman' },
      { name: 'Rajeev Misra', focus: 'CEO' }
    ],
    xrInvestments: 18,
    xrPortfolio: ['Magic Leap', 'Improbable', 'Cruise', 'Niantic'],
    fundSize: 40000,
    investmentRange: { min: 100, max: 10000 },
    sectors: ['Consumer', 'Autonomous', 'Gaming'],
    notableExits: ['Uber', 'DoorDash'],
    website: 'visionfund.com',
    description: 'Largest technology-focused venture fund globally, with significant bets on XR and metaverse companies.',
    investmentThesis: 'Investing in transformative platforms. XR represents a $1T+ opportunity over the next decade.'
  },
  {
    id: 'vc12',
    slug: 'hillhouse-capital',
    name: 'Hillhouse Capital',
    type: 'PE',
    aum: 75,
    founded: 2005,
    headquarters: 'Hong Kong',
    region: 'pacific',
    partners: [
      { name: 'Zhang Lei', focus: 'Founder & CEO' }
    ],
    xrInvestments: 15,
    xrPortfolio: ['Xreal', 'ByteDance/Pico', 'Tencent'],
    fundSize: 18000,
    investmentRange: { min: 50, max: 2000 },
    sectors: ['Consumer', 'Gaming', 'Social'],
    notableExits: ['Tencent', 'JD.com', 'Zoom'],
    website: 'hillhousecap.com',
    description: 'Leading Asia-focused investment firm with major stakes in Chinese XR ecosystem.',
    investmentThesis: 'China will be a major XR market. Backing consumer hardware and content companies.'
  },
  // MENA VCs
  {
    id: 'vc13',
    slug: 'mubadala',
    name: 'Mubadala Investment Company',
    type: 'Sovereign',
    aum: 284,
    founded: 2002,
    headquarters: 'Abu Dhabi, UAE',
    region: 'mena',
    partners: [
      { name: 'Khaldoon Al Mubarak', focus: 'CEO' },
      { name: 'Ibrahim Ajami', focus: 'Ventures' }
    ],
    xrInvestments: 12,
    xrPortfolio: ['XR Hub Dubai', 'Magic Leap', 'Niantic'],
    fundSize: 30000,
    investmentRange: { min: 25, max: 2000 },
    sectors: ['Tourism XR', 'Enterprise', 'Gaming'],
    notableExits: ['AMD', 'GlobalFoundries'],
    website: 'mubadala.com',
    description: 'Abu Dhabi sovereign wealth fund actively investing in XR for tourism and smart city applications.',
    investmentThesis: 'XR is core to UAE smart city and tourism strategy. Backing companies aligned with national vision.'
  },
  {
    id: 'vc14',
    slug: 'pif',
    name: 'Public Investment Fund (PIF)',
    type: 'Sovereign',
    aum: 930,
    founded: 1971,
    headquarters: 'Riyadh, Saudi Arabia',
    region: 'mena',
    partners: [
      { name: 'Yasir Al-Rumayyan', focus: 'Governor' }
    ],
    xrInvestments: 20,
    xrPortfolio: ['Metaverse Arabia', 'NEOM', 'Lucid', 'Magic Leap'],
    fundSize: 100000,
    investmentRange: { min: 100, max: 50000 },
    sectors: ['Smart City', 'Entertainment', 'Tourism'],
    notableExits: ['Lucid Motors'],
    website: 'pif.gov.sa',
    description: 'Saudi sovereign wealth fund driving Vision 2030 with massive XR investments for NEOM and entertainment.',
    investmentThesis: 'XR is fundamental to Vision 2030 economic diversification. Anchor investor in regional ecosystem.'
  },
  {
    id: 'vc15',
    slug: 'stv',
    name: 'STV (Saudi Technology Ventures)',
    type: 'VC',
    aum: 1,
    founded: 2018,
    headquarters: 'Riyadh, Saudi Arabia',
    region: 'mena',
    partners: [
      { name: 'Abdulrahman Tarabzouni', focus: 'CEO' }
    ],
    xrInvestments: 8,
    xrPortfolio: ['Metaverse Arabia', 'Unifonic', 'Tamara'],
    fundSize: 500,
    investmentRange: { min: 1, max: 30 },
    sectors: ['Arabic Content', 'Enterprise', 'Consumer'],
    notableExits: ['Careem (Uber)'],
    website: 'stv.vc',
    description: 'Leading Saudi VC fund backing regional technology companies including XR and metaverse startups.',
    investmentThesis: 'Arabic-first XR content represents massive underserved opportunity. Backing local champions.'
  },
  // CORPORATE VCs
  {
    id: 'vc16',
    slug: 'google-ventures',
    name: 'GV (Google Ventures)',
    type: 'CVC',
    aum: 8,
    founded: 2009,
    headquarters: 'Mountain View, CA',
    region: 'na',
    partners: [
      { name: 'David Krane', focus: 'CEO' },
      { name: 'Joe Kraus', focus: 'General Partner' }
    ],
    xrInvestments: 22,
    xrPortfolio: ['Magic Leap', 'Mojo Vision', 'Niantic', 'ImmersiveTouch'],
    fundSize: 1000,
    investmentRange: { min: 1, max: 100 },
    sectors: ['AI+XR', 'Healthcare', 'Consumer'],
    notableExits: ['Uber', 'Nest', 'Jet'],
    website: 'gv.com',
    description: 'Venture capital arm of Alphabet investing in XR companies that complement Google ecosystem.',
    investmentThesis: 'Android XR ecosystem will be massive. Investing in companies building for Google platforms.'
  },
  {
    id: 'vc17',
    slug: 'intel-capital',
    name: 'Intel Capital',
    type: 'CVC',
    aum: 14,
    founded: 1991,
    headquarters: 'Santa Clara, CA',
    region: 'na',
    partners: [
      { name: 'Anthony Lin', focus: 'Managing Director' }
    ],
    xrInvestments: 35,
    xrPortfolio: ['Magic Leap', 'Vuzix', 'RealWear', 'Nreal'],
    fundSize: 500,
    investmentRange: { min: 1, max: 50 },
    sectors: ['Hardware', 'Enterprise', 'Industrial'],
    notableExits: ['VMware', 'McAfee'],
    website: 'intelcapital.com',
    description: 'Strategic investor focused on XR hardware companies that could benefit from Intel silicon.',
    investmentThesis: 'XR hardware requires massive compute. Backing companies pushing silicon boundaries.'
  },
  {
    id: 'vc18',
    slug: 'samsung-ventures',
    name: 'Samsung Ventures',
    type: 'CVC',
    aum: 2,
    founded: 1999,
    headquarters: 'Seoul, South Korea',
    region: 'pacific',
    partners: [
      { name: 'Young Sohn', focus: 'President' }
    ],
    xrInvestments: 18,
    xrPortfolio: ['DigiLens', 'Inuitive', 'Lynx', 'LetinAR'],
    fundSize: 500,
    investmentRange: { min: 1, max: 30 },
    sectors: ['Optics', 'Displays', 'Consumer'],
    notableExits: ['SmartThings', 'Harman'],
    website: 'samsungventures.com',
    description: 'Strategic investor for Samsung, focused on XR components and technologies for consumer devices.',
    investmentThesis: 'Consumer XR requires display and optical innovations. Backing key component suppliers.'
  },
  {
    id: 'vc19',
    slug: 'qualcomm-ventures',
    name: 'Qualcomm Ventures',
    type: 'CVC',
    aum: 2,
    founded: 2000,
    headquarters: 'San Diego, CA',
    region: 'na',
    partners: [
      { name: 'Quinn Li', focus: 'Global Head' }
    ],
    xrInvestments: 42,
    xrPortfolio: ['Magic Leap', 'Xreal', 'Lynx', 'RealWear', 'Vuzix'],
    fundSize: 500,
    investmentRange: { min: 1, max: 25 },
    sectors: ['Hardware', 'Standalone VR', 'AR Glasses'],
    notableExits: ['Fitbit (Google)', 'Zoom'],
    website: 'qualcommventures.com',
    description: 'Most active corporate investor in XR, backing companies using Snapdragon XR platform.',
    investmentThesis: 'Every XR device needs our silicon. Strategic investments in the ecosystem drive Snapdragon adoption.'
  },
  // GAMING & ENTERTAINMENT VCs
  {
    id: 'vc20',
    slug: 'galaxy-interactive',
    name: 'Galaxy Interactive',
    type: 'VC',
    aum: 1,
    founded: 2018,
    headquarters: 'New York, NY',
    region: 'na',
    partners: [
      { name: 'Sam Englebardt', focus: 'General Partner' },
      { name: 'Richard Kim', focus: 'General Partner' }
    ],
    xrInvestments: 24,
    xrPortfolio: ['Tilt Five', 'Sandbox VR', 'Resolution Games', 'Bigscreen'],
    fundSize: 650,
    investmentRange: { min: 1, max: 30 },
    sectors: ['Gaming', 'Entertainment', 'Social VR'],
    notableExits: [],
    website: 'galaxyinteractive.io',
    description: 'Gaming and interactive entertainment focused fund with significant VR gaming portfolio.',
    investmentThesis: 'VR gaming is hitting inflection point. Backing studios and platforms defining the medium.'
  },
  // SOUTH ASIA VCs
  {
    id: 'vc21',
    slug: 'infoedge-ventures',
    name: 'Info Edge Ventures',
    type: 'VC',
    aum: 0.5,
    founded: 2019,
    headquarters: 'Noida, India',
    region: 'south-asia',
    partners: [
      { name: 'Sanjeev Bikhchandani', focus: 'Founder' },
      { name: 'Kitty Agarwal', focus: 'Partner' }
    ],
    xrInvestments: 6,
    xrPortfolio: ['AjnaLens', 'SmartVizX', 'Merxius'],
    fundSize: 200,
    investmentRange: { min: 0.5, max: 15 },
    sectors: ['Enterprise', 'Real Estate', 'Training'],
    notableExits: ['Zomato (IPO)', 'PolicyBazaar (IPO)'],
    website: 'infoedgeventures.com',
    description: 'Leading Indian VC backing enterprise XR companies in the subcontinent.',
    investmentThesis: 'India XR adoption led by enterprise and education. Massive training and visualization opportunity.'
  },
  // ADDITIONAL GLOBAL VCs
  {
    id: 'vc22',
    slug: 'accel',
    name: 'Accel',
    type: 'VC',
    aum: 20,
    founded: 1983,
    headquarters: 'Palo Alto, CA',
    region: 'global',
    partners: [
      { name: 'Rich Wong', focus: 'Partner' },
      { name: 'Sonali De Rycker', focus: 'Europe' }
    ],
    xrInvestments: 16,
    xrPortfolio: ['Matterport', 'Snap', 'Spotify'],
    fundSize: 3000,
    investmentRange: { min: 1, max: 200 },
    sectors: ['Consumer', 'Enterprise', 'Spatial Data'],
    notableExits: ['Facebook', 'Spotify', 'Slack'],
    website: 'accel.com',
    description: 'Global venture firm with investments in 3D capture and spatial computing infrastructure.',
    investmentThesis: 'Spatial data infrastructure is foundational. Backing companies capturing and processing the physical world.'
  },
  {
    id: 'vc23',
    slug: 'index-ventures',
    name: 'Index Ventures',
    type: 'VC',
    aum: 16,
    founded: 1996,
    headquarters: 'London/San Francisco',
    region: 'global',
    partners: [
      { name: 'Mike Volpi', focus: 'Partner' },
      { name: 'Danny Rimer', focus: 'Partner' }
    ],
    xrInvestments: 12,
    xrPortfolio: ['Discord', 'Roblox', 'Figma'],
    fundSize: 3000,
    investmentRange: { min: 1, max: 250 },
    sectors: ['Gaming', 'Social', 'Design Tools'],
    notableExits: ['Roblox (IPO)', 'Figma (Adobe)'],
    website: 'indexventures.com',
    description: 'Global VC with investments in gaming and social platforms building toward spatial computing.',
    investmentThesis: 'Gaming and social platforms are the gateway to mainstream XR adoption.'
  },
  {
    id: 'vc24',
    slug: 'spark-capital',
    name: 'Spark Capital',
    type: 'VC',
    aum: 7,
    founded: 2005,
    headquarters: 'Boston, MA',
    region: 'na',
    partners: [
      { name: 'Megan Quinn', focus: 'General Partner' },
      { name: 'Alex Finkelstein', focus: 'General Partner' }
    ],
    xrInvestments: 10,
    xrPortfolio: ['Discord', 'Snap', 'Niantic'],
    fundSize: 1400,
    investmentRange: { min: 1, max: 100 },
    sectors: ['Social', 'Gaming', 'Consumer'],
    notableExits: ['Twitter', 'Tumblr', 'Oculus'],
    website: 'sparkcapital.com',
    description: 'Early-stage focused fund with history of backing transformative consumer and social companies.',
    investmentThesis: 'Social experiences drive platform adoption. Backing social-first XR companies.'
  },
  {
    id: 'vc25',
    slug: 'tencent',
    name: 'Tencent Investment',
    type: 'CVC',
    aum: 150,
    founded: 2008,
    headquarters: 'Shenzhen, China',
    region: 'pacific',
    partners: [
      { name: 'Martin Lau', focus: 'President' }
    ],
    xrInvestments: 45,
    xrPortfolio: ['Epic Games', 'Roblox', 'Ultraleap', 'Discord', 'Snap'],
    fundSize: 10000,
    investmentRange: { min: 10, max: 5000 },
    sectors: ['Gaming', 'Social', 'Entertainment'],
    notableExits: ['JD.com', 'Meituan', 'Sea Limited'],
    website: 'tencent.com',
    description: 'Largest gaming company globally with extensive XR and metaverse investment portfolio.',
    investmentThesis: 'Gaming is the foundation of the metaverse. Investing across the stack from engines to content.'
  }
];

export const getInvestorBySlug = (slug: string): VCFirm | undefined => {
  return investors.find(i => i.slug === slug);
};

export const getInvestorsByRegion = (region: string): VCFirm[] => {
  return investors.filter(i => i.region === region || i.region === 'global');
};

export const getInvestorsByType = (type: VCFirm['type']): VCFirm[] => {
  return investors.filter(i => i.type === type);
};

export const getTopInvestorsByXRDeals = (limit: number = 10): VCFirm[] => {
  return [...investors].sort((a, b) => b.xrInvestments - a.xrInvestments).slice(0, limit);
};

export const getInvestorsByAUM = (limit: number = 10): VCFirm[] => {
  return [...investors].sort((a, b) => b.aum - a.aum).slice(0, limit);
};
