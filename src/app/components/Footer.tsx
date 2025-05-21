'use client';

import React, { useEffect, useRef } from 'react';
import AnimatedContainer from './AnimatedComponent';
import { usePathname } from 'next/navigation';
import gsap from '@/app/hooks/gsap-init';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CircleType from 'circletype';

const Footer = () => {

    const containerRef = useRef(null);
    const circleRef = useRef(null);
    const pathname = usePathname();


    useEffect(() => {
        const initFooterGsap = () => {
            if (circleRef.current) {
                new CircleType(circleRef.current);
            }

            const ctx = gsap.context(() => {
                gsap.fromTo(containerRef.current, {
                    y: 400,
                }, {
                    y: 0,
                    duration: 4,
                    ease: 'sine.inOut(1)',
                    scrollTrigger: {
                        trigger: "#book-meeting-wrapper",
                        start: 'top bottom',
                        end: 'top center',
                        scrub: 4,
                    },
                });

                ScrollTrigger.refresh();
            }, containerRef);

            return ctx;
        };

        let ctx = initFooterGsap();

        const handleTransitionDone = () => {
            ctx.revert(); // cleanup
            ctx = initFooterGsap(); // re-init
        };

        document.addEventListener('transitionDone', handleTransitionDone);

        return () => {
            document.removeEventListener('transitionDone', handleTransitionDone);
            ctx?.revert();
        };
    }, [pathname]);

    return (

        <section className="bg-black relative p-0 m-0 flex-col text-white overflow-hidden" style={{ height: 'calc(var(--vh-locked, 1vh) * 100)' }}>

            <div
                ref={containerRef}
                className="flex relative flex-col w-full h-[80%] z-10 shadow-black/75 shadow-2xl bg-black  overflow-y-hidden"
            >
                <div id="footer-content-wrapper" className="flex relative flex-row w-full pt-20 h-full z-10 shadow-black/75 shadow-2xl bg-black">
                    <div id="footer-content-left" className='flex-1'>

                    </div>
                    <div id="footer-content-divider" className='flex-1/3 h-full relative'>
                        <div id="book-meeting-wrapper" className='w-full h-full flex-1 flex justify-between items-center flex-col z-3'>
                            <div id="book-meeting" className='w-full h-auto flex-1 p-10 flex flex-col gap-y-10 items-center justify-center bg-white rounded-2xl'>
                                <div id="meeting-title">
                                    <h1 className='text-black text-7xl text-center font-light '>You Scrolled This Far</h1>
                                    <h1 className='text-black text-7xl text-center font-light '>Might As Well Say Hi</h1>

                                </div>
                                <div id="meeting-button-wrapper" className='w-full flex items-center justify-center'>
                                    <div
                                        id="meeting-button"
                                        onClick={() => window.open('https://calendly.com/redmango-karthik/30min', '_blank')}
                                        className='w-1/2 h-auto px-5 py-10 bg-black rounded-2xl cursor-pointer overflow-hidden'
                                    >
                                        <h1 className='text-3xl font-bold text-center text-white tracking-tight leading-none flex justify-center'>
                                            Book a meeting
                                        </h1>
                                    </div>
                                </div>
                            </div>
                            <div id="book-meeting-bottom-wrapper" className='w-full h-full flex-1 flex items-end justify-center'>
                                <div id="book-meeting-bottom" className='w-full h-2/3 flex-1 rounded-t-2xl flex items-center justify-center bg-white'>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="footer-content-right-wrapper" className='flex-1 w-full h-full flex justify-start items-center'>

                    </div>
                </div>
            </div>

            <div id="bottom-name-wrapper" className='absolute z-5 w-full bottom-0 p-0 m-0 flex items-end overflow-hidden justify-center'>
                <p className='text-white text-center font-bold text-xl flex-1 tracking-tight p-0 m-0 leading-none'>@DesignedByKarthik</p>
                <h1 className='text-white text-[clamp(100px,20vw,400px)] flex-1 text-center font-bold  tracking-tight p-0 m-0 leading-none'>Hello</h1>
                <p className='text-white text-center font-bold text-xl flex-1 tracking-tight p-0 m-0 leading-none'>@MadeWithLove❤️</p>
            </div>

        </section >
    );
};

export default Footer;