'use client';

import { useEffect, useRef } from 'react';
import gsap, { TweenVars } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedTextProps {
    text: string;
    triggerId?: string;
    start?: string;
    end?: string;
    scrub?: number | boolean;
    className?: string;
    spanStyle?: string;
    fromVars?: TweenVars; // gsap from options
    toVars?: TweenVars;   // gsap to options
}

export default function AnimatedText({
    text,
    triggerId = '',
    start = 'top 80%',
    end = 'top 10%',
    scrub = 1,
    className = '',
    spanStyle = '',
    fromVars = { opacity: 0.2 },
    toVars = { opacity: 1, duration: 4, ease: 'back.out(2)', stagger: 0.3 },
}: AnimatedTextProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const words = wrapperRef.current?.querySelectorAll<HTMLSpanElement>('.intro-word');
        if (!words) return;

        gsap.fromTo(words, fromVars, {
            ...toVars,
            scrollTrigger: {
                trigger: triggerId || wrapperRef.current,
                start,
                end,
                scrub,
            },
        });
    }, [triggerId, start, end, scrub, fromVars, toVars]);

    return (
        <div ref={wrapperRef} className={className}>
            {text.split(' ').map((word, i) => (
                <span key={i} className={`intro-word opacity-0 inline-block mr-2 ${spanStyle}`}>
                    {word}
                </span>
            ))}
        </div>
    );
}
