'use client';

import { useRef, useEffect } from 'react';
import PageHeading from './components/PageHeading';
import FeaturedProjects from './components/FeaturedProjects';
import AnimatedText from './components/AnimatedText';
import PinSection from './components/PinSection';
import AnimatedContainer from './components/AnimatedComponent';
import Image from 'next/image';
import Abilities from './components/abilities';
import gsap from '@/app/hooks/gsap-init';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // still needed for types


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {

      const createParallax = (id: string, moveAmount: number) => {
        gsap.to(id, {
          y: moveAmount,
          ease: "none",
          scrollTrigger: {
            trigger: "#layer-main-bg",
            start: "top top",
            end: "bottom top",
            scrub: 2
          }
        });
      };
      createParallax("#image1", -50);
      createParallax("#image2", -150);
      createParallax("#image3", -250);

      const meImages = containerRef.current?.querySelectorAll('.me-image');


      console.log(meImages);
      if (meImages && meImages.length > 0) {
        gsap.fromTo(meImages, {
          opacity: 0,
          x: 100,
        }, {
          opacity: 1,
          x: 0,
          duration: 2,
          ease: 'sine.inOut(2)',
          stagger: 0.8,
          scrollTrigger: {
            trigger: "#me-images",
            start: "top bottom",
            end: "bottom center",
            scrub: 1, // 🔥 smooth out the animation
          },
        });
      }


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

      const parallaxImages = containerRef.current?.querySelectorAll('.parallax-image');
      parallaxImages?.forEach(image => {
        tl.fromTo(image, {
          opacity: 0,
          y: 100,
          ease: 'power4.inOut',
        }, {
          opacity: 1,
          y: 0,
          ease: "power4.inOut",
          duration: 2,

        }, '<-0.1');
      });

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
        ScrollTrigger.refresh();
      };
    }, containerRef);
  }, []);

  return (
    <>
      <section ref={containerRef} id="main-section" className='p-5 md:p-10 relative box-border w-screen'>
        <div id="layer-main-bg" className="absolute top-0 left-0 w-screen md:h-screen rounded-b-2xl overflow-hidden" style={{ height: 'calc(var(--vh-locked, 1vh) * 100)', aspectRatio: '1/1' }}>
          {/* Sky Layer */}
          <div className="absolute top-0 left-0 w-full -z-6 parallax-image" style={{ height: 'calc(var(--vh-locked, 1vh) * 100)' }}>
            <Image
              id="image1"
              src="/Version C/Layers/clouds.png"
              alt="sky"
              width={2000}
              height={2000}
              style={{ imageRendering: "pixelated", filter: "grayscale" }}
              className='h-full w-auto md:w-full md:h-auto object-cover'
              priority
            />
          </div>

          <div className="absolute top-0 left-0 w-full -z-3 parallax-image" style={{ height: 'calc(var(--vh-locked, 1vh) * 100)', aspectRatio: '1/1' }}>
            <Image
              id="image2"
              src="/Version C/Layers/canyon.png"

              alt="sky"
              width={2000}
              height={2000}
              className='h-full w-auto md:w-full md:h-auto object-cover'
              style={{ imageRendering: "pixelated", filter: "grayscale" }}
              priority
            />
          </div>
          <div className="absolute left-0 w-full z-2 parallax-image" style={{ height: 'calc(var(--vh-locked, 1vh) * 100)', aspectRatio: '1/1' }}>
            <Image
              id="image3"
              src="/Version C/Layers/front.png"
              alt="sky"
              width={2000}
              height={2000}
              className='h-full w-auto md:w-full md:h-auto object-cover'
              style={{ imageRendering: "pixelated", filter: "grayscale" }}
              priority
            />
          </div>


        </div>
        <div id='main-section-wrapper'>
          <div id="main-heading" className="relative flex flex-row p-5 md:p-20 rounded-2x h-locked-screen md:h-dvh w-auto" style={{ height: 'calc(var(--vh-locked, 1vh) * 100)' }}>

            <div id="main-heading-text" className="relative top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <div id="main-heading-left-text">
                <h1 className='text-[#FD7000] text-sm md:text-3xl flex-1 w-full font-script text-center'>meet</h1>
              </div>
              <PageHeading className='text-[#FD7000]' text="Karthik" />
              <div id="main-heading-right-text" className='flex w-full md:w-2/3 justify-center items-start md:items-center'>
                <h1 className='text-[#FD7000] text-sm md:text-4xl w-full text-center leading-snug'>A full stack engineer with over 4 years of experience in building scalable and secure web applications.</h1>
              </div>
            </div>
          </div>
          <section id="intro-section-wrapper" className='h-auto md:h-dvh w-auto text-black py-20'>
            <div id="intro-section-text" className='flex flex-col lg:flex-row gap-y-0 lg:gap-x-20 w-full h-full'>
              <div id="intro-section-text-left" className='flex flex-col mb-10 lg:mb-0 justify-center md:justify-between w-full lg:flex-[1] lg:w-1/2 h-full'>
                <h1 className='text-black text-[clamp(48px,15vw,200px)] jersey'>intro</h1>
              </div>
              <div id="intro-section-text-right" className='flex  flex-col justify-between items-start md:items-end w-full lg:w-2/3 h-full lg:pt-0'>
                <div id="me-images" className='relative flex flex-row  gap-x-3 w-full h-full flex-1 overflow-hidden '>
                  <div id="me-image-1" className='flex-1 flex justify-center items-center rounded-2xl w-full h-full overflow-hidden'>
                    <Image src="https://redport.vercel.app/_next/image?url=%2Fme4.jpg&w=3840&q=75"
                      className='me-image flex-1 w-full h-auto  -translate-y-20' alt="me" width={2000} height={2000} />
                  </div>
                  <div id="me-image-2" className=' flex-1 flex justify-center items-center rounded-2xl w-full h-full overflow-hidden'>
                    <Image src="https://redport.vercel.app/_next/image?url=%2Fme5.JPG&w=3840&q=75"
                      className='me-image flex-1 rounded-2xl w-full h-auto' alt="me" width={2000} height={2000} />
                  </div>
                  <div id="me-image-3" className='flex-1 flex justify-center items-center rounded-2xl w-full h-full overflow-hidden'>
                    <Image src="https://redport.vercel.app/_next/image?url=%2Fme6.jpg&w=3840&q=75"
                      className='me-image flex-1 w-full h-auto rounded-2xl -translate-y-20' alt="me" width={2000} height={2000} />
                  </div>
                </div>
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
                  className="text-black mt-3 text-[clamp(24px,5vw,60px)] font-bold w-full text-left leading-snug lg:leading-none flex flex-1 flex-wrap gap-x-3"
                />



              </div>
            </div>
          </section>

          <section id="hero-and-projects-section" className="relative w-full" style={{ height: 'calc(var(--vh-locked, 1vh) * 100)' }}>
            {/* Pinned Hero Section */}
            <PinSection
              triggerId="#hero-and-projects-section"
              start="top top"
              endTrigger='#featured-projects-wrapper'
              end="bottom bottom" // pinned for 100% viewport scroll
              pinSpacing={false}
              className="absolute top-0 left-0 w-full z-0"
              style={{ height: 'calc(var(--vh-locked, 1vh) * 100)' }}
            >
              <AnimatedContainer
                tag="div"
                triggerId="#featured-projects-wrapper"
                start="top center"
                fromVars={{ opacity: 1 }}
                toVars={{
                  opacity: 0.25,
                  duration: 2,
                  ease: 'back.out(2)'
                }}
                end="top top"
                className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-20 justify-center items-center w-full h-full bg-white px-4 md:px-10"
              >
                <AnimatedText
                  className="text-black font-normal w-full lg:w-2/3 leading-tight text-[clamp(50px,6vw,100px)] text-center funnel-display"
                  spanStyle="mr-5 lg:mr-10"
                  text="Turning ideas into scalable web products — one line of code at a time."
                  triggerId="#hero-and-projects-section"
                  start="top center"
                  end="bottom top"
                  scrub={3}
                  fromVars={{ opacity: 0, rotateX: 100 }}
                  toVars={{
                    opacity: 1,
                    rotateX: 0,
                    duration: 4,
                    ease: 'back.out(2)',
                    stagger: 0.2,
                  }}
                />
              </AnimatedContainer>
            </PinSection>

            {/* Scrolling Project Cards - visible while hero is still pinned */}

          </section>

          <div
            id="featured-projects-wrapper"
            className="relative z-10 h-auto"
          >
            <FeaturedProjects />
          </div>
        </div>


      </section>
      <Abilities />


    </>
  );
}
