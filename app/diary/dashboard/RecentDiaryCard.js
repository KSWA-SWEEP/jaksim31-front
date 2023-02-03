'use client';

import Link from "next/link";
import { useUserInfoQuery } from "../../hooks/queries/useUserInfoQuery";
import Loading from "../list/grid/loading";
import Error from "../list/grid/error";
import Image from "next/image";

export default function RecentDiaryCard() {

    // 유저 정보 data fetching을 위한 useQuery
    const { data, isLoading, isFetching, isFetched, isError } = useUserInfoQuery();

    if( isLoading || isFetching ) return <Loading className="flex justify-center"/>
    if ( isError ) return <Error className="flex justify-center"/>

    return (
        <>
            <div
                className="w-full max-w-md p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform bg-zinc-100 shadow-xl lg:max-w-lg rounded-xl">
                <div className="px-4 py-1 mb-0 border-0 rounded-t">
                    <div className="flex flex-wrap items-center">
                        <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                        <h2 className="text-2xl font-bold text-zinc-700">
                        최근 일기 📝
                        </h2>
                        </div>
                        {/* "See All" 버튼 */}
                        <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
                        <Link
                            className="px-3 py-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-500 rounded outline-none active:bg-indigo-600 focus:outline-none"
                            type="button"
                            href="/diary/list/grid"
                        >
                            See all
                        </Link>
                        </div>
                    </div>
                </div>
                {data.recentDiary.diaryId == null ? 
                    <h4 className="pt-5 pl-8">
                        작성한 일기가 없습니다.
                    </h4>
                    :
                    <div className='flex flex-col text-center justify-items-center'>
                    <br></br>
                    {/* 날짜 */}
                    <div className='text-2xl font-extrabold text-zinc-700'>
                        {data.recentDiary.diaryDate}
                    </div>
                    {/* 썸네일 사진 */}
                    <div className="justify-center m-3 avatar">
                        <Link 
                        className="w-50 rounded-xl"
                        type="button"
                        href={data.recentDiary.thumbnail}>
                            <Image src={data.recentDiary.thumbnail} alt="일기 썸네일"></Image>
                        </Link>
                    </div>
                    {/*감정*/}
                    <div className='justify-items-center align-middle justify-center pb-2 text-zinc-500 text-xl'>
                        {data.recentDiary.emotion}
                    </div>
                    {/* Keywords */}
                    <div className='flex flex-row justify-items-center align-middle justify-center flex-wrap'>
                                        {data.recentDiary.keywords.map((keyword) => (
                                            <div key={keyword}
                                                className="px-3 py-1 mb-1 mr-2 text-l align-middle font-medium w-fit text-zinc-500 bg-zinc-200 rounded-xl dark:bg-zinc-200 dark:text-zinc-800 ">
                                                {keyword == "EXECPTION_NO_KEYWORD" ? <>#키워드 없음</> : <>#{keyword}</>}
                                            </div>
                                        ))}
                                    </div>
                    <div className='w-full'>
                        <div className="grid grid-cols-3">
                        </div>
                    </div>
                    </div>
                }
            </div>
        </>
        );
}