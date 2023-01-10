'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = () => {
    
    const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false, })
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className='grid grid-cols-7 gap-2'>
            <div className='col-span-3'>
                <DatePicker popperProps={{ strategy: "fixed" }} className='w-full h-10 p-2 text-xs sm:text-base rounded-2xl' selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className='flex items-center justify-center col-span-1'>
                ~
            </div>
            <div className='col-span-3'>
                <DatePicker popperProps={{ strategy: "fixed" }} className='w-full h-10 p-2 text-xs sm:text-base rounded-2xl' selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>
        </div>
    );
  };
  
export default DateRangePicker;
  