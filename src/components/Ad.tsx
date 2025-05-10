
import React from 'react';
import { Ad as AdType } from '../data/models';
import MacBookAd from './ads/MacBookAd';
import IPhoneAd from './ads/IPhoneAd';
import MetaMaskAd from './ads/MetaMaskAd';

interface AdProps {
  ad: AdType;
}

const Ad: React.FC<AdProps> = ({ ad }) => {
  switch (ad.type) {
    case 'mac':
      return <MacBookAd ad={ad} />;
    case 'iphone':
      return <IPhoneAd ad={ad} />;
    case 'metamask':
      return <MetaMaskAd ad={ad} />;
    default:
      return null;
  }
};

export default Ad;
