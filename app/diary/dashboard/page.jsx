'use client';
import React from "react";

import CardLineChart from "./CardLineChart"
import CardPageVisits from "./CardPageVisits"
import CardSocialTraffic from "./CardSocialTraffic"
import userData from "../../../public/data/user.json";
import UserProfile from "./UserProfile";
import RecentDiaries from "./RecentDiaries";
import EmotionCompare from "./EmotionCompare"
import CardBarChart from "./CardBarChart";
import DiaryCards from "./DiaryCards";
import DoughnutChart from "./DoughnutChart";


export default function diaryPage() {
    return (
        <>
            <div className="w-full">
                <div className="grid w-full grid-cols-6 my-4">
                    {/* 유저 프로필*/}
                    <div className="col-span-6 px-4 my-4 lg:col-span-2">
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