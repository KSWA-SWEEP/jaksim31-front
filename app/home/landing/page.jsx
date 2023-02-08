import React from 'react';
import LazyShow from '../../common/LazyShow';
import { ChevronDoubleDownIcon, FaceSmileIcon, ChatBubbleBottomCenterTextIcon, PresentationChartBarIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import ExampleScreen from './ExampleScreen'

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

async function getBgImg() {
  const Access_Key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY; 

  const res = await fetch(`https://api.unsplash.com/photos/random?query=diary&client_id=${Access_Key}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  let jsonData = await res.json();
  let imgUrl = jsonData.urls.regular;
  
  return imgUrl;
}

export default async function Home() {
  const imgUrl = await getBgImg();

  return (
    <>
      <main className='bg-red-50 dark:bg-zinc-700'>
        <div className="relative flex items-center content-center justify-center pt-40 pb-24 sm:pt-56 sm:pb-28 lg:pt-80 lg:pb-36">
          
          {/* background img */}
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url("+imgUrl+")",
            }}
          >
            {/* overlay */}
            <div
              id="blackOverlay"
              className="absolute w-full h-full opacity-75 dark:opacity-90 dark:bg-zinc-900 bg-zinc-700"
            ></div>
          </div>

          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">

              {/* title */}
              <div className="w-full px-4 ml-auto mr-auto text-center">
                <div className="">
                  <LazyShow delay={0}>
                    <h1 className="text-2xl font-bold text-white sm:text-5xl lg:text-7xl font-gmarketSans" data-testid="title">
                      작지만 심플하고 쌈박한 일기
                    </h1>
                  </LazyShow>
                  <LazyShow delay={0.25}>
                    <p className="mt-4 text-base font-light sm:text-xl lg:text-3xl text-zinc-200 font-gmarketSans">
                      작심삼일로 하루의 감정과 키워드를 남겨보세요🥰
                    </p>
                  </LazyShow>
                </div>
              </div>

              {/* animated chevron */}
              
              <div className='flex w-full pt-16 pb-3 sm:pb-4 sm:pt-28 lg:pt-36 lg:pb-10 place-content-center'>
                <LazyShow delay={0.4}>
                  <ChevronDoubleDownIcon className='w-10 lg:w-16 animate-bounce text-zinc-300'/>
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
                className="fill-current text-red-50 dark:text-zinc-500"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-12 -mt-24 bg-red-50 sm:pb-20 dark:bg-zinc-500">
          <div className="container px-4 mx-auto">
            
            <LazyShow delay={0.5}>
              {/* 예시 화면 */}
              <ExampleScreen/>
            </LazyShow>

          
          </div>
        </section>

        {/* 세부 설명 */}
        <section className="relative pt-12 bg-white dark:bg-zinc-800 sm:pt-28 sm:pb-36 lg:pt-44 lg:pb-56">
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
                className="text-white fill-current dark:text-zinc-800"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container px-4 mx-auto lg:pt-24 lg:pb-64">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
              <div className="sm:text-center">
                
                <LazyShow delay={0}>
                  <h2 className="text-lg font-semibold leading-8 text-red-500 dark:text-blue-500 font-gmarketSans">Features</h2>
                </LazyShow>
  
                <LazyShow delay={0.2}>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 font-gmarketSans sm:text-4xl">작심삼일은 이런 기능들을 지원합니다</p>
                </LazyShow>
                
                <LazyShow delay={0.3}>
                  <p className="max-w-2xl mx-auto mt-6 text-base leading-7 sm:text-lg sm:leading-3 font-gmarketSans text-zinc-600 dark:text-zinc-500">
                    사용자들은 작심삼일에서 쉽고 재미있게 일기를 작성할 수 있습니다💗
                  </p>
                </LazyShow>
              </div>

              <div className="max-w-lg mt-14 sm:mx-auto md:max-w-none">
                <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                  {features.map((feature) => (
                    <LazyShow delay={((feature.index)*0.5)-feature.index*0.2}>
                      <div key={feature.name} className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                        <div className="flex items-center justify-center w-12 h-12 text-white bg-red-200 dark:bg-blue-400/40 rounded-xl sm:shrink-0">
                          <feature.icon className="w-8 h-8" aria-hidden="true" />
                        </div>
                        <div className="sm:min-w-0 sm:flex-1">
                          <p className="text-lg font-semibold leading-8 font-gmarketSans text-zinc-900 dark:text-blue-300">{feature.name}</p>
                          <p className="mt-2 text-base leading-7 font-gmarketSans text-zinc-600 dark:text-zinc-400">{feature.description}</p>
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
        <section className="relative block py-20 dark:bg-zinc-500">
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
                className="fill-current text-red-50 dark:text-zinc-500"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
          
          <div className="container px-4 mx-auto lg:pt-24 lg:pb-64">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
              <div className="sm:text-center">
                
                <LazyShow delay={0}>
                  <h2 className="text-lg font-semibold leading-8 text-red-500 dark:text-blue-500 font-gmarketSans">Features</h2>
                </LazyShow>

                <LazyShow delay={0.2}>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 font-gmarketSans sm:text-4xl">작심삼일은 이런 기능들을 지원합니다</p>
                </LazyShow>
                
                <LazyShow delay={0.3}>
                  <p className="max-w-2xl mx-auto mt-6 text-base leading-7 sm:text-lg sm:leading-3 font-gmarketSans text-zinc-600 dark:text-zinc-500">
                    사용자들은 작심삼일에서 쉽고 재미있게 일기를 작성할 수 있습니다💗
                  </p>
                </LazyShow>
              </div>

              <div className="max-w-lg mt-14 sm:mx-auto md:max-w-none">
                <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
                  {features.map((feature) => (
                    <LazyShow delay={((feature.index)*0.5)-feature.index*0.2}>
                      <div key={feature.name} className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                        <div className="flex items-center justify-center w-12 h-12 text-white bg-red-200 dark:bg-blue-400/40 rounded-xl sm:shrink-0">
                          <feature.icon className="w-8 h-8" aria-hidden="true" />
                        </div>
                        <div className="sm:min-w-0 sm:flex-1">
                          <p className="text-lg font-semibold leading-8 font-gmarketSans text-zinc-900 dark:text-blue-300">{feature.name}</p>
                          <p className="mt-2 text-base leading-7 font-gmarketSans text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                        </div>
                      </div>
                    </LazyShow>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <footer className="items-center p-4 footer text-zinc-content dark:bg-zinc-500">
          <div className="items-center grid-flow-col">
            <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg> 
            <p className="text-xs font-light leading-none text-zinc-400 lg:text-sm dark:text-zinc-50">
              &copy; {new Date().getFullYear()} designed by{' '}
              <a href="#" rel="nofollow">
                SWEEP
              </a>
            </p>
          </div> 
          <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a
              aria-label="github"
              href="https://github.com/KSWA-SWEEP"
              target="_blank"
              rel="noreferrer"
              data-testid="goGitHubButton"
            >
              <svg
                className="fill-current text-zinc-500 dark:text-white hover:text-red-200"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              aria-label="notion"
              href="https://www.notion.so/SWEEP-0720ff930d644ddb80388400628c89d7"
              target="_blank"
              rel="noreferrer"
              data-testid="goNotionButton"
            >
              <svg 
                className="fill-current text-zinc-500 dark:text-white hover:text-red-200"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="12 0.18999999999999906 487.619 510.941">
                  <path d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z" fillRule="evenodd"/>
              </svg>
            </a>
            <a
              aria-label="mail"
              href="mailto:gsa.sweep@gmail.com  "
              target="_blank"
              rel="noreferrer"
              data-testid="contactButton"
            >
            <svg
              className="fill-current text-zinc-500 dark:text-white hover:text-red-200"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
            </svg>
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}