
import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import KakaoLoginBtn from '../../../public/images/KakaoLogin.png'
import { XMarkIcon } from '@heroicons/react/24/outline';

const Login = () => {
    let [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    let [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
 
    function openLoginModal() { setIsLoginModalOpen(true); setIsRegisterModalOpen(false) }
    function closeLoginModal() { setIsLoginModalOpen(false); setIsRegisterModalOpen(false) }
   
    function openRegisterModal() { setIsRegisterModalOpen(true); setIsLoginModalOpen(false) }
    function closeRegisterModal() { setIsLoginModalOpen(false); setIsRegisterModalOpen(false) }

    return (
      <div>
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
                            className="w-6 h-6 text-sm text-zinc-500 "
                            onClick={closeLoginModal}
                          />
                        </div>

                        <div className='flex flex-col text-center justify-items-center'>
                          <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
                            <div className="mb-5 text-2xl font-bold text-center text-zinc-700">
                              로그인
                            </div>
                            <form>
                              <div className="relative w-full mb-3">
                                <label
                                  className="block mb-2 text-xs font-bold uppercase text-zinc-600"
                                  htmlFor="grid-password"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                  placeholder="Email"
                                />
                              </div>

                              <div className="relative w-full mb-5">
                                <label
                                  className="block mb-2 text-xs font-bold uppercase text-zinc-600"
                                  htmlFor="grid-password"
                                >
                                  Password
                                </label>
                                <input
                                  type="password"
                                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                  placeholder="Password"
                                />
                              </div>
                              <div>
                                <label className="inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="checkbox checkbox-xs" /> 
                                  <div className="ml-2 text-sm font-semibold text-zinc-600">
                                    자동 로그인
                                  </div>
                                </label>
                              </div>

                              <div className="mt-6 text-center">
                                <button
                                  className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-zinc-800 active:bg-zinc-600 hover:shadow-lg focus:outline-none"
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
                          <hr className="mt-2 border-b-1 border-zinc-300" />

                          <div className="px-6 py-6 mb-0 rounded-t">
                            <div className="mb-3 text-center">
                              <h6 className="text-sm font-bold text-zinc-500">
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
                            className="w-6 h-6 text-sm text-zinc-500 "
                            onClick={closeRegisterModal}
                          />
                        </div>

                        <div className='flex flex-col text-center justify-items-center'>
                          <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
                            <div className="mb-5 text-2xl font-bold text-center text-zinc-700">
                              회원가입
                            </div>
                            <form>
                              <div className="relative w-full mb-3">
                                <label
                                  className="block mb-2 text-xs font-bold uppercase text-zinc-600"
                                  htmlFor="grid-password"
                                >
                                  이름
                                </label>
                                <input
                                  type="text"
                                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                  placeholder="이름"
                                />
                              </div>

                              <div className="relative w-full mb-3">
                                <label
                                  className="block mb-2 text-xs font-bold uppercase text-zinc-600"
                                  htmlFor="grid-password"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                  placeholder="Email"
                                />
                              </div>

                              <div className="relative w-full mb-5">
                                <label
                                  className="block mb-2 text-xs font-bold uppercase text-zinc-600"
                                  htmlFor="grid-password"
                                >
                                  비밀번호
                                </label>
                                <input
                                  type="password"
                                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                  placeholder="Password"
                                />
                              </div>

                              <div className="relative w-full mb-5">
                                <label
                                  className="block mb-2 text-xs font-bold uppercase text-zinc-600"
                                  htmlFor="grid-password"
                                >
                                  비밀번호 확인
                                </label>
                                <input
                                  type="password"
                                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                  placeholder="Password"
                                />
                              </div>

                              <div className="mt-6 text-center">
                                <button
                                  className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-zinc-800 active:bg-zinc-600 hover:shadow-lg focus:outline-none"
                                  type="button"
                                >
                                  회원가입
                                </button>
                              </div>
                            </form>
                          </div>

                          <div className="mb-3 text-center">
                            <h6 onClick={() => {closeRegisterModal(); openLoginModal();}} className="text-sm font-bold text-zinc-400">
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
      </div>
    );
  };
  
  export default Login;
  