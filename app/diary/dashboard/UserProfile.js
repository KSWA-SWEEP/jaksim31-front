'use client';

import userData from "../../../public/data/user.json";
import Loading from "../list/grid/loading";
import Error from "../list/grid/error";
import { useUserInfoQuery } from "../../hooks/queries/useUserInfoQuery";
import moment from 'moment';

// app/common/header/Profile에서 거의 다 가져왔지만 일부 수정하기 위해 component 따로 생성.
// export default function UserProfile(userInfo) {
export default function UserProfile() {

    // TODO: userInfo 응답으로 recentDiary 데이터 받으면 data-fetching 하기
    const user = userData;

    // 유저 정보 data fetching을 위한 useQuery
    const { data, isLoading, isFetching, isFetched, isError } = useUserInfoQuery();

    if( isLoading || isFetching ) return <Loading className="flex justify-center"/>
    if ( isError ) return <Error className="flex justify-center"/>

    return (
        <>
            <div className="w-full max-w-md p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-zinc-100 lg:max-w-lg rounded-xl">
                <div className="text-xl font-semibold text-zinc-700">
                My Profile🙋
                </div>
                <div className='flex flex-col text-center justify-items-center'>
                    {/* 프로필 사진 */}
                    <div className="justify-center m-5 avatar">
                        <div className="w-32 rounded-full">
                            <img src={data.profileImage}/>
                        </div>
                    </div>
                    {/* 이름 */}
                    <div className='text-3xl font-extrabold text-zinc-700'>
                        {data.username}
                    </div>
                    {/* 사용자 ID (이메일) */}
                    <p className="text-sm text-zinc-500">
                        {data.loginId}
                    </p>
                    {/* divider */}
                    <div className="my-6 border-b-2"></div>
                    <div className='w-full'>
                        <div className="grid grid-cols-3">
                            {/* 총 작성한 일기 수 */}
                            <div className='col-span-3 mb-1 sm:col-span-1'>
                                <div className="mb-1 text-lg text-zinc-600">
                                    작성한<br></br>일기장들
                                </div>
                                <div className='text-3xl font-bold'>
                                    {data.diaryTotal}
                                </div>
                            </div>

                            {/* 최근 일기 */}
                            <div className='col-span-3 sm:col-span-2'>
                              <div className="mb-1 text-lg text-zinc-600">
                                최근 일기
                              </div>
                              <div className='mb-2 text-xl font-semibold'>
                                {moment(user.recent_diaries[0].date).format("YYYY. MM. DD.")}
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
            </div>
        </>
        );
}