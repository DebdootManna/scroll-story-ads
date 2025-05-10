
import React from 'react';
import { Camera, Heart, MessageSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-instagram-lightGray py-3 px-4">
      <div className="instagram-container flex justify-between items-center">
        <div className="text-xl font-bold">Instagram</div>
        <div className="flex gap-4">
          <Camera size={24} className="cursor-pointer" />
          <Heart size={24} className="cursor-pointer" />
          <MessageSquare size={24} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Header;
