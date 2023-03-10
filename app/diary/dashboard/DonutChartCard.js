'use client';
import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import moment from 'moment';
import { useEmotionCountQuery } from "../../hooks/queries/useEmotionCountQuery";
import Loading from "./loading";

export default function DonutChartCard() {

  const emotionNames = ["π₯° μ’μ", "π μ«μ", "π― λλ", "π¬ λλ €μ", "πΆ κ°μ μμ", "π μ§λ£¨ν¨", "π€’ μ°½νΌν¨", "π­ μ¬ν", "π€ λΆνμ€"];
  // μ°¨νΈμ νμλ  κ°μ  κ°μ λ°°μ΄
  const [emotionCountThis, setEmotionCountThis] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  
  // API μμ²­ λ°μ΄ν°
  const value = new Date();
  const [startDateThis, setStartDateThis] = useState(new Date(value.getFullYear(), value.getMonth(), 1));
  const [endDateThis, setEndDateThis] = useState(new Date(value.getFullYear(), value.getMonth() + 1, 0));
  
  // μ΄λ² λ¬ κ°μ  ν΅κ³ μμ²­ λ°μ΄ν°
  let requestData = new Object();
  requestData.startDate = moment(startDateThis).format("YYYY-MM-DD");
  requestData.endDate = moment(endDateThis).format("YYYY-MM-DD");

  // μ΄λ² λ¬ κ°μ  ν΅κ³ μ λ³΄ data fetchingμ μν useQuery
  const { data: dataEmotionThis, error, isLoading, isFetching, isError, isSuccessThis } = useEmotionCountQuery(requestData, "THIS_MONTH");
  
  // μ΄λ² λ¬ emotionCount data-fetching
  useEffect(() => {
  
    if(dataEmotionThis != undefined) {

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

  useEffect(() => {
    let config = {
      type: "doughnut",
      data: {
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
        datasets: [
          {
            label: "μ΄λ² λ¬",
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
          text: "κ°μ  λΉκ΅",
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
        <Loading dataType="μ΄λ² λ¬ κ°μ "/>
        <canvas id="doughnut-chart" style={{ width: '360px', height: '300px' }} hidden ></canvas>
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
      <div className="w-full h-full pt-4 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-zinc-100 dark:bg-zinc-700 rounded-xl" data-testid="donutChartCard">
          <div className="px-4 py-3 mb-0 border-0 rounded-t">
              <div className="flex flex-wrap items-center">
              <div className="relative flex-1 flex-grow w-full max-w-full px-4">
              <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-100">
                μ΄λ² λ¬ κ°μ  λΉλ π
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
