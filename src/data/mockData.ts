
import { User, Post, Ad, FeedItem } from './models';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    username: 'janedoe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
  },
  {
    id: '2',
    username: 'techguy',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces',
  },
  {
    id: '3',
    username: 'photoartist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces',
  },
];

// Mock Posts
export const posts: Post[] = [
  {
    id: 'p1',
    user: users[0],
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    caption: 'Working on my latest project #coding #developer',
    likes: 125,
    comments: [
      {
        id: 'c1',
        username: 'techguy',
        text: 'Great setup! What IDE are you using?',
      },
    ],
    timestamp: '2 HOURS AGO',
  },
  {
    id: 'p2',
    user: users[1],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    caption: 'Just updated my workspace. Loving the new monitor! #tech #workspace',
    likes: 304,
    comments: [
      {
        id: 'c2',
        username: 'janedoe',
        text: 'Looks amazing! What brand is that?',
      },
      {
        id: 'c3',
        username: 'photoartist',
        text: 'Great lighting in this shot!',
      },
    ],
    timestamp: '5 HOURS AGO',
  },
  {
    id: 'p3',
    user: users[2],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    caption: 'Remote work day at the coffee shop #remotework #coffee',
    likes: 217,
    comments: [
      {
        id: 'c4',
        username: 'techguy',
        text: 'This is my favorite spot too!',
      },
    ],
    timestamp: '1 DAY AGO',
  },
  {
    id: 'p4',
    user: users[0],
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    caption: 'Just pushed a new update #code #programming',
    likes: 189,
    comments: [],
    timestamp: '2 DAYS AGO',
  },
  {
    id: 'p5',
    user: users[1],
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    caption: 'Late night coding session #developer #nightowl',
    likes: 276,
    comments: [
      {
        id: 'c5',
        username: 'photoartist',
        text: 'The focus is real!',
      },
    ],
    timestamp: '3 DAYS AGO',
  },
  {
    id: 'p6',
    user: users[2],
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    caption: 'Researching new design trends #ux #design',
    likes: 321,
    comments: [
      {
        id: 'c6',
        username: 'janedoe',
        text: 'Any good resources you can share?',
      },
    ],
    timestamp: '4 DAYS AGO',
  },
];

// Mock Ads
export const ads: Ad[] = [
  {
    id: 'ad1',
    type: 'mac',
    title: 'MacBook Pro',
    subtitle: 'Supercharged for pros.',
    imageUrl: '/macbook-pro.png',
    backgroundColor: '#000000',
  },
  {
    id: 'ad2',
    type: 'iphone',
    title: 'iPhone 15',
    subtitle: 'Capture the moment.',
    imageUrl: '/iphone-15.png',
    secondaryImageUrl: '/iphone-15-back.png',
    backgroundColor: '#1A1F2C',
  },
  {
    id: 'ad3',
    type: 'metamask',
    title: 'MetaMask',
    subtitle: 'Your gateway to Web3.',
    imageUrl: '/metamask-fox.png',
    backgroundColor: '#F6851B',
  },
];

// Function to shuffle an array
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Function to merge and shuffle posts and ads
export const generateFeed = (): FeedItem[] => {
  const shuffledPosts = shuffleArray(posts);
  const shuffledAds = shuffleArray(ads);
  
  // Create a copy of the shuffled posts
  const feed: FeedItem[] = [...shuffledPosts];
  
  // Insert ads at different positions in the feed
  if (shuffledAds.length > 0) {
    // Insert first ad after 2 posts
    feed.splice(2, 0, shuffledAds[0]);
    
    // Insert other ads if available
    if (shuffledAds.length > 1) {
      feed.splice(5, 0, shuffledAds[1]);
    }
    
    if (shuffledAds.length > 2) {
      feed.splice(8, 0, shuffledAds[2]);
    }
  }
  
  return feed;
};
