'use client';
import userEmotion from "../../../public/data/emotions.json"
import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import moment from 'moment';
import { useEmotionCountQuery } from "../../hooks/queries/useEmotionCountQuery";

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
  const { data: dataEmotionThis, isSuccessThis } = useEmotionCountQuery(requestData, "THIS_MONTH");
  
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
        responsive: false,
        offset: 20,
        title: {
          display: false,
          text: "감정 비교",
        },
        tooltips: {
          mode: "index",
          intersect: true,
          fontSize: 50,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.8)",
            fontSize: 35,
            position: "bottom",
            align: "left",
            boxWidth: 30,
          },
          align: "center",
          position: "bottom",
        },
      },
    }; 
    let ctx = document.getElementById("doughnut-chart").getContext("2d");
    window.myDonut = new Chart(ctx, config);
  }, [emotionCountThis]);
  return (
    <>
      <div className="w-full max-w-md p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform bg-zinc-100 shadow-xl lg:max-w-lg rounded-xl">
          <div className="px-4 py-3 mb-0 border-0 rounded-t">
              <div className="flex flex-wrap items-center">
              <div className="relative flex-1 flex-grow w-full max-w-full px-4">
              <h2 className="text-2xl font-semibold text-zinc-700">
                이번 달 감정 빈도 📈
              </h2>
            </div>
          </div>
        </div>
          <div className="flex-auto p-4">
            {/* Doughnut Chart */}
          <div className="relative h-350-px">
            <canvas style={{ width: '360px', height: '300px', margin: '0 auto' }} id="doughnut-chart" ></canvas>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
}
