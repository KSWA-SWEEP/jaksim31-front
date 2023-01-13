
import { Fragment, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import KakaoLoginBtn from '../../../public/images/KakaoLogin.png'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const Login = () => {
    let [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    let [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
 
    function openLoginModal() { setIsLoginModalOpen(true); setIsRegisterModalOpen(false); setEmailMessage("") }
    function closeLoginModal() { setIsLoginModalOpen(false); setIsRegisterModalOpen(false) }
   
    function openRegisterModal() { setIsRegisterModalOpen(true); setIsLoginModalOpen(false), setEmailMessage(""), setPasswordMessage(""), setPasswordConfirmMessage(""), setCheckAuthMessage(""), setAuthMessage("")}
    function closeRegisterModal() { setIsLoginModalOpen(false); setIsRegisterModalOpen(false), setIsEmail(false) }
    
    const router = useRouter();

    // 사용자 입력 변수
    const userName = useRef("");
    const userEmail = useRef("");
    const userPassword = useRef("");
    const userPasswordCheck = useRef("");

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
    
    const onNameChange = (e) => {
      userName.current = e.target.value;
    };

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
      console.log("======= Login Request");
      const data = new Object();
      console.log("userEmail : " + userEmail.current);
      console.log("userPassword : " + userPassword.current);
      data.loginId = userEmail.current;
      data.password = userPassword.current;
      
      const requestLoginBody = {
          loginId: userEmail.current,
          password: userPassword.current
      }
      
      try{
          const responseLogin = await fetch('/api//v0/members/login', {
              method: 'POST',
              body: JSON.stringify(requestLoginBody),
              headers: {
                  'Content-type': 'application/json',
              }
          });

          /*
          * TODO: accessToken / 로그인 상태 / 만료 시간 저장 기능
          
          const responseData = await responseLogin.json();
          let responseDataJson = JSON.parse(responseData);

          //recoil에 accessToken 저장
          setAcctoken(responseDataJson.accessToken);
          
          //로그인 상태와 만료 시간 sessionStorage에 저장
          sessionStorage.setItem("isLogin","true")
          sessionStorage.setItem("expTime",responseDataJson.expTime)

          */

          router.push('/diary/dashboard');
          return;
      }catch(e){
          console.log(e);
          alert("로그인에 실패했습니다. 다시 시도해 주세요.");
      }
  }

    async function requestSignup(){

      console.log("회원가입 버튼 눌림");

      if(!userName.current){
          alert("이름을 입력해 주세요 😮");
          return;
      }

      //회원가입 api 호출
      console.log("======= SignUp Request");
      const data = new Object();
      console.log("userEmail : " + userEmail.current);
      console.log("userPassword : " + userPassword.current);
      console.log("userName : " + userName.current);
      data.loginId = userEmail.current;
      data.password = userPassword.current;
      data.username = userName.current;

      const requestSignupBody = {
          loginId: userEmail.current,
          password: userPassword.current,
          username: userName.current
      }
      
      try{
          const responseSignup = await fetch('/api/v0/members/register', {
              method: 'POST',
              body: JSON.stringify(requestSignupBody),
              headers: {
                  'Content-type': 'application/json',
              }
          });
          //check
          // console.log("Result : " + JSON.stringify(responseSignup));
          // console.log("User email : "+ response["email"]);
          
          alert("회원가입이 완료되었습니다 😊");
          openLoginModal();
      } catch (e) {
          console.log(e);
          alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
      }
    };

    const sendAuthMail =()=>{

      /*
      * TODO: API 확정되면 이메일 인증 구현 예정
      * 
      * 현재 입력한 이메일에 대한 계정 존재 여부 확인 X
      * 인증번호 이메일 전송 기능 X
      * 단순 인증번호만 생성 O
      */
      
      //인증 중
      console.log("메일인증")
      // 인증번호 test 코드
      console.log("============== "+randNum.current)
      setIsAuthIng(true)
      setCheckAuthMessage("메일을 전송하였습니다. 확인 후 인증번호를 입력해 주세요.");
     
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
                          <div className="flex-auto px-4 py-4 pt-2 lg:px-10">
                            <div className="mb-5 text-2xl font-bold text-center text-zinc-700">
                              로그인
                            </div>
                            <form>
                              <div className="relative w-full mb-3">
                                <div class="grid grid-cols-7 gap-1">
                                  <div class="col-span-2">
                                    <label
                                      className="block mb-2 pt-2 text-m font-bold uppercase text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      이메일
                                    </label>
                                  </div>
                                  <div class="col-span-5">
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
                                <div class="grid grid-cols-7 gap-1">  
                                  <div class="col-span-2">
                                    <label
                                      className="block mb-2 pt-2 text-m font-bold uppercase text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      비밀번호
                                    </label>
                                  </div>
                                  <div class="col-span-5">
                                    <input
                                      type="password"
                                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                      placeholder="Password"
                                      onChange={onPasswordChange}
                                    />
                                  </div>
                                </div>
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
                                  onClick={requestLogin}
                                  disabled={!isEmail}
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
                                <div class="grid grid-cols-7 gap-1">
                                  <div class="col-span-2">
                                    <label
                                      className="block mb-2 pt-2 text-m font-bold uppercase text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      이름
                                    </label>
                                  </div>
                                  <div class="col-span-5">
                                    <input
                                      type="text"
                                      className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-zinc-300 text-zinc-600 focus:outline-none focus:ring"
                                      placeholder="Name"
                                      onChange={onNameChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="relative w-full mb-3">
                                <div class="grid grid-cols-7 gap-1">
                                  <div class="col-span-2">
                                    <label
                                      className="block mb-2 pt-2 text-m font-bold uppercase text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      이메일
                                    </label>
                                  </div>
                                  <div class="col-span-5">
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
                                <div class="grid grid-cols-7 gap-1">
                                  <div class="col-span-2">
                                    <label
                                      className="block mb-2 pt-2 text-m font-bold uppercase text-zinc-600"
                                      htmlFor="grid-verify"
                                    >
                                      인증번호
                                    </label>
                                  </div>
                                  <div class="col-span-5">
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
                                <div class="grid grid-cols-7 gap-1">
                                  <div class="col-span-2">
                                    <label
                                      className="block mb-2 pt-2 text-m font-bold uppercase text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      비밀번호
                                    </label>
                                  </div>
                                  <div class="col-span-5">
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
                                <div class="grid grid-cols-7 gap-1">
                                  <div class="col-span-2">
                                    <label
                                      className="block mb-2 pt-2 text-m font-bold uppercase text-zinc-600"
                                      htmlFor="grid-password"
                                    >
                                      비밀번호 확인
                                    </label>
                                  </div>
                                  <div class="col-span-5">
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
                                  onClick={requestSignup}
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
  