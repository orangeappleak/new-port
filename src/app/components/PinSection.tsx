'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PinSectionProps {
    children: ReactNode;
    triggerId?: string;
    start?: string;
    end?: string;
    pinSpacing?: boolean | string;
    className?: string;
}

export default function PinSection({
    children,
    triggerId = '',
    start = 'top top',
    end = '+=100%',
    pinSpacing = true,
    className = '',
}: PinSectionProps) {
    const pinRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: triggerId || pinRef.current,
            start,
            end,
            pin: true,
            pinSpacing,
            markers: true,
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [triggerId, start, end, pinSpacing]);

    return (
        <div ref={pinRef} className={className}>
            {children}
        </div>
    );
}
