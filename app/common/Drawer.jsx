'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from 'next/navigation';

// 오늘 일기 쓰기를 위한 date 설정
let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
let tempDate = new Date();
let date = `${tempDate.getFullYear()}${formatTwoDigits(tempDate.getMonth()+1)}${formatTwoDigits(tempDate.getDate())}`;

// 오늘의 일기 쓰기의 경우 date를 encode 해서 dynamic routing
const menuAfterLogin = [
  {
    name: '📊  대시보드',
    href: 'diary/dashboard',
  },
  {
    name: '📅  일기 목록',
    href: 'diary/list/calendar',
  },
  {
    name: '📇  오늘의 일기 쓰기',
    href: 'diary/create/'+ encodeURIComponent(btoa(date)),
  },
  {
    name: '🌼  튜토리얼',
    href: 'diary/tutorial',
  },
]

const menuBeforeLogin = [
  {
    name: '🌼  튜토리얼',
    href: 'diary/tutorial',
  },
]

export default function Drawer({ isOpen, setIsOpen }) {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin((getCookie('isLogin') != undefined) ? getCookie('isLogin') : false)
  }, [])

  const router = useRouter();

  function todayDiaryPage(link) {

    // 쿠키로부터 오늘 일기값 가져오기
    let todayDiary = getCookie("todayDiaryId");    

    // 오늘 일기가 있을 경우
    if((todayDiary == "")||(todayDiary == undefined)) {
      router.push(link);
    } 
    else {
      router.push('diary/'+todayDiary+'/modify');  
    }
  }
  
  return (
    <main
      className={
        " fixed overflow-auto z-50 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-700 translate-x-0  "
          : " transition-all delay-700 opacity-0 -translate-x-full  ")
      }
    >
        <div
            className={
            "flex  z-10 w-64 px-6 py-5 bg-red-50 scrollbar-hide left-0 absolute h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " -translate-x-full ")
            }
        >
          <div className="relative flex flex-col w-full place-content-between">
            <div className="relative flex flex-col h-full max-w-lg pb-10 space-y-6 ">
              <ul className="mt-5">
                <li className="m-3 mt-0 mb-5 text-2xl font-bold text-red-500 sm:text-3xl" onClick={() => { setIsOpen(false); }}><Link href="/home/landing"><div className="w-full">작심삼일</div></Link></li>
                {
                  isLogin
                  ?
                  <>
                    {menuAfterLogin.map((menu) => (
                        <li key={menu.name} className="my-1 text-lg hover:rounded-2xl hover:bg-red-100 text-zinc-700" onClick={() => { setIsOpen(false); }}>
                          {
                            (menu.name.includes("오늘의 일기 쓰기"))
                            ?
                            <div className="w-full py-3 pl-4" onClick={() => todayDiaryPage(menu.href)}>{menu.name}</div>
                            :
                            <Link href={menu.href}><div className="w-full py-3 pl-4">{menu.name}</div></Link>
                          }
                        </li>
                    ))}
                  </>
                  :
                  <>
                    {menuBeforeLogin.map((menu) => (
                        <li key={menu.name} className="my-1 text-lg hover:rounded-2xl hover:bg-red-100 text-zinc-700" onClick={() => { setIsOpen(false); }}>
                          {
                            <div className="w-full py-3 pl-4" onClick={() => todayDiaryPage(menu.href)}>{menu.name}</div>
                          }
                        </li>
                    ))}
                  </>
                }
              
              </ul>
            {/* {children} */}
            </div>
          </div>
        </div>
        <div
            className="w-screen h-full cursor-pointer "
        ></div>
        <div className={"fixed overflow-hidden z-0 inset-0 transform ease-in-out  bg-gray-900 bg-opacity-25 " +
            (isOpen
            ? " transition-opacity opacity-100 duration-700 "
            : " transition-all duration-400 opacity-0")
        } onClick={() => { setIsOpen(false); }}/>
    </main>
  );
}
