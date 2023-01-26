'use client';

import Link from "next/link"
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Dialog, Menu, Transition } from "@headlessui/react"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image";
import moment from "moment";
import Loading from "./loading";
import Error from "./error";
import Pagination from "react-js-pagination";
import './Pagination.css'
import { useQueryClient } from "react-query";
import { useDiaryDelete } from "../../../hooks/mutations/useDiaryDelete";
import { useRouter } from "next/navigation";
import { useUserInfoQuery } from "../../../hooks/queries/useUserInfoQuery";
import { useDiaryListPageQuery } from "../../../hooks/queries/useDiaryListPageQuery";

// 진행중 일기 세부 메뉴
const diaryMenu = [
  { name: '일기 수정', href: 'diary/' },
  { name: '일기 삭제', href: 'deleteDiary' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
  
export default function DiaryGridList(props) {
    const [page, setPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const diaryToDelete = useRef();
    
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [page])
    
    const router = useRouter();

    const { data: userData } = useUserInfoQuery(props.userInfo);

    // react-query
    const queryClient = useQueryClient();

    // diary data 삭제를 위한 useMutation
    const { status, mutate } = useDiaryDelete(diaryToDelete.current, queryClient)
    
    // 로그인시 가져온 userId (db의 objectId) 를 쿠키 or Local Storage로부터 가져와서 넣어주기
    // 지금은 test 용 하나의 userId 하드코딩으로 넣어줌..
    // page 값을 그냥 넣어주게 되면 Number로 인식되어 모든 빈 값이 들어가는 상황 발생 => string 으로 변환하여 보내줌
    const { data : diaryListData, isLoading, isFetching, isSuccess, isFetched, isError } = useDiaryListPageQuery((page-1).toString(), 6)
    
    if ( isLoading ) return <Loading className="flex justify-center"/>
 
    if ( isError ) return <Error className="flex justify-center"/>
    
    let diarys = diaryListData.content;
    
    const handlePageChange = (page) => {
        setPage(page);
    };
    
    function deleteDiary() {
        mutate()
        closeDeleteModal()
        openSuccessModal()
    }
    
    function openDeleteModal(diaryId) { diaryToDelete.current = diaryId; setIsDeleteModalOpen(true) }
    function closeDeleteModal() { setIsDeleteModalOpen(false) }
  
    function openSuccessModal() { setIsSuccessModalOpen(true) }
    function closeSuccessModal() { setIsSuccessModalOpen(false) }
    return (
        <div className="bg-white">
            <div className="px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:px-8 lg:py-3">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 2xl:grid-cols-3">
                    {diarys.map((diary) => (
                        <div key={diary.diaryId} className="rounded-2xl bg-zinc-200/50">
                            <div className="w-full overflow-hidden rounded-t-lg bg-zinc-200 aspect-w-4 aspect-h-3 xl:aspect-w-4 xl:aspect-h-3">
                                    <Link
                                        href={{
                                            pathname: 'diary/'+diary.diaryId
                                            }} 
                                        className="relative flex items-center justify-center w-full group"
                                        >
                                        <div className="absolute hidden text-3xl font-extrabold group-hover:block">
                                            {diary.emotion}
                                        </div>
                                        <div className="relative object-cover object-center aspect-[4/3] w-full overflow-hidden">
                                            <Image
                                                src={diary.thumbnail}
                                                alt={diary.emotion}
                                                placeholder="empty"
                                                fill
                                                className="object-cover duration-200 hover:opacity-20 hover:scale-105"
                                            />
                                        </div>
                                    </Link>
                            </div>
                            <div className="flex justify-between mx-4 mt-5 mb-2">
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <p className="ml-2 text-lg font-bold truncate text-zinc-900">{moment(diary.diaryDate).format('YYYY. MM. DD.')}</p>
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="flex max-w-xs text-sm focus:outline-none">
                                                    <EllipsisVerticalIcon className="block w-6 h-6"/>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                            <Menu.Items className="absolute right-0 z-10 py-1 mt-2 mb-10 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {diaryMenu.map((item) => (
                                                    <Menu.Item key={item.name}>                                             
                                                        {
                                                            item.href.includes('/')
                                                                ?
                                                                ({ active }) => (
                                                                    <Link
                                                                        href={item.href + diary.diaryId + '/modify'}                                                            >
                                                                        <div className={classNames(
                                                                            active ? 'bg-zinc-100' : '',
                                                                            'block px-4 py-2 text-sm text-zinc-700 border-b-2 border-gray-100'
                                                                        )}>
                                                                            {item.name}
                                                                        </div>
                                                                    </Link>
                                                                )
                                                                :
                                                                <a
                                                                    onClick={() =>openDeleteModal(diary.diaryId)}
                                                                    className='block px-4 py-2 text-sm border-b-2 text-zinc-700 border-zinc-100 hover:bg-zinc-100 '
                                                                >
                                                                    {item.name}
                                                                </a>
                                                        }
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                    <div className="flex flex-wrap mt-2">
                                        {diary.keywords.map((keyword) => (
                                            <div key={keyword} className="px-3 mb-2 py-1 mr-2.5 text-sm font-medium text-zinc-500 bg-zinc-200 rounded-xl dark:bg-zinc-200 dark:text-zinc-800 hover:scale-105 hover:bg-zinc-300 hover:text-zinc-600 duration-200">
                                                #{keyword}
                                            </div>
                                        ))}
                                        
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
                </div>

                {/* pagination */}
                <div className="flex justify-center">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={6}
                        totalItemsCount={Number(userData.diaryTotal)}
                        pageRangeDisplayed={5}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={handlePageChange}
                    />  
                </div>

                
                {/* 일기 삭제 modal */}
                <Transition appear show={isDeleteModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-base font-extrabold leading-6 text-zinc-900"
                            >
                                일기 삭제
                            </Dialog.Title>
                            <div className="mt-3">
                                <p className="text-lg text-zinc-500">
                                일기을 삭제하시겠습니까?
                                </p>
                                <p className="mt-1 text-base text-red-500">
                                🚨 삭제한 일기는 다시 복구할 수 없습니다.
                                </p>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className="justify-center px-2 py-1.5 mx-2 text-base font-semibold duration-200 border border-transparent rounded-md text-zinc-700 bg-zinc-200 hover:bg-zinc-300 focus:outline-none "
                                    onClick={() => closeDeleteModal()}
                                    >
                                    닫기
                                </button>

                                <button
                                    type="button"
                                    className="justify-center px-2 py-1.5 mx-2 text-base font-semibold text-red-900 duration-200 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none "
                                    onClick={() => deleteDiary()}
                                    >
                                    일기 삭제하기
                                </button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                    </Dialog>
                </Transition>

                {/* 일기 삭제 성공 modal */}
                <Transition appear show={isSuccessModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeSuccessModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-base font-extrabold leading-6 text-zinc-900"
                            >
                                일기 삭제 성공
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-lg text-zinc-500">
                                일기가 성공적으로 삭제되었습니다!
                                </p>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    className="justify-center px-2 py-1.5 mx-2 text-base font-semibold text-green-700 duration-200 bg-green-200 border border-transparent rounded-md hover:bg-green-300 focus:outline-none "
                                    onClick={() => closeSuccessModal()}
                                    >
                                    확인
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
    )
}
