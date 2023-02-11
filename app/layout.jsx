'use client';

import { useEffect, useState } from 'react';
import './globals.css'
import Drawer from './common/Drawer';
import Header from './common/header/Header';
import { usePathname } from 'next/navigation';
import ReactQueryWrapper from './ReactQueryWrapper';
import localFont from '@next/font/local'
import * as gtag from '../lib/gtag';

const leeSeoyunFont = localFont({
  src: './fonts/LeeSeoyun.otf',
  weight: '600',
  variable: '--font-leeseoyun',
});

const gmarketSansFont = localFont({
  src: [
    {
      path: './fonts/GmarketSansBold.otf',
      weight: '700',
    },
    {
      path: './fonts/GmarketSansMedium.otf',
      weight: '600',
    },
    {
      path: './fonts/GmarketSansLight.otf',
      weight: '300',
    },
  ],
  variable: '--font-gmarketSans',
});

export default function RootLayout({ children }) {  
  const [isOpen, setIsOpen] = useState(false);
  
  let pathname = usePathname();

  // 모든 페이지 이동시 scroll top
  useEffect(() => window.scroll(0, 0), [pathname]);

  return (
    <html lang="en" data-theme="garden" className={`${leeSeoyunFont.variable} ${gmarketSansFont.variable}`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='scrollbar-hide bg-gradient-image dark:bg-background-image-dark'>
        
        {/* Google Analytics */}
        <script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
        <script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `
          }}
        />

        <ReactQueryWrapper>
          <div className='relative flex scrollbar-hide'>
            {/* Header */}
            <Header className="z-50" isOpen={isOpen} setIsOpen={setIsOpen}/>
            
            {
              pathname.includes('/home') 
              ?
              <div className="relative z-0 flex flex-col w-full min-h-screen">
                {children}
              </div>
              :
              <div className="relative z-0 flex flex-col w-full min-h-[100vh] mx-5 mt-20 mb-5 xl:mb-10 scrollbar-hide md:mt-24 md:mx-20 lg:mx-36 xl:mx-56 2xl:mx-72">
                {/* 하위 Page 표시 영역 */}
                <div className='p-2 bg-white dark:bg-zinc-800 min-h-fit rounded-2xl scrollbar-hide'>
                  {children}
                </div>
              
                {/* copyright */}
                <div className="flex items-center justify-center mt-4">
                  <p className="text-xs font-light leading-none text-zinc-600 lg:text-sm dark:text-neutral-50">
                    &copy; {new Date().getFullYear()} designed by{' '}
                    <a href="#" rel="nofollow">
                      SWEEP
                    </a>
                  </p>
                </div>  
              </div>
            }

            {/* Drawer */}
            <Drawer className="z-50" isOpen={isOpen} setIsOpen={setIsOpen}/>
          </div>
        </ReactQueryWrapper>
      </body>
    </html>
  )
}
