import React from "react";
import BarChartCard from "./BarChartCard";
import RecentDiaryCard from "./RecentDiaryCard";
import DonutChartCard from "./DonutChartCard";
import ProfileCard from "./ProfileCard";
import { cookies } from "next/headers";
import moment from 'moment';

async function getUserInfoData(userId, atk, rtk) {
    let res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL+"/api/v1/members/" + userId,
        {
            cache: 'no-store',
            headers: {
                Cookie: `atk=${atk}; rtk=${rtk};`
            }
        }
    );

    if (res.status != 200) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function getEmotionCountData(userId, atk, rtk, options) {

    // options에 담긴 리스트 옵션 parameter로 변환 => key가 존재하며, 값이 비어있지 않은 경우에만 붙이기
    let params = "?";
    for (const [key, value] of Object.entries(options)) {
        if((value.toString() != "") && (value.toString() != undefined))
            params = params+"&"+key+"="+value
    }

    let res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL+"/api/v1/diaries/" + userId + "/emotions" + params,
        {
            cache: 'no-store',
            headers: {
                Cookie: `atk=${atk}; rtk=${rtk};`
            }
        }
    );

    if (res.status != 200) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function diaryPage() {

    const cookieStore = cookies();
    const userId = cookieStore.get('userId');
    const atk = cookieStore.get('atk');
    const rtk = cookieStore.get('rtk');

    // 유저 정보 initial data
    const userInfo = await getUserInfoData(userId.value, atk.value, rtk.value);

    // 감정 통계 request data 초기화
    const value = new Date();
    const startDateThis = new Date(value.getFullYear(), value.getMonth(), 1);
    const endDateThis = new Date(value.getFullYear(), value.getMonth() + 1, 0);
    const startDateLast = new Date(startDateThis.getFullYear(), startDateThis.getMonth() - 1, 1);
    const endDateLast = new Date(startDateThis.getFullYear(), startDateThis.getMonth(), 0);

    // 이번 달 감정 통계 request data
    let requestData = new Object();
    requestData.startDate = moment(startDateThis).format("YYYY-MM-DD");
    requestData.endDate = moment(endDateThis).format("YYYY-MM-DD");

    // 이번 달 감정 통계 initial data
    const emotionCountThis = await getEmotionCountData(userId.value, atk.value, rtk.value, requestData);

    // 지난 달 감정 통계 request data
    requestData = new Object();
    requestData.startDate = moment(startDateLast).format("YYYY-MM-DD");
    requestData.endDate = moment(endDateLast).format("YYYY-MM-DD");

    // 지난 달 감정 통계 initial data
    const emotionCountLast = await getEmotionCountData(userId.value, atk.value, rtk.value, requestData);
    
    return (
        <>
            <div className="w-full">
                <div className="grid w-full grid-cols-6 my-4">
                    {/* 유저 프로필*/}
                    <div className="flex flex-col col-span-6 px-4 lg:col-span-2">
                        <ProfileCard userInfo={userInfo}/>
                    </div>
                    
                    {/* 이번 달 / 저번 달 감정빈도 비교 바 차트*/}
                    <div className="flex flex-col col-span-6 px-4 lg:col-span-4 ">
                        <BarChartCard emotionCountThis={emotionCountThis} emotionCountLast={emotionCountLast}/>
                    </div>

                    {/* 이번 달 감정 빈도 도넛 차트*/}
                    <div className="flex flex-col col-span-6 px-4 lg:col-span-3">
                        <DonutChartCard emotionCountThis={emotionCountThis}/>
                    </div>

                    {/*최근 일기*/}
                    <div className="flex flex-col col-span-6 px-4 lg:col-span-3">
                        <RecentDiaryCard/>
                    </div>
                </div>
            </div>
        </>
    )
}