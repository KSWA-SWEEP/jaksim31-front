import Link from "next/link";
import React from "react";
import diaryData from '../../../public/data/dairy.json';

export default function diaryShow({ params }) {
  const { diaryId } = params;
  const diary = diaryData;
  
  return (
    <>
      <div className="px-10 py-12 lg:px-28">
        <div className="grid grid-cols-3">
          
          {/* 날짜 및 키워드 */}
          <div className="col-span-3 sm:col-span-2">
            <div className="text-2xl font-extrabold">{diary.date.split("T")[0].replace(/-/g, '').replace(/(\d{4})(\d{2})(\d{2})/g, '$1. $2. $3.')}</div>
            <div className="flex flex-wrap mt-3">
                {diary.keywords.map((keyword) => (
                    <div key={keyword} className="px-3 mb-2 py-1 mr-2.5 text-sm font-medium text-zinc-500 bg-zinc-200 rounded-xl dark:bg-zinc-200 dark:text-zinc-800 ">
                        #{keyword}
                    </div>
                ))}
            </div>
          </div>

          {/* 감정 */}
          <div className="flex items-center col-span-3 sm:justify-end sm:col-span-1">
            <div className="text-lg">
                {diary.emotion}
            </div>
          </div>

          {/* 일기 내용 */}
          <div className="col-span-3 my-5">
            {/* HTML 타입으로 텍스트 표시 - 글자 크기, 글자 색 등 */}
            <div className='text-lg' dangerouslySetInnerHTML={{__html: diary.content}}></div>
          </div>

          {/* 목록, 수정, 삭제 */}
          <div className="flex items-center justify-center col-span-3 mt-4">
            <div className="text-xl">
              <Link href={"/diary/"+diaryId+"/modify"} className="mx-2 text-base font-semibold duration-200 btn btn-secondary hover:scale-105">수정하기</Link>
              <button className="mx-2 text-base font-semibold duration-200 btn btn-accent hover:scale-105">삭제하기</button>
              <Link href="/diary/list/calendar" className="mx-2 text-base font-semibold duration-200 border-opacity-0 outline-none text-zinc-50 bg-zinc-400 hover:bg-zinc-500 btn outline-0 border-spacing-0 hover:scale-105">목록으로</Link>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}