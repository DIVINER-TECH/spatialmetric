export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: 'conference' | 'webinar' | 'product-launch' | 'earnings' | 'partnership';
  date: Date;
  endDate?: Date;
  location: string;
  isVirtual: boolean;
  organizer: string;
  attendees?: number;
  featured: boolean;
  tags: string[];
  registrationUrl?: string;
}

export const events: Event[] = [
  {
    id: '1',
    slug: 'awe-2024',
    title: 'Augmented World Expo 2024',
    description: 'The world\'s largest conference dedicated to AR, VR, and spatial computing. Features 300+ speakers, 200+ exhibitors, and the latest XR technology demonstrations.',
    type: 'conference',
    date: new Date('2024-06-18'),
    endDate: new Date('2024-06-20'),
    location: 'Long Beach, CA',
    isVirtual: false,
    organizer: 'AWE',
    attendees: 8000,
    featured: true,
    tags: ['AR', 'VR', 'Enterprise', 'Networking'],
    registrationUrl: 'https://awe.com'
  },
  {
    id: '2',
    slug: 'meta-connect-2024',
    title: 'Meta Connect 2024',
    description: 'Meta\'s annual developer conference focusing on VR, AR, and AI technologies. Expect new Quest announcements and Horizon platform updates.',
    type: 'conference',
    date: new Date('2024-09-25'),
    endDate: new Date('2024-09-26'),
    location: 'Menlo Park, CA',
    isVirtual: true,
    organizer: 'Meta',
    attendees: 50000,
    featured: true,
    tags: ['Meta', 'Quest', 'Developer', 'AI'],
    registrationUrl: 'https://metaconnect.com'
  },
  {
    id: '3',
    slug: 'apple-wwdc-2024',
    title: 'Apple WWDC 2024',
    description: 'Apple\'s Worldwide Developers Conference featuring visionOS 2.0 announcements and new developer tools for spatial computing.',
    type: 'conference',
    date: new Date('2024-06-10'),
    endDate: new Date('2024-06-14'),
    location: 'Cupertino, CA',
    isVirtual: true,
    organizer: 'Apple',
    attendees: 30000,
    featured: true,
    tags: ['Apple', 'visionOS', 'Developer', 'iOS'],
    registrationUrl: 'https://developer.apple.com/wwdc'
  },
  {
    id: '4',
    slug: 'xr-enterprise-summit',
    title: 'XR Enterprise Summit 2024',
    description: 'Focused on enterprise XR deployment, ROI measurement, and case studies from Fortune 500 companies implementing spatial computing.',
    type: 'conference',
    date: new Date('2024-04-15'),
    endDate: new Date('2024-04-16'),
    location: 'San Francisco, CA',
    isVirtual: false,
    organizer: 'Greenlight Insights',
    attendees: 1500,
    featured: false,
    tags: ['Enterprise', 'B2B', 'ROI', 'Case Studies']
  },
  {
    id: '5',
    slug: 'samsung-galaxy-unpacked-xr',
    title: 'Samsung Galaxy Unpacked: XR Edition',
    description: 'Samsung\'s special event to unveil Project Moohan, its first Android XR headset developed with Google and Qualcomm.',
    type: 'product-launch',
    date: new Date('2024-03-15'),
    location: 'Seoul, South Korea',
    isVirtual: true,
    organizer: 'Samsung',
    featured: true,
    tags: ['Samsung', 'Android XR', 'Product Launch', 'Hardware']
  },
  {
    id: '6',
    slug: 'meta-q4-earnings',
    title: 'Meta Q4 2024 Earnings Call',
    description: 'Meta\'s quarterly earnings report with Reality Labs segment performance, Quest sales figures, and future XR investment guidance.',
    type: 'earnings',
    date: new Date('2024-02-01'),
    location: 'Virtual',
    isVirtual: true,
    organizer: 'Meta',
    featured: false,
    tags: ['Meta', 'Earnings', 'Financial', 'Reality Labs']
  },
  {
    id: '7',
    slug: 'unity-vision-summit',
    title: 'Unity Vision Summit',
    description: 'Unity\'s dedicated event for visionOS and spatial computing development, featuring PolySpatial deep dives and best practices.',
    type: 'webinar',
    date: new Date('2024-03-28'),
    location: 'Virtual',
    isVirtual: true,
    organizer: 'Unity',
    attendees: 5000,
    featured: false,
    tags: ['Unity', 'visionOS', 'Development', 'Tutorial'],
    registrationUrl: 'https://unity.com/events'
  },
  {
    id: '8',
    slug: 'microsoft-meta-partnership',
    title: 'Microsoft + Meta: Workplace XR Partnership',
    description: 'Joint announcement of expanded collaboration bringing Microsoft 365 and Teams deeper into the Quest ecosystem.',
    type: 'partnership',
    date: new Date('2024-01-25'),
    location: 'Virtual',
    isVirtual: true,
    organizer: 'Microsoft & Meta',
    featured: false,
    tags: ['Microsoft', 'Meta', 'Partnership', 'Enterprise']
  },
  {
    id: '9',
    slug: 'gdc-2024-xr',
    title: 'GDC 2024: XR Summit',
    description: 'Game Developers Conference XR track featuring sessions on VR game development, Quest optimization, and emerging platforms.',
    type: 'conference',
    date: new Date('2024-03-18'),
    endDate: new Date('2024-03-22'),
    location: 'San Francisco, CA',
    isVirtual: false,
    organizer: 'Informa Tech',
    attendees: 28000,
    featured: true,
    tags: ['Gaming', 'Development', 'Quest', 'PSVR2']
  },
  {
    id: '10',
    slug: 'ces-2024-xr-recap',
    title: 'CES 2024: XR Highlights',
    description: 'Recap of spatial computing announcements from CES including new headsets, components, and enterprise solutions.',
    type: 'conference',
    date: new Date('2024-01-09'),
    endDate: new Date('2024-01-12'),
    location: 'Las Vegas, NV',
    isVirtual: false,
    organizer: 'CTA',
    attendees: 135000,
    featured: false,
    tags: ['CES', 'Hardware', 'Consumer Electronics', 'Announcements']
  }
];

export const getEventBySlug = (slug: string): Event | undefined => {
  return events.find(e => e.slug === slug);
};

export const getUpcomingEvents = (): Event[] => {
  const now = new Date();
  return events.filter(e => e.date > now).sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const getPastEvents = (): Event[] => {
  const now = new Date();
  return events.filter(e => e.date <= now).sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const getFeaturedEvents = (): Event[] => {
  return events.filter(e => e.featured);
};

export const getEventsByType = (type: Event['type']): Event[] => {
  return events.filter(e => e.type === type);
};
