'use client';

import moment from "moment";
import { useEffect, useState } from "react";
import { getDiary } from "../../../api/getDiary";

async function getDiaryData(diaryId) {
  const res = await getDiary(diaryId);
  
  if (res.status != 200) {
    throw new Error('Failed to fetch data');  
  }

  return res.json();
}

export default function DiaryDate(props) {

    const [diaryData, setDiaryData] = useState({});

    useEffect(() => {
        console.log(props.diaryId)
        if(props.diaryId != undefined) {
            setDiaryData(getDiaryData(props.diaryId));        
        }
    }, [])
    
    return (
        <div className="m-6 text-2xl font-bold">
            {moment(diaryData.diaryDate).format("YYYY. MM. DD.")} 
        </div>
    )
}  