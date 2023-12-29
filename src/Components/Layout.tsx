'use client';
import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import Header from './Header/Header';
import MainAside from './Aside/MainAside';
import Stage from './Stage/Stage';

type LayoutProps = { 
  children: ReactElement | ReactElement[];
  isMobile: boolean;
}

// useMediaQuery from https://github.com/vercel/next.js/discussions/14810
const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: { matches: any; }) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    // media.addListener(updateTarget);
    if (media.addEventListener) {
      media.addEventListener("change", updateTarget);
    } else {
      // compatibility for browser that dont have addEventListener
      media.addListener(updateTarget);
    }

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    if (media.removeEventListener) {
      return () => media.removeEventListener('change', updateTarget);
    } else {
      // compatibility for browser that dont have removeEventListener
      return () => media.removeListener(updateTarget);
    }
  }, []);

  return targetReached;
};


export default function Layout({ children, isMobile }: LayoutProps) {
  const isBreakpoint = useMediaQuery(1024) || false;

  return (
    <>
      <Header isMobile={isBreakpoint || isMobile}/>
      <div className='flex row py-4'>
        {(!isBreakpoint || !isMobile) && <MainAside />}
        <Stage isMobile={isBreakpoint || isMobile}>{children}</Stage>
      </div>
    </>
  );
}
