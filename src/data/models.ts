
export interface User {
  id: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface Ad {
  id: string;
  type: 'mac' | 'iphone' | 'metamask';
  title: string;
  subtitle: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  backgroundColor: string;
}

export type FeedItem = Post | Ad;

export const isPost = (item: FeedItem): item is Post => {
  return (item as Post).user !== undefined;
};

export const isAd = (item: FeedItem): item is Ad => {
  return (item as Ad).type !== undefined;
};
