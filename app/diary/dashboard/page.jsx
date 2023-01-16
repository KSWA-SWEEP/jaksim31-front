'use client';
import React from "react";

import CardLineChart from "./CardLineChart"
import CardPageVisits from "./CardPageVisits"
import CardSocialTraffic from "./CardSocialTraffic"
import userData from "../../../public/data/user.json";
import UserProfile from "./UserProfile";
import RecentDiaries from "./RecentDiaries";

export default function diaryPage() {
    return (
        <>
            <div className="w-full">
                <div className="grid w-full grid-cols-6 my-4">
                    {/*프로필*/}
                    <div className="col-span-6 px-4 my-4 lg:col-span-2">
                        <UserProfile/>
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