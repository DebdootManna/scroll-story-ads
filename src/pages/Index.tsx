
import React from 'react';
import Header from '../components/Header';
import Feed from '../components/Feed';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Feed />
    </div>
  );
};

export default Index;
