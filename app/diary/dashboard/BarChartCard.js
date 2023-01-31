'use client';

import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { useEmotionCountQuery } from "../../hooks/queries/useEmotionCountQuery";
import moment from 'moment';

export default function BarChartCard() {
  
  const emotionNames = ["🥰 좋음", "😕 싫음", "😯 놀람", "😬 두려움", "😶 감정없음", "😑 지루함", "🤢 창피함", "😭 슬픔", "🤔 불확실"];
  // 차트에 표시될 이번 달 감정 개수 배열
  const [emotionCount, setEmotionCount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // API 요청 데이터
  const value = new Date();
  const [startDate, setStartDate] = useState(new Date(value.getFullYear(), value.getMonth(), 1));
  const [endDate, setEndDate] = useState(new Date(value.getFullYear(), value.getMonth() + 1, 0));

  let requestData = new Object();
  requestData.startDate = moment(startDate).format("YYYY-MM-DD");
  requestData.endDate = moment(endDate).format("YYYY-MM-DD");

  // 감정 통계 정보 data fetching을 위한 useQuery
  const { data: dataEmotion, isSuccess } = useEmotionCountQuery(requestData);

  useEffect(() => {
  
    if(dataEmotion != undefined) {

      // 응답 데이터에 대해 emotionNames와 매칭되는 emotionCount 값 설정
      dataEmotion.emotionStatics.map((pair) => {      
        let idx = emotionNames.indexOf(pair.emotion)
        emotionCount[idx] = pair.countEmotion;
        setEmotionCount([...emotionCount]);
      });
    }
  }, [isSuccess, dataEmotion]);

  useEffect(() => {
    let config = {
      type: "bar",
      data: {
        /* X축 범주 */
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
        title: {
          font: {
            family: "LeeSeoYun"
          }
        },
        datasets: [
          {
            label: "이번 달",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [emotionCount[0], emotionCount[1], emotionCount[2], emotionCount[3], emotionCount[4], emotionCount[5], emotionCount[6], emotionCount[7], emotionCount[8]],
            fill: false
          },
          {
            label: "저번 달",
            fill: false,
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [7, 10, 3, 1, 3, 1, 5, 9, 9],
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        title: {
          display: false,
          text: "감정 비교",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.8)",
            fontFamily: "LeeSeoyun",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                fontFamily: "LeeSeoyun",
                fontSize: 15,
                labelString: "감정 종류",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                fontFamily: "LeeSeoyun",
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [emotionCount]);
  return (
    <>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words shadow-lg rounded-xl bg-zinc-100">
        <div className="px-4 py-3 mb-0 bg-transparent rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full">
              <h2 className="text-xl font-semibold text-zinc-700">
                저번 달과 감정 빈도를 비교해봐요!😊
              </h2>
            </div>
          </div>
        </div>
        <div className="flex-auto p-4">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
