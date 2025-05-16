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
    endTrigger?: string;
    className?: string;
    style?: React.CSSProperties;
    markers?: boolean;
}

export default function PinSection({
    children,
    triggerId = '',
    start = 'top top',
    end = '+=100%',
    pinSpacing = false,
    endTrigger = '',
    className = '',
    style,
    markers = false,
}: PinSectionProps) {
    const pinRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: triggerId || pinRef.current,
            start,
            end,
            endTrigger: endTrigger || pinRef.current,
            pin: pinRef.current,
            pinSpacing,
            markers,
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [triggerId, start, end, pinSpacing]);

    return (
        <div ref={pinRef} className={className} style={style}>
            {children}
        </div>
    );
}
