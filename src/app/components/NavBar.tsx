'use client';

import Link from 'next/link';
import { useTransitionRouter } from 'next-view-transitions';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    const router = useTransitionRouter();
    const pathname = usePathname();
    const routes = [
        { name: 'Home', url: '/' },
        { name: 'Projects', url: '/Projects' },
        { name: 'About', url: '/About' }
    ];

    useEffect(() => {
        disableScroll();
        slideIn(() => {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
            }
            window.scrollTo({ top: 0, left: 0 });
            slideOut();
        });
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);

    const onNavClick = (e: React.MouseEvent, url: string) => {
        e.preventDefault();
        disableScroll();
        slideIn(() => {
            window.scrollTo({ top: 0, left: 0 });
            router.push(url);
            setTimeout(() => slideOut(), 500);
        });
    };

    return (
        <>
            <nav className="fixed top-0 w-full flex justify-center items-center z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-8 border-2 border-white/40 m-5 px-20 py-10 rounded-2xl bg-black/80 backdrop-blur-sm">

                            {routes.map((route) => (
                                <Link
                                    key={route.url}
                                    href={route.url}
                                    onClick={e => { onNavClick(e, route.url); console.log(route.name, route.url) }}
                                    className="inline-flex items-center text-xl font-medium text-white"
                                >
                                    {route.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="pointer-events-none fixed flex flex-row inset-0 z-50">
                <div className="transition-strip bg-white top-0" />
                <div className="transition-strip bg-white top-1/3" />
                <div className="transition-strip bg-white top-2/3" />
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
    const strips = Array.from(document.querySelectorAll('.transition-strip'));
    const inDur = 1500;
    const stagger = 200;

    // reset them off‑screen
    strips.forEach(s => (s as HTMLElement).style.transform = 'translateX(-100%)');

    strips.forEach((strip, i) => {
        const anim = strip.animate(
            [
                { transform: 'translateX(-100%)' },
                { transform: 'translateX(0)' },
            ],
            {
                duration: inDur,
                fill: 'forwards',
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                delay: i * stagger,
            }
        );

        // on the *last* strip’s in‑animation, invoke the callback
        if (i === strips.length - 1) {
            anim.onfinish = onComplete;
        }
    });
}


export function slideOut() {
    const strips = Array.from(document.querySelectorAll('.transition-strip'));
    const D = 1500; // duration

    // 1) Reset them exactly at x=0
    strips.forEach(s => (s as HTMLElement).style.transform = 'translateX(0)');

    // 2) Batch animate them all in the very next frame
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
                    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
                    delay: i * 200,
                    // no delay here — truly simultaneous
                }
            );
        });
    });

    // 3) Fire your “transitionDone” when the *middle* strip finishes
    //    That’s strip index 1 ⇒ finishes exactly after D ms
    setTimeout(() => {
        document.dispatchEvent(new Event('transitionDone'));
        enableScroll();
    }, 1000);
}




