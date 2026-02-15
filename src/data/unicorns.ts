export interface Unicorn {
  id: string;
  slug: string;
  name: string;
  valuation: number; // in billions USD
  sector: string;
  region: 'na' | 'eu' | 'asean' | 'pacific' | 'south-asia' | 'mena';
  foundedYear: number;
  totalRaised: number; // in millions USD
  headquarters: string;
  investors: string[];
  employees: number;
  fundingRounds: { date: Date; amount: number; round: string; valuation?: number }[];
  status: 'private' | 'public' | 'acquired';
  description: string;
  ceo: string;
  products: string[];
  keyMetrics: { label: string; value: string }[];
}

export const unicorns: Unicorn[] = [
  // MEGA UNICORNS ($10B+)
  {
    id: 'u1',
    slug: 'magic-leap',
    name: 'Magic Leap',
    valuation: 6.5,
    sector: 'Enterprise AR',
    region: 'na',
    foundedYear: 2010,
    totalRaised: 4500,
    headquarters: 'Plantation, FL',
    investors: ['Google', 'Alibaba', 'Andreessen Horowitz', 'AT&T', 'Temasek'],
    employees: 1800,
    fundingRounds: [
      { date: new Date('2014-10-01'), amount: 542, round: 'Series B', valuation: 2 },
      { date: new Date('2016-02-01'), amount: 793, round: 'Series C', valuation: 4.5 },
      { date: new Date('2018-03-01'), amount: 963, round: 'Series D', valuation: 6.3 },
      { date: new Date('2020-05-01'), amount: 350, round: 'Series E', valuation: 2 },
      { date: new Date('2022-10-01'), amount: 500, round: 'Series F', valuation: 4.5 },
      { date: new Date('2025-02-01'), amount: 500, round: 'Series G', valuation: 6.5 }
    ],
    status: 'private',
    description: 'Pioneer in enterprise AR with Magic Leap 2 headset. Successfully pivoted from consumer to enterprise with strong healthcare and defense traction.',
    ceo: 'Peggy Johnson',
    products: ['Magic Leap 2', 'Lumin OS', 'Magic Leap Suite for Enterprise'],
    keyMetrics: [
      { label: 'Enterprise Deployments', value: '2,500+' },
      { label: 'Healthcare Partners', value: '180+' },
      { label: 'Defense Contracts', value: '$500M+' }
    ]
  },
  {
    id: 'u2',
    slug: 'anduril',
    name: 'Anduril Industries',
    valuation: 14,
    sector: 'Defense XR',
    region: 'na',
    foundedYear: 2017,
    totalRaised: 4200,
    headquarters: 'Irvine, CA',
    investors: ['Andreessen Horowitz', 'Founders Fund', 'General Catalyst', 'Valor Equity', 'Fidelity'],
    employees: 3500,
    fundingRounds: [
      { date: new Date('2018-09-01'), amount: 41, round: 'Series A', valuation: 0.2 },
      { date: new Date('2019-09-01'), amount: 200, round: 'Series B', valuation: 1.9 },
      { date: new Date('2020-07-01'), amount: 200, round: 'Series C', valuation: 1.9 },
      { date: new Date('2021-06-01'), amount: 450, round: 'Series D', valuation: 4.6 },
      { date: new Date('2022-12-01'), amount: 1500, round: 'Series E', valuation: 8.5 },
      { date: new Date('2025-08-01'), amount: 1500, round: 'Series F', valuation: 14 }
    ],
    status: 'private',
    description: 'Defense technology company founded by Oculus creator Palmer Luckey. Lattice platform provides real-time 3D battlefield visualization using XR.',
    ceo: 'Brian Schimpf',
    products: ['Lattice', 'Ghost UAV', 'Sentry Tower', 'Anvil', 'Roadrunner-M'],
    keyMetrics: [
      { label: 'Government Contracts', value: '$15B+' },
      { label: 'Countries Deployed', value: '10' },
      { label: 'Autonomous Systems', value: '50,000+' }
    ]
  },
  {
    id: 'u3',
    slug: 'xreal',
    name: 'Xreal',
    valuation: 3.2,
    sector: 'Consumer AR',
    region: 'pacific',
    foundedYear: 2017,
    totalRaised: 560,
    headquarters: 'Beijing, China',
    investors: ['Alibaba', 'Sequoia China', 'Hillhouse', 'SK Hynix', 'NIO Capital'],
    employees: 750,
    fundingRounds: [
      { date: new Date('2018-03-01'), amount: 22, round: 'Series A', valuation: 0.1 },
      { date: new Date('2020-09-01'), amount: 40, round: 'Series B', valuation: 0.3 },
      { date: new Date('2022-03-01'), amount: 100, round: 'Series C', valuation: 1.0 },
      { date: new Date('2024-01-01'), amount: 60, round: 'Series C+', valuation: 1.2 },
      { date: new Date('2025-06-01'), amount: 200, round: 'Series D', valuation: 3.2 }
    ],
    status: 'private',
    description: 'Leading consumer AR glasses company with global carrier partnerships. Air 3 Ultra with 6DoF tracking is the best-selling consumer AR device.',
    ceo: 'Chi Xu',
    products: ['Air 3 Ultra', 'Air 3 Pro', 'Beam Pro 2', 'One Pro', 'Nebula OS'],
    keyMetrics: [
      { label: 'Units Sold', value: '1.5M+' },
      { label: 'Carrier Partners', value: '45+' },
      { label: 'Countries Available', value: '32' }
    ]
  },
  {
    id: 'u4',
    slug: 'varjo',
    name: 'Varjo Technologies',
    valuation: 1.2,
    sector: 'Enterprise VR',
    region: 'eu',
    foundedYear: 2016,
    totalRaised: 270,
    headquarters: 'Helsinki, Finland',
    investors: ['Atomico', 'EQT Ventures', 'NordicNinja', 'Volvo Cars Tech Fund', 'Lifeline Ventures'],
    employees: 380,
    fundingRounds: [
      { date: new Date('2017-03-01'), amount: 8, round: 'Series A', valuation: 0.05 },
      { date: new Date('2018-06-01'), amount: 31, round: 'Series B', valuation: 0.2 },
      { date: new Date('2020-06-01'), amount: 54, round: 'Series C', valuation: 0.5 },
      { date: new Date('2022-01-01'), amount: 54, round: 'Series D', valuation: 0.8 },
      { date: new Date('2025-05-01'), amount: 70, round: 'Series E', valuation: 1.2 }
    ],
    status: 'private',
    description: 'Finnish company building the highest resolution VR/XR headsets for professional use. Human-eye resolution displays used by aerospace, automotive, and military.',
    ceo: 'Urho Konttori',
    products: ['XR-4 Focal', 'VR-4', 'Aero 2', 'Reality Cloud', 'Varjo Base'],
    keyMetrics: [
      { label: 'Enterprise Customers', value: '900+' },
      { label: 'Simulator Programs', value: '2,000+' },
      { label: 'Resolution', value: '50 PPD' }
    ]
  },
  {
    id: 'u5',
    slug: 'niantic',
    name: 'Niantic',
    valuation: 8.7,
    sector: 'AR Gaming',
    region: 'na',
    foundedYear: 2010,
    totalRaised: 770,
    headquarters: 'San Francisco, CA',
    investors: ['Google', 'Spark Capital', 'Nintendo', 'SoftBank', 'Coatue'],
    employees: 800,
    fundingRounds: [
      { date: new Date('2017-11-01'), amount: 200, round: 'Series B', valuation: 2.0 },
      { date: new Date('2019-01-01'), amount: 245, round: 'Series C', valuation: 3.9 },
      { date: new Date('2021-11-01'), amount: 300, round: 'Series D', valuation: 9.0 },
      { date: new Date('2025-04-01'), amount: 250, round: 'Series E', valuation: 8.7 }
    ],
    status: 'private',
    description: 'Creator of Pokémon GO, the most successful AR game ever with billions in revenue. Building Lightship platform for real-world AR experiences.',
    ceo: 'John Hanke',
    products: ['Pokémon GO', 'Ingress', 'Lightship ARDK', 'Peridot', '8th Wall'],
    keyMetrics: [
      { label: 'Pokémon GO Downloads', value: '1B+' },
      { label: 'Total Revenue', value: '$8B+' },
      { label: 'Lightship Developers', value: '200K+' }
    ]
  },
  {
    id: 'u6',
    slug: 'mojo-vision',
    name: 'Mojo Vision',
    valuation: 1.1,
    sector: 'AR Contact Lens',
    region: 'na',
    foundedYear: 2015,
    totalRaised: 285,
    headquarters: 'Saratoga, CA',
    investors: ['NEA', 'Gradient Ventures', 'Khosla Ventures', 'Liberty Global', 'LG Electronics'],
    employees: 200,
    fundingRounds: [
      { date: new Date('2017-05-01'), amount: 50, round: 'Series A', valuation: 0.15 },
      { date: new Date('2020-01-01'), amount: 108, round: 'Series B', valuation: 0.6 },
      { date: new Date('2022-04-01'), amount: 45, round: 'Series B-1', valuation: 0.8 },
      { date: new Date('2025-04-01'), amount: 75, round: 'Series C', valuation: 1.1 }
    ],
    status: 'private',
    description: 'Building the first true AR contact lens with built-in microLED display. Pushing miniaturization boundaries for invisible computing.',
    ceo: 'Drew Perkins',
    products: ['Mojo Lens', 'Mojo Vision Platform', 'Micro-LED Display Technology'],
    keyMetrics: [
      { label: 'Patents Filed', value: '180+' },
      { label: 'Clinical Trials', value: 'Phase 3' },
      { label: 'Display PPI', value: '14,000' }
    ]
  },
  {
    id: 'u7',
    slug: 'pico',
    name: 'Pico (ByteDance)',
    valuation: 4.5,
    sector: 'Consumer VR',
    region: 'pacific',
    foundedYear: 2015,
    totalRaised: 650,
    headquarters: 'Beijing, China',
    investors: ['ByteDance', 'GGV Capital', 'IDG Capital'],
    employees: 2200,
    fundingRounds: [
      { date: new Date('2017-09-01'), amount: 24, round: 'Series A', valuation: 0.1 },
      { date: new Date('2020-03-01'), amount: 77, round: 'Series B+', valuation: 0.5 },
      { date: new Date('2021-08-01'), amount: 0, round: 'Acquisition', valuation: 1.8 },
      { date: new Date('2025-03-01'), amount: 500, round: 'Internal', valuation: 4.5 }
    ],
    status: 'private',
    description: 'ByteDance-owned VR headset maker competing globally with Meta Quest. Pico 5 launching with advanced eye and face tracking.',
    ceo: 'Zhou Hongwei',
    products: ['Pico 4 Ultra', 'Pico 5', 'Pico Enterprise', 'Pico Store'],
    keyMetrics: [
      { label: 'Units Shipped', value: '3M+' },
      { label: 'Countries Available', value: '25' },
      { label: 'Content Library', value: '500+ Apps' }
    ]
  },
  {
    id: 'u8',
    slug: 'improbable',
    name: 'Improbable',
    valuation: 2.0,
    sector: 'Metaverse Infrastructure',
    region: 'eu',
    foundedYear: 2012,
    totalRaised: 604,
    headquarters: 'London, UK',
    investors: ['SoftBank', 'Andreessen Horowitz', 'Temasek', 'Epic Games'],
    employees: 700,
    fundingRounds: [
      { date: new Date('2015-03-01'), amount: 20, round: 'Series A', valuation: 0.1 },
      { date: new Date('2017-05-01'), amount: 502, round: 'Series B', valuation: 2.0 },
      { date: new Date('2022-06-01'), amount: 150, round: 'Series C', valuation: 3.0 },
      { date: new Date('2025-06-01'), amount: 100, round: 'Series D', valuation: 2.0 }
    ],
    status: 'private',
    description: 'Building metaverse infrastructure with M² platform enabling massive-scale virtual worlds. Defense and entertainment applications.',
    ceo: 'Herman Narula',
    products: ['M² Platform', 'SpatialOS', 'Morpheus', 'Defense Platform'],
    keyMetrics: [
      { label: 'Concurrent Users', value: '10K+' },
      { label: 'Enterprise Customers', value: '50+' },
      { label: 'Virtual World Size', value: '16km²' }
    ]
  },
  {
    id: 'u9',
    slug: 'sandbox-vr',
    name: 'Sandbox VR',
    valuation: 1.1,
    sector: 'Location-Based VR',
    region: 'na',
    foundedYear: 2016,
    totalRaised: 115,
    headquarters: 'San Francisco, CA',
    investors: ['Andreessen Horowitz', 'Alibaba', 'Craft Ventures', 'FLOODGATE'],
    employees: 800,
    fundingRounds: [
      { date: new Date('2018-03-01'), amount: 11, round: 'Series A', valuation: 0.05 },
      { date: new Date('2019-08-01'), amount: 68, round: 'Series A-1', valuation: 0.4 },
      { date: new Date('2022-02-01'), amount: 37, round: 'Series B', valuation: 0.8 },
      { date: new Date('2025-07-01'), amount: 50, round: 'Series C', valuation: 1.1 }
    ],
    status: 'private',
    description: 'Premium location-based VR entertainment with full-body tracking. Operating 50+ locations globally with expansion accelerating.',
    ceo: 'Steve Zhao',
    products: ['Deadwood Mansion', 'Squid Game VR', 'Amber Sky 2088', 'Star Trek: Discovery'],
    keyMetrics: [
      { label: 'Global Locations', value: '55' },
      { label: 'Experiences Delivered', value: '3M+' },
      { label: 'Average Rating', value: '4.9/5' }
    ]
  },
  {
    id: 'u10',
    slug: 'ultraleap',
    name: 'Ultraleap',
    valuation: 1.0,
    sector: 'Hand Tracking',
    region: 'eu',
    foundedYear: 2013,
    totalRaised: 235,
    headquarters: 'Bristol, UK',
    investors: ['Tencent', 'CMC Capital', 'IP Group', 'Mayfair Equity Partners'],
    employees: 300,
    fundingRounds: [
      { date: new Date('2014-09-01'), amount: 17, round: 'Series A', valuation: 0.05 },
      { date: new Date('2017-05-01'), amount: 20, round: 'Series B', valuation: 0.15 },
      { date: new Date('2019-05-01'), amount: 0, round: 'Merger', valuation: 0.3 },
      { date: new Date('2021-01-01'), amount: 88, round: 'Series D', valuation: 0.7 },
      { date: new Date('2025-02-01'), amount: 55, round: 'Series E', valuation: 1.0 }
    ],
    status: 'private',
    description: 'Global leader in hand tracking and mid-air haptics. Technology powers hand tracking in most major XR headsets.',
    ceo: 'Steve Cliffe',
    products: ['Leap Motion Controller 3', 'Stratos Inspire', 'TouchFree 2.0', 'Hyperion Module'],
    keyMetrics: [
      { label: 'Devices Shipped', value: '1M+' },
      { label: 'OEM Partners', value: '40+' },
      { label: 'Developers', value: '600K+' }
    ]
  },
  {
    id: 'u11',
    slug: 'resolution-games',
    name: 'Resolution Games',
    valuation: 1.0,
    sector: 'VR Gaming',
    region: 'eu',
    foundedYear: 2015,
    totalRaised: 75,
    headquarters: 'Stockholm, Sweden',
    investors: ['Galaxy Interactive', 'MizMaa Ventures', 'Sisu Game Ventures'],
    employees: 150,
    fundingRounds: [
      { date: new Date('2018-06-01'), amount: 7, round: 'Series A', valuation: 0.05 },
      { date: new Date('2021-11-01'), amount: 25, round: 'Series B', valuation: 0.4 },
      { date: new Date('2023-01-01'), amount: 25, round: 'Series C', valuation: 0.7 },
      { date: new Date('2025-09-01'), amount: 35, round: 'Series D', valuation: 1.0 }
    ],
    status: 'private',
    description: 'Leading VR game studio with multiple top-selling titles. Pioneering social VR gaming experiences.',
    ceo: 'Tommy Palm',
    products: ['Demeo', 'Blaston', 'Angry Birds VR', 'Ultimechs', 'Spatial Ops'],
    keyMetrics: [
      { label: 'Games Published', value: '15+' },
      { label: 'Users', value: '5M+' },
      { label: 'Demeo Sessions', value: '100M+' }
    ]
  },
  {
    id: 'u13',
    slug: 'rokid',
    name: 'Rokid',
    valuation: 1.5,
    sector: 'AR Hardware',
    region: 'pacific',
    foundedYear: 2014,
    totalRaised: 320,
    headquarters: 'Hangzhou, China',
    investors: ['Temasek', 'IDG Capital', 'CDH Investments', 'Alibaba'],
    employees: 450,
    fundingRounds: [
      { date: new Date('2016-01-01'), amount: 10, round: 'Series A', valuation: 0.05 },
      { date: new Date('2018-06-01'), amount: 50, round: 'Series B', valuation: 0.3 },
      { date: new Date('2021-03-01'), amount: 100, round: 'Series C', valuation: 0.8 },
      { date: new Date('2025-11-01'), amount: 80, round: 'Series D', valuation: 1.5 }
    ],
    status: 'private',
    description: 'Chinese AR glasses pioneer with strong enterprise and consumer lines. AI-powered spatial computing devices sold in 30+ countries.',
    ceo: 'Misa Zhu',
    products: ['Rokid Max 2', 'Rokid AR Studio', 'Rokid Station Pro', 'Rokid Glass 3'],
    keyMetrics: [
      { label: 'Units Shipped', value: '600K+' },
      { label: 'Enterprise Clients', value: '500+' },
      { label: 'Countries', value: '30+' }
    ]
  },
  {
    id: 'u14',
    slug: 'inworld-ai',
    name: 'Inworld AI',
    valuation: 1.5,
    sector: 'AI/NPCs',
    region: 'na',
    foundedYear: 2021,
    totalRaised: 185,
    headquarters: 'Mountain View, CA',
    investors: ['Lightspeed Venture Partners', 'Section 32', 'Intel Capital', 'Microsoft M12', 'Disney'],
    employees: 180,
    fundingRounds: [
      { date: new Date('2022-02-01'), amount: 12, round: 'Seed', valuation: 0.05 },
      { date: new Date('2022-08-01'), amount: 50, round: 'Series A', valuation: 0.5 },
      { date: new Date('2023-08-01'), amount: 50, round: 'Series B', valuation: 0.9 },
      { date: new Date('2025-08-01'), amount: 80, round: 'Series C', valuation: 1.5 }
    ],
    status: 'private',
    description: 'AI-powered NPC engine creating intelligent characters for XR and gaming. Used by major game studios and virtual world platforms.',
    ceo: 'Ilya Gelfenbeyn',
    products: ['Inworld Engine', 'Character Brain', 'NPC Studio', 'Origin SDK'],
    keyMetrics: [
      { label: 'Developer Studios', value: '3,500+' },
      { label: 'Characters Created', value: '1M+' },
      { label: 'Interactions/Day', value: '50M+' }
    ]
  },
  {
    id: 'u15',
    slug: 'spatial',
    name: 'Spatial',
    valuation: 1.0,
    sector: 'Social/Metaverse',
    region: 'na',
    foundedYear: 2016,
    totalRaised: 110,
    headquarters: 'New York, NY',
    investors: ['iNovia Capital', 'White Star Capital', 'Lerer Hippeau'],
    employees: 120,
    fundingRounds: [
      { date: new Date('2018-06-01'), amount: 8, round: 'Series A', valuation: 0.04 },
      { date: new Date('2020-10-01'), amount: 22, round: 'Series B', valuation: 0.2 },
      { date: new Date('2022-01-01'), amount: 25, round: 'Series C', valuation: 0.5 },
      { date: new Date('2025-05-01'), amount: 40, round: 'Series D', valuation: 1.0 }
    ],
    status: 'private',
    description: 'Social metaverse platform enabling 3D galleries, virtual events, and interactive spaces accessible across VR, AR, and web.',
    ceo: 'Anand Agarawala',
    products: ['Spatial Worlds', 'Creator Studio', 'NFT Galleries', 'Virtual Events'],
    keyMetrics: [
      { label: 'Active Worlds', value: '250K+' },
      { label: 'Monthly Users', value: '5M+' },
      { label: 'Events Hosted', value: '100K+' }
    ]
  },
  {
    id: 'u16',
    slug: 'within',
    name: 'Within',
    valuation: 1.0,
    sector: 'Health/Fitness VR',
    region: 'na',
    foundedYear: 2014,
    totalRaised: 95,
    headquarters: 'Los Angeles, CA',
    investors: ['Andreessen Horowitz', 'Raine Ventures', 'Meta', 'Emerson Collective'],
    employees: 150,
    fundingRounds: [
      { date: new Date('2016-03-01'), amount: 12, round: 'Series A', valuation: 0.06 },
      { date: new Date('2018-11-01'), amount: 30, round: 'Series B', valuation: 0.3 },
      { date: new Date('2022-05-01'), amount: 40, round: 'Acquisition', valuation: 0.8 },
      { date: new Date('2025-09-01'), amount: 15, round: 'Growth', valuation: 1.0 }
    ],
    status: 'private',
    description: 'Immersive fitness and wellness platform with Supernatural VR. Making VR workouts mainstream with 500K+ active subscribers.',
    ceo: 'Chris Milk',
    products: ['Supernatural VR', 'Within Fitness', 'Meditation XR', 'Coach AI'],
    keyMetrics: [
      { label: 'Active Subscribers', value: '500K+' },
      { label: 'Workouts Completed', value: '25M+' },
      { label: 'Calories Burned', value: '5B+' }
    ]
  },
  {
    id: 'u17',
    slug: 'pixie-dust-tech',
    name: 'Pixie Dust Technologies',
    valuation: 1.0,
    sector: 'Holographic Display',
    region: 'pacific',
    foundedYear: 2017,
    totalRaised: 85,
    headquarters: 'Tokyo, Japan',
    investors: ['SBI Investment', 'DBJ Capital', 'SMBC Venture Capital'],
    employees: 110,
    fundingRounds: [
      { date: new Date('2018-04-01'), amount: 5, round: 'Seed', valuation: 0.02 },
      { date: new Date('2019-12-01'), amount: 15, round: 'Series A', valuation: 0.1 },
      { date: new Date('2022-06-01'), amount: 25, round: 'Series B', valuation: 0.4 },
      { date: new Date('2025-03-01'), amount: 40, round: 'Series C', valuation: 1.0 }
    ],
    status: 'private',
    description: 'Japanese holographic display and spatial audio technology company. Creating volumetric displays without headsets.',
    ceo: 'Yoichi Ochiai',
    products: ['Holographic Display', 'Spatial Audio System', 'Digital Signage XR'],
    keyMetrics: [
      { label: 'Display Installations', value: '2,000+' },
      { label: 'Patents', value: '120+' },
      { label: 'Enterprise Clients', value: '150+' }
    ]
  },
  {
    id: 'u18',
    slug: 'hadean',
    name: 'Hadean',
    valuation: 1.2,
    sector: 'Cloud Infrastructure',
    region: 'eu',
    foundedYear: 2018,
    totalRaised: 95,
    headquarters: 'London, UK',
    investors: ['2050 Capital', 'Inaré', 'Draper Esprit', 'Epic Games'],
    employees: 85,
    fundingRounds: [
      { date: new Date('2019-03-01'), amount: 5, round: 'Seed', valuation: 0.02 },
      { date: new Date('2021-05-01'), amount: 15, round: 'Series A', valuation: 0.1 },
      { date: new Date('2022-11-01'), amount: 30, round: 'Series B', valuation: 0.5 },
      { date: new Date('2025-07-01'), amount: 45, round: 'Series C', valuation: 1.2 }
    ],
    status: 'private',
    description: 'Distributed cloud platform for massive-scale virtual worlds and simulations. Powers metaverse infrastructure for defense and enterprise.',
    ceo: 'Craig Sherla',
    products: ['Hadean Platform', 'Aether Engine', 'SimSpace', 'Defense Cloud'],
    keyMetrics: [
      { label: 'Concurrent Users', value: '50K+' },
      { label: 'Defense Contracts', value: '8' },
      { label: 'Simulation Scale', value: '100km²' }
    ]
  },
  {
    id: 'u19',
    slug: 'mirra',
    name: 'Mirra',
    valuation: 1.0,
    sector: 'Enterprise AR',
    region: 'south-asia',
    foundedYear: 2018,
    totalRaised: 65,
    headquarters: 'Bangalore, India',
    investors: ['Accel India', 'Chiratae Ventures', 'Qualcomm Ventures'],
    employees: 200,
    fundingRounds: [
      { date: new Date('2019-06-01'), amount: 3, round: 'Seed', valuation: 0.01 },
      { date: new Date('2021-02-01'), amount: 12, round: 'Series A', valuation: 0.08 },
      { date: new Date('2023-05-01'), amount: 20, round: 'Series B', valuation: 0.4 },
      { date: new Date('2025-10-01'), amount: 30, round: 'Series C', valuation: 1.0 }
    ],
    status: 'private',
    description: 'Indian enterprise AR platform for manufacturing, warehouse operations, and remote assistance. Largest AR deployment in South Asia.',
    ceo: 'Vikram Sharma',
    products: ['Mirra Assist', 'Mirra Inspect', 'Mirra Train', 'Warehouse AR'],
    keyMetrics: [
      { label: 'Factory Deployments', value: '800+' },
      { label: 'Workers Using AR', value: '150K+' },
      { label: 'Error Reduction', value: '45%' }
    ]
  }
];

export const getUnicornBySlug = (slug: string): Unicorn | undefined => {
  return unicorns.find(u => u.slug === slug);
};

export const getUnicornsByRegion = (region: string): Unicorn[] => {
  return unicorns.filter(u => u.region === region);
};

export const getUnicornsBySector = (sector: string): Unicorn[] => {
  return unicorns.filter(u => u.sector.toLowerCase().includes(sector.toLowerCase()));
};

export const getUnicornsByValuation = (minValuation?: number): Unicorn[] => {
  let result = [...unicorns].sort((a, b) => b.valuation - a.valuation);
  if (minValuation) {
    result = result.filter(u => u.valuation >= minValuation);
  }
  return result;
};

export const getPublicUnicorns = (): Unicorn[] => {
  return unicorns.filter(u => u.status === 'public');
};

export const getTotalUnicornValuation = (): number => {
  return unicorns.reduce((sum, u) => sum + u.valuation, 0);
};
