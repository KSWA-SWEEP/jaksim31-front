'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { getCookie } from 'cookies-next';
import { useQueryClient } from 'react-query';
import dynamic from 'next/dynamic';

const DynamicLogin = dynamic(() => import('./Login'))
const DynamicProfile = dynamic(() => import('./Profile'))

function Header({ isOpen, setIsOpen }) {

  const [top, setTop] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
 
  useEffect(() => {
    setIsLogin((getCookie('isLogin') != undefined) ? getCookie('isLogin') : false)
  }, [])

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 20 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  let pathname = usePathname();

  // react-query
  const queryClient = useQueryClient();
  // 비로그인 시 userInfo 쿼리 캐시 삭제
  if(!getCookie("isLogin")) {
    queryClient.removeQueries(["USER_INFO"]);
  }

  return (
    <div className={`fixed z-40 w-full md:bg-opacity-70 transition duration-300 ease-in-out ${!top && 'bg-white dark:bg-zinc-800 backdrop-blur-sm shadow-lg'}`}>
      <div className="mx-5 md:mx-20 lg:mx-36 xl:mx-56 2xl:mx-72 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          <Bars3Icon className={"w-6 h-6 hover:scale-105 " + (pathname.includes('home') ? "text-zinc-400" : "text-zinc-600 dark:text-zinc-100") } aria-hidden="true" onClick={() => setIsOpen(true)} data-testid="drawerButton"/>

          {
            !isLogin
            ?
            <>
              {/* 로그인 이전 - 시작하기 버튼 */}
              <DynamicLogin/>
            </>
            :
            <>
              {/* 로그인 이후 - 사용자 프로필 사진 */}
              <DynamicProfile/>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
