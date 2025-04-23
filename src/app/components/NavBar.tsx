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
        disableScroll();
        document.addEventListener('loadingDone', () => {
            setIsLoading(false);
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
            setTimeout(() => slideOut(), 100);
        });
    };

    return (
        <>
            <nav className="fixed top-0 w-full flex justify-center items-center  z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-8 m-5 px-10 py-5 rounded-2xl backdrop-invert-65 bg-black/80 backdrop-blur-sm">
                            {routes.map((route) => (
                                <Link
                                    key={route.url}
                                    href={route.url}
                                    onClick={e => { onNavClick(e, route.url); console.log(route.name, route.url) }}
                                    className="inline-flex items-center text-md font-medium text-white"
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


            <div className="pointer-events-none fixed flex w-screen h-screen flex-row items-center justify-center inset-0 z-50">
                <div className="transition-strip bg-white w-screen top-0 flex items-center justify-center">
                    <h1 className='text-black text-6xl w-full text-center'>Design</h1>
                </div>
                <div className="transition-strip bg-white w-screen top-1/5 flex items-center justify-center">
                    <h1 className='text-black text-6xl w-full text-center'>Develop</h1>
                </div>
                <div className="transition-strip bg-white w-screen top-2/5 flex items-center justify-center">
                    <h1 className='text-black text-6xl w-full text-center'>Deliver</h1>
                </div>
                <div className="transition-strip bg-white w-screen top-3/5 flex items-center justify-center">
                    <h1 className='text-black text-6xl w-full text-center'>Deliver</h1>
                </div>
                <div className="transition-strip bg-white w-screen top-4/5 flex items-center justify-center">
                    <h1 className='text-black text-6xl w-full text-center'>Deliver</h1>
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
    const inDur = 1000;
    const stagger = 100;

    console.log(strips);

    // strips.forEach(s => (s as HTMLElement).style.transform = 'translateX(-100%)');

    strips.forEach((strip, i) => {
        const anim = strip.animate(
            [
                { transform: 'translateX(-100%)' },
                { transform: 'translateX(0%)' },
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
    const D = 1000;

    // strips.forEach(s => (s as HTMLElement).style.transform = 'translateX(0)');

    requestAnimationFrame(() => {
        strips.forEach((strip, i) => {
            strip.animate(
                [
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(100%)' }
                ],
                {
                    duration: D,
                    fill: 'forwards',
                    easing: 'ease-in-out',
                    delay: i * 100,
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





