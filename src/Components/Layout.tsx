'use client';
import React, { ReactElement } from 'react';
import Header from './Header/Header';
import MainAside from './Aside/MainAside';
import Stage from './Stage/Stage';
import { useWindowSize } from '../utils/useWindowSize';

export default function Layout({ children }: { children: ReactElement | ReactElement[] }) {
  const windowWidth = useWindowSize();

  const isMobile = windowWidth <= 1024; // hide main aside on tablets
  
  return (
    <>
      <Header isMobile={isMobile}/>
      <div className='flex row py-4'>
        {!isMobile && <MainAside />}
        <Stage isMobile={isMobile}>{children}</Stage>
      </div>
    </>
  );
}
