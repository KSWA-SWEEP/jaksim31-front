'use client';

import BackButton from "../../common/backButton";
import DiaryInputFormat from "../../common/diaryInputFormat";
import diaryData from '../../../../public/data/dairy.json'

export default function diaryModify() {  
  const diary = diaryData;

  return (
    <>
      <div className="p-4">
        <BackButton/>
        <div className="flex justify-center w-full">
          <div className="text-2xl font-extrabold text-center lg:text-3xl text-slate-500">
            일기 수정
          </div>
        </div>

        {/* 입력 구간 */}
        <div className="lg:px-28">
          <div className="m-6 text-2xl font-bold">
            {diary.date} 
          </div>
          {/* <DiaryInputFormat/> */}
          <div className="relative text-lg">
            <div>
              <DiaryInputFormat Contents={diary.Contents.toString()}/>
            </div>
          </div>      
        </div>
      </div>
    </>

  )
}