import Link from "next/link";
import React from "react";

const menuAfterLogin = [
  {
    name: '📊  대시보드',
    href: '/diary/dashboard',
  },
  {
    name: '📅  일기 목록',
    href: '/diary/list/grid',
  },
  {
    name: '📇  일기 작성',
    href: '/diary/create',
  },
  {
    name: '🌼  튜토리얼',
    href: '/diary/tutorial',
  },
]

const menuBeforeLogin = [
  {
    name: '🌼  튜토리얼',
    href: '/diary/tutorial',
  },
]

export default function Drawer({ isOpen, setIsOpen }) {
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
                {/* TODO 우선 로그인 후 목록으로 해둠 (menuAfterLogin) => isLogin인 값 사용해서 로그인 전 상태랑 구분 추가하기 */}
                <li className="m-3 mt-0 mb-5 text-2xl font-bold text-red-500 sm:text-3xl" onClick={() => { setIsOpen(false); }}><Link href="/home/landing"><div className="w-full">작심삼일</div></Link></li>
                {menuAfterLogin.map((menu) => (
                    <li key={menu.name} className="py-3 pl-4 my-1 text-lg hover:rounded-2xl hover:bg-red-100 text-slate-700" onClick={() => { setIsOpen(false); }}>
                      <Link href={menu.href}><div className="w-full">{menu.name}</div></Link>
                    </li>
                ))}
              
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
