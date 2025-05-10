
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Post as PostType } from '../data/models';
import { Heart, MessageSquare, Share, Bookmark } from 'lucide-react';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="post-card animate-fade-in">
      <div className="post-header">
        <img 
          src={post.user.avatar} 
          alt={post.user.username} 
          className="post-avatar" 
        />
        <span className="post-username">{post.user.username}</span>
      </div>
      
      <LazyLoadImage
        src={post.imageUrl}
        alt={`${post.user.username}'s post`}
        effect="blur"
        className="w-full object-cover"
        style={{ maxHeight: '600px' }}
      />
      
      <div className="post-actions">
        <Heart size={24} className="cursor-pointer hover:text-red-500 transition-colors" />
        <MessageSquare size={24} className="cursor-pointer" />
        <Share size={24} className="cursor-pointer" />
        <div className="ml-auto">
          <Bookmark size={24} className="cursor-pointer" />
        </div>
      </div>
      
      <div className="post-likes">
        {post.likes.toLocaleString()} likes
      </div>
      
      <div className="post-caption">
        <span className="font-semibold mr-2">{post.user.username}</span>
        {post.caption}
      </div>
      
      {post.comments.length > 0 && (
        <div className="post-comments">
          {post.comments.length === 1 
            ? 'View 1 comment' 
            : `View all ${post.comments.length} comments`}
        </div>
      )}
      
      <div className="post-timestamp">
        {post.timestamp}
      </div>
    </div>
  );
};

export default Post;
