import React from "react";
import DiaryContents from "./diaryContents";
import { cookies } from "next/headers";

async function getDiaryData(diaryId, userId, atk, rtk) {
    
    let res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL+"/api/v1/diaries/"+userId+"/"+diaryId, 
      {
          cache : 'no-store', 
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

export default async function diaryShow({ params }) {

  const { diaryId } = params;
  const cookieStore = cookies();
  const userId = cookieStore.get('userId');
  const atk = cookieStore.get('atk');
  const rtk = cookieStore.get('rtk');
  const diary = await getDiaryData(diaryId, userId.value, atk.value, rtk.value);
  
  return (
    <>
      <div>
        {/* <DiaryContents diaryId={ diaryId }/> */}
        <DiaryContents diaryId={ diaryId } diary={ diary } />
      </div>
    </>
  )
}