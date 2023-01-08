'use client';

import React from 'react';
import LazyShow from '../../common/LazyShow';
import { ChevronDoubleDownIcon, FaceSmileIcon, ChatBubbleBottomCenterTextIcon, PresentationChartBarIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import exampleImg from '../../../public/images/landing-example.png'
import { motion } from "framer-motion";

const features = [
  {
    name: '감정 분석',
    description:
      '사용자의 일기를 기반으로 감정을 분석합니다. 분석된 감정들을 통해 한 달간 자신의 감정들을 모아볼 수 있습니다',
    icon: FaceSmileIcon,
    index: 1
  },
  {
    name: '키워드 분석',
    description:
      '사용자의 일기를 기반으로 키워드를 분석합니다. 분석된 키워드를 통해 썸네일을 자동으로 추출하며, 썸네일들로 일기를 모아볼 수 있습니다.',
    icon: ChatBubbleBottomCenterTextIcon,
    index: 2
  },
  {
    name: '대시보드',
    description:
      '한달간의 감정분석, 누적 감정 분석, 최근 일기, 키워드 분석 등 자신의 일기를 통한 데이터를 한 눈에 확인할 수 있습니다.',
    icon: PresentationChartBarIcon,
    index: 3
  },
  {
    name: '편리한 텍스트 편집기',
    description:
      '일기 작성 시 텍스트 굵기, 텍스트 크기, 텍스트 색상, 텍스트 배경 색, 글머리 목록, 표 등 기능을 지원하여 사용자가 개성있는 일기를 작성할 수 있도록 합니다.',
    icon: PencilSquareIcon,
    index: 4
  },
]

function Home() {

  return (
    <>
      <main className='bg-red-50'>
        <div className="relative flex items-center content-center justify-center pt-40 pb-24 sm:pt-56 sm:pb-28 lg:pt-80 lg:pb-36">
          
          {/* background img */}
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://source.unsplash.com/random/?diary')",
            }}
          >
            {/* overlay */}
            <div
              id="blackOverlay"
              className="absolute w-full h-full opacity-75 bg-slate-700"
            ></div>
          </div>

          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">

              {/* title */}
              <div className="w-full px-4 ml-auto mr-auto text-center">
                <div className="">
                  <LazyShow delay={0}>
                    <h1 className="text-2xl sm:text-5xl lg:text-7xl font-semibold font-[GmarketSansBold] text-white">
                      작지만 심플하고 쌈박한 일기
                    </h1>
                  </LazyShow>
                  <LazyShow delay={0.25}>
                    <p className="mt-4 text-base sm:text-xl lg:text-3xl text-slate-200 font-[GmarketSansLight]">
                      작심삼일로 하루의 감정과 키워드를 남겨보세요🥰
                    </p>
                  </LazyShow>
                </div>
              </div>

              {/* animated chevron */}
              
              <div className='flex w-full pt-16 pb-3 sm:pb-4 sm:pt-28 lg:pt-36 lg:pb-10 place-content-center'>
                <LazyShow delay={0.4}>
                  <ChevronDoubleDownIcon className='w-10 lg:w-16 animate-bounce text-slate-300'/>
                </LazyShow>
              </div> 
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 top-auto w-full h-16 overflow-hidden pointer-events-none"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-current text-red-50"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-12 -mt-24 bg-red-50 sm:pb-20">
          <div className="container px-4 mx-auto">
            
            <LazyShow delay={0.5}>
              {/* 예시 화면 */}
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 text-center aspect-video lg:mx-40">
                  <motion.div
                    whileHover={{ scale: 1.03, rotate: -3 }}
                  >
                    <div className="relative flex flex-col w-full h-full mb-8 break-words bg-white rounded-lg shadow-lg shadow-slate-300">
                      <div className="flex-auto overflow-hidden rounded-lg">
                        <Image src={exampleImg}/>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </LazyShow>

          
          </div>
        </section>

        {/* 세부 설명 */}
        <section className="relative pt-12 bg-white sm:pt-28 sm:pb-36 lg:pt-44 lg:pb-56">
          <div
            className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          

          <div className="container px-4 mx-auto lg:pt-24 lg:pb-64">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
              <div className="sm:text-center">
                
                <LazyShow delay={0}>
                  <h2 className="text-lg font-semibold leading-8 text-red-500 font-[GmarketSansMedium]">Features</h2>
                </LazyShow>
  
                <LazyShow delay={0.2}>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800 font-[GmarketSansBold] sm:text-4xl">작심삼일은 이런 기능들을 지원합니다</p>
                </LazyShow>
                
                <LazyShow delay={0.3}>
                  <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg leading-7 sm:leading-3 font-[GmarketSansMedium] text-slate-600">
                    사용자들은 작심삼일에서 가볍고 쉬우면서도 재미있게 일기를 작성할 수 있습니다💗
                  </p>
                </LazyShow>
              </div>

              <div className="max-w-lg mt-14 sm:mx-auto md:max-w-none">
                <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                  {features.map((feature) => (
                    <LazyShow delay={((feature.index)*0.5)-feature.index*0.2}>
                      <div key={feature.name} className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                        <div className="flex items-center justify-center w-12 h-12 text-white bg-red-200 rounded-xl sm:shrink-0">
                          <feature.icon className="w-8 h-8" aria-hidden="true" />
                        </div>
                        <div className="sm:min-w-0 sm:flex-1">
                          <p className="text-lg font-[GmarketSansMedium] font-semibold leading-8 text-slate-900">{feature.name}</p>
                          <p className="mt-2 font-[GmarketSansLight] text-base leading-7 text-slate-600">{feature.description}</p>
                        </div>
                      </div>
                    </LazyShow>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 기능 설명 */}
        <section className="relative block py-20">
          <div
            className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-current text-red-50"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container px-4 mx-auto lg:pt-24 lg:pb-64">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
              <div className="sm:text-center">
                
                <LazyShow delay={0}>
                  <h2 className="text-lg font-semibold leading-8 text-red-500 font-[GmarketSansMedium]">Features</h2>
                </LazyShow>
  
                <LazyShow delay={0.2}>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800 font-[GmarketSansBold] sm:text-4xl">작심삼일은 이런 기능들을 지원합니다</p>
                </LazyShow>
                
                <LazyShow delay={0.3}>
                  <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg leading-7 sm:leading-3 font-[GmarketSansMedium] text-slate-600">
                    사용자들은 작심삼일에서 가볍고 쉬우면서도 재미있게 일기를 작성할 수 있습니다💗
                  </p>
                </LazyShow>
              </div>

              <div className="max-w-lg mt-14 sm:mx-auto md:max-w-none">
                <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                  {features.map((feature) => (
                    <LazyShow delay={((feature.index)*0.5)-feature.index*0.2}>
                      <div key={feature.name} className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                        <div className="flex items-center justify-center w-12 h-12 text-white bg-red-200 rounded-xl sm:shrink-0">
                          <feature.icon className="w-8 h-8" aria-hidden="true" />
                        </div>
                        <div className="sm:min-w-0 sm:flex-1">
                          <p className="text-lg font-[GmarketSansMedium] font-semibold leading-8 text-slate-900">{feature.name}</p>
                          <p className="mt-2 font-[GmarketSansLight] text-base leading-7 text-slate-600">{feature.description}</p>
                        </div>
                      </div>
                    </LazyShow>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <footer className="items-center p-4 footer bg-neutral text-neutral-content">
          <div className="items-center grid-flow-col">
            <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg> 
            <p className="text-xs font-light leading-none text-neutral-400 lg:text-sm dark:text-neutral-50">
              &copy; {new Date().getFullYear()} designed by{' '}
              <a href="#" rel="nofollow">
                SWEEP
              </a>
            </p>
          </div> 
          <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
            </a> 
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </footer>
      </main>
    </>
  );
}

export default Home;