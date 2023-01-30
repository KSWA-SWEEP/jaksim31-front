'use client';

import { Fragment, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import KakaoLoginBtn from '../../../public/images/KakaoLogin.png'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { init, send } from 'emailjs-com';
import { updatePassword } from "../../api/updatePassword";
import { checkIsMember } from "../../api/checkIsMember";
import { signUp } from "../../api/signUp";
import { useQueryClient } from "react-query";
import { useLogin } from "../../hooks/mutations/useLogin";

const Login = () => {
    let [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    let [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
    let [isEmailCheckModalOpen, setIsEmailCheckModalOpen] = useState(false)
 
    function openLoginModal() { setIsLoginModalOpen(true); setIsSignupModalOpen(false); setIsEmailCheckModalOpen(false); setEmailMessage(""), setIsChangePasswordModal(false) }
    function closeLoginModal() { setIsLoginModalOpen(false); setIsSignupModalOpen(false) }
   
    function openSignupModal() { setIsSignupModalOpen(true); setIsLoginModalOpen(false), setIsEmailCheckModalOpen(false); setEmailMessage(""), setPasswordMessage(""), setPasswordConfirmMessage(""), setCheckAuthMessage(""), setAuthMessage("")}
    function closeSignupModal() { setIsLoginModalOpen(false); setIsSignupModalOpen(false), setIsEmail(false), setIsChangePasswordModal(false) }

    function openEmailCheckModal() { setIsEmailCheckModalOpen(true); setIsLoginModalOpen(false); setEmailMessage("") }
    function closeEmailCheckModal() { setIsEmailCheckModalOpen(false); setIsLoginModalOpen(true); setEmailMessage("") }
    
    const router = useRouter();
    const [isChangePasswordMoal, setIsChangePasswordModal] = useState("false");   // 회원가입과 비밀번호 재설정 모달 구분을 위한 변수

    // 사용자 입력 변수
    const userName = useRef("");
    const userEmail = useRef("");
    const userPassword = useRef("");
    const userPasswordCheck = useRef(""); 

    // 카카오 인증 창으로 넘어가는 URL 설정
    const NEXT_PUBLIC_KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
    const NEXT_PUBLIC_KAKAO_REDIRECT_URL = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL
    const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize?client_id="+NEXT_PUBLIC_KAKAO_CLIENT_ID+"&redirect_uri="+NEXT_PUBLIC_KAKAO_REDIRECT_URL+"&response_type=code";

    // 메일 인증 변수
    const userAuth = useRef(""); // 인증번호 입력값
    const [authMessage, setAuthMessage] = useState('') // 인증번호 오류 메세지
    const [checkAuthMessage, setCheckAuthMessage] = useState('') // 인증번호 확인 요청 메시지
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
    
    // react-query
    const queryClient = useQueryClient();

    // 로그인을 위한 useMutation
    const { mutate: mutateLogin, isSuccess: isSuccessLogin, data: dataLogin } = useLogin(queryClient);

    useEffect(()=> {
      // 로그인 성공 시 대시보드로 이동
      if(isSuccessLogin) {
        if(isLoginModalOpen) isLoginModalOpen = false;
        setIsLoginModalOpen(false);
        window.location.href = "/diary/dashboard";
      }
    }, [dataLogin])

    const onNameChange = (e) => {
      userName.current = e.target.value;
    };

    async function kakaologin (){
      window.location.href = KAKAO_AUTH_URL;
    }

    // 이메일 검증
    const onEmailChange = (e) => {
      const emailRegex =
          /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      userEmail.current = e.target.value;
      // console.log("Email : "+userEmail.current);

      if (!emailRegex.test(userEmail.current)) {
          setEmailMessage('이메일 형식이 틀렸습니다. 다시 확인해 주세요 😢')
          setIsEmail(false)
          // 메일 변경 시 인증번호 창 다시 막고, 인증 다시하도록 인증 관련 변수 초기화
          setIsAuthConfirm(false)
          setAuthMessage('')
          setIsAuthIng(false)
          setCheckAuthMessage('');
      } else {
          setEmailMessage('올바른 이메일 형식입니다 ✅')
          //인증번호 발급
          randNum.current = parseInt(Math.random() * 100000 + "");
          setIsEmail(true)
      }
    };

    const onAuthChange = (e) => {
      userAuth.current = e.target.value;
      // console.log("인증번호##" + randNum.current)

      if (randNum.current != userAuth.current) {
          setAuthMessage('인증 번호가 틀렸습니다. 다시 확인해 주세요 😢')
          setIsAuthConfirm(false)
      } else {
          setAuthMessage('인증 번호가 확인되었습니다 ✅')
          setIsAuthConfirm(true)
      }
    };
  
    // 비밀번호 검증
    const onPasswordChange = (e) => {
      setIsPasswordConfirm(false);
      setPasswordConfirmMessage('비밀번호가 달라요. 다시 확인해주세요 😢')

      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
      userPassword.current = e.target.value;
      // console.log("userPassword : "+userPassword.current);
      if (!passwordRegex.test(userPassword.current)) {
          setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해 주세요 🚨')
          setIsPassword(false)
      } else {
          setPasswordMessage('안전한 비밀번호입니다 ✅')
          setIsPassword(true)
      }
    };

    const onPasswordCheckChange = (e) => {
        userPasswordCheck.current = e.target.value;
        // console.log("userPasswordCheck : "+userPasswordCheck.current);
        if (userPassword.current === userPasswordCheck.current) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 ✅')
            setIsPasswordConfirm(true)
        } else {
            setPasswordConfirmMessage('비밀번호가 달라요. 다시 확인해주세요 😢')
            setIsPasswordConfirm(false)
        }
    };

    async function requestLogin(){
      
      console.log("로그인 버튼 눌림");

      if(!userPassword.current) {
        alert("비밀번호를 입력해 주세요 😮");
        return;
      }

      //로그인 api 호출
      let data = new Object();
      data.loginId = userEmail.current;
      data.password = userPassword.current;
      
      mutateLogin({data});
    }
    
    async function requestIsMember(){

      let data = new Object();
      data.loginId = userEmail.current;
      
      return checkIsMember(data);
    }

    async function requestSignup(){

      console.log("회원가입 버튼 눌림");

      if(!userName.current){
          alert("이름을 입력해 주세요 😮");
          return;
      }

      //회원가입 api 호출
      const data = new Object();
      data.loginId = userEmail.current;
      data.password = userPassword.current;
      data.username = userName.current;
      // TODO: default 프로필 이미지 object storage에 올리기
      data.profileImage = "https://source.unsplash.com/random/?user";

      try{
          signUp(data);
          alert("회원가입이 완료되었습니다 😊");
          openLoginModal();
      } catch (e) {
          console.log(e);
          alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
      }
    };

    async function requestChangePassword(){

      let data = new Object();
      data.newPassword = userPassword.current;

      try{
          updatePassword(data, userEmail.current);
          alert("비밀번호가 변경되었습니다 😊");
          openLoginModal();
      } catch (e) {
          console.log(e);
          alert("비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.");
      }
    };

    const sendAuthMail =()=>{

      // 인증메일 전송 전, 회원 여부 검증 API 호출
      requestIsMember().then(resp => {

        // 비밀번호 재설정일 경우 회원이 존재해야 하는 경우와
        // 회원가입일 경우 회원이 존재하지 않는 경우
        if((isChangePasswordMoal && resp.status == 200) || (!isChangePasswordMoal && resp.status == 404)) {
          
          setIsAuthIng(true);

          // 인증메일 전송
          send("service_xefuilp", "template_flcknvq", {
            message: "인증번호는 " + randNum.current + " 입니다.",
            user_email: userEmail.current,
          },"cPndipwNGrbp1LMBT").then(resp => {});

          console.log("전송한 인증번호: "+randNum.current)
          setIsAuthIng(true)
          setCheckAuthMessage("메일을 전송하였습니다. 확인 후 인증번호를 입력해 주세요.");
        }
        else if(!isChangePasswordMoal && resp.status == 200) {  // 회원가입일 경우 이미 회원이 존재하는 경우
          console.log(resp);
          alert("이미 가입된 계정입니다.");
        }
        else if(isChangePasswordMoal && resp.status == 404) {  // 비밀번호 재설정일 경우 회원이 존재하지 않는 경우
          console.log(resp);
          alert("찾을 수 없는 계정입니다. 회원 정보를 확인해 주세요.");
        }
      });
    };

    const checkEmail = () => {
      requestIsMember().then(resp => {

        if(resp.status == 200) {  // 응답코드가 200인 경우, 계정 존재
          alert("가입된 계정입니다. 로그인 해주세요.");
        }
        else {  // 응답코드가 404인 경우, 계정 없음
          alert("찾을 수 없는 계정입니다. 회원가입 해주세요.");
        }
      });
    }

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
                          <div className="flex-auto px-4 py-4 pt-2 lg:px-10">
                            <div className="mb-5 text-2xl font-bold text-center text-zinc-700">
                              로그인
                            </div>
                            <form>
                              <div className="relative w-full mb-3">
                                <div className="grid grid-cols-7 gap-1">
                                  <div className="col-span-2">
                                    <label
                                      className="block pt-2 mb-2 font-bold uppercase text-m text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      이메일
                                    </label>
                                  </div>
                                  <div className="col-span-5">
                                    <input
                                      type="email"
                                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                      placeholder="Email"
                                      onChange={onEmailChange}
                                    />
                                    {userEmail.current.length > 0 && <span className={`message ${isEmail ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{emailMessage}</span>}
                                  </div>
                                </div>
                              </div>

                              <div className="relative w-full mb-5">
                                <div className="grid grid-cols-7 gap-1">  
                                  <div className="col-span-2">
                                    <label
                                      className="block pt-2 mb-2 font-bold uppercase text-m text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      비밀번호
                                    </label>
                                  </div>
                                  <div className="col-span-5">
                                    <input
                                      type="password"
                                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                      placeholder="Password"
                                      onChange={onPasswordChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6 text-center">
                                <button
                                  className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-zinc-800 active:bg-zinc-600 hover:shadow-lg focus:outline-none"
                                  type="button"
                                  onClick={requestLogin}
                                  disabled={!isEmail}
                                >
                                  로그인
                                </button>
                              </div>

                              <div className="relative w-full mt-1 mb-1">
                                <div className="grid grid-cols-2 gap-1">
                                  <div className="grid justify-start">
                                    <strong onClick={openEmailCheckModal} className="text-sm hover:text-gray-500">이메일 조회</strong>
                                  </div>
                                  <div className="grid justify-end">
                                    <strong onClick={() => {setIsChangePasswordModal(true); openSignupModal();}} className="text-sm hover:text-gray-500">비밀번호 재설정</strong>
                                  </div>
                                </div>
                              </div>

                              <div className="relative w-full mt-4 mb-2">
                                <p>회원이 아니신가요? <strong onClick={openSignupModal} className='text-red-400 hover:text-red-500'>회원 가입하기</strong></p>
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
                                <button onClick={kakaologin}>
                                  <Image src ={KakaoLoginBtn}></Image>
                                </button>
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

            {/* 이메일 조회 Modal */}
            <Transition className="z-50 overflow-auto" appear show={isEmailCheckModalOpen} as={Fragment}>
              <Dialog as="div" className="relative" onClose={closeEmailCheckModal}>
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
                            onClick={closeEmailCheckModal}
                          />
                        </div>

                        <div className='flex flex-col text-center justify-items-center'>
                          <div className="flex-auto px-4 py-4 pt-2 lg:px-10">
                            <div className="mb-5 text-2xl font-bold text-center text-zinc-700">
                              이메일 조회
                            </div>
                            <form>
                              <div className="relative w-full mb-3">
                                <div className="grid grid-cols-7 gap-1">
                                  <div className="col-span-2">
                                    <label
                                      className="block pt-2 mb-2 font-bold uppercase text-m text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      이메일
                                    </label>
                                  </div>
                                  <div className="col-span-5">
                                    <input
                                      type="email"
                                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                      placeholder="Email"
                                      onChange={onEmailChange}
                                    />
                                    {userEmail.current.length > 0 && <span className={`message ${isEmail ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{emailMessage}</span>}
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6 text-center">
                                <button
                                  className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-zinc-800 active:bg-zinc-600 hover:shadow-lg focus:outline-none"
                                  type="button"
                                  onClick={checkEmail}
                                  disabled={!isEmail}
                                >
                                  조회하기
                                </button>
                              </div>

                              <div className="relative w-full mt-4 mb-2">
                                <p>회원이 아니신가요?  <strong onClick={openSignupModal} className='text-red-400 hover:text-red-500'>회원 가입하기</strong></p>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

            {/* 회원가입 & 비밀번호 재설정 Modal */}
            <Transition className="z-50 overflow-auto" appear show={isSignupModalOpen} as={Fragment}>
              <Dialog as="div" className="relative z-50" onClose={closeSignupModal}>
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
                            onClick={closeSignupModal}
                          />
                        </div>

                        <div className='flex flex-col text-center justify-items-center'>
                          <div className="flex-auto px-4 py-10 pt-2 lg:px-10">
                            <div className="mb-5 text-2xl font-bold text-center text-zinc-700">
                              {isChangePasswordMoal ? <>비밀번호 재설정</> : <>회원가입</>}
                            </div>
                            <form>
                              {isChangePasswordMoal ?
                              // 비밀번호 재설정 모달일 경우, 이름 입력란 없음
                                <></>
                              :
                              // 회원가입 모달일 경우, 이름 입력란 있음
                                <div className="relative w-full mb-3">
                                  <div className="grid grid-cols-7 gap-1">
                                    <div className="col-span-2">
                                      <label
                                        className="block pt-2 mb-2 font-bold uppercase text-m text-zinc-600"
                                        htmlFor="grid-password"
                                      >
                                        이름
                                      </label>
                                    </div>
                                    <div className="col-span-5">
                                      <input
                                        type="text"
                                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                        placeholder="Name"
                                        onChange={onNameChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              }

                              <div className="relative w-full mb-3">
                                <div className="grid grid-cols-7 gap-1">
                                  <div className="col-span-2">
                                    <label
                                      className="block pt-2 mb-2 font-bold uppercase text-m text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      이메일
                                    </label>
                                  </div>
                                  <div className="col-span-5">
                                    <input
                                      type="email"
                                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                      placeholder="Email"
                                      onChange={onEmailChange}
                                    />
                                  </div>
                                </div>
                                {userEmail.current.length > 0 && <span className={`message ${isEmail ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{emailMessage}</span>}
                              </div>

                              <div className="mt-3 mb-3 text-center">
                                <button
                                  className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-rose-400 active:bg-zinc-600 hover:shadow-lg focus:outline-none"
                                  type="button"
                                  onClick={sendAuthMail}
                                  disabled={!(isEmail)}
                                >
                                  인증메일 전송
                                </button>
                                {(<span className="text-xs text-blue-500">{checkAuthMessage}</span>)}
                              </div>

                              <div className="relative w-full mb-3">
                                <div className="grid grid-cols-7 gap-1">
                                  <div className="col-span-2">
                                    <label
                                      className="block pt-2 mb-2 font-bold uppercase text-m text-zinc-600"
                                      htmlFor="grid-verify"
                                    >
                                      인증번호
                                    </label>
                                  </div>
                                  <div className="col-span-5">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                      placeholder="인증번호를 입력하세요"
                                      disabled={!(isAuthIng)}
                                      onChange={onAuthChange}
                                    />
                                  </div>
                                </div>
                                {userAuth.current.length > 0 && <span className={`message ${isAuthConfirm ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{authMessage}</span>}
                              </div>

                              <div className="relative w-full mb-5">
                                <div className="grid grid-cols-7 gap-1">
                                  <div className="col-span-2">
                                    <label
                                      className="block pt-2 mb-2 font-bold uppercase text-m text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      비밀번호
                                    </label>
                                  </div>
                                  <div className="col-span-5">
                                    <input
                                      type="password"
                                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                      placeholder="Password"
                                      onChange={onPasswordChange}
                                    />
                                  </div>
                                </div>
                                {userPassword.current.length > 0 && <span className={`message ${isPassword ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{passwordMessage}</span>}
                              </div>
                              
                              <div className="relative w-full mb-5">
                                <div className="grid grid-cols-7 gap-1">
                                  <div className="col-span-2">
                                    <label
                                      className="block pt-2 mb-2 font-bold uppercase text-m text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      비밀번호 확인
                                    </label>
                                  </div>
                                  <div className="col-span-5">
                                    <input
                                      type="password"
                                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                      placeholder="Password"
                                      onChange={onPasswordCheckChange}
                                    />
                                  </div>
                                </div>
                                {userPasswordCheck.current.length > 0 && <span className={`message ${isPasswordConfirm ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{passwordConfirmMessage}</span>}
                              </div>
                              
                              <div className="mt-6 text-center">
                                <button
                                  className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-zinc-800 active:bg-zinc-600 hover:shadow-lg focus:outline-none"
                                  type="button"
                                  disabled={!(isEmail && isPassword && isPasswordConfirm && isAuthConfirm)}
                                  onClick={isChangePasswordMoal ? requestChangePassword : requestSignup}
                                >
                                  {isChangePasswordMoal ? <>비밀번호 변경하기</> : <>회원가입</>}
                                </button>
                              </div>
                            </form>
                          </div>

                          <div className="mb-3 text-center">
                            <h6 onClick={() => {closeSignupModal(); openLoginModal();}} className="text-sm font-bold text-zinc-400">
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
  