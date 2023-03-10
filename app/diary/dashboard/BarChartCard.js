'use client';

import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { useEmotionCountQuery } from "../../hooks/queries/useEmotionCountQuery";
import moment from 'moment';
import Loading from "./loading";

export default function BarChartCard(props) {
  
  const emotionNames = ["π₯° μ’μ", "π μ«μ", "π― λλ", "π¬ λλ €μ", "πΆ κ°μ μμ", "π μ§λ£¨ν¨", "π€’ μ°½νΌν¨", "π­ μ¬ν", "π€ λΆνμ€"];
  // μ°¨νΈμ νμλ  κ°μ  κ°μ λ°°μ΄
  const [emotionCountThis, setEmotionCountThis] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [emotionCountLast, setEmotionCountLast] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // API μμ²­ λ°μ΄ν°
  const value = new Date();
  const [startDateThis, setStartDateThis] = useState(new Date(value.getFullYear(), value.getMonth(), 1));
  const [endDateThis, setEndDateThis] = useState(new Date(value.getFullYear(), value.getMonth() + 1, 0));
  const [startDateLast, setStartDateLast] = useState(new Date(startDateThis.getFullYear(), startDateThis.getMonth() - 1, 1));
  const [endDateLast, setEndDateLast] = useState(new Date(startDateThis.getFullYear(), startDateThis.getMonth(), 0));

  // μ΄λ² λ¬ κ°μ  ν΅κ³ μμ²­ λ°μ΄ν°
  let requestData = new Object();
  requestData.startDate = moment(startDateThis).format("YYYY-MM-DD");
  requestData.endDate = moment(endDateThis).format("YYYY-MM-DD");

  // μ΄λ² λ¬ κ°μ  ν΅κ³ μ λ³΄ data fetchingμ μν useQuery
  const { data: dataEmotionThis, isSuccessThis } = useEmotionCountQuery(requestData, "THIS_MONTH", props.emotionCountThis);
  
  // μ§λ λ¬ κ°μ  ν΅κ³ μμ²­ λ°μ΄ν°
  requestData = new Object();
  requestData.startDate = moment(startDateLast).format("YYYY-MM-DD");
  requestData.endDate = moment(endDateLast).format("YYYY-MM-DD");
  
  // μ§λ λ¬ κ°μ  ν΅κ³ μ λ³΄ data fetchingμ μν useQuery
  const { data: dataEmotionLast, error, isLoading, isFetching, isError, isSuccessLast } = useEmotionCountQuery(requestData, "LAST_MONTH", props.emotionCountLast);
  
  // μ΄λ² λ¬ emotionCount data-fetching
  useEffect(() => {
  
    if(dataEmotionThis != undefined) {
      console.log(dataEmotionThis)

      if(dataEmotionThis.emotionStatics != null) {
        // μλ΅ λ°μ΄ν°μ λν΄ emotionNamesμ λ§€μΉ­λλ emotionCount κ° μ€μ 
        dataEmotionThis.emotionStatics.map((pair) => {      
          let idx = emotionNames.indexOf(pair.emotion)
          emotionCountThis[idx] = pair.countEmotion;
          setEmotionCountThis([...emotionCountThis]);
        });
      }
    }
  }, [isSuccessThis, dataEmotionThis]);

  // μ§λ λ¬ emotionCount data-fetching
  useEffect(() => {
  
    if(dataEmotionLast != undefined) {

      if(dataEmotionThis.emotionStatics != null) {
        // μλ΅ λ°μ΄ν°μ λν΄ emotionNamesμ λ§€μΉ­λλ emotionCount κ° μ€μ 
        dataEmotionLast.emotionStatics.map((pair) => {      
          let idx = emotionNames.indexOf(pair.emotion)
          emotionCountLast[idx] = pair.countEmotion;
          setEmotionCountLast([...emotionCountLast]);
        });
      }
    }
  }, [isSuccessLast, dataEmotionLast]);

  useEffect(() => {
    let config = {
      type: "bar",
      data: {
        /* XμΆ λ²μ£Ό */
        labels: [
          "μ’μ",
          "μ«μ",
          "λλ",
          "λλ €μ",
          "κ°μ  μμ",
          "μ§λ£¨ν¨",
          "μ°½νΌν¨",
          "μ¬ν",
          "λΆνμ€"
        ],
        title: {
          font: {
            fontColor: "#989898",
            family: "font-leeseoyun"
          }
        },
        datasets: [
          {
            label: "μ§λ λ¬",
            fill: false,
            backgroundColor: "#CBC0FF",
            borderColor: "#CBC0FF",
            data: [emotionCountLast[0], emotionCountLast[1], emotionCountLast[2], emotionCountLast[3], emotionCountLast[4], emotionCountLast[5], emotionCountLast[6], emotionCountLast[7], emotionCountLast[8]],
          },
          {
            label: "μ΄λ² λ¬",
            backgroundColor: "#FFC0C0",
            borderColor: "#FFC0C0",
            data: [emotionCountThis[0], emotionCountThis[1], emotionCountThis[2], emotionCountThis[3], emotionCountThis[4], emotionCountThis[5], emotionCountThis[6], emotionCountThis[7], emotionCountThis[8]],
            fill: false
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        title: {
          display: false,
          text: "κ°μ  λΉκ΅",
        },
        tooltips: {
          mode: "point",
          intersect: false,
        },
        legend: {
          labels: {
            fontColor: "#989898",
            fontFamily: "font-leeseoyun",
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
                fontFamily: "font-leeseoyun",
                fontSize: 15,
                fontColor: "#989898",
                labelString: "κ°μ  μ’λ₯",
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
                fontFamily: "font-leeseoyun",
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
    if(window.myBar) {
      window.myBar.destroy();
    }
    window.myBar = new Chart(ctx, config);
  }, [emotionCountThis, emotionCountLast]);
  

  if( isLoading || isFetching ) return (
    <div className="flex justify-center w-full">
        <Loading dataType="μ΄λ² λ¬ κ°μ "/>
        <canvas id="bar-chart" hidden ></canvas>
    </div>
  )
    
  if ( isError ) return (
      <div className="flex justify-center">
          <div className="my-16 text-2xl text-center">
              π₯<br/>{error.errorMessage}
          </div>
      </div>
  )

  return (
    <>
      <div className="relative flex flex-col w-full h-full min-w-0 mb-6 break-words shadow-lg rounded-xl dark:bg-zinc-700 bg-zinc-100" data-testid="barChartCard">
        <div className="px-4 py-3 mb-0 bg-transparent rounded-t">
          <div className="flex flex-wrap items-center">
            <div className="relative flex-1 flex-grow w-full max-w-full">
              <div className="text-xl font-semibold text-zinc-700 dark:text-zinc-100">
                μ§λ λ¬κ³Ό κ°μ  λΉλλ₯Ό λΉκ΅ν΄λ΄μ!π
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto p-4">
          {/* Chart */}
          <div className="flex items-center h-full">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
