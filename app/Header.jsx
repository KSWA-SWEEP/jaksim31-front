'use client';

import React, { useState, useEffect, Fragment } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";
import Image from 'next/image';
import userData from '../public/data/user.json'
import KakaoLoginBtn from '../public/images/KakaoLogin.png'

const user = userData;

function Header({ isOpen, setIsOpen }) {
  
  const router = useRouter();

  const [top, setTop] = useState(true);
  let [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  let [isEditModalOpen, setIsEditModalOpen] = useState(false)
  let [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  let [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 20 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  function openProfileModal() { setIsEditModalOpen(false); setIsProfileModalOpen(true) }
  function closeProfileModal() { setIsProfileModalOpen(false); setIsEditModalOpen(false) }

  function openEditModal() { setIsProfileModalOpen(false); setIsEditModalOpen(true) }
  function closeEditModal() { setIsProfileModalOpen(false); setIsEditModalOpen(false) }
 
  function openLoginModal() { setIsLoginModalOpen(true); setIsRegisterModalOpen(false) }
  function closeLoginModal() { setIsLoginModalOpen(false); setIsRegisterModalOpen(false) }
 
  function openRegisterModal() { setIsRegisterModalOpen(true); setIsLoginModalOpen(false) }
  function closeRegisterModal() { setIsLoginModalOpen(false); setIsRegisterModalOpen(false) }

  function replaceImg() { 
    // TODO 파일 첨부 어쩌구 넣고 프로필 이미지 변경하는 부분 추가하기
  }

  function logout() {
    // 로그아웃 API 호출
    //
    
    // isLogin등 로그인 관련 정보 삭제
    //

    // landing page로 이동
    router.push('/home/landing')
  }

  let pathname = usePathname();

  return (
    <div className={`fixed z-40 w-full md:bg-opacity-70 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max-w-6xl mx-5 md:mx-20 lg:mx-36 xl:mx-56 2xl:mx-72 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          <Bars3Icon className={"w-6 h-6 hover:scale-105 " + (pathname.includes('home') ? "text-slate-400" : "text-slate-600") } aria-hidden="true" onClick={() => setIsOpen(true)}/>
          {/* <motion.div
            whileHover={{ scale: 1.2, rotate: 180 }}
            whileTap={{
              scale: 0.8,
              rotate: -90,
              borderRadius: "100%"
            }}
            transition={{ duration: 0.2 }}
          >
            <Bars3Icon className={"w-6 h-6 " + (pathname.includes('home') ? "text-slate-400" : "text-slate-600") } aria-hidden="true" onClick={() => setIsOpen(true)}/>
          </motion.div> */}

          {/* profile */}
          {
            // TODO 지금은 home경로 포함일때로 해두었는데, isLogin에 따라 변하는 것으로 바꿔주기
            pathname.includes('home') 
            ?
            <>
              <motion.div
                className="box"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 400, damping: 17 }}
              >
                <div onClick={openLoginModal} className="z-40 inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white duration-150 border border-transparent shadow-sm whitespace-nowrap rounded-xl bg-rose-400 hover:bg-rose-500">시작하기</div>
              </motion.div>
              
              {/* 로그인 Modal */}
              <Transition className="z-50 overflow-auto" appear show={isLoginModalOpen} as={Fragment}>
                <Dialog as="div" className="relative" onClose={closeLoginModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                  </Transition.Child>

                  <div className="fixed inset-0">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md p-6 pt-4 text-left align-middle transition-all transform bg-white shadow-xl lg:max-w-lg rounded-2xl">
                          
                          <div className='flex justify-end'>
                            <XMarkIcon
                              className="w-6 h-6 text-sm text-slate-500 "
                              onClick={closeLoginModal}
                            />
                          </div>

                          <div className='flex flex-col text-center justify-items-center'>
                            <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
                              <div className="mb-5 text-2xl font-bold text-center text-slate-700">
                                로그인
                              </div>
                              <form>
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block mb-2 text-xs font-bold uppercase text-slate-600"
                                    htmlFor="grid-password"
                                  >
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                                    placeholder="Email"
                                  />
                                </div>

                                <div className="relative w-full mb-5">
                                  <label
                                    className="block mb-2 text-xs font-bold uppercase text-slate-600"
                                    htmlFor="grid-password"
                                  >
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                                    placeholder="Password"
                                  />
                                </div>
                                <div>
                                  <label className="inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-xs" /> 
                                    <div className="ml-2 text-sm font-semibold text-slate-600">
                                      자동 로그인
                                    </div>
                                  </label>
                                </div>

                                <div className="mt-6 text-center">
                                  <button
                                    className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-800 active:bg-slate-600 hover:shadow-lg focus:outline-none"
                                    type="button"
                                  >
                                    로그인
                                  </button>
                                </div>

                                <div className="relative w-full mt-4 mb-2">
                                  <p>회원이 아니신가요?  <strong onClick={openRegisterModal} className='text-red-400 hover:text-red-500'>회원 가입하기</strong></p>
                                </div>
                              </form>
                            </div>

                            {/* divider */}
                            <hr className="mt-2 border-b-1 border-slate-300" />

                            <div className="px-6 py-6 mb-0 rounded-t">
                              <div className="mb-3 text-center">
                                <h6 className="text-sm font-bold text-slate-500">
                                  소셜 로그인
                                </h6>
                              </div>
                              <div className="text-center">
                                <button
                                  className="items-center mb-1 mr-2 text-xs font-bold duration-150 hover:scale-105"
                                >
                                  <Image src={KakaoLoginBtn} />
                                </button>
                              </div>
                            </div>
                            
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              {/* 회원가입 Modal */}
              <Transition className="z-50 overflow-auto" appear show={isRegisterModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeRegisterModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                  </Transition.Child>

                  <div className="fixed inset-0">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md p-6 pt-4 text-left align-middle transition-all transform bg-white shadow-xl lg:max-w-lg rounded-2xl">
                          
                          <div className='flex justify-end'>
                            <XMarkIcon
                              className="w-6 h-6 text-sm text-slate-500 "
                              onClick={closeRegisterModal}
                            />
                          </div>

                          <div className='flex flex-col text-center justify-items-center'>
                            <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
                              <div className="mb-5 text-2xl font-bold text-center text-slate-700">
                                회원가입
                              </div>
                              <form>
                                <div className="relative w-full mb-3">
                                  <label
                                    className="block mb-2 text-xs font-bold uppercase text-slate-600"
                                    htmlFor="grid-password"
                                  >
                                    이름
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                                    placeholder="이름"
                                  />
                                </div>

                                <div className="relative w-full mb-3">
                                  <label
                                    className="block mb-2 text-xs font-bold uppercase text-slate-600"
                                    htmlFor="grid-password"
                                  >
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                                    placeholder="Email"
                                  />
                                </div>

                                <div className="relative w-full mb-5">
                                  <label
                                    className="block mb-2 text-xs font-bold uppercase text-slate-600"
                                    htmlFor="grid-password"
                                  >
                                    비밀번호
                                  </label>
                                  <input
                                    type="password"
                                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                                    placeholder="Password"
                                  />
                                </div>

                                <div className="relative w-full mb-5">
                                  <label
                                    className="block mb-2 text-xs font-bold uppercase text-slate-600"
                                    htmlFor="grid-password"
                                  >
                                    비밀번호 확인
                                  </label>
                                  <input
                                    type="password"
                                    className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                                    placeholder="Password"
                                  />
                                </div>

                                <div className="mt-6 text-center">
                                  <button
                                    className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-slate-800 active:bg-slate-600 hover:shadow-lg focus:outline-none"
                                    type="button"
                                  >
                                    회원가입
                                  </button>
                                </div>
                              </form>
                            </div>

                            <div className="mb-3 text-center">
                              <h6 onClick={() => {closeRegisterModal(); openLoginModal();}} className="text-sm font-bold text-slate-400">
                                로그인 화면으로 돌아가기
                              </h6>
                            </div>
                            
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </>
            :
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost hover:bg-red-300 btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul tabIndex={0} className="w-32 p-2 mt-3 bg-white shadow menu menu-compact dropdown-content rounded-box">
                <li>
                  <a onClick={openProfileModal} className="text-base hover:bg-red-100">내 프로필</a>
                </li>
                <li>
                  <a onClick={logout} className="text-base hover:bg-red-100">로그아웃</a>
                </li>
              </ul>

              {/* 내 프로필 Modal */}
              <Transition className="overflow-auto" appear show={isProfileModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeProfileModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md p-6 pt-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl lg:max-w-lg rounded-2xl">
                          
                          <div className='flex justify-end'>
                            <XMarkIcon
                              className="w-6 h-6 text-sm text-slate-500 "
                              onClick={closeProfileModal}
                            />
                          </div>
                          
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-center text-slate-900"
                          >
                            내 프로필
                          </Dialog.Title>

                          <div className='flex flex-col text-center justify-items-center'>
                            {/* 프로필 사진 */}
                            <div className="justify-center m-5 avatar">
                              <div className="w-32 rounded-full">
                                <img src={user.profile_photo} />
                              </div>
                            </div>

                            {/* 이름 */}
                            <div className='text-3xl font-extrabold text-slate-700'>
                              {user.name}
                            </div>

                            {/* 사용자 ID (이메일) */}
                            <p className="text-sm text-slate-500">
                              {user.login_id}
                            </p>
                            
                            <div className='justify-center '>
                              <button
                                type="button"
                                className="px-3 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md w-fit hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={openEditModal}
                              >
                                개인정보 수정
                              </button>
                            </div>

                            {/* divider */}
                            <div className="my-6 border-b-2"></div> 

                            <div className='w-full'>
                              <div className="grid grid-cols-3">
                                
                                {/* 총 작성한 일기 */}
                                <div className='col-span-3 mb-1 sm:col-span-1'>
                                  <div className="mb-1 text-lg text-slate-600">
                                    총 작성한 일기
                                  </div>
                                  <div className='text-3xl font-bold'>
                                    165개
                                  </div>
                                </div>

                                {/* 최근 일기 */}
                                <div className='col-span-3 sm:col-span-2'>
                                  <div className="mb-1 text-lg text-slate-600">
                                    최근 일기
                                  </div>
                                  <div className='mb-2 text-xl font-semibold'>
                                    {user.recent_diaries[0].date}
                                  </div>
                                  <div className='flex place-content-center'>
                                    <div className='w-1/3 pl-5 text-slate-500'>
                                      {user.recent_diaries[0].emotion}
                                    </div>
                                    <div className='relative flex'>
                                      {user.recent_diaries[0].keywords.map((keyword) => (
                                          <div className="px-2 py-1 mb-1 mr-2 text-xs font-medium w-fit text-slate-500 bg-slate-200 rounded-xl dark:bg-slate-200 dark:text-slate-800 ">
                                              #{keyword}
                                          </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>

              {/* 개인정보 수정 */}
              <Transition className="overflow-auto" appear show={isEditModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeEditModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md p-6 pt-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl lg:max-w-lg rounded-2xl">
                          
                          <div className='flex justify-end'>
                            <XMarkIcon
                              className="w-6 h-6 text-sm text-slate-500 "
                              onClick={closeEditModal}
                            />
                          </div>

                          <div className='flex flex-col text-center justify-items-center'>
                            {/* 프로필 사진 */}
                            <div className="justify-center m-5 avatar">
                              <div className="relative top-0 flex items-start w-32 rounded-full group">
                                <img src={user.profile_photo} />
                                <div onClick={replaceImg} className='absolute top-0 flex items-center justify-center w-full h-full bg-black opacity-0 hover:opacity-50'>
                                  <PencilSquareIcon className='hidden text-white w-7 h-7 group-hover:block'/>
                                </div>
                              </div>
                            </div>

                            {/* <div className='text-3xl font-extrabold text-slate-700'>
                              {user.name}
                            </div> */}

                            {/* <p className="text-sm text-slate-500">
                              {user.login_id}
                            </p> */}
                            
                            <div className='pb-6 sm:px-16'>
                              {/* 사용자 ID (이메일) */}
                              <div className="w-full form-control">
                                <label className="label">
                                  <div className="label-text">사용자 ID</div>
                                </label>
                                <input type="text" placeholder="이름을 입력하세요" value={user.login_id} className="w-full h-10 input input-bordered"  disabled/>
                              </div>
                              
                              {/* 이름 */}
                              <div className="w-full form-control">
                                <label className="label">
                                  <div className="label-text">이름</div>
                                </label>
                                <input type="text" placeholder="이름을 입력하세요" defaultValue={user.name} className="w-full h-10 input input-bordered" />
                              </div>

                              {/* 소셜 로그인일 경우 비밀번호 변경 불가 */}
                              {
                                user.is_social
                                ?
                                <></>
                                :              
                                <div>
                                  <div className="w-full form-control">
                                    <label className="label">
                                      <div className="label-text">현재 비밀번호</div>
                                    </label>
                                    <input type="password" placeholder="현재 비밀번호를 입력하세요" className="w-full h-10 input input-bordered" />
                                  </div>
        
                                  <div className="w-full form-control">
                                    <label className="label">
                                      <div className="label-text">변경할 비밀번호</div>
                                    </label>
                                    <input type="password" placeholder="변경할 비밀번호를 입력하세요" className="w-full h-10 input input-bordered" />
                                  </div>
        
                                  <div className="w-full form-control">
                                    <label className="label">
                                      <div className="label-text">비밀번호 확인</div>
                                    </label>
                                    <input type="password" placeholder="변경할 비밀번호를 다시 입력하세요" className="w-full h-10 input input-bordered" />
                                  </div>
                                </div> 
                                
                              }

                              <button
                                type="button"
                                className="inline-flex justify-center px-3 py-2 mr-2 text-sm font-medium text-red-700 bg-red-200 border border-transparent rounded-md mt-7 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                onClick={closeEditModal}
                              >
                                저장하기
                              </button>

                              <button
                                type="button"
                                className="inline-flex justify-center px-3 py-2 ml-2 text-sm font-medium border border-transparent rounded-md text-slate-700 bg-slate-200 mt-7 hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                                onClick={openProfileModal}
                              >
                                뒤로가기
                              </button>
                            </div>
                            

                            
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
