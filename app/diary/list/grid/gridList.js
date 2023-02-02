'use client';

import Link from "next/link"
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Dialog, Menu, Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef, useState } from "react"
import Image from "next/image";
import moment from "moment";
import Loading from "./loading";
import Pagination from "react-js-pagination";
import './Pagination.css'
import { useQueryClient } from "react-query";
import { useDiaryDelete } from "../../../hooks/mutations/useDiaryDelete";
import { useDiaryListPageQuery } from "../../../hooks/queries/useDiaryListPageQuery";
import DateRangePicker from "../DateRangePicker";

// 진행중 일기 세부 메뉴
const diaryMenu = [
  { name: '일기 수정', href: 'diary/' },
  { name: '일기 삭제', href: 'deleteDiary' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
  
export default function DiaryGridList() {
    const [page, setPage] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const diaryToDelete = useRef();

    // 검색 옵션
    let today = new Date();
    const [searchWord,setSearchWord] = useState("");
    const [emotion, setEmotion] = useState("");
    const [sort, setSort] = useState("");
    const [startDate, setStartDate] = useState(setDateFormat(new Date(today.getFullYear(), today.getMonth(), 1)));
    const [endDate, setEndDate] = useState(setDateFormat(today));
    const [optionData, setOptionData] = useState({
        "page": (page-1).toString(),
        "size": 6
    });
       
    let options = new Object();
    options.page = (page-1).toString();
    options.size = 6;
    
    useEffect(() => {
        window.scrollTo({top: 0});
    }, [page])

    // react-query
    const queryClient = useQueryClient();

    // diary data 삭제를 위한 useMutation
    const { status, mutate, error : mutateError } = useDiaryDelete(diaryToDelete.current, queryClient)

    useEffect(() => {
        if(status == "success"){
            openSuccessModal()
        }
    }, [status])

    const { data : diaryListData, error, isLoading, isError } = useDiaryListPageQuery(optionData)
    
    if ( isLoading ) return <Loading className="flex justify-center"/>
 
    if ( isError ) return (
        <div className="flex justify-center">
            <div className="my-16 text-2xl text-center">
                😥<br/>{error}
                <div className="mt-6">
                    <Link href="/diary/list/grid" replace={true} className="font-semibold duration-200 border-opacity-0 outline-none sm:text-base text-zinc-50 bg-zinc-400 hover:bg-zinc-500 btn outline-0 border-spacing-0 hover:scale-105">새로고침</Link>
                </div>
            </div>
        </div>
    )
    
    let diarys = diaryListData.content;

    // 날짜 형식을 YYYY-MM-DD로 설정
    function setDateFormat(date){
        let result = date.getFullYear().toString() + "-" + (date.getMonth()+1).toString().padStart(2,'0') + "-" + date.getDate().toString().padStart(2,'0')
        return result
    }

    // 검색 옵션 설정값 가져오기
    // 검색어
    const onSearchWordChange =(e)=>{
        setSearchWord(e.target.value);
    }
    // 감정
    const onEmotionChange =(e)=>{
        setEmotion(e.target.value);
    }
    // 정렬
    const onSortChange =(e)=>{
        setSort(e.target.value);
    }

    // 검색
    const search = () => {
        setPage(1);

        setOptionData((prevState) => {
            return { ...prevState, 
                searchWord: searchWord,
                emotion: (emotion=="전체" ? "" : emotion),
                startDate: startDate,
                endDate: endDate,
                sort: sort,
                page: 0,
                size: 6
            }
        });
        
        // ['DIARY_LIST', 'PAGE'] 키를 가지는 모든 query cache 값을 삭제 => 검색 조건 설정시 이전 검색 값에 대한 데이터 없앰
        queryClient.removeQueries(['DIARY_LIST', 'PAGES']);
        
    };

    // 옵션 초기화
    const resetOptions = () => {
        setPage(1);
        
        setOptionData({"page": 0, "size": 6});
        setSearchWord("");
        setEmotion("");
        setSort("");

        // ['DIARY_LIST', 'PAGE'] 키를 가지는 모든 query cache 값을 삭제 => 검색 조건 초기화 이전 검색 값에 대한 데이터 없앰
        queryClient.removeQueries(['DIARY_LIST', 'PAGES']);
        
    }
    
    const handlePageChange = (page) => {
        setPage(page);
        setOptionData((prevState) => {
            return { ...prevState, page: (page-1).toString() }
        });
    };
    
    function deleteDiary() {
        mutate()
    }
    
    function openDeleteModal(diaryId) { diaryToDelete.current = diaryId; setIsDeleteModalOpen(true) }
    function closeDeleteModal() { setIsDeleteModalOpen(false) }
  
    function openSuccessModal() { setIsSuccessModalOpen(true) }
    function closeSuccessModal() { 
        setIsSuccessModalOpen(false);                                        
        queryClient.invalidateQueries(["DIARY_LIST"]);
        queryClient.invalidateQueries(["USER_INFO"]);
    }

    return (
        <div>
            {/* 검색 영역 */}
            <div className="mx-4 mt-5 font-medium rounded-3xl bg-red-100/60 lg:mt-2 lg:mb-5 sm:mx-6 lg:mx-8 text-md text-zinc-600">
                <div className="collapse rounded-3xl">
                    <input type="checkbox" className="peer" /> 
                        <div className="collapse-title peer-checked:bg-secondary peer-checked:text-secondary-content">
                            <div className='relative flex items-center justify-center'>
                                <MagnifyingGlassIcon className='block w-5 h-5 ml-2 mr-5'/>
                                <div className='text-lg'>
                                    검색하기
                                </div>
                            </div>
                        </div>
                        <div className="pb-0 collapse-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                            <div className='m-1 sm:m-4'>
                                <div className="md:col-span-2">
                                    <div className="overflow-hidden">
                                        <div className="grid grid-cols-6 sm:gap-2">
                                            {/* 단어 검색 */}
                                            <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                                <label htmlFor="search-word" className="block text-base font-medium text-zinc-700">
                                                    검색어
                                                </label>
                                                <input
                                                    type="text"
                                                    name="search-word"
                                                    id="search-word"
                                                    autoComplete="search-word"
                                                    placeholder='검색어를 입력하세요'
                                                    defaultValue={(optionData.hasOwnProperty('searchWord') ? optionData.searchWord : "")}
                                                    onChange={onSearchWordChange}
                                                    className="w-full pl-4 mt-1 shadow-sm border-zinc-300 focus:outline-zinc-300 h-9 rounded-xl "
                                                />
                                            </div>

                                            {/* 감정 검색 */}
                                            <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                                <label htmlFor="emotion" className="block text-base font-medium text-zinc-700">
                                                    감정
                                                </label>
                                                <select
                                                    id="emotion"
                                                    name="emotion"
                                                    autoComplete="emotion-value"
                                                    onClick={onEmotionChange}
                                                    defaultValue={optionData.emotion}
                                                    className="w-full px-3 py-2 mt-1 shadow-sm border-zinc-300 focus:outline-zinc-300 h-9 rounded-xl "
                                                >
                                                    <option value="">전체</option>
                                                    <option value="😕 싫음">싫음</option>
                                                    <option value="😑 지루함">지루함</option>
                                                    <option value="🤢 창피함">창피함</option>
                                                    <option value="🥰 좋음">좋음</option>
                                                    <option value="😶 감정없음">감정없음</option>
                                                    <option value="😯 놀람">놀람</option>
                                                    <option value="😬 두려움">두려움</option>
                                                    <option value="😭 슬픔">슬픔</option>
                                                    <option value="🤔 불확실">불확실</option>
                                                </select>
                                            </div>

                                            {/* 달력 형식일 경우 아래 두 항목 (기간, 정렬) 비활성화 필요 */}
                                            {/* 기간 검색 */}
                                            <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-base font-medium text-zinc-700">
                                                    기간
                                                </label>
                                                <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} setDateFormat={setDateFormat} />
                                            </div>

                                            {/* 정렬 */}
                                            <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                                <label htmlFor="sort" className="block text-base font-medium text-zinc-700 ">
                                                    정렬
                                                </label>
                                                <select
                                                    id="sort"
                                                    name="sort"
                                                    autoComplete="sort-value"
                                                    onClick={onSortChange}
                                                    defaultValue={optionData.sort}
                                                    className="w-full px-3 py-2 mt-1 shadow-sm border-zinc-300 focus:outline-zinc-300 h-9 rounded-xl "
                                                >
                                                    <option value={"desc"}>최신순</option>
                                                    <option value={"asc"}>오래된 순</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => search()}
                                                className="justify-center px-4 py-2 mx-1 mt-5 text-sm font-medium border border-transparent shadow-sm w-30 rounded-xl bg-primary text-primary-content hover:bg-primary-focus focus:outline-none focus:ring-2">
                                                검색하기🔍
                                            </button>
                                            <button
                                                onClick={() => resetOptions()}
                                                className="justify-center px-4 py-2 mx-1 mt-5 text-sm font-medium bg-red-200 border border-transparent shadow-sm w-30 rounded-xl text-accent-content hover:bg-accent-focus focus:outline-none focus:ring-2">
                                                초기화
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            {/* 일기 목록 */}
            <div className="bg-white">
                <div className="px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:px-8 lg:py-3">
                    {
                        diaryListData.totalElements == 0
                        ?
                        <div className="mt-10 min-h-[50vh]">

                            <div className="flex flex-col justify-center text-center">
                                <div className="my-5 text-5xl">🙊</div>
                                <div className="text-xl font-semibold text-red-600">조회 가능한 일기가 없습니다</div>
                                <button
                                    onClick={() => resetOptions()}
                                    className="self-center justify-center px-4 py-2 mx-1 mt-12 text-sm font-medium duration-200 border border-transparent shadow-sm bg-zinc-200 w-fit w-30 rounded-3xl text-accent-content hover:bg-zinc-400 hover:text-white focus:outline-none focus:ring-2">
                                    설정된 검색 조건 초기화하기
                                </button>
                            </div>
                        </div>
                        :
                        <div> 
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
                                                        {/* cache 때문에 이미지가 변경되지 않는 현상 - src에 시간 붙여서 따로 캐시되도록 처리 */}
                                                        <Image
                                                            src={diary.thumbnail+'?'+moment(new Date()).format("YYYYMMDDhhmmsstt")}
                                                            alt={diary.emotion}
                                                            placeholder="empty"
                                                            fill
                                                            sizes='mas-width: 20vw, max-height: 10vh'
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
                                                        (
                                                            keyword != "EXECPTION_NO_KEYWORD"
                                                            ?
                                                            <div key={keyword} className="px-3 mb-2 py-1 mr-2.5 text-sm font-medium text-zinc-500 bg-zinc-200 rounded-xl dark:bg-zinc-200 dark:text-zinc-800 hover:scale-105 hover:bg-zinc-300 hover:text-zinc-600 duration-200">
                                                                #{keyword}
                                                            </div>
                                                            :
                                                            <div key={keyword} className="px-3 text-sm text-zinc-400 ">
                                                                ※ 추출된 키워드가 없습니다
                                                            </div>

                                                        )
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
                                    totalItemsCount={Number(diaryListData.totalElements)}
                                    pageRangeDisplayed={5}
                                    prevPageText={"‹"}
                                    nextPageText={"›"}
                                    onChange={handlePageChange}
                                />  
                            </div>
                        </div>
                    }

                    
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
                                        onClick={() => {
                                            deleteDiary(); 
                                            closeDeleteModal();
                                        }}
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
        </div>

    )
}
