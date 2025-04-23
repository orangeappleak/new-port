'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loading() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [fadeOut, setFadeOut] = useState(false);
    const [percentage, setPercentage] = useState(0);

    const targetText = 'WELCOME';
    const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const characterSet = 'ABCDEFGHIJKLMAKLAKDJLAKSNLK NAKSJLNALJKSND KLAN SDASJ: DKNAS D:JAS DK:NOPQRSTUVWXYZ0123456789!@#$%&*';

    useEffect(() => {

        gsap.fromTo(wrapperRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            });

        const totalDuration = 3.2; // longer, smoother
        const slotFrameRate = 50;
        const slotSteps = Math.floor((totalDuration * 1000) / slotFrameRate);
        let fadeOutTriggered = false;

        // Fade in
        requestAnimationFrame(() => {
            gsap.fromTo(letterRefs.current, {
                opacity: 0,
                y: -200,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.out',
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.out',
            });
        });
        // Slot animation per letter
        targetText.split('').forEach((char, i) => {
            const el = letterRefs.current[i];
            if (!el) return;
            el.textContent = ''; // <- ensures nothing renders initially

            let step = 0;
            const maxSteps = slotSteps - (targetText.length - i) * 4;

            const interval = setInterval(() => {
                if (step >= maxSteps) {
                    clearInterval(interval);
                    el.textContent = char;
                    gsap.fromTo(el, { scale: 1.3 }, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'back.out(2)',
                    });
                    return;
                }

                el.textContent = characterSet[Math.floor(Math.random() * characterSet.length)];
                step++;
            }, slotFrameRate);
        });

        // Progress bar
        const progressObj = { val: 0 };
        gsap.to(progressObj, {
            val: 100,
            duration: totalDuration,
            ease: 'power2.out', // smoother ramp-up and settle
            onUpdate() {
                const val = parseFloat(progressObj.val.toFixed(1));
                setPercentage(Math.floor(val));
                if (progressRef.current) {
                    progressRef.current.style.height = `${val}%`;
                }
            },
            onComplete() {
                if (fadeOutTriggered) return;
                fadeOutTriggered = true;

                setFadeOut(true);
                gsap.to(wrapperRef.current, {
                    y: '100vh',
                    opacity: 0,
                    duration: 1,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        document.dispatchEvent(new Event('loadingDone'));
                    }
                });
            }
        });
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'pointer-events-none' : ''
                }`}
            style={{ willChange: 'transform, opacity' }}
        >
            {/* Slot machine text */}
            <div className="flex justify-between w-full max-w-6xl px-10 mb-6 z-10 mix-blend-difference">
                {targetText.split('').map((char, i) => (
                    <span
                        key={i}
                        ref={(el) => { letterRefs.current[i] = el; }}
                        className="text-9xl mr-2 font-bold text-white select-none w-[40px] text-center"
                        style={{ opacity: 0 }}
                    >
                        {char}
                    </span>
                ))}
            </div>

            {/* Percentage in Bottom Right */}
            <span
                className="absolute bottom-6 right-10 text-5xl font-mono tracking-wide select-none z-10 mix-blend-difference text-white"
            >
                {percentage}%
            </span>

            {/* Progress Sheet */}
            <div
                ref={progressRef}
                className="absolute bottom-0 left-0 w-full bg-white"
                style={{ height: 0 }}
            />
        </div>
    );
}
