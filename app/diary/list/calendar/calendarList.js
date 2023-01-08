'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';

import './Calendar.css'

export default function CalendarList() {
  const Calendar = dynamic(() => import('react-calendar'), { ssr: false, })
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div className='w-full'>
        <Calendar className="w-full" onChange={onChange} value={value} formatDay={(locale, date) => moment(date).format("DD")}/>
      </div>
    </>
  )
}
