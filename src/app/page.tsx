'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHeading from './components/PageHeading';
import FeaturedProjects from './components/FeaturedProjects';
import AnimatedText from './components/AnimatedText';
import PinSection from './components/PinSection';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });


      tl.fromTo('#main-heading-left-text', {
        y: 100,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
        .fromTo('#main-heading-right-text', {
          y: -100,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.4');

      const onTransitionDone = () => {
        console.log("transition done");
        tl.play();
      }

      const onLoadingDone = () => {
        console.log("loading done");
        tl.play();
      }

      document.addEventListener('transitionDone', onTransitionDone);
      document.addEventListener('loadingDone', onLoadingDone);

      return () => {
        document.removeEventListener('transitionDone', onTransitionDone);
        document.removeEventListener('loadingDone', onLoadingDone);
        ctx.revert();
      };
    }, containerRef);
  }, []);

  return (
    <section ref={containerRef} id="main-section" className='p-10 box-border w-screen'>
      <div id='main-section-wrapper'>
        <div id="main-heading" className="relative flex flex-row p-20 bg-black rounded-2xl h-screen w-auto">

          <div id="main-heading-text" className="relative flex-1 top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <div id="main-heading-left-text">
              <h1 className='text-white text-3xl flex-1 w-full font-script text-center'>meet</h1>
            </div>
            <PageHeading text="Karthik" />
            <div id="main-heading-right-text" className='flex flex-[0.2] w-2/3 justify-center items-end'>
              <h1 className='text-white text-3xl w-full text-center'>A full stack engineer with over 4 years of experience in building scalable and secure web applications.</h1>
            </div>
          </div>
        </div>
        <section id="intro-section-wrapper" className='h-screen w-auto text-black py-20'>
          <div id="intro-section-text" className='flex gap-x-20 flex-row w-full h-full'>
            <div id="intro-section-text-left" className='flex flex-col flex-[0.2] justify-between w-1/2 h-full'>
              <h1 className='text-black text-[200px] pinyon-script'>intro</h1>
              <p className='text-black text-xl w-full text-left leading-none'>A full stack developer with over 4 years of experience in building scalable and secure web applications.</p>
            </div>
            <div id="intro-section-text-right" className='flex justify-end items-end  flex-1 w-1/2 h-full'>
              <AnimatedText
                text={`I'm Karthik, a full-stack engineer who's turned monoliths into microservices, optimized APIs for 10K+ users, and shipped real-world impact with Java, React, Python, and AWS`}
                triggerId="#intro-section-wrapper"
                start="top center"
                end="bottom bottom"
                fromVars={{ opacity: 0, y: 100 }}
                scrub={3}
                toVars={{
                  opacity: 1,
                  y: 0,
                  duration: 2,
                  ease: 'back.out(2)',
                  stagger: 0.2,
                }}
                className="text-black text-7xl font-bold w-full text-left leading-snug flex flex-wrap gap-x-3"
              />

            </div>
          </div>
        </section>

        <section id="hero-and-projects-section" className="relative w-full h-auto">
          {/* Only this part gets pinned */}
          <PinSection
            triggerId="#hero-and-projects-section"
            start="top top"
            end="+=100%" // how long to keep hero pinned (tweak as needed)
            pinSpacing={false}
            className="w-full h-screen border-2 border-red-500"
          >
            <div
              id="hero-section-text"
              className="flex gap-x-20 flex-row justify-center items-center w-full h-screen top-0 left-0"
            >
              <AnimatedText
                className="text-black font-normal w-2/3 leading-none text-[150px] text-center pinyon-script"
                spanStyle="mr-10"
                text="Turning ideas into scalable web products — one line of code at a time."
                triggerId="#hero-and-projects-section"
                start="top 70%"
                end="bottom center"
                fromVars={{ opacity: 0, rotateX: 100 }}
                toVars={{
                  opacity: 1,
                  rotateX: 0,
                  duration: 2,
                  ease: 'back.out(2)',
                  stagger: 0.2,
                }}
              />
            </div>
          </PinSection>

          {/* This part scrolls underneath the pinned content */}
          <div id="featured-projects-wrapper" className="relative z-10 bg-red-500 h-[200vh]">
            <FeaturedProjects />
          </div>
        </section>

      </div>
    </section>
  );
}
