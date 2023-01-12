
import { Fragment, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import KakaoLoginBtn from '../../../public/images/KakaoLogin.png'
import { XMarkIcon } from '@heroicons/react/24/outline';

const Login = () => {
    let [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    let [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
 
    function openLoginModal() { setIsLoginModalOpen(true); setIsRegisterModalOpen(false); setEmailMessage("") }
    function closeLoginModal() { setIsLoginModalOpen(false); setIsRegisterModalOpen(false) }
   
    function openRegisterModal() { setIsRegisterModalOpen(true); setIsLoginModalOpen(false), setEmailMessage(""), setPasswordMessage(""), setPasswordConfirmMessage("")}
    function closeRegisterModal() { setIsLoginModalOpen(false); setIsRegisterModalOpen(false) }
    
    // 사용자 입력 변수
    const userName = useRef("");
    const userEmail = useRef("");
    const userPw = useRef("");
    const userPwChk = useRef("");

    // 메일 인증 변수
    const userAuth = useRef(""); // 인증번호 입력값
    const [authMessage, setAuthMessage] = useState('') // 인증번호 오류 메세지
    const [isAuthConfirm, setIsAuthConfirm] = useState(false) // 인증 번호가 일치하는지 확인
    let randNum = useRef("00000"); // 인증번호
    let [isAuthIng, setIsAuthIng] = useState(false) // 메일 인증 중인지 확인

    // 오류 메시지 변수
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

    // 유효성 검사 변수
    const [isEmail, setIsEmail] = useState(false)
    const [isPassword, setIsPassword] = useState(false)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

    // 이메일 검증
    const onEmailChange = (e) => {
      const emailRegex =
          /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      userEmail.current = e.target.value;
      // console.log("Email : "+userEmail.current);

      if (!emailRegex.test(userEmail.current)) {
          setEmailMessage('이메일 형식이 틀렸습니다. 다시 확인해 주세요😢')
          setIsEmail(false)
          // 메일 변경 시 인증번호 창 다시 막고, 인증 다시하도록 인증 관련 변수 초기화
          setIsAuthConfirm(false)
          setAuthMessage('인증 번호가 틀렸습니다. 다시 확인해 주세요😢')
          setIsAuthIng(false)
      } else {
          setEmailMessage('올바른 이메일 형식입니다✅')
          //인증번호 발급
          randNum.current = parseInt(Math.random() * 100000 + "");
          setIsEmail(true)
      }
    };
  
    // 비밀번호 검증
    const onPwChange = (e) => {
      setIsPasswordConfirm(false);
      setPasswordConfirmMessage('비밀번호가 달라요. 다시 확인해주세요😢')

      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
      userPw.current = e.target.value;
      // console.log("userPw : "+userPw.current);
      if (!passwordRegex.test(userPw.current)) {
          setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해 주세요🚨')
          setIsPassword(false)
      } else {
          setPasswordMessage('안전한 비밀번호입니다✅')
          setIsPassword(true)
      }
    };
    const onPwChkChange = (e) => {
        userPwChk.current = e.target.value;
        // console.log("userPwChk : "+userPwChk.current);
        if (userPw.current === userPwChk.current) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요✅')
            setIsPasswordConfirm(true)
        } else {
            setPasswordConfirmMessage('비밀번호가 달라요. 다시 확인해주세요😢')
            setIsPasswordConfirm(false)
        }
    };

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
                                  이메일
                                </label>
                                <input
                                  type="email"
                                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                  placeholder="Email"
                                  onChange={onEmailChange}
                                />
                                {userEmail.current.length > 0 && <span className={`message ${isEmail ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{emailMessage}</span>}
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
                                  placeholder="Name"
                                />
                              </div>

                              <div className="relative w-full mb-3">
                                <label
                                  className="block mb-2 text-xs font-bold uppercase text-zinc-600"
                                  htmlFor="grid-password"
                                >
                                  이메일
                                </label>
                                <input
                                  type="email"
                                  className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                  placeholder="Email"
                                  onChange={onEmailChange}
                                />
                                {userEmail.current.length > 0 && <span className={`message ${isEmail ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{emailMessage}</span>}
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
                                  onChange={onPwChange}
                                />
                              </div>
                              {userPw.current.length > 0 && <span className={`message ${isPassword ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{passwordMessage}</span>}
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
                                  onChange={onPwChkChange}
                                />
                              </div>
                                {userPwChk.current.length > 0 && <span className={`message ${isPasswordConfirm ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{passwordConfirmMessage}</span>}
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
  