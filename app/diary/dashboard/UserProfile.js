'use client';

import userData from "../../../public/data/user.json";
import Loading from "../list/grid/loading";
import Error from "../list/grid/error";
import { useUserInfoQuery } from "../../hooks/queries/useUserInfoQuery";


// app/common/header/Profile에서 거의 다 가져왔지만 일부 수정하기 위해 component 따로 생성.
export default function UserProfile(userInfo) {

    // TODO 사용자 ID 상태 관리 설정이 되면 그 값으로 변경하기
    // 사용자 ID(Object ID)
    let userId = "63cb7ded2f289e0f2db8292b";

    // 유저 정보 data fetching을 위한 useQuery
    const { data, isLoading, isFetching, isFetched, isError } = useUserInfoQuery(userId, userInfo);
    // console.log("isFetching: " + isFetching + ", isLoading: " + isLoading);
    const user = userData;

    if( isLoading || isFetching ) return <Loading className="flex justify-center"/>
    if ( isError ) return <Error className="flex justify-center"/>

    return (
        <>
            <div
                className="w-full max-w-md p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform bg-zinc-100 shadow-xl lg:max-w-lg rounded-xl">
                <h2 className="text-xl font-semibold text-zinc-700">
                My Profile🙋
                </h2>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
}