
import React, { useEffect, useRef } from 'react';
import { Ad } from '../../data/models';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface MetaMaskAdProps {
  ad: Ad;
}

const MetaMaskAd: React.FC<MetaMaskAdProps> = ({ ad }) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bgCircle1Ref = useRef<HTMLDivElement>(null);
  const bgCircle2Ref = useRef<HTMLDivElement>(null);
  
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
    const bgCircle1 = bgCircle1Ref.current;
    const bgCircle2 = bgCircle2Ref.current;

    // Create a main timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Parallax effect on the circles
    if (bgCircle1 && bgCircle2) {
      tl.fromTo(
        bgCircle1, 
        { x: "-20%", y: "10%" }, 
        { x: "20%", y: "-10%", ease: "none" }, 
        0
      );
      
      tl.fromTo(
        bgCircle2, 
        { x: "20%", y: "-10%" }, 
        { x: "-20%", y: "10%", ease: "none" }, 
        0
      );
    }

    // Parallax effect on the fox logo
    if (image) {
      tl.fromTo(
        image,
        { y: -20, rotation: -5 },
        { y: 20, rotation: 5, ease: "none" },
        0
      );
    }

    // When in view, animate text and logo
    if (inView) {
      const inViewTl = gsap.timeline();
      
      inViewTl.fromTo(
        [title, subtitle],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.6, ease: "power2.out" }
      );
      
      inViewTl.fromTo(
        image,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
        "-=0.4"
      );
      
      // Add a subtle hover animation to the fox
      gsap.to(image, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    return () => {
      // Clean up animations
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      gsap.killTweensOf([container, title, subtitle, image, bgCircle1, bgCircle2]);
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
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background circles for parallax effect */}
      <div 
        ref={bgCircle1Ref}
        className="absolute rounded-full"
        style={{ 
          width: '300px', 
          height: '300px', 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          left: '-50px',
          top: '-50px',
          zIndex: 1
        }}
      />
      <div 
        ref={bgCircle2Ref}
        className="absolute rounded-full"
        style={{ 
          width: '200px', 
          height: '200px', 
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          right: '-30px',
          bottom: '-30px',
          zIndex: 1
        }}
      />

      <div className="flex flex-col items-center justify-center h-full py-10 px-6 text-white relative z-10">
        <h2 
          ref={titleRef} 
          className="text-3xl font-bold mb-2 text-center"
        >
          {ad.title}
        </h2>
        <p 
          ref={subtitleRef} 
          className="text-xl mb-8 text-center"
        >
          {ad.subtitle}
        </p>
        <div className="relative w-full h-64 flex items-center justify-center">
          <img 
            ref={imageRef} 
            src="/metamask-fox.png" 
            alt="MetaMask Fox" 
            className="object-contain max-w-full max-h-full"
            style={{ maxWidth: '200px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MetaMaskAd;
