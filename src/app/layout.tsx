import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

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
      <body className={`${inter.className} bg-mainBG h-dvh pt-4 overflow-auto`}>
        <main className='container mx-auto max-sm:px-2'>
          {children}
        </main>
        <div className='bg-cardBG py-4 mt-4'>
          <div className='text-center text-white'>
            © 2023 - {new Date().getFullYear()} <Link href={'https://pavelaparcana.com'} target='_blank' className='underline'>Pavel Aparcana</Link>
          </div>
        </div>
      </body>
    </html>
  )
}
