import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CircleType from 'circletype';
import AnimatedContainer from './AnimatedComponent';
import { registerGSAPPlugins } from '@/app/hooks/gsap';
interface OrbitTextProps {
    text: string;
    textStyle?: string;
    orbitId: string;        // unique id for DOM targeting
    speed?: number;         // rotation duration (lower = faster)
    direction?: 'clockwise' | 'counterclockwise'; // rotate direction
}

const OrbitText = ({ text, textStyle, orbitId, speed = 30, direction = 'clockwise' }: OrbitTextProps) => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        registerGSAPPlugins();

        if (textRef.current) {
            const circleType = new CircleType(textRef.current);

            // Default continuous rotation
            const baseRotation = gsap.to(`#${orbitId}`, {
                rotate: direction === 'clockwise' ? '+=360' : '-=360',
                duration: speed,
                repeat: -1,
                ease: 'linear',
                transformOrigin: '50% 50%',
            });

            // // Scroll-triggered speed burst
            // const scrollBoost = gsap.to(`#${orbitId}`, {
            //     rotate: direction === 'clockwise' ? '+=100' : '-=100',
            //     ease: 'ease.inOut',
            //     yoyo: true,
            //     scrollTrigger: {
            //         trigger: `#${orbitId}`,
            //         start: 'top bottom',
            //         end: 'bottom top',
            //         scrub: 3, // sync with scroll
            //         markers: true,
            //     },
            // });

            return () => {
                baseRotation.scrollTrigger?.kill();
            };
        }
    }, [orbitId, speed, direction]);

    return (
        <div
            id={orbitId}
            className="absolute flex items-center justify-center pointer-events-none"
            style={{ height: 'calc(var(--vh-locked, 1vh) * 100)' }}
        >
            <div
                ref={textRef}
                className={`orbit-text ${textStyle} absolute font-bold tracking-tight`}
                style={{ whiteSpace: 'nowrap' }}
            >

                {text}

            </div>
        </div>
    );
};

export default OrbitText;
