'use client';

import Loading from "./loading";
import { useUserInfoQuery } from "../../hooks/queries/useUserInfoQuery";
import { getCookie } from "cookies-next";
import Image from "next/image";

// export default function UserProfile(userInfo) {
export default function ProfileCard() {

    // 유저 정보 data fetching을 위한 useQuery
    const { data, error, isLoading, isFetching, isFetched, isError } = useUserInfoQuery();

    if( isLoading || isFetching ) return (
        <div className="flex justify-center w-full">
            <Loading dataType="프로필"/>
        </div>
    )
    
    if ( isError ) return (
        <div className="flex justify-center">
            <div className="my-16 text-2xl text-center">
                😥<br/>{error.errorMessage}
            </div>
        </div>
    )

    return (
        <>
            <div className="w-full h-full p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform shadow-xl dark:bg-zinc-700 bg-zinc-100 lg:max-w-lg rounded-xl" data-testid="profileCard">
                <div className="text-xl font-semibold text-zinc-700 dark:text-zinc-100">
                My Profile🙋
                </div>
                <div className='flex flex-col mt-5 text-center justify-items-center'>
                    {/* 프로필 사진 */}
                    <div className="justify-center m-5 avatar">
                        <div className="w-32 rounded-full">
                            <Image 
                                src={data.profileImage} 
                                width={200}
                                height={200}
                                alt="프로필 이미지" 
                                sizes="100vw"
                                priority="true"
                            >
                            </Image>
                        </div>
                    </div>
                    {/* 이름 */}
                    <div className='text-3xl font-extrabold dark:text-zinc-100 text-zinc-700'>
                        {data.username}
                    </div>
                    {/* 사용자 ID (이메일) */}
                    {getCookie("isSocial") ? 
                        <></>
                    :
                        <p className="text-l text-zinc-500">
                            {data.loginId}
                        </p>
                    }
                    {/* divider */}
                    <div className="my-3 border-b-2"></div>
                    <div className='w-full'>
                        <div className="grid grid-cols-3">
                            {/* 총 작성한 일기 수 */}
                            <div className='col-span-3 mb-1'>
                                <div className="mb-1 text-lg text-zinc-600 dark:text-zinc-400">
                                    오늘까지 기록한 나의 일기
                                </div>
                                <div className='text-3xl font-bold'>
                                    {data.diaryTotal}개
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}