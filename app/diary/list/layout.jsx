'use client';

import Link from 'next/link'
import '../../globals.css'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion";

import "react-datepicker/dist/react-datepicker.css";

export default function listLayout ({ children }) {
    const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false, })
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    let pathname = usePathname();

    return (
        <>
            <nav className='flex justify-center mt-4'>
                <div className="tabs">
                    <Link href="/diary/list/grid" className={"mr-2 text-sm font-semibold sm:text-lg lg:mt-3 md:mr-5 xl:text-xl tab tab-bordered hover:text-red-400" + (pathname == "/diary/list/grid" ? " text-slate-700" : "")}>
                        썸네일로 모아보기✨
                    </Link> 
                    <Link href="/diary/list/calendar" className={"text-sm font-semibold sm:text-lg lg:text-xl tab tab-bordered hover:text-red-400" + (pathname == "/diary/list/calendar" ? " text-slate-700" : "")}>
                        달력으로 모아보기👀
                    </Link> 
                </div>
            </nav>

            {/* 검색 영역 */}
            <div className="font-medium bg-red-100/60 mt-7 lg:mx-16 mx-7 text-md collapse rounded-3xl text-slate-600">
                <input type="checkbox" className="peer" /> 
                <div className="collapse-title peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <div className='relative flex items-center justify-center'>
                        <MagnifyingGlassIcon className='block w-5 h-5 ml-2 mr-5'/>
                        <div className='text-lg'>
                            검색하기
                        </div>
                    </div>
                </div>
                <div className="pb-0 collapse-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                    <div className='m-1 sm:m-4'>
                        <div className="md:col-span-2">
                            <div className="overflow-hidden">
                                <div className="grid grid-cols-6 sm:gap-2">
                                    {/* 단어 검색 */}
                                    <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-base font-medium text-slate-700">
                                            검색어
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            placeholder='ex) 마카롱'
                                            className="w-full pl-4 mt-1 shadow-sm border-slate-300 focus:outline-slate-300 h-9 rounded-xl "
                                        />
                                    </div>

                                    {/* 감정 검색 */}
                                    <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                        <label htmlFor="country" className="block text-base font-medium text-slate-700">
                                            감정
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="w-full px-3 py-2 mt-1 shadow-sm border-slate-300 focus:outline-slate-300 h-9 rounded-xl "
                                        >
                                            <option>전체</option>
                                            <option>감정없음</option>
                                            <option>놀람</option>
                                            <option>불확실</option>
                                            <option>슬픔</option>
                                            <option>싫음</option>
                                            <option>좋음</option>
                                            <option>지루함</option>
                                            <option>창피함</option>
                                        </select>
                                    </div>

                                    {/* 달력 형식일 경우 아래 두 항목 (기간, 정렬) 비활성화 */}
                                    {/* 기간 검색 */}
                                    <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-base font-medium text-slate-700">
                                            기간
                                        </label>
                                        <div className='grid grid-cols-7 gap-2'>
                                            <div className='col-span-3'>
                                                <DatePicker popperProps={{ strategy: "fixed" }} className='w-full h-10 p-2 text-xs sm:text-base rounded-2xl' selected={startDate} onChange={(date) => setStartDate(date)} />
                                            </div>
                                            <div className='flex items-center justify-center col-span-1'>
                                                ~
                                            </div>
                                            <div className='col-span-3'>
                                                <DatePicker popperProps={{ strategy: "fixed" }} className='w-full h-10 p-2 text-xs sm:text-base rounded-2xl' selected={endDate} onChange={(date) => setEndDate(date)} />
                                            </div>
                                        </div>

                                    </div>

                                    {/* 정렬 */}
                                    <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                        <label htmlFor="country" className="block text-base font-medium text-slate-700 ">
                                            정렬
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="w-full px-3 py-2 mt-1 shadow-sm border-slate-300 focus:outline-slate-300 h-9 rounded-xl "
                                        >
                                            <option>오래된 순</option>
                                            <option>최신순</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        className="justify-center px-4 py-2 mx-1 mt-5 text-sm font-medium border border-transparent shadow-sm w-30 rounded-xl bg-primary text-primary-content hover:bg-primary-focus focus:outline-none focus:ring-2">
                                        검색하기🔍
                                    </button>
                                    <button
                                        className="justify-center px-4 py-2 mx-1 mt-5 text-sm font-medium bg-red-200 border border-transparent shadow-sm w-30 rounded-xl text-accent-content hover:bg-accent-focus focus:outline-none focus:ring-2">
                                        초기화
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하위 page 영역 */}
            <div className='flex justify-center min-h-screen lg:m-10'>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={(pathname == "/diary/list/grid" ? "grid" : "calendar")}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    )
}
