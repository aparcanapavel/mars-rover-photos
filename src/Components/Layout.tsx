'use client';
import React, { ReactElement } from 'react';
import Header from './Header/Header';
import MainAside from './Aside/MainAside';
import Stage from './Stage/Stage';
import { useMediaQuery } from '../utils/useMediaQuery';

type LayoutProps = { 
  children: ReactElement | ReactElement[];
  isMobile: boolean;
}

export default function Layout({ children, isMobile }: LayoutProps) {
  const isBreakpoint = useMediaQuery(1024) || false;

  return (
    <>
      <Header isMobile={isBreakpoint || isMobile}/>
      <div className='flex row py-4 max-sm:text-xs'>
        {(!isBreakpoint || !isMobile) && <MainAside />}
        <Stage>{children}</Stage>
      </div>
    </>
  );
}
