'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PageHeadingProps {
    text: string;
    className?: string;
}

export default function PageHeading({ text, className }: PageHeadingProps) {
    const wrapperRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const flags = useRef({ transitionDone: false, loadingDone: false });

    useEffect(() => {
        const chars = gsap.utils.toArray<HTMLElement>('.char', wrapperRef.current);
        gsap.set(chars, { opacity: 0, rotateX: 360, y: '-200%' });

        const tl = gsap.timeline({ paused: true }).to(chars, {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'back.out(1)',
            stagger: 0.08,
        });

        const onTransitionDone = () => {
            flags.current.transitionDone = true;
            tl.play();
        };

        const onLoadingDone = () => {
            flags.current.loadingDone = true;
            tl.play();
        };

        document.addEventListener('transitionDone', onTransitionDone);
        document.addEventListener('loadingDone', onLoadingDone);

        return () => {
            document.removeEventListener('transitionDone', onTransitionDone);
            document.removeEventListener('loadingDone', onLoadingDone);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative jersey flex items-center justify-center h-auto w-full px-0 overflow-visible leading-none"
        >
            <h1
                ref={wrapperRef}
                className="text-[clamp(20px,30vw,500px)] md:text-[clamp(20px,40vw,500px)] font-script text-white cursor-pointer flex flex-wrap justify-center text-center"
            >
                {Array.from(text).map((char, i) => (
                    <span key={i} className={`leading-none char inline-block ${className}`}>
                        {char}
                    </span>
                ))}
            </h1>
        </div>
    );
}
