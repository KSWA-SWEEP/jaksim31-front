import React from "react";
import BarChartCard from "./BarChartCard";
import RecentDiaryCard from "./RecentDiaryCard";
import DonutChartCard from "./DonutChartCard";
import ProfileCard from "./ProfileCard";

export default async function diaryPage() {
    
    return (
        <>
            <div className="w-full">
                <div className="grid w-full grid-cols-6 my-4">
                    {/* 유저 프로필*/}
                    <div className="col-span-6 px-4 my-4 lg:col-span-2">
                        {/* <UserProfile userInfo={userInfo}/> */}
                        <ProfileCard/>
                    </div>
                    {/* 이번 달 / 저번 달 감정빈도 비교 바 차트*/}
                    <div className="col-span-6 px-4 my-4 mb-10 lg:col-span-4 ">
                        <BarChartCard/>
                    </div>

                    {/* 이번 달 감정 빈도 도넛 차트*/}
                    <div className="col-span-6 px-4 my-4 lg:col-span-3">
                        <DonutChartCard/>
                    </div>

                    {/*최근 일기*/}
                    <div className="col-span-6 px-4 my-4 lg:col-span-3">
                        <RecentDiaryCard/>
                    </div>
                </div>
            </div>
        </>
    )
}