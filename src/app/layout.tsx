import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link';
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mars Rovergram',
  description: 'Images taken by the Mars Rovers',
}
// I need to show an image of mars in the background within the body
// I also need to add a gradient on top of the image. This needs to go from top to bottom, transparent to black
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='overflow-hidden'>
      <body className={`${inter.className} bg-mainBG h-dvh pt-4 overflow-auto`}>
        <main className='container mx-auto max-sm:px-2  min-h-[calc(100vh-2rem)] lg:px-4'>
          {children}
        </main>
        <div className='bg-cardBG py-4 mt-4'>
          <div className='text-center text-white'>
            A Project by <Link href={'https://pavelaparcana.com'} target='_blank' className='underline'>Pavel Aparcana</Link>.
          </div>
        </div>
        <Image
          src={'/mars-bg.jpg'}
          blurDataURL={'/mars-bg-blur2.jpg'}
          placeholder='blur'
          alt='Mars'
          fill
          style={{ 
            objectFit: 'cover',
            zIndex: -1
          }}
        />
        <span
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 0%, rgb(255 255 255 / 0%) 0%, rgb(162, 162, 162,0) 33.33%, rgb(0, 0, 0) 100%, rgb(0, 0, 0) 100%, rgb(0, 0, 0) 100%)'
          }}
        ></span>
      </body>
    </html>
  )
}
