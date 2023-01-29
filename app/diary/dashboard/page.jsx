import React from "react";
import userData from "../../../public/data/user.json";
import UserProfile from "./UserProfile";
import CardBarChart from "./EmotionCompare";
import DiaryCards from "./DiaryCards";
import DoughnutChart from "./DoughnutChart";
import { getUserInfo } from "../../api/getUserInfo";
import { getCookie} from "cookies-next";
import { cookies } from 'next/headers';

// async function getUserInfoData() {
//     const nextCookies = cookies();
//     const userId = nextCookies.get('userId');

//     if((userId != "")||(userId != undefined)) {
//         const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/members/" + userId, { cache: 'no-store' })

//         // if (res.status != 200) {
//         //     throw new Error('Failed to fetch data');
//         // }
//         console.log(res);
//         return res.json();
//     }

//     return {};
// }

export default async function diaryPage() {

    // 유저 정보 호출하여 프로필 데이터 초기화 값 가져오기
    // const userInfo = await getUserInfoData();
    
    return (
        <>
            <div className="w-full">
                <div className="grid w-full grid-cols-6 my-4">
                    {/* 유저 프로필*/}
                    <div className="col-span-6 px-4 my-4 lg:col-span-2">
                        {/* <UserProfile userInfo={userInfo}/> */}
                        <UserProfile/>
                    </div>
                    {/* 이번 달 / 저번 달 감정빈도 비교 바 차트*/}
                    <div className="col-span-6 px-4 my-4 mb-10 lg:col-span-4 ">
                        <CardBarChart/>
                    </div>

                    {/* 이번 달 감정 빈도 도넛 차트*/}
                    <div className="col-span-6 px-4 my-4 lg:col-span-3">
                        <DoughnutChart/>
                    </div>

                    {/*최근 일기*/}
                    <div className="col-span-6 px-4 my-4 lg:col-span-3">
                        <DiaryCards/>
                    </div>

                </div>
            </div>
        </>
    )
}