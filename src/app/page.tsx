// app/page.tsx
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHeading from './components/PageHeading';

export default function Home() {
  const text = `In the realm of technology, I wield code as my tool, crafting digital experiences that blend functionality with elegance. With a passion for innovation and a commitment to excellence, I transform ideas into functional, user-friendly applications. Let's collaborate to bring your vision to life!`;
  const words = text.split(' ');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('#main-heading', {
      opacity: 0.2,
      duration: 1,
      ease: 'power4.inOut',
      scrollTrigger: {
        pin: '#main-heading-text',
        trigger: '#main-section',
        scrub: true,
        markers: true,
      },
    });

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray<HTMLSpanElement>('.word', containerRef.current!);
      // Fade each word from 0.2 → 1 based on scroll, staggered
      gsap.fromTo(
        wordEls,
        { opacity: 0, y: 100, z: 100 },
        {
          opacity: 1,
          z: 0,
          y: 0,
          stagger: 0.08,
          duration: 2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
            markers: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="main-section" className="px-5">
      <div id="main-heading" className="relative flex flex-col items-start justify-start bg-black h-screen w-screen">
        <div id="main-heading-text" className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <PageHeading text="karthik" />
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex flex-wrap gap-3.5 w-2/3 mx-auto backdrop-blur-sm h-screen"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="word text-white text-8xl leading-none"
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}