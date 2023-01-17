'use client';
import userEmotion from "../../../public/data/emotions.json"
import CardSocialTraffic from "./CardSocialTraffic"
import React, { useEffect } from "react";
import Chart from "chart.js";

export default function DoughnutChart() {
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
          "부끄러움",
        ],
        datasets: [
          {
            label: "이번 달",
            backgroundColor: ["#4682B4", "#ed64a6", "	#F5F5DC", "#9932CC", "#F4A460", "#708090", "#F08080"],
            data: [emotions.monthEmotions.좋음, emotions.monthEmotions.싫음, emotions.monthEmotions.놀람, emotions.monthEmotions.두려움, emotions.monthEmotions.감정없음, emotions.monthEmotions.지루함, emotions.monthEmotions.부끄러움],
          }
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: false,
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
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
      },
    };
    let ctx = document.getElementById("doughnut-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
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
            {/* Chart */}
          <div className="relative h-350-px">
            <canvas className="h-[300px] w-full" id="doughnut-chart" ></canvas>
          </div>
        </div>
      </div>
      <br></br>
      <div className="col-span-6 px-4 my-4 lg:col-span-3">
        <CardSocialTraffic/>
      </div>
    </>
  );
}
