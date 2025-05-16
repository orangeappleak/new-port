'use client';

import Link from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loading from './Loading';
let isTransitioning = false;

export default function NavBar() {
    const router = useTransitionRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const routes = [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/About' },
        { name: 'Projects', url: '/Projects' },
    ];

    useEffect(() => {
        // const setVh = () => {
        //     const vh = window.innerHeight * 0.01;
        //     document.documentElement.style.setProperty('--vh', `${vh}px`);
        //     ScrollTrigger.refresh(); // Make GSAP aware of height change
        // };

        // setVh();
        // window.addEventListener('resize', setVh);
        // window.addEventListener('orientationchange', setVh); // ✅ Add this

        // return () => {
        //     window.removeEventListener('resize', setVh);
        //     window.removeEventListener('orientationchange', setVh);
        // };


    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh-locked', `${vh}px`);
        }
    }, []);


    useEffect(() => {
        disableScroll();
        window.scrollTo({ top: 0, left: 0 });
        document.addEventListener('loadingDone', () => {
            setIsLoading(false);
            enableScroll();
        });
    }, []);

    useEffect(() => {
        const handlePop = () => {
            disableScroll();

            slideIn(() => {
                window.scrollTo({ top: 0, left: 0 });
                router.push(pathname);
                setTimeout(() => slideOut(), 100);
            });
        };

        window.addEventListener('popstate', handlePop);

        return () => {
            window.removeEventListener('popstate', handlePop);
        };
    }, [pathname]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);

    const onNavClick = (e: React.MouseEvent, url: string) => {
        e.preventDefault();
        disableScroll();
        slideIn(() => {
            window.scrollTo({ top: 0, left: 0 });
            router.push(url);
            setTimeout(() => slideOut(), 200);
        });
    };

    return (
        <>
            <nav className="fixed top-0 w-full flex justify-center items-center  z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-8 m-5 px-10 py-8 rounded-2xl backdrop-invert-65 bg-black/80 backdrop-blur-sm">
                            {routes.map((route) => (
                                <Link
                                    key={route.url}
                                    href={route.url}
                                    onClick={e => { onNavClick(e, route.url); console.log(route.name, route.url) }}
                                    className="inline-flex items-center text-2xl jersey font-medium text-white"
                                >
                                    {route.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {isLoading && (
                <Loading />
            )}


            <div className="pointer-events-none gap-0 fixed flex w-screen h-screen flex-col-reverse md:flex-col inset-0 z-50">
                <div className={`transition-strip bg-white h-screen w-1/5 left-0 flex-1 flex`}>
                    <h1 className='text-black text-8xl w-full rotate-90 md:rotate-0 text-center'>Trust</h1>
                </div>
                <div className={`transition-strip bg-white h-screen w-1/5 flex-1 left-1/5 flex`}>
                    <h1 className='text-black text-8xl w-full rotate-90 md:rotate-0 text-center'>Me</h1>
                </div>
                <div className={`transition-strip bg-white h-screen w-1/5 flex-1 left-2/5 flex`}>
                    <h1 className='text-black text-8xl w-full rotate-90 md:rotate-0 text-center'>I'm</h1>
                </div>
                <div className={`transition-strip bg-white h-screen w-1/5 flex-1 left-3/5 flex`}>
                    <h1 className='text-black text-8xl w-full rotate-90 md:rotate-0 text-center'>A</h1>
                </div>
                <div className={`transition-strip bg-white h-screen w-1/5 flex-1 left-4/5 flex`}>
                    <h1 className='text-black text-8xl w-full rotate-90 md:rotate-0 text-center'>DEV</h1>
                </div>
            </div>

        </>
    );
}

// grab these at module scope so removeEventListener matches
const _preventDefault = (e: Event) => {
    // allow modifier‑keys+scroll (e.g. ⌘+scroll) through if you want
    e.preventDefault();
};

const _preventDefaultForKeys = (e: KeyboardEvent) => {
    // space, page up/down, arrows, home/end
    if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
    }
};

export function disableScroll() {
    // CSS stays untouched, so scrollbar remains
    window.addEventListener('wheel', _preventDefault, { passive: false });
    window.addEventListener('touchmove', _preventDefault, { passive: false });
    window.addEventListener('keydown', _preventDefaultForKeys, { passive: false });
}

export function enableScroll() {
    window.removeEventListener('wheel', _preventDefault);
    window.removeEventListener('touchmove', _preventDefault);
    window.removeEventListener('keydown', _preventDefaultForKeys);
}

export function slideIn(onComplete: () => void) {

    if (isTransitioning) return;
    isTransitioning = true;

    const strips = Array.from(document.querySelectorAll('.transition-strip'));
    const inDur = 800;
    const stagger = 200;

    console.log(strips);

    // strips.forEach(s => (s as HTMLElement).style.transform = 'translateX(-100%)');

    strips.forEach((strip, i) => {
        const anim = strip.animate(
            [
                { transform: 'translateY(-100%)' },
                { transform: 'translateY(0%)' },
            ],
            {
                duration: inDur,
                fill: 'forwards',
                easing: 'ease-in-out',
                delay: i * stagger,
            }
        );

        // // on the *last* strip's in‑animation, invoke the callback
        if (i === strips.length - 1) {
            anim.onfinish = onComplete;
        }
    });
}


export function slideOut(callback?: () => void) {
    const strips = Array.from(document.querySelectorAll('.transition-strip'));
    const D = 800;

    // strips.forEach(s => (s as HTMLElement).style.transform = 'translateX(0)');

    requestAnimationFrame(() => {
        strips.forEach((strip, i) => {
            strip.animate(
                [
                    { transform: 'translateY(0)' },
                    { transform: 'translateY(100%)' }
                ],
                {
                    duration: D,
                    fill: 'forwards',
                    easing: 'ease-in-out',
                    delay: i * 200,
                }
            );
        });
    });

    setTimeout(() => {
        document.dispatchEvent(new Event('transitionDone'));
        isTransitioning = false;
        enableScroll();
        callback?.(); // <- Optional callback after transition
    }, D);
}





