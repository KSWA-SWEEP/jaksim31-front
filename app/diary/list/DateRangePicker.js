'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = (props) => {
    
    let today = new Date();
    const DatePicker = dynamic(() => import('react-datepicker'), { ssr: false, })
    const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [endDate, setEndDate] = useState(today);

    return (
        <div className='grid grid-cols-7 gap-2'>
            <div className='col-span-3'>
                <DatePicker dateFormat="yyyy. MM. dd" popperProps={{ strategy: "fixed" }} className='w-full h-10 p-2 text-xs sm:text-base rounded-2xl' selected={startDate} onChange={(date) => {props.setStartDate(props.setDateFormat(date)); setStartDate(date);}} />
            </div>
            <div className='flex items-center justify-center col-span-1'>
                ~
            </div>
            <div className='col-span-3'>
                <DatePicker dateFormat="yyyy. MM. dd" popperProps={{ strategy: "fixed" }} className='w-full h-10 p-2 text-xs sm:text-base rounded-2xl' selected={endDate} onChange={(date) => {props.setEndDate(props.setDateFormat(date)); setEndDate(date);}} />
            </div>
        </div>
    );
  };
  
export default DateRangePicker;
  