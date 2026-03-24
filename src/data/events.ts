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
  thumbnailUrl?: string;
  resources?: { label: string; url: string; type: 'deck' | 'video' | 'report' | 'article' }[];
  speakers?: { name: string; title: string; company: string; avatar?: string }[];
}

export const events: Event[] = [
  {
    id: '1',
    slug: 'awe-2026',
    title: 'Augmented World Expo 2026',
    description: 'The world\'s largest conference dedicated to AR, VR, and spatial computing. 2026 introduces the "Neural Interface" track and advanced haptics symposium.',
    type: 'conference',
    date: new Date('2026-06-18'),
    endDate: new Date('2026-06-20'),
    location: 'Long Beach, CA',
    isVirtual: false,
    organizer: 'AWE',
    attendees: 12000,
    featured: true,
    tags: ['AR', 'VR', 'Enterprise', 'Networking'],
    registrationUrl: 'https://awe.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    speakers: [
      { name: 'John Riccitiello', title: 'XR Visionary', company: 'Independent' },
      { name: 'Peggy Johnson', title: 'CEO', company: 'Magic Leap' }
    ]
  },
  {
    id: '2',
    slug: 'meta-connect-2026',
    title: 'Meta Connect 2026',
    description: 'Meta\'s annual developer conference focusing on VR, AR, and AI technologies. Expected launch of Quest 4 Pro and Horizon OS 5.0.',
    type: 'conference',
    date: new Date('2026-09-25'),
    endDate: new Date('2026-09-26'),
    location: 'Menlo Park, CA',
    isVirtual: true,
    organizer: 'Meta',
    attendees: 75000,
    featured: true,
    tags: ['Meta', 'Quest', 'Developer', 'AI'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    slug: 'apple-wwdc-2026',
    title: 'Apple WWDC 2026',
    description: 'Apple\'s Worldwide Developers Conference featuring visionOS 3.0 and the much-anticiapted Apple Vision "Lite" announcement.',
    type: 'conference',
    date: new Date('2026-06-10'),
    endDate: new Date('2026-06-14'),
    location: 'Cupertino, CA',
    isVirtual: true,
    organizer: 'Apple',
    attendees: 45000,
    featured: true,
    tags: ['Apple', 'visionOS', 'Developer', 'iOS'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '15',
    slug: 'ces-2026-recap',
    title: 'CES 2026: Spatial Computing Summit',
    description: 'A deep dive into the hardware breakthroughs from CES 2026, including solid-state LiDAR and holographic displays.',
    type: 'conference',
    date: new Date('2026-01-08'),
    location: 'Las Vegas, NV',
    isVirtual: false,
    organizer: 'CTA',
    featured: false,
    tags: ['CES', 'Hardware', 'Innovations'],
    resources: [
      { label: 'Hardware Recap Report', url: '#', type: 'report' },
      { label: 'Keynote Highlights', url: '#', type: 'video' }
    ]
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
