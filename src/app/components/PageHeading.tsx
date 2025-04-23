'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
// PageHeading.tsx

interface PageHeadingProps {
    text: string;
}

export default function PageHeading({ text }: PageHeadingProps) {
    const wrapperRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const flags = useRef({ transitionDone: false, loadingDone: false });

    useEffect(() => {
        const chars = gsap.utils.toArray<HTMLElement>('.char', wrapperRef.current);
        gsap.set(chars, { opacity: 0, rotateX: 90 });

        const tl = gsap.timeline({ paused: true }).to(chars, {
            rotateX: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
            stagger: 0.05,
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

            className="relative pinyon-script flex items-center justify-center h-auto w-auto overflow-visible leading-[1.2]"
        >
            <h1
                ref={wrapperRef}
                className="text-[300px] font-script text-white cursor-pointer flex flex-row flex-wrap"
            >
                {Array.from(text).map((char, i) => (
                    <span key={i} className="char inline-block">
                        {char}
                    </span>
                ))}
            </h1>
        </div>
    );
}
