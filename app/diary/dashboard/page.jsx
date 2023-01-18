import React from "react";
import CardLineChart from "./CardLineChart"
import CardPageVisits from "./CardPageVisits"
import CardSocialTraffic from "./CardSocialTraffic"
import userData from "../../../public/data/user.json";
import UserProfile from "./UserProfile";
import RecentDiaries from "./RecentDiaries";
import { getUserInfo } from "../../api/getUserInfo";

 async function getUserInfoData() {
    // 유저 정보 조회 API 호출 함수
    // 테스트용 userId 넣어둠
    const res = await getUserInfo("63c790475ff1ed187caf39da");

    // if (!res.status) {
    //   throw new Error('Failed to fetch data');
    // }
 
    return res.json();
}

export default async function diaryPage() {
    // 유저 정보 초기화를 위한 데이터
    const userInfo = await getUserInfoData();

    return (
        <>
            <div className="w-full">
                <div className="grid w-full grid-cols-6 my-4">
                    {/*프로필*/}
                    <div className="col-span-6 px-4 my-4 lg:col-span-2">
                        <UserProfile userInfo={userInfo}/>
                    </div>

                    <div className="col-span-6 px-4 my-4 mb-10 lg:col-span-4 ">
                        <CardLineChart/>
                    </div>


                    <div className="col-span-6 px-4 my-4 lg:col-span-3">
                        {/*최근 일기*/}
                        <RecentDiaries/>
                    </div>


                    <div className="col-span-6 px-4 my-4 lg:col-span-3">
                        <CardSocialTraffic/>
                    </div>

                </div>
            </div>
        </>
    )
}