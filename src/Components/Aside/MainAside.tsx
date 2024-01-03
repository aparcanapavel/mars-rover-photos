import React from "react";
import Image from 'next/image';
import Link from 'next/link';

export default function MainAside() {
  return (
    <aside data-testid='aside-details'  className='cardItem basis-1/5 h-[calc(100vh-3rem-67.5px)] sticky min-h-[500px] max-lg:hidden postion-sticky top-0'>
      <ul className='flex flex-col text-center'>
        <li><Link className='aside-button' href={'/'}>Home</Link></li>
        <li><Link className='aside-button' target='_blank' href={'https://pavelaparcana.com'}>Portfolio</Link></li>
        <li><Link className='aside-button' target='_blank' href={'https://github.com/aparcanapavel'}>GitHub</Link></li>
        <li><Link className='aside-button' target='_blank' href={'https://www.linkedin.com/in/pavel-aparcana'}>LinkedIn</Link></li>
      </ul>
      <p className='text-center mt-4 absolute bottom-4'>Source: 
        <a target='_blank' href={'https://api.nasa.gov/'} className='underline ml-1'>NASA API</a>
      </p>
    </aside>
  )
}