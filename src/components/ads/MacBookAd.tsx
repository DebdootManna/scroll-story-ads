
import React, { useEffect, useRef } from 'react';
import { Ad } from '../../data/models';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface MacBookAdProps {
  ad: Ad;
}

const MacBookAd: React.FC<MacBookAdProps> = ({ ad }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Set up triggers and animations when component mounts
  useEffect(() => {
    if (!adContainerRef.current) return;

    // Set the refs
    const container = adContainerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const image = imageRef.current;

    // Create a timeline for scroll-based animations
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Animations for scrolling down
    tl.fromTo(image, 
      { y: -20, scale: 0.95, rotation: -2 },
      { y: 20, scale: 1.05, rotation: 2, ease: "power1.inOut" }, 0);
    
    tl.fromTo(title, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out" }, 0);
    
    tl.fromTo(subtitle, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, ease: "power2.out", delay: 0.1 }, 0);

    // Create a separate timeline for when the element is in view
    if (inView) {
      gsap.to(container, {
        boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
        duration: 0.5,
      });
      
      gsap.fromTo(image,
        { filter: "brightness(0.8)" },
        { filter: "brightness(1.1)", duration: 1, yoyo: true, repeat: -1 }
      );
    }

    return () => {
      // Clean up
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      gsap.killTweensOf([container, image, title, subtitle]);
    };
  }, [inView]);

  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
    // Set the ref from useInView
    if (element) {
      inViewRef(element);
      adContainerRef.current = element;
    }
  };

  return (
    <div 
      ref={setRefs}
      className="post-card parallax-ad mb-6"
      style={{ 
        backgroundColor: ad.backgroundColor,
        minHeight: '500px',
        overflow: 'hidden'
      }}
    >
      <div className="flex flex-col items-center justify-center h-full py-10 px-6 text-white relative">
        <h2 
          ref={titleRef} 
          className="text-3xl font-bold mb-2 text-center z-10"
        >
          {ad.title}
        </h2>
        <p 
          ref={subtitleRef} 
          className="text-xl mb-8 text-center z-10"
        >
          {ad.subtitle}
        </p>
        <div className="relative w-full h-64 flex items-center justify-center">
          <img 
            ref={imageRef} 
            src="/macbook-pro.png" 
            alt="MacBook Pro" 
            className="object-contain max-w-full max-h-full z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default MacBookAd;
