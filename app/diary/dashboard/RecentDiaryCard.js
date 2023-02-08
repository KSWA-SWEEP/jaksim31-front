'use client';

import Link from "next/link";
import { useUserInfoQuery } from "../../hooks/queries/useUserInfoQuery";
import Loading from "./loading";
import Error from "../list/grid/error";
import Image from "next/image";

export default function RecentDiaryCard() {

    // 유저 정보 data fetching을 위한 useQuery
    const { data, isLoading, isFetching, isFetched, isError } = useUserInfoQuery();


    if( isLoading || isFetching ) return (
        <div className="flex justify-center w-full">
            <Loading dataType="감정 비교"/>
        </div>
    )
    if ( isError ) return <Error className="flex justify-center"/>

    return (
        <>
            <div
                className="w-full p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform shadow-xl dark:bg-zinc-700 bg-zinc-100 rounded-xl" data-testid="recentDiaryCard">
                <div className="px-4 py-1 mb-0 border-0 rounded-t">
                    <div className="flex flex-wrap items-center">
                        <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                            <div className="text-2xl font-bold text-zinc-700 dark:text-zinc-100">
                            최근 일기 📝
                            </div>
                        </div>
                        {/* "See All" 버튼 */}
                        <div className="relative flex-1 flex-grow w-full max-w-full text-right">
                        <Link
                            className="inline-flex justify-center px-3 py-2 text-sm font-medium text-red-700 duration-200 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:text-zinc-100 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:outline-none dark:focus-visible:ring-2 dark:focus-visible:ring-red-300 dark:focus-visible:ring-offset-2"
                            type="button"
                            href="/diary/list/grid"
                        >
                             전체 목록 보기
                        </Link>
                        </div>
                    </div>
                </div>
                {
                    data.recentDiary.diaryId == null 
                    ? 
                    <h4 className="pt-5 pl-8">
                        작성한 일기가 없습니다.
                    </h4>
                    :
                    <div className='flex flex-col text-center justify-items-center'>
                        <br></br>
                        {/* 날짜 */}
                        <div className='text-2xl font-extrabold text-zinc-700 dark:text-zinc-100'>
                            {data.recentDiary.diaryDate}
                        </div>
                        {/* 썸네일 사진 */}
                        <div className="justify-center m-3 avatar aspect-[4/3]">
                            <Link 
                            className="w-50 rounded-xl"
                            type="button"
                            href={data.recentDiary.thumbnail}>
                                <Image 
                                    src={data.recentDiary.thumbnail} 
                                    fill
                                    alt="일기 썸네일" 
                                    sizes="100vw"
                                    priority="true"
                                    prefetch={false}
                                >
                                </Image>
                            </Link>
                        </div>
                        <div className="relative grid w-full grid-cols-4 mt-2">
                            {/*감정*/}
                            <div className='col-span-1 pb-2 text-xl text-right align-middle justify-items-center text-zinc-500 dark:text-zinc-200'>
                                {data.recentDiary.emotion}
                            </div>
                            {/* Keywords */}
                            <div className='flex flex-row flex-wrap justify-center col-span-3 align-middle justify-items-center'>
                                                {data.recentDiary.keywords.map((keyword) => (
                                                    <div key={keyword}
                                                        className="px-3 py-1 mb-1 mr-2 font-medium align-middle duration-200 text-l w-fit text-zinc-500 bg-zinc-200 rounded-xl dark:text-zinc-300 dark:bg-zinc-800 dark:hover:scale-105">
                                                        {keyword == "EXECPTION_NO_KEYWORD" ? <>#키워드 없음</> : <>#{keyword}</>}
                                                    </div>
                                                ))}
                                            </div>
                            <div className='w-full'>
                                <div className="grid grid-cols-3">
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
        );
}