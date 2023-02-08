'use client';
import userEmotion from "../../../public/data/emotions.json"
import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import moment from 'moment';
import { useEmotionCountQuery } from "../../hooks/queries/useEmotionCountQuery";
import Loading from "./loading";

export default function DonutChartCard() {

  const emotionNames = ["🥰 좋음", "😕 싫음", "😯 놀람", "😬 두려움", "😶 감정없음", "😑 지루함", "🤢 창피함", "😭 슬픔", "🤔 불확실"];
  // 차트에 표시될 감정 개수 배열
  const [emotionCountThis, setEmotionCountThis] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  
  // API 요청 데이터
  const value = new Date();
  const [startDateThis, setStartDateThis] = useState(new Date(value.getFullYear(), value.getMonth(), 1));
  const [endDateThis, setEndDateThis] = useState(new Date(value.getFullYear(), value.getMonth() + 1, 0));
  
  // 이번 달 감정 통계 요청 데이터
  let requestData = new Object();
  requestData.startDate = moment(startDateThis).format("YYYY-MM-DD");
  requestData.endDate = moment(endDateThis).format("YYYY-MM-DD");

  // 이번 달 감정 통계 정보 data fetching을 위한 useQuery
  const { data: dataEmotionThis, error, isLoading, isFetching, isError, isSuccessThis } = useEmotionCountQuery(requestData, "THIS_MONTH");
  
  // 이번 달 emotionCount data-fetching
  useEffect(() => {
  
    if(dataEmotionThis != undefined) {

      // 응답 데이터에 대해 emotionNames와 매칭되는 emotionCount 값 설정
      dataEmotionThis.emotionStatics.map((pair) => {      
        let idx = emotionNames.indexOf(pair.emotion)
        emotionCountThis[idx] = pair.countEmotion;
        setEmotionCountThis([...emotionCountThis]);
      });
    }
  }, [isSuccessThis, dataEmotionThis]);

  const emotions = userEmotion;
  useEffect(() => {
    let config = {
      type: "doughnut",
      data: {
        labels: [
          "좋음",
          "싫음",
          "놀람",
          "두려움",
          "감정 없음",
          "지루함",
          "창피함",
          "슬픔",
          "불확실"
        ],
        datasets: [
          {
            label: "이번 달",
            backgroundColor: ["#FEEE80", "#FEAF9C", "	#C1F1E1", "#A5CAFF", "#9A9A9A", "#9FBB98", "#FED497", "#D08AFF", "#FFC4D3"],
            data: [emotionCountThis[0], emotionCountThis[1], emotionCountThis[2], emotionCountThis[3], emotionCountThis[4], emotionCountThis[5], emotionCountThis[6], emotionCountThis[7], emotionCountThis[8]],
          }
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        offset: 20,
        title: {
          display: false,
          text: "감정 비교",
        },
        tooltips: {
          mode: "index",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "#989898",
            fontSize: 18,
          },
          position: "bottom",
        },
      },
    }; 
    let ctx = document.getElementById("doughnut-chart").getContext("2d");
    window.myDonut = new Chart(ctx, config);
  }, [emotionCountThis]);
  

  if( isLoading || isFetching ) return (
    <div className="flex justify-center w-full">
        <Loading dataType="이번 달 감정"/>
        <canvas id="doughnut-chart" style={{ width: '360px', height: '300px' }} hidden ></canvas>
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
      <div className="w-full h-full pt-4 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-zinc-100 dark:bg-zinc-700 rounded-xl" data-testid="donutChartCard">
          <div className="px-4 py-3 mb-0 border-0 rounded-t">
              <div className="flex flex-wrap items-center">
              <div className="relative flex-1 flex-grow w-full max-w-full px-4">
              <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
                이번 달 감정 빈도 📈
              </h2>
            </div>
          </div>
        </div>
          <div className="flex-auto p-4">
            {/* Doughnut Chart */}
          <div className="relative h-350-px">
            <canvas style={{ width: '420px', height: '350px', margin: '0 auto' }} id="doughnut-chart" ></canvas>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}
