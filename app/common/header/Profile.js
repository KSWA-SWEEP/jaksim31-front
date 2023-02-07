'use client';

import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useRef } from 'react';
import { useUserInfoQuery } from '../../hooks/queries/useUserInfoQuery';
import Loading from './loading';
import { useQueryClient } from 'react-query';
import { useUserInfoUpdate } from '../../hooks/mutations/useUserInfoUpdate';
import { updatePassword } from '../../api/updatePassword';
import { checkPassword } from '../../api/checkPassword';
import { useLogout } from '../../hooks/mutations/useLogout';
import { uploadImg } from '../../api/uploadImg';
import { getCookie } from 'cookies-next';
import Image from 'next/image';

const Profile = () => {

    let [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    let [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)  

    // 사용자 입력 변수
    const userName = useRef("");
    const userOldPassword = useRef("");
    const userNewPassword = useRef("");
    const userNewPasswordCheck = useRef("");
    const userProfileImage = useRef("");

    // 프로필 이미지 미리보기 URL
    const [userProfileImageURL, setUserProfileImageURL] = useState("");
    // 프로필 이미지 첨부시 확장자 저장을 위한 변수
    const [userProfileImageExtension, setuserProfileImageExtension] = useState("");
    const [isNameEdit, setIsNameEdit] = useState(false);

    // 오류 메시지 변수
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

    // 유효성 검사 변수
    const [isOldPassword, setIsOldPassword] = useState(false)
    const [isNewPassword, setIsNewPassword] = useState(false)
    const [isNewPasswordConfirm, setIsNewPasswordConfirm] = useState(false)

    function openProfileModal() { 
      setIsPasswordModalOpen(false); 
      setIsProfileModalOpen(true);
      setPasswordMessage("");
      setPasswordConfirmMessage("")
      userName.current = "";
      userProfileImage.current = "";
      setUserProfileImageURL("");  
      setIsNameEdit(false);
    }
    
    function closeProfileModal() { setIsProfileModalOpen(false); setIsPasswordModalOpen(false) }
  
    function openPasswordModal() { setIsProfileModalOpen(false); setIsPasswordModalOpen(true) }
    function closePasswordModal() { setIsProfileModalOpen(false); setIsPasswordModalOpen(false) }

    // react-query
    const queryClient = useQueryClient();
    
    // 유저 정보 data fetching을 위한 useQuery
    const { data : userInfoData, isLoading, isFetching, isFetched, isError } = useUserInfoQuery();

    // 유저 정보 수정을 위한 useMutation
    const { mutate: mutateuserInfo } = useUserInfoUpdate(queryClient);

    // 로그아웃을 위한 useMutation
    const { mutate: mutateLogout } = useLogout(queryClient);

    if( isLoading || isFetching ) return <Loading className="flex justify-center"/>
    if ( isError ) {
      userInfoData.profileImage = process.env.NEXT_PUBLIC_DEFAULT_PROFILE;
    }

    userProfileImage.current = userInfoData.profileImage;

    const onNameChange = (e) => {
      userName.current = e.target.value;
    };

    const onOldPasswordChange = (e) => {
      userOldPassword.current = e.target.value;
      setIsOldPassword(true)
    };

    // 비밀번호 검증
    const onNewPasswordChange = (e) => {
      setIsNewPasswordConfirm(false);
      setPasswordConfirmMessage('비밀번호가 달라요. 다시 확인해주세요 😢')

      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
      userNewPassword.current = e.target.value;

      if (!passwordRegex.test(userNewPassword.current)) {
          setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해 주세요 🚨')
          setIsNewPassword(false)
      } else {
          setPasswordMessage('안전한 비밀번호입니다 ✅')
          setIsNewPassword(true)
      }
    };

    const onNewPasswordCheckChange = (e) => {
        userNewPasswordCheck.current = e.target.value;

        if (userNewPassword.current === userNewPasswordCheck.current) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 ✅')
            setIsNewPasswordConfirm(true)
        } else {
            setPasswordConfirmMessage('비밀번호가 달라요. 다시 확인해주세요 😢')
            setIsNewPasswordConfirm(false)
        }
    };
    
    const onProfileImageChange = async (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();

        // 파일 형식이 정해진 이미지 타입이 아닐 경우
        // kic Object Storage에서 resize 가능한 타입만 입력 받음
        if(!(file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif')){
          alert('이미지 형식의 파일만 제출할 수 있습니다!🤔')
        } 
        else {
          if(file != undefined) {
            userProfileImage.current = file;
            reader.readAsDataURL(file);
            
            reader.onloadend = async () => {
              userProfileImage.current = reader.result;
              setUserProfileImageURL(reader.result);          
              setuserProfileImageExtension(e.target.files[0].type);
            };
          }
        }        

    };

    // 이름 편집 아이콘 클릭 시 실행되는 함수
    const onNameEdit = (e) => {
      userName.current = "";
      setIsNameEdit(!isNameEdit);
    };

    async function requestLogout() {

      console.log("로그아웃 버튼 눌림");
      
      mutateLogout();
    }

    // 이미지 url => File blob 변환 함수
    const urlToBlob= async(imgUrl)=> {
        const response = await fetch(imgUrl);
        const blob = await response.blob();
        return blob;
    }
    
    async function requestChangeProfile(){

      if(userProfileImageURL) {
        let profileImageBlob = await urlToBlob(userProfileImageURL);
      
        const fileUpload = await uploadImg(profileImageBlob, "profile", userProfileImageExtension);
          
        // 저장 실패 시
        if (fileUpload.status != 201) {
          alert("프로필 이미지 변경에 실패하였습니다.\n잠시 후 다시 시도해주세요😭");
        } 
        else {
          userProfileImage.current = process.env.NEXT_PUBLIC_KAKAO_FILE_VIEW_URL+"/"+userInfoData.userId+"/profile_r_640x0_100_0_0."+userProfileImageExtension.replace('image/', '');
        }
      }
      
      let data = new Object();
      data.username = userName.current;
      data.profileImage = (userProfileImage.current != undefined ? userProfileImage.current : "");
      
      mutateuserInfo({data});
      
      userName.current = "";
      userProfileImage.current = "";
      // closePasswordModal();
      setIsNameEdit(false);
    };

    async function requestChangePassword(){

      let checkData = new Object();
      let updateData = new Object();
      
      checkData.password = userOldPassword.current;
      updateData.newPassword = userNewPassword.current;
      
      try {
        // 비밀번호 검증 API 호출
        const checkResponse = await checkPassword(checkData, userInfoData.loginId)
        .then(resp => resp.status != 200 ? resp.json() : resp)
        .then(respData => {
          if(respData.errorCode) {
            throw respData.errorMessage
          }
        })

        // 비밀번호 변경 API 호출
        const updateResponse = await updatePassword(updateData, userInfoData.loginId)
        .then(resp => resp.status != 200 ? resp.json() : resp)
        .then(respData => {
          if(respData.errorCode) {
            throw respData.errorMessage
         }
        })
         
        alert("비밀번호가 변경되었습니다 😊");
      } catch(error) {
        console.log(error);
        alert(error)
      } finally {
        // 변수 초기화
        userOldPassword.current = "";
        userNewPassword.current = "";
        userNewPasswordCheck.current = "";
        setIsOldPassword(false);
        setIsNewPassword(false);
        setIsNewPasswordConfirm(false);
        // closePasswordModal();
        setIsPasswordModalOpen(false);
        setIsProfileModalOpen(true);
      }
    };

    return (
      <div>
        <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost hover:bg-red-300 btn-circle avatar" data-testid="profileButton">
                <div className="w-10 rounded-full">
                  <Image 
                    src={userInfoData.profileImage} 
                    width={100}
                    height={100} 
                    alt="프로필 이미지" 
                    sizes="100vw"
                    priority="true"
                    data-testid="profileImageButton"
                    >
                  </Image>
                </div>
              </label>
              <ul tabIndex={0} className="w-32 p-2 mt-3 bg-white shadow menu menu-compact dropdown-content rounded-box">
                <li>
                  <a onClick={openProfileModal} className="text-base hover:bg-red-100" data-testid="myPageButton">내 프로필</a>
                </li>
                <li>
                  <a onClick={requestLogout} className="text-base hover:bg-red-100" data-testid="logoutButton">로그아웃</a>
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
                        <Dialog.Panel className="w-full max-w-md p-6 pt-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl lg:max-w-lg rounded-2xl"data-testid="myPageModal">
                          
                          <div className='flex justify-end'>
                            <XMarkIcon
                              className="w-6 h-6 text-sm text-zinc-500 "
                              onClick={closeProfileModal}
                              data-testid="closeProfileModalButton"
                            />
                          </div>
                          
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-center text-zinc-900"
                          >
                            내 프로필
                          </Dialog.Title>

                          <div className='flex flex-col text-center justify-items-center'>
                            {/* 프로필 사진 */}
                            <div className="justify-center m-5 avatar">
                              <div className="relative top-0 flex items-start w-32 rounded-full group">
                                <Image 
                                  src={userProfileImageURL ? userProfileImageURL : userInfoData.profileImage} 
                                  width={100}
                                  height={100} 
                                  alt="프로필 이미지" 
                                  sizes="100vw"
                                  priority="true"
                                  >
                                  </Image>
                                <div className='absolute top-0 flex items-center justify-center w-full h-full bg-black opacity-0 hover:opacity-50'>
                                  {/* 파일 선택 창 hidden 설정 */}
                                  <input
                                    hidden
                                    type="file" 
                                    onChange={onProfileImageChange} 
                                    id="profileImage" 
                                    ref={userProfileImage}
                                    accept="image/jpeg, image/gif, image/png"
                                    data-testid="profileImageInput"
                                  />

                                  {/* 파일 선택 창 대신 아이콘 사용 */}
                                  {getCookie("isSocial") ? 
                                    <></>
                                    :
                                    <label className="signup-profileImg-label" htmlFor="profileImage">
                                      <PencilSquareIcon data-testid="editProfileImageButton" className='hidden text-white w-7 h-7 group-hover:block'/>
                                    </label>
                                  }
                                </div>
                              </div>
                            </div>
                            <div className='flex items-center justify-center'>
                              {/* 이름 */}
                              {isNameEdit ? 
                                <div className="justify-center w-30 form-control">
                                  <input type="text" placeholder="이름을 입력하세요" defaultValue={userInfoData.username} className="w-full h-10 input input-bordered" onChange={onNameChange}  data-testid="profileNameInput"/>
                                </div>
                                :
                                <div className='text-3xl font-extrabold text-zinc-700'>
                                  {userInfoData.username}
                                </div>
                              }
                              <PencilSquareIcon
                                className="w-8 h-8 pl-2 text-black"
                                onClick={onNameEdit}
                                data-testid="editProfileNameButton"
                              />
                            </div>
                            {/* 사용자 ID (이메일) */}
                            {getCookie("isSocial") ? 
                              <></>
                            :
                              <p className="text-sm text-zinc-500">
                                {userInfoData.loginId}
                              </p>
                            }
                            <div className='flex items-center justify-center'> 
                              <button
                                  type="button"
                                  className="inline-flex justify-center px-3 py-2 mt-4 mr-2 text-sm font-medium text-red-700 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                  onClick={requestChangeProfile}
                                  disabled={userName.current || userProfileImage.current ? false : true}
                                  data-testid="changeProfileInfoButton"
                              >
                                저장하기
                              </button>
                              {/*소셜 로그인 사용자일 경우 비밀번호 변경 불가능*/}
                              {getCookie("isSocial") ? 
                                <></>
                                :
                                <div className='justify-center '>
                                <button
                                  type="button"
                                  className="px-3 py-2 mt-4 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md w-fit hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={openPasswordModal}
                                  data-testid="changePasswordButton"
                                >
                                  비밀번호 변경
                                </button>
                              </div>
                              }
                            </div>

                            {/* divider */}
                            <div className="my-6 border-b-2"></div> 

                            <div className='w-full'>
                              <div className="grid grid-cols-3">
                                
                                {/* 총 작성한 일기 */}
                                <div className='col-span-3 mb-1 ml-10 sm:col-span-1'>
                                  <div className="mb-1 text-lg text-zinc-600">
                                    총 작성한 일기
                                  </div>
                                  <div className='text-3xl font-bold'>
                                    {userInfoData.diaryTotal}
                                  </div>
                                </div>

                                {/* 최근 일기 */}
                                <div className='col-span-3 sm:col-span-2'>
                                  <div className="mb-1 text-lg text-zinc-600">
                                    최근 일기
                                  </div>

                                  {userInfoData.recentDiary.diaryId == null ?
                                    <h4>
                                      작성한 일기가 없습니다.
                                    </h4>
                                    :
                                    <div>
                                      <div className='flex place-content-center'>
                                        <div className='pb-1 text-xl font-semibold'>
                                          {userInfoData.recentDiary.diaryDate}
                                        </div>
                                      </div>
                                      <div className='flex flex-wrap place-content-center'>
                                        <div className='w-1/3 pb-2 text-zinc-500 text-m'>
                                            {userInfoData.recentDiary.emotion}
                                        </div>
                                        <div className='relative flex flex-wrap justify-center'>
                                            {userInfoData.recentDiary.keywords.map((keyword) => (
                                                <div key={keyword} className="px-2 py-1 mb-1 mr-2 text-xs font-medium w-fit text-zinc-500 bg-zinc-200 rounded-xl dark:bg-zinc-200 dark:text-zinc-800 ">
                                                    {keyword == "EXECPTION_NO_KEYWORD" ? <>#키워드 없음</> : <>#{keyword}</>}
                                                </div>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  
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

              {/* 비밀번호 변경 Modal */}
              <Transition className="overflow-auto" appear show={isPasswordModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closePasswordModal}>
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
                        <Dialog.Panel className="w-full max-w-md p-6 pt-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl lg:max-w-lg rounded-2xl" data-testid="changePasswordModal">
                          
                            <div className='flex justify-end'>
                              <XMarkIcon
                                className="w-6 h-6 text-sm text-zinc-500 "
                                onClick={closeProfileModal}
                                data-testid="closePasswordChangeModal"
                              />
                            </div>
                            
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-center text-zinc-900"
                            >
                              비밀번호 변경하기
                            </Dialog.Title>
                          
                          <div className='flex flex-col mt-3 text-center justify-items-center'>          
                              <div>
                                  <div className="w-full form-control">
                                    <label className="label">
                                      <div className="label-text">현재 비밀번호</div>
                                    </label>
                                    <input type="password" placeholder="현재 비밀번호를 입력하세요" className="w-full h-10 input input-bordered" onChange={onOldPasswordChange} data-testid="currentPasswordInput"/>
                                  </div>
          
                                  <div className="w-full form-control">
                                    <label className="label">
                                      <div className="label-text">변경할 비밀번호</div>
                                    </label>
                                    <input type="password" placeholder="변경할 비밀번호를 입력하세요" className="w-full h-10 input input-bordered" onChange={onNewPasswordChange} data-testid="newPasswordInput"/>
                                  </div>
                                  {userNewPassword.current.length > 0 && <span className={`message ${isNewPassword ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{passwordMessage}</span>}
                                  <div className="w-full form-control">
                                    <label className="label">
                                      <div className="label-text">비밀번호 확인</div>
                                    </label>
                                    <input type="password" placeholder="변경할 비밀번호를 다시 입력하세요" className="w-full h-10 input input-bordered" onChange={onNewPasswordCheckChange} data-testid="passwordCheckInput"/>
                                  </div>
                                  {userNewPasswordCheck.current.length > 0 && <span className={`message ${isNewPasswordConfirm ? 'success text-xs text-blue-500' : 'error text-xs text-red-500'}`}>{passwordConfirmMessage}</span>}
                              </div>
                              <button
                                type="button"
                                className="inline-flex justify-center px-3 py-2 text-sm font-medium text-red-700 bg-red-200 border border-transparent rounded-md mt-7 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                onClick={requestChangePassword}
                                disabled={(userOldPassword.current.length == 0 || userNewPassword.current.length == 0 || userNewPasswordCheck.current.length == 0) ? true : !(isOldPassword && isNewPassword && isNewPasswordConfirm)}        
                                data-testid="changePasswordSubmitButton"
                              >
                                변경하기
                              </button>

                              <button
                                type="button"
                                className="inline-flex justify-center px-3 py-2 text-sm font-medium border border-transparent rounded-md text-zinc-700 bg-zinc-200 mt-7 hover:bg-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
                                onClick={openProfileModal}
                                data-testid="backToProfileButton"
                              >
                                뒤로가기
                              </button>
                            </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
      </div>
    );
  };
  
  export default Profile;
  