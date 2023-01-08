'use client';

import React, { forwardRef, useState } from "react";
import BackButton from "../common/backButton";
import DiaryInputFormat from "../common/diaryInputFormat";
import DatePicker from "react-datepicker";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import "react-datepicker/dist/react-datepicker.css";

export default function diaryCreate() {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="ml-3 example-custom-input" onClick={onClick} ref={ref}>
       📅
    </button>
  ));

  return (
      <>        
        <div className="p-4">
          <BackButton/>
          <div className="flex justify-center w-full">
            <div className="text-2xl font-extrabold text-center lg:text-3xl text-slate-500">
              일기 쓰기
            </div>
          </div>

          {/* 입력 구간 */}
          <div className="lg:px-28">
            <div className="relative flex m-6 text-2xl font-bold">
              <div>
                {Intl.DateTimeFormat('kr').format(startDate)}
              </div>
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  customInput={<ExampleCustomInput />}
                />
              </div>
            </div>
            <div className="relative text-lg">
              <div>
                <DiaryInputFormat/>
              </div>
            </div>      
          </div>
        </div>
      </>
  )
}