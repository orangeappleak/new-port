'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import gsap, { TweenVars } from 'gsap';
import { registerGSAPPlugins } from '@/app/hooks/gsap';

interface AnimatedContainerProps {
  children: ReactNode;
  tag?: string; // allows you to pass 'div', 'section', 'span', etc.
  className?: string;
  triggerId?: string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  animateOnMount?: boolean;
  endTrigger?: string;
  fromVars?: TweenVars;
  toVars?: TweenVars;
  markers?: boolean;
  id?: string;
}

export default function AnimatedContainer({
  children,
  tag = 'div',
  className = '',
  triggerId = '',
  start = 'top 80%',
  end = 'top 20%',
  scrub = 1,
  endTrigger = '',
  animateOnMount = false,
  fromVars = { opacity: 0, y: 50 },
  toVars = { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
  markers = false,
  id = '',
}: AnimatedContainerProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAPPlugins();

    if (!ref.current) return;

    if (animateOnMount) {
      gsap.fromTo(ref.current, fromVars, toVars);
    } else {
      gsap.fromTo(ref.current, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: triggerId || ref.current,
          start,
          end,
          endTrigger,
          scrub,
          markers,
        },
      });
    }
  }, [triggerId, start, end, scrub, fromVars, toVars, animateOnMount]);

  return React.createElement(tag, { ref, className, id }, children);
}
