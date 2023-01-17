'use client';

import { useState } from 'react';
import './globals.css'
import Drawer from './common/Drawer';
import Header from './common/header/Header';
import { usePathname } from 'next/navigation';
import ReactQueryWrapper from './ReacQueryWrapper';

export default function RootLayout({ children }) {  
  const [isOpen, setIsOpen] = useState(false);
  
  let pathname = usePathname();

  return (
    <html lang="en" data-theme="garden">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='scrollbar-hide'>
        <div className='relative flex scrollbar-hide'>
          {/* Header */}
          <Header className="z-50" isOpen={isOpen} setIsOpen={setIsOpen}/>
          
          {
            pathname.includes('/home') 
            ?
            <div className="relative z-0 flex flex-col w-full min-h-screen">
              <ReactQueryWrapper>{children}</ReactQueryWrapper>
            </div>
            :
            <div className="relative z-0 flex flex-col w-full min-h-[100vh] mx-5 mt-20 mb-5 xl:mb-10 scrollbar-hide md:mt-24 md:mx-20 lg:mx-36 xl:mx-56 2xl:mx-72">
              {/* 하위 Page 표시 영역 */}
              <div className='p-2 bg-white min-h-fit rounded-2xl scrollbar-hide'>
                <ReactQueryWrapper>{children}</ReactQueryWrapper>
              </div>
            
              {/* copyright */}
              <div className="flex items-center justify-center mt-4">
                <p className="text-xs font-light leading-none text-neutral-400 lg:text-sm dark:text-neutral-50">
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
      </body>
    </html>
  )
}
