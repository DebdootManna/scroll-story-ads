
import React, { useState, useEffect } from 'react';
import Post from './Post';
import Ad from './Ad';
import { FeedItem, isPost, isAd } from '../data/models';
import { generateFeed } from '../data/mockData';

const Feed: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  
  // Generate feed on initial load
  useEffect(() => {
    setFeedItems(generateFeed());
  }, []);

  return (
    <div className="instagram-container py-4 px-4 md:px-0">
      {feedItems.map((item) => (
        <React.Fragment key={item.id}>
          {isPost(item) && <Post post={item} />}
          {isAd(item) && <Ad ad={item} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Feed;
