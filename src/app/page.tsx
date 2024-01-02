import Layout from '@/Components/Layout';
import { MetaDataGeneratorProps } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


export default function Home({ searchParams }: MetaDataGeneratorProps) {
  const isMobile = searchParams?.viewport === 'mobile';

  return (
    <Layout isMobile={isMobile}>
      <h2 className='text-lg mb-4 font-medium'>Rovers</h2>
      <ul className='flex max-sm:flex-col max-sm:w-full wrap justify-between -m-1 items-center'>
        <li className='cardItem hover:bg-accent-300 m-1 max-sm:basis-full basis-1/3 max-sm:w-full max-sm:max-w-[350px] max-sm:mx-auto'>
          <Link href={'/rover/curiosity'}>
            <Image 
              blurDataURL={'/curiosity_rover-blur.jpg'} 
              placeholder='blur' 
              className='rover-button' 
              src={'/curiosity_rover.jpg'} 
              width={200} 
              height={200} 
              alt='Curiosity'
              sizes='(max-width: 640px) 315px, (max-width: 900px) 215px,(max-width: 1280px) 215px,(max-width: 1536px) 285px, 33vw'
            />
            <h3>Curiosity</h3>
          </Link>
        </li>
        <li className='cardItem hover:bg-accent-300 m-1 max-sm:basis-full basis-1/3 max-sm:w-full max-sm:max-w-[350px] max-sm:mx-auto'>
          <Link href={'/rover/opportunity'}>
            <Image 
              blurDataURL={'/opportunity_rover-blur.jpg'} 
              placeholder='blur' 
              className='rover-button' 
              src={'/opportunity_rover.jpg'} 
              width={200} 
              height={200} 
              alt='Opportunity'
              sizes='(max-width: 640px) 315px, (max-width: 900px) 215px,(max-width: 1280px) 215px,(max-width: 1536px) 285px, 33vw'
            />
            <h3>Opportunity</h3>
          </Link>
        </li>
        <li className='cardItem hover:bg-accent-300 m-1 max-sm:basis-full basis-1/3 max-sm:w-full max-sm:max-w-[350px] max-sm:mx-auto'>
          <Link href={'/rover/spirit'}>
            <Image 
              blurDataURL={'/spirit_rover-blur.jpg'} 
              placeholder='blur' 
              className='rover-button' 
              src={'/spirit_rover.jpg'} 
              width={200} 
              height={200} 
              alt='Spirit'
              sizes='(max-width: 640px) 315px, (max-width: 900px) 215px,(max-width: 1280px) 215px,(max-width: 1536px) 285px, 33vw'
            />
            <h3>Spirit</h3>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
