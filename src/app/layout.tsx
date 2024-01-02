import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mars Rovergram',
  description: 'Images taken by the Mars Rovers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className='overflow-hidden'>
      <body className={`${inter.className} h-dvh pt-4 overflow-auto bg-mainBG gradient relative`}>
        <main className='container mx-auto max-sm:px-2  min-h-[calc(100vh-2rem)] lg:px-4'>
          {children}
        </main>
        <div className='bg-cardBG py-4 mt-4'>
          <div className='text-center text-white'>
            A Project by <Link href={'https://pavelaparcana.com'} target='_blank' className='underline'>Pavel Aparcana</Link>.
          </div>
        </div>
        <div
          className='fixed top-0 left-0 h-[555px] w-full -z-10'
        >
          <Image
            src={'/mars-bg.jpg'}
            blurDataURL={'/mars-bg-blur2.jpg'}
            placeholder='blur'
            alt='Mars'
            fill
            style={{ 
              objectFit: 'cover',
              zIndex: -1,
              maxHeight: '555px',
              top: 0,
            }}
            className='w-full h-full object-cover'
            sizes='(max-width: 640px) 640px, (max-width: 900px) 900px,(max-width: 1280px) 1280px,(max-width: 1536px) 1536px, 100vw'
            priority
          />
          <span
            className='fixed top-0 left-0 h-[555px] w-full -z-1 pointer-events-none backdrop-gradient'
          ></span>
        </div>
      </body>
    </html>
  )
}
