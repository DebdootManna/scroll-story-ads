
import React, { useEffect, useRef } from 'react';
import { Ad } from '../../data/models';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface IPhoneAdProps {
  ad: Ad;
}

const IPhoneAd: React.FC<IPhoneAdProps> = ({ ad }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const secondaryImageRef = useRef<HTMLImageElement>(null);
  
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (!adContainerRef.current) return;

    const container = adContainerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const image = imageRef.current;
    const secondaryImage = secondaryImageRef.current;

    // Create a context for scroll direction detection
    let lastScrollTop = 0;
    let direction = "down";

    // Function to determine scroll direction
    const determineScrollDirection = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      direction = st > lastScrollTop ? "down" : "up";
      lastScrollTop = st <= 0 ? 0 : st;
      return direction;
    };

    // Set up scroll trigger for the ad
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        determineScrollDirection();
        
        if (direction === "down") {
          // Animations for scrolling down
          if (image) {
            gsap.to(image, { 
              x: self.progress * 30, 
              rotation: self.progress * 5,
              opacity: 1 - (self.progress * 0.3),
              duration: 0.5
            });
          }
          if (secondaryImage) {
            gsap.to(secondaryImage, { 
              x: -self.progress * 30, 
              rotation: -self.progress * 5,
              opacity: 0.7 + (self.progress * 0.3),
              duration: 0.5
            });
          }
        } else {
          // Animations for scrolling up
          if (image) {
            gsap.to(image, { 
              x: (1 - self.progress) * -30, 
              rotation: (1 - self.progress) * -5,
              opacity: 0.7 + ((1-self.progress) * 0.3),
              duration: 0.5
            });
          }
          if (secondaryImage) {
            gsap.to(secondaryImage, { 
              x: (1 - self.progress) * 30, 
              rotation: (1 - self.progress) * 5,
              opacity: 1 - ((1-self.progress) * 0.3),
              duration: 0.5
            });
          }
        }
      }
    });

    // Initial animation when element comes into view
    if (inView) {
      gsap.fromTo(
        [title, subtitle],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" }
      );
      
      gsap.fromTo(
        image,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out" }
      );
      
      gsap.fromTo(
        secondaryImage,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.7, duration: 0.8, delay: 0.2, ease: "back.out" }
      );
    }

    return () => {
      // Clean up
      scrollTrigger.kill();
      gsap.killTweensOf([container, title, subtitle, image, secondaryImage]);
    };
  }, [inView]);

  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
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
            src="/iphone-15.png" 
            alt="iPhone 15" 
            className="object-contain max-w-full max-h-full z-10 absolute"
          />
          <img 
            ref={secondaryImageRef} 
            src="/iphone-15-back.png" 
            alt="iPhone 15 Back" 
            className="object-contain max-w-full max-h-full z-10 absolute opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default IPhoneAd;
