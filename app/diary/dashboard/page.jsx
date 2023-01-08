import React from "react";

import CardLineChart from "./CardLineChart"
import CardBarChart from "./CardBarChart"
import CardPageVisits from "./CardPageVisits"
import CardSocialTraffic from "./CardSocialTraffic"

export default function diaryPage() {
    return (
        <>
            <div className="w-full">
                <div className="grid w-full grid-cols-6 my-4">
                    <div className="col-span-6 px-4 my-4 lg:col-span-4">
                        <CardLineChart />
                    </div>
                    <div className="col-span-6 px-4 my-4 lg:col-span-2">
                        <CardBarChart />
                    </div>
                    <div className="col-span-6 px-4 my-4 lg:col-span-3">
                        <CardPageVisits />
                    </div>
                    <div className="col-span-6 px-4 my-4 lg:col-span-3">
                        <CardSocialTraffic />
                    </div>
                </div>
                {/* <div className="w-full grid-cols-6">
                    <div className="flex col-span-6">
                        <div className="col-span-6 px-4 mb-12 sm:col-span-4 xl:mb-0">
                        <CardLineChart />
                        </div>
                        <div className="col-span-6 px-4 sm:col-span-2">
                        <CardBarChart />
                        </div>
                    </div>
                    <div className="flex flex-wrap col-span-6 mt-4">
                        <div className="px-4 mb-12 xl:w-8/12 xl:mb-0">
                        <CardPageVisits />
                        </div>
                        <div className="w-full px-4 xl:w-4/12">
                        <CardSocialTraffic />
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}