'use client';

import userEmotion from "../../../public/data/emotions.json"
import React, { useEffect } from "react";
import Chart from "chart.js";

export default function CardBarChart() {
  const emotions = userEmotion;
  useEffect(() => {
    let config = {
      type: "bar",
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
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [emotions.monthEmotions.좋음, emotions.monthEmotions.싫음, emotions.monthEmotions.놀람, emotions.monthEmotions.두려움, emotions.monthEmotions.감정없음, emotions.monthEmotions.지루함, emotions.monthEmotions.부끄러움],
            fill: false
          },
          {
            label: "저번 달",
            fill: false,
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [7, 10, 3, 1, 3, 1, 5],
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
            fontColor: "rgba(0,0,0,.4)",
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
  }, []);
  return (
    <>
      <div className="relative flex flex-col w-full min-w-0 mb-6 break-words shadow-lg rounded-xl bg-zinc-100">
        <div className="px-4 py-3 mb-0 bg-transparent rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full">
              <h6 className="mb-1 text-xs font-semibold uppercase text-zinc-400">
                
              </h6>
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
