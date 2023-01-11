'use client';

import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import userData from '../../../public/data/user.json'
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {

    let [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    let [isEditModalOpen, setIsEditModalOpen] = useState(false)  

    function openProfileModal() { setIsEditModalOpen(false); setIsProfileModalOpen(true) }
    function closeProfileModal() { setIsProfileModalOpen(false); setIsEditModalOpen(false) }
  
    function openEditModal() { setIsProfileModalOpen(false); setIsEditModalOpen(true) }
    function closeEditModal() { setIsProfileModalOpen(false); setIsEditModalOpen(false) }

    const user = userData;
    const router = useRouter();
  
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

    return (
      <div>
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
                              className="w-6 h-6 text-sm text-zinc-500 "
                              onClick={closeProfileModal}
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
                              <div className="w-32 rounded-full">
                                <img src={user.profile_photo} />
                              </div>
                            </div>

                            {/* 이름 */}
                            <div className='text-3xl font-extrabold text-zinc-700'>
                              {user.name}
                            </div>

                            {/* 사용자 ID (이메일) */}
                            <p className="text-sm text-zinc-500">
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
                                  <div className="mb-1 text-lg text-zinc-600">
                                    총 작성한 일기
                                  </div>
                                  <div className='text-3xl font-bold'>
                                    165개
                                  </div>
                                </div>

                                {/* 최근 일기 */}
                                <div className='col-span-3 sm:col-span-2'>
                                  <div className="mb-1 text-lg text-zinc-600">
                                    최근 일기
                                  </div>
                                  <div className='mb-2 text-xl font-semibold'>
                                    {user.recent_diaries[0].date}
                                  </div>
                                  <div className='flex place-content-center'>
                                    <div className='w-1/3 pl-5 text-zinc-500'>
                                      {user.recent_diaries[0].emotion}
                                    </div>
                                    <div className='relative flex'>
                                      {user.recent_diaries[0].keywords.map((keyword) => (
                                          <div key={keyword} className="px-2 py-1 mb-1 mr-2 text-xs font-medium w-fit text-zinc-500 bg-zinc-200 rounded-xl dark:bg-zinc-200 dark:text-zinc-800 ">
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

              {/* 개인정보 수정 Modal */}
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
                              className="w-6 h-6 text-sm text-zinc-500 "
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

                            {/* <div className='text-3xl font-extrabold text-zinc-700'>
                              {user.name}
                            </div> */}

                            {/* <p className="text-sm text-zinc-500">
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
                                className="inline-flex justify-center px-3 py-2 ml-2 text-sm font-medium border border-transparent rounded-md text-zinc-700 bg-zinc-200 mt-7 hover:bg-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
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
      </div>
    );
  };
  
  export default Profile;
  