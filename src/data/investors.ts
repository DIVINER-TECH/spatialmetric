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
  },
  // ADDITIONAL EUROPEAN VCs
  {
    id: 'vc26',
    slug: 'balderton-capital',
    name: 'Balderton Capital',
    type: 'VC',
    aum: 5.2,
    founded: 2000,
    headquarters: 'London, UK',
    region: 'eu',
    partners: [
      { name: 'Suranga Chandratillake', focus: 'General Partner' },
      { name: 'James Wise', focus: 'Tech & AI' }
    ],
    xrInvestments: 8,
    xrPortfolio: ['Improbable', 'Varjo', 'Synthesia', 'Wayve'],
    fundSize: 680,
    investmentRange: { min: 1, max: 50 },
    sectors: ['Enterprise XR', 'AI', 'Gaming'],
    notableExits: ['Revolut', 'Depop', 'Citymapper'],
    website: 'balderton.com',
    description: 'Leading European VC focused on backing exceptional founders building category-defining technology companies.',
    investmentThesis: 'European technology leadership with global ambition. XR investments focus on infrastructure and enterprise platforms.'
  },
  {
    id: 'vc27',
    slug: 'northzone',
    name: 'Northzone',
    type: 'VC',
    aum: 3.8,
    founded: 1996,
    headquarters: 'Stockholm, Sweden',
    region: 'eu',
    partners: [
      { name: 'Jeppe Zink', focus: 'General Partner' },
      { name: 'Paul Murphy', focus: 'Consumer & Gaming' }
    ],
    xrInvestments: 6,
    xrPortfolio: ['Resolution Games', 'Rec Room', 'Klarna'],
    fundSize: 500,
    investmentRange: { min: 0.5, max: 30 },
    sectors: ['Gaming', 'Consumer', 'Fintech'],
    notableExits: ['Spotify', 'Avito', 'iZettle'],
    website: 'northzone.com',
    description: 'Nordic venture firm with 25+ years investing in ambitious founders across Europe.',
    investmentThesis: 'Consumer-first approach to XR investing. Backing social and entertainment platforms.'
  },
  {
    id: 'vc28',
    slug: 'lakestar',
    name: 'Lakestar',
    type: 'VC',
    aum: 2.5,
    founded: 2012,
    headquarters: 'Zurich, Switzerland',
    region: 'eu',
    partners: [
      { name: 'Klaus Hommels', focus: 'Founder' },
      { name: 'Christoph Schuh', focus: 'Partner' }
    ],
    xrInvestments: 5,
    xrPortfolio: ['Varjo', 'Synthesia', 'N26'],
    fundSize: 450,
    investmentRange: { min: 5, max: 50 },
    sectors: ['Enterprise', 'Fintech', 'Deep Tech'],
    notableExits: ['Facebook', 'Spotify', 'Airbnb'],
    website: 'lakestar.com',
    description: 'European venture fund backing category-defining technology companies from seed to growth.',
    investmentThesis: 'Deep technology focus with emphasis on enterprise value creation and sustainable competitive advantages.'
  },
  {
    id: 'vc29',
    slug: 'atomico',
    name: 'Atomico',
    type: 'VC',
    aum: 4.2,
    founded: 2006,
    headquarters: 'London, UK',
    region: 'eu',
    partners: [
      { name: 'Niklas Zennström', focus: 'Founder' },
      { name: 'Sophia Bendz', focus: 'Partner' }
    ],
    xrInvestments: 7,
    xrPortfolio: ['Improbable', 'Lilium', 'Supercell'],
    fundSize: 820,
    investmentRange: { min: 1, max: 100 },
    sectors: ['Gaming', 'Deep Tech', 'Enterprise'],
    notableExits: ['Supercell', 'Klarna', 'Graphcore'],
    website: 'atomico.com',
    description: 'Founded by Skype co-founder, backing ambitious founders building category-defining technology companies.',
    investmentThesis: 'Technology can enable humanity to do great things. XR investments focus on transformative platforms.'
  },
  {
    id: 'vc30',
    slug: 'index-ventures',
    name: 'Index Ventures',
    type: 'VC',
    aum: 16,
    founded: 1996,
    headquarters: 'Geneva, Switzerland',
    region: 'eu',
    partners: [
      { name: 'Neil Rimer', focus: 'General Partner' },
      { name: 'Martin Mignot', focus: 'Partner' }
    ],
    xrInvestments: 12,
    xrPortfolio: ['Roblox', 'Discord', 'Unity', 'Figma'],
    fundSize: 2400,
    investmentRange: { min: 1, max: 200 },
    sectors: ['Gaming', 'Creator Economy', 'Enterprise'],
    notableExits: ['Roblox', 'Discord', 'Dropbox', 'Figma'],
    website: 'indexventures.com',
    description: 'Global venture capital firm backing exceptional entrepreneurs building companies that reshape industries.',
    investmentThesis: 'Platform companies that enable new forms of creation and collaboration. Strong gaming and metaverse thesis.'
  },
  // ASEAN VCs
  {
    id: 'vc31',
    slug: 'vertex-ventures-sea',
    name: 'Vertex Ventures Southeast Asia',
    type: 'VC',
    aum: 0.8,
    founded: 1988,
    headquarters: 'Singapore',
    region: 'asean',
    partners: [
      { name: 'Chua Kee Lock', focus: 'Managing Partner' },
      { name: 'Joo Hock Chua', focus: 'Partner' }
    ],
    xrInvestments: 4,
    xrPortfolio: ['Grab', 'FirstCry', 'XR Studios'],
    fundSize: 350,
    investmentRange: { min: 0.5, max: 15 },
    sectors: ['Consumer', 'Enterprise', 'Gaming'],
    notableExits: ['Grab', 'PatSnap', 'FirstCry'],
    website: 'vertexventures.com',
    description: 'Temasek-backed venture fund investing in promising technology startups across Southeast Asia.',
    investmentThesis: 'Regional technology champions with global potential. XR focus on consumer and enterprise applications.'
  },
  {
    id: 'vc32',
    slug: 'golden-gate-ventures',
    name: 'Golden Gate Ventures',
    type: 'VC',
    aum: 0.35,
    founded: 2011,
    headquarters: 'Singapore',
    region: 'asean',
    partners: [
      { name: 'Vinnie Lauria', focus: 'Managing Partner' },
      { name: 'Paul Bragiel', focus: 'Founding Partner' }
    ],
    xrInvestments: 3,
    xrPortfolio: ['Mighty Bear Games', 'Assemblr', 'Omniaz'],
    fundSize: 120,
    investmentRange: { min: 0.2, max: 5 },
    sectors: ['Gaming', 'Consumer Tech', 'Enterprise'],
    notableExits: ['Carousell', 'Redmart', 'Carro'],
    website: 'goldengate.vc',
    description: 'Early-stage venture capital firm focused on Southeast Asian founders and startups.',
    investmentThesis: 'Mobile-first consumer experiences for Southeast Asia. Gaming and entertainment XR focus.'
  },
  {
    id: 'vc33',
    slug: 'jungle-ventures',
    name: 'Jungle Ventures',
    type: 'VC',
    aum: 0.7,
    founded: 2012,
    headquarters: 'Singapore',
    region: 'asean',
    partners: [
      { name: 'Amit Anand', focus: 'Founding Partner' },
      { name: 'David Gowdey', focus: 'Partner' }
    ],
    xrInvestments: 5,
    xrPortfolio: ['Kredivo', 'BeReal Asia', 'XR Training'],
    fundSize: 280,
    investmentRange: { min: 1, max: 25 },
    sectors: ['Enterprise', 'Consumer', 'Fintech'],
    notableExits: ['Kredivo', 'Moglix', 'Sociolla'],
    website: 'jungle.vc',
    description: 'Growth-stage venture fund backing founders building regional champions across Asia.',
    investmentThesis: 'Regional scale advantages in emerging markets. Enterprise XR for training and operations.'
  },
  // GAMING-FOCUSED VCs
  {
    id: 'vc34',
    slug: 'griffin-gaming-partners',
    name: 'Griffin Gaming Partners',
    type: 'VC',
    aum: 0.75,
    founded: 2019,
    headquarters: 'Los Angeles, CA',
    region: 'na',
    partners: [
      { name: 'Phil Sanderson', focus: 'Managing Partner' },
      { name: 'Nick Tuosto', focus: 'Partner' }
    ],
    xrInvestments: 18,
    xrPortfolio: ['Rec Room', 'VRChat', 'Sandbox VR', 'Within'],
    fundSize: 500,
    investmentRange: { min: 2, max: 30 },
    sectors: ['Gaming', 'VR Entertainment', 'Social VR'],
    notableExits: ['Discord', 'Roblox'],
    website: 'griffingp.com',
    description: 'Gaming-focused venture fund with deep expertise in VR entertainment and social gaming.',
    investmentThesis: 'Social gaming is the next computing platform. Heavy focus on VR social and entertainment.'
  },
  {
    id: 'vc35',
    slug: 'bitkraft-ventures',
    name: 'BITKRAFT Ventures',
    type: 'VC',
    aum: 0.9,
    founded: 2016,
    headquarters: 'Los Angeles, CA',
    region: 'na',
    partners: [
      { name: 'Jens Hilgers', focus: 'Founding Partner' },
      { name: 'Moritz Baier-Lentz', focus: 'Partner' }
    ],
    xrInvestments: 22,
    xrPortfolio: ['FitXR', 'Resolution Games', 'nDreams', 'Admix'],
    fundSize: 420,
    investmentRange: { min: 0.5, max: 25 },
    sectors: ['Gaming', 'Esports', 'VR Fitness', 'Metaverse'],
    notableExits: ['ESL', 'Turtle Entertainment'],
    website: 'bitkraft.vc',
    description: 'Leading gaming and esports venture fund with strong VR gaming and fitness portfolio.',
    investmentThesis: 'Gaming infrastructure for the metaverse. VR fitness and entertainment are core investment themes.'
  },
  // HEALTHCARE-FOCUSED VCs
  {
    id: 'vc36',
    slug: 'general-atlantic',
    name: 'General Atlantic',
    type: 'PE',
    aum: 84,
    founded: 1980,
    headquarters: 'New York, NY',
    region: 'global',
    partners: [
      { name: 'William Ford', focus: 'CEO' },
      { name: 'Martin Escobari', focus: 'Co-President' }
    ],
    xrInvestments: 8,
    xrPortfolio: ['Alignment Healthcare', 'Cityblock Health', 'Hims'],
    fundSize: 4500,
    investmentRange: { min: 50, max: 500 },
    sectors: ['Healthcare', 'Technology', 'Consumer'],
    notableExits: ['Alibaba', 'Airbnb', 'Uber'],
    website: 'generalatlantic.com',
    description: 'Global growth equity firm with extensive healthcare technology portfolio.',
    investmentThesis: 'Technology-enabled healthcare transformation. XR for clinical training and patient care.'
  },
  {
    id: 'vc37',
    slug: 'oak-hcft',
    name: 'Oak HC/FT',
    type: 'VC',
    aum: 4.5,
    founded: 2014,
    headquarters: 'Greenwich, CT',
    region: 'na',
    partners: [
      { name: 'Annie Lamont', focus: 'Managing Partner' },
      { name: 'Patricia Kemp', focus: 'Partner' }
    ],
    xrInvestments: 6,
    xrPortfolio: ['Osso VR', 'Augmedix', 'Olive AI'],
    fundSize: 1400,
    investmentRange: { min: 5, max: 100 },
    sectors: ['Healthcare IT', 'Medical Training', 'Digital Health'],
    notableExits: ['Flatiron Health', 'Oscar Health', 'Devoted Health'],
    website: 'oakhcft.com',
    description: 'Healthcare and fintech focused venture firm with leading healthcare XR portfolio.',
    investmentThesis: 'Technology transforming healthcare delivery. XR for surgical training and clinical simulation.'
  },
  {
    id: 'vc38',
    slug: 'signalfire',
    name: 'SignalFire',
    type: 'VC',
    aum: 3.2,
    founded: 2015,
    headquarters: 'San Francisco, CA',
    region: 'na',
    partners: [
      { name: 'Chris Farmer', focus: 'Founder & CEO' },
      { name: 'Wayne Hu', focus: 'Partner' }
    ],
    xrInvestments: 9,
    xrPortfolio: ['Mojo Vision', 'Embodied Labs', 'Neurable'],
    fundSize: 600,
    investmentRange: { min: 1, max: 50 },
    sectors: ['Deep Tech', 'Healthcare', 'Enterprise'],
    notableExits: ['Grammarly', 'Cockroach Labs'],
    website: 'signalfire.com',
    description: 'Data-driven venture firm using proprietary technology to identify exceptional founders.',
    investmentThesis: 'Data-informed investing in breakthrough technologies. Healthcare XR and brain-computer interfaces.'
  },
  // PRIVATE EQUITY
  {
    id: 'vc39',
    slug: 'kkr-tech',
    name: 'KKR Technology Growth',
    type: 'PE',
    aum: 225,
    founded: 1976,
    headquarters: 'New York, NY',
    region: 'global',
    partners: [
      { name: 'John Park', focus: 'Technology Partner' },
      { name: 'Stephen Shanley', focus: 'Partner' }
    ],
    xrInvestments: 5,
    xrPortfolio: ['Epic Games', 'Internet Brands', 'Corel'],
    fundSize: 6000,
    investmentRange: { min: 100, max: 2000 },
    sectors: ['Software', 'Gaming', 'Enterprise'],
    notableExits: ['GoDaddy', 'Optiv', 'BMC Software'],
    website: 'kkr.com',
    description: 'Global investment firm with dedicated technology growth strategy.',
    investmentThesis: 'Platform companies with durable competitive advantages. XR infrastructure and gaming platforms.'
  },
  {
    id: 'vc40',
    slug: 'blackstone-growth',
    name: 'Blackstone Growth',
    type: 'PE',
    aum: 340,
    founded: 1985,
    headquarters: 'New York, NY',
    region: 'global',
    partners: [
      { name: 'Jon Korngold', focus: 'Global Head of Growth' },
      { name: 'David Blitzer', focus: 'Senior Managing Director' }
    ],
    xrInvestments: 4,
    xrPortfolio: ['Bumble', 'Oatly', 'Spanx'],
    fundSize: 8000,
    investmentRange: { min: 200, max: 3000 },
    sectors: ['Consumer', 'Technology', 'Media'],
    notableExits: ['Refinitiv', 'Ancestry', 'Gates Hospitality'],
    website: 'blackstone.com',
    description: 'Growth equity arm of the world\'s largest alternative asset manager.',
    investmentThesis: 'Consumer-facing technology platforms with massive scale potential. Selective XR investments.'
  },
  // MENA INVESTORS
  {
    id: 'vc41',
    slug: 'mubadala-ventures',
    name: 'Mubadala Capital Ventures',
    type: 'Sovereign',
    aum: 286,
    founded: 2002,
    headquarters: 'Abu Dhabi, UAE',
    region: 'mena',
    partners: [
      { name: 'Khaldoon Al Mubarak', focus: 'Group CEO' },
      { name: 'Ibrahim Ajami', focus: 'Ventures Head' }
    ],
    xrInvestments: 12,
    xrPortfolio: ['Magic Leap', 'Recursion', 'C3.ai', 'Joby Aviation'],
    fundSize: 3000,
    investmentRange: { min: 25, max: 500 },
    sectors: ['Deep Tech', 'AI', 'XR', 'Aerospace'],
    notableExits: ['AMD', 'Jio Platforms', 'Virgin Galactic'],
    website: 'mubadala.com',
    description: 'Abu Dhabi sovereign wealth fund with significant technology and XR investments globally.',
    investmentThesis: 'Transformative technologies with long-term value creation. XR for enterprise and entertainment.'
  },
  {
    id: 'vc42',
    slug: 'saudi-pif-ventures',
    name: 'PIF Ventures (Vision 2030)',
    type: 'Sovereign',
    aum: 930,
    founded: 1971,
    headquarters: 'Riyadh, Saudi Arabia',
    region: 'mena',
    partners: [
      { name: 'Yasir Al-Rumayyan', focus: 'Governor' },
      { name: 'Ibrahim Almubarak', focus: 'Head of Ventures' }
    ],
    xrInvestments: 15,
    xrPortfolio: ['Magic Leap', 'Lucid Motors', 'Cruise', 'NEOM XR'],
    fundSize: 5000,
    investmentRange: { min: 50, max: 5000 },
    sectors: ['XR/Metaverse', 'AI', 'Entertainment', 'Tourism'],
    notableExits: ['Uber', 'Lucid Motors IPO'],
    website: 'pif.gov.sa',
    description: 'Saudi Arabia\'s sovereign wealth fund with $2.8B committed to XR and metaverse through Vision 2030.',
    investmentThesis: 'Spatial computing as entertainment and tourism infrastructure. Massive commitment to NEOM and XR deployment.'
  },
  // SOUTH ASIA
  {
    id: 'vc43',
    slug: 'sequoia-india',
    name: 'Sequoia Capital India',
    type: 'VC',
    aum: 8.5,
    founded: 2006,
    headquarters: 'Bangalore, India',
    region: 'south-asia',
    partners: [
      { name: 'Shailendra Singh', focus: 'Managing Director' },
      { name: 'Rajan Anandan', focus: 'Managing Director' }
    ],
    xrInvestments: 6,
    xrPortfolio: ['Byju\'s', 'Unacademy', 'XR Training India'],
    fundSize: 2000,
    investmentRange: { min: 1, max: 200 },
    sectors: ['EdTech', 'Enterprise', 'Consumer'],
    notableExits: ['Byju\'s', 'Freshworks', 'Pine Labs'],
    website: 'sequoiacap.com',
    description: 'India-focused venture arm of global Sequoia with strong EdTech and enterprise portfolio.',
    investmentThesis: 'India\'s digital transformation. XR for education and enterprise training.'
  },
  {
    id: 'vc44',
    slug: 'accel-india',
    name: 'Accel India',
    type: 'VC',
    aum: 4.2,
    founded: 2008,
    headquarters: 'Bangalore, India',
    region: 'south-asia',
    partners: [
      { name: 'Prashanth Prakash', focus: 'Partner' },
      { name: 'Barath Subramanian', focus: 'Partner' }
    ],
    xrInvestments: 4,
    xrPortfolio: ['Flipkart', 'Swiggy', 'Browser Stack'],
    fundSize: 1400,
    investmentRange: { min: 0.5, max: 100 },
    sectors: ['Consumer', 'SaaS', 'Enterprise'],
    notableExits: ['Flipkart', 'Freshworks', 'BookMyShow'],
    website: 'accel.com',
    description: 'Leading India-focused venture firm with strong consumer and enterprise portfolio.',
    investmentThesis: 'Consumer internet and enterprise technology. Emerging XR applications in e-commerce and training.'
  },
  // PACIFIC
  {
    id: 'vc45',
    slug: 'softbank-vision',
    name: 'SoftBank Vision Fund',
    type: 'PE',
    aum: 108,
    founded: 2017,
    headquarters: 'Tokyo, Japan',
    region: 'pacific',
    partners: [
      { name: 'Masayoshi Son', focus: 'Founder & CEO' },
      { name: 'Rajeev Misra', focus: 'CEO Vision Fund' }
    ],
    xrInvestments: 25,
    xrPortfolio: ['Magic Leap', 'Niantic', 'Cruise', 'ByteDance', 'Improbable'],
    fundSize: 50000,
    investmentRange: { min: 100, max: 10000 },
    sectors: ['AI', 'XR', 'Mobility', 'Fintech'],
    notableExits: ['Coupang', 'DoorDash', 'Uber'],
    website: 'softbank.com',
    description: 'Largest technology investment fund globally with extensive XR and metaverse portfolio.',
    investmentThesis: 'AI revolution enabling the singularity. XR as fundamental AI interface.'
  },
  {
    id: 'vc46',
    slug: 'jafco-japan',
    name: 'JAFCO Group',
    type: 'VC',
    aum: 3.8,
    founded: 1973,
    headquarters: 'Tokyo, Japan',
    region: 'pacific',
    partners: [
      { name: 'Kiyoshi Nishimura', focus: 'Managing Partner' }
    ],
    xrInvestments: 8,
    xrPortfolio: ['Sony VR', 'Cluster', 'GREE VR', 'Bandai Namco'],
    fundSize: 450,
    investmentRange: { min: 1, max: 30 },
    sectors: ['Gaming', 'Entertainment', 'Enterprise'],
    notableExits: ['Nomura Research', 'CyberAgent', 'M3'],
    website: 'jafco.co.jp',
    description: 'Japan\'s leading venture capital firm with extensive gaming and entertainment portfolio.',
    investmentThesis: 'Japanese gaming and entertainment excellence. VR content and platform focus.'
  },
  {
    id: 'vc47',
    slug: 'sparx-group',
    name: 'SPARX Group',
    type: 'VC',
    aum: 2.1,
    founded: 1989,
    headquarters: 'Tokyo, Japan',
    region: 'pacific',
    partners: [
      { name: 'Shuhei Abe', focus: 'Founder & CEO' }
    ],
    xrInvestments: 5,
    xrPortfolio: ['Sony Interactive', 'mixi', 'VR Studios Japan'],
    fundSize: 280,
    investmentRange: { min: 5, max: 50 },
    sectors: ['Gaming', 'Deep Tech', 'Robotics'],
    notableExits: ['DeNA', 'Gree', 'Olympus'],
    website: 'sparxgroup.com',
    description: 'Japanese investment firm with focus on deep technology and gaming.',
    investmentThesis: 'Japanese technology innovation. XR for gaming, robotics, and industrial applications.'
  },
  // ADDITIONAL CORPORATE VCs
  {
    id: 'vc48',
    slug: 'htc-vive-x',
    name: 'HTC Vive X',
    type: 'CVC',
    aum: 0.12,
    founded: 2016,
    headquarters: 'San Francisco, CA',
    region: 'na',
    partners: [
      { name: 'Marc Metis', focus: 'Global Head' }
    ],
    xrInvestments: 85,
    xrPortfolio: ['VRHealth', 'VIVE Studios', 'XR startups worldwide'],
    fundSize: 100,
    investmentRange: { min: 0.3, max: 5 },
    sectors: ['VR Content', 'Healthcare VR', 'Enterprise', 'Gaming'],
    notableExits: ['Multiple VR studio acquisitions'],
    website: 'htc.com/vivex',
    description: 'HTC\'s global XR accelerator with the largest VR-focused startup portfolio.',
    investmentThesis: 'Building the VR ecosystem through early-stage investment and acceleration. Content and platform focus.'
  },
  {
    id: 'vc49',
    slug: 'epiq-capital',
    name: 'EPIQ Capital',
    type: 'VC',
    aum: 0.45,
    founded: 2018,
    headquarters: 'Los Angeles, CA',
    region: 'na',
    partners: [
      { name: 'Michael Awadis', focus: 'Managing Partner' }
    ],
    xrInvestments: 14,
    xrPortfolio: ['Supernatural', 'FitXR', 'Litho', 'XR Health'],
    fundSize: 175,
    investmentRange: { min: 1, max: 15 },
    sectors: ['VR Fitness', 'Healthcare', 'Enterprise'],
    notableExits: ['Supernatural (Meta)'],
    website: 'epiqcapital.com',
    description: 'XR-focused venture fund specializing in fitness, health, and wellness applications.',
    investmentThesis: 'VR/AR as the future of fitness and wellness. Healthcare applications with proven outcomes.'
  },
  {
    id: 'vc50',
    slug: 'emerge-ventures',
    name: 'Emerge Ventures',
    type: 'VC',
    aum: 0.08,
    founded: 2019,
    headquarters: 'Los Angeles, CA',
    region: 'na',
    partners: [
      { name: 'Sly Lee', focus: 'Founder' }
    ],
    xrInvestments: 12,
    xrPortfolio: ['Emerge', 'haptic startups', 'XR input'],
    fundSize: 50,
    investmentRange: { min: 0.25, max: 3 },
    sectors: ['Haptics', 'Input Devices', 'VR Hardware'],
    notableExits: [],
    website: 'emerge.io',
    description: 'Venture fund focused on haptic feedback and next-generation XR input technologies.',
    investmentThesis: 'Touch is the missing sense in XR. Investing in companies solving haptic feedback challenges.'
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
