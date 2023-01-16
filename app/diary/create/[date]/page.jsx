import React from "react";
import BackButton from "../../common/backButton";
import CreateDiary from "./createDiary";

export default function Page({ params }) {
  const { date } = params;

  return (
      <>        
        <div className="p-4">
          <BackButton/>
          <div className="flex justify-center w-full">
            <div className="text-2xl font-extrabold text-center lg:text-3xl text-zinc-500">
              일기 쓰기
            </div>
          </div>

          {/* 입력 구간 */}
          <div className="lg:px-28">
            <CreateDiary date={date}/>
          </div>
        </div>
      </>
  )
}