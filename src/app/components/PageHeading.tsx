// components/PageHeading.tsx
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PageHeadingProps {
    text: string;
}

export default function PageHeading({ text }: PageHeadingProps) {
    const wrapperRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // Split the text into individual characters
        const chars = gsap.utils.toArray<HTMLElement>('.char', wrapperRef.current);

        // Set initial state: 20% down and invisible
        gsap.set(chars, { yPercent: 20, opacity: 0 });

        // Create a timeline for the letter animation
        const tl = gsap.timeline({ paused: true });

        tl.to(chars, {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
            stagger: 0.05,
        });

        // Play the animation when transitionDone fires
        const onDone = () => tl.play();
        document.addEventListener('transitionDone', onDone);
        return () => document.removeEventListener('transitionDone', onDone);
    }, []);

    return (
        <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
            <h1
                ref={wrapperRef}
                className="text-[30em] font-light text-white flex flex-row flex-wrap"
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
