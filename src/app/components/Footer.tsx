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

        if (circleRef.current) {
            const circleType = new CircleType(circleRef.current);
        }

        const ctx = gsap.context(() => {
            // ✅ this trigger is scoped to ctx and won't interfere with others
            gsap.fromTo(containerRef.current, {
                y: 200,
            }, {
                y: 0,
                duration: 2,
                ease: 'sine.inOut(2)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    end: 'bottom bottom',
                    scrub: 2
                }
            });

            ScrollTrigger.refresh(); // update layout
        }, containerRef); // ⬅ scoped to this component only

        return () => ctx.revert(); // ⛔ safe cleanup (no global kill!)
    }, [pathname]);

    return (

        <section className="bg-black relative p-0 m-0 flex-col text-white" style={{ height: 'calc(var(--vh-locked, 1vh) * 100)' }}>

            <div
                ref={containerRef}
                className="flex relative flex-col w-full h-[80%] z-10 shadow-black/75 shadow-2xl bg-black  overflow-y-hidden"
            >
                <div id="footer-content-wrapper" className="flex relative flex-row w-full h-full z-10 shadow-black/75 shadow-2xl bg-black">
                    <div id="footer-content-left" className='flex-1'>

                    </div>
                    <div id="footer-content-divider" className='flex-1/4 relative'>
                        <div id="book-meeting-wrapper" className='w-full h-full flex items-center justify-center z-3'>
                            <div id="book-meeting" className='w-full h-auto p-10 flex flex-col items-center justify-center bg-white rounded-4xl'>
                                <div id="meeting-title">
                                    <h1 className='text-black text-7xl text-center font-bold '>You Scrolled This Far</h1>
                                    <h1 className='text-black text-7xl text-center font-bold '>Might As Well Say Hi</h1>

                                </div>xw
                                <div id="meeting-button-wrapper" className='w-full my-5 flex items-center justify-center'>
                                    <div id="meeting-button" className='w-1/2 h-auto px-5 py-10 bg-black rounded-2xl'>
                                        <h1 className='text-white text-center text-2xl font-bold tracking-tight p-0 m-0 leading-none'>Book a meeting</h1>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="footer-content-right" className='flex-1'>
                        <div id="social-links-wrapper" className='w-full h-full flex items-center justify-center border-red-500 border-2'>
                            <div id="social-link" className='w-1/2 h-auto bg-white p-10 rounded-2xl'>This is it</div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="bottom-name-wrapper" className='absolute z-5 w-full bottom-0 p-0 m-0 flex items-end overflow-hidden justify-center'>
                <p className='text-white text-center font-bold text-xl flex-1 tracking-tight p-0 m-0 leading-none'>@DesignByKarthik</p>
                <h1 className='text-white text-[clamp(100px,20vw,400px)] flex-1 text-center font-bold  tracking-tight p-0 m-0 leading-none'>Hello</h1>
                <p className='text-white text-center font-bold text-xl flex-1 tracking-tight p-0 m-0 leading-none'>@DesignByKarthik</p>
            </div>

        </section >
    );
};

export default Footer;