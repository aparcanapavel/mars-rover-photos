import React from "react";
import Image from 'next/image';
import Link from 'next/link';

export default function MainAside() {
  return (
    <aside data-testid='aside-details'  className='cardItem basis-1/5 h-[calc(100vh-3rem-67.5px)] sticky min-h-[500px] max-lg:hidden postion-sticky top-0'>
      <Image placeholder='blur' blurDataURL={'/headshot_1_1-blur.jpg'} className='w-2/3 mx-auto mt-2 rounded-full border-solid border-2 border-mainBG' src={'/headshot_1_1.jpg'} width={200} height={200} alt='Pavel'/>
      <ul className='flex flex-col text-center mt-4'>
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