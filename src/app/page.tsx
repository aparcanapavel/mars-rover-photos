import Layout from '@/Components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// home page html needs to display 3 clickable items that would take them to a /rover/[rover-name] page. It also needs to display the name of the rover, the image of the rover, and the description of the rover. On the aside element, it should have a circular image of my headshot, along with a list of buttons that link to the homepage, an external link to pavelaparcana.com, github.com, and linkedin.com.
// aside element should also have a note at the bottom that has the source of the data from the nasa api.
export default function Home() {

  return (
    <Layout>
      <h2 className='text-lg mb-4 font-medium'>Rovers</h2>
      <ul className='flex max-sm:flex-col wrap justify-between -m-1 items-center'>
        <li className='cardItem hover:bg-accent-300 m-1 max-sm:basis-full basis-1/3 max-sm:w-full max-sm:max-w-[350px] max-sm:mx-auto'>
          <Link href={'/rover/curiosity'}>
            <Image blurDataURL={'/curiosity_rover.jpg'} placeholder='blur' className='rover-button' src={'/curiosity_rover.jpg'} width={200} height={200} alt='Curiosity'/>
            <h3>Curiosity</h3>
          </Link>
        </li>
        <li className='cardItem hover:bg-accent-300 m-1 max-sm:basis-full basis-1/3 max-sm:w-full max-sm:max-w-[350px] max-sm:mx-auto'>
          <Link href={'/rover/opportunity'}>
            <Image blurDataURL={'/opportunity_rover.jpg'} placeholder='blur' className='rover-button' src={'/opportunity_rover.jpg'} width={200} height={200} alt='Opportunity'/>
            <h3>Opportunity</h3>
          </Link>
        </li>
        <li className='cardItem hover:bg-accent-300 m-1 max-sm:basis-full basis-1/3 max-sm:w-full max-sm:max-w-[350px] max-sm:mx-auto'>
          <Link href={'/rover/spirit'}>
            <Image blurDataURL={'/spirit_rover.jpg'} placeholder='blur' className='rover-button' src={'/spirit_rover.jpg'} width={200} height={200} alt='Spirit'/>
            <h3>Spirit</h3>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
