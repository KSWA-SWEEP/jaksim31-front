'use client';

import { forwardRef, useState } from "react";
import DiaryInputFormat from "../common/diaryInputFormat";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CreateDiary = () => {
    const [date, setDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <button className="ml-3 example-custom-input" onClick={onClick} ref={ref}>
         📅
      </button>
    ));

    return (
        <>
          <div className="relative flex m-6 text-2xl font-bold">
            <div>
              {Intl.DateTimeFormat('kr').format(date)}
            </div>
            <div>
              <DatePicker
                dateFormat="yyyy-MM-dd" 
                onChange={(date) => setDate(date)}
                customInput={<ExampleCustomInput />}
              />
            </div>
          </div>
          <div className="relative text-sm sm:text-lg">
            <div>
              <DiaryInputFormat date={Intl.DateTimeFormat('kr').format(date)}/>
            </div>
          </div>      
        </>
    );
  };
  
  export default CreateDiary;
  