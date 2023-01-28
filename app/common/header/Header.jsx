'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Login from './Login';
import Profile from './Profile';
import { getCookie } from 'cookies-next';

function Header({ isOpen, setIsOpen }) {

  const [top, setTop] = useState(true);
  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 20 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  let pathname = usePathname();

  return (
    <div className={`fixed z-40 w-full md:bg-opacity-70 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max-w-6xl mx-5 md:mx-20 lg:mx-36 xl:mx-56 2xl:mx-72 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          <Bars3Icon className={"w-6 h-6 hover:scale-105 " + (pathname.includes('home') ? "text-zinc-400" : "text-zinc-600") } aria-hidden="true" onClick={() => setIsOpen(true)}/>

          {
            !getCookie("isLogin")
            ?
            <>
              {/* 로그인 이전 - 시작하기 버튼 */}
              <Login/>
            </>
            :
            <>
              {/* 로그인 이후 - 사용자 프로필 사진 */}
              <Profile/>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
