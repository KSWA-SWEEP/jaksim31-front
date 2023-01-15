'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';
import badIcon from '../../../../public/images/emotion/bad-small.png'
import boredIcon from '../../../../public/images/emotion/bored-small.png'
import embarrassedIcon from '../../../../public/images/emotion/embarrassed-small.png'
import goodIcon from '../../../../public/images/emotion/good-small.png'
import nothingIcon from '../../../../public/images/emotion/nothing-small.png'
import sadIcon from '../../../../public/images/emotion/sad-small.png'
import scaredIcon from '../../../../public/images/emotion/scared-small.png'
import surprisedIcon from '../../../../public/images/emotion/surprised-small.png'
import unsureIcon from '../../../../public/images/emotion/unsure-small.png'
import Image from 'next/image';
import diarysData from '../../../../public/data/diaryList.json'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import './Calendar.css'
import Link from 'next/link';

const emotions = [
  {
    src: badIcon,
    alt: "bad",
    name: "나쁨"
  },
  {
    src: boredIcon,
    alt: "bored",
    name: "지루함"
  },
  {
    src: embarrassedIcon,
    alt: "embarrassed",
    name: "창피함"
  },
  {
    src: goodIcon,
    alt: "good",
    name: "좋음"
  },
  {
    src: nothingIcon,
    alt: "nothing",
    name: "감정 없음"
  },
  {
    src: surprisedIcon,
    alt: "surprised",
    name: "놀람"
  },
  {
    src: scaredIcon,
    alt: "scared",
    name: "두려움"
  },
  {
    src: sadIcon,
    alt: "sad",
    name: "슬픔"
  },
  {
    src: unsureIcon,
    alt: "unsure",
    name: "불확실함"
  },
]

// react-calendar에서 각 day에 대한 날짜를 date라는 변수로 관리하기에 date에서의 변수와 중복됨
// data 로 받는 변수의 key값을 임의로 변경해주기 (date=>diaryDate)
const diarys = diarysData.diaryList;
function renameKey ( obj, oldKey, newKey ) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}
diarys.forEach( obj => renameKey( obj, 'date', 'diaryDate' ) );


export default function CalendarList() {
  const Calendar = dynamic(() => import('react-calendar'), { ssr: false, })
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div className='w-[75vw] lg:w-[65vw] xl:w-[55vw]'>
        <div className='flex mt-10 mb-10 sm:mx-6 md:mx-10 lg:mt-4 lg:mx-12 place-content-between'>
          {/* 감정 아이콘 버튼 */}
          {/* TODO 감정 아이콘 클릭시 해당 감정 일기 가져오는 함수 만들기 */}
          {emotions.map((emotion) => (
            <div key={emotion.name} className="relative w-6 h-6 duration-200 sm:w-10 sm:h-10 lg:w-12 lg:h-12 hover:opacity-80 hover:scale-105 tooltip" data-tip={emotion.name}>
              <Image src={emotion.src} alt={emotion.alt} placeholder='empty'/>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center mb-5 sm:mt-5 md:mt-10'>
        <Calendar
          className="w-[75vw] lg:w-[65vw] xl:w-[50vw]"
          onChange={onChange}
          value={value}
          formatDay={(locale, date) => moment(date).format("DD")}
          tileContent={({ date, view }) => {
            let matchedDiary = diarys.find(({diaryDate}) => moment(diaryDate).format('YYYY-MM-DD') == moment(date).format("YYYY-MM-DD"))
            // 일기가 있을 경우 해당 일기에 맞는 아이콘 보여주기 => 클릭시 일기 조회 페이지로 이동
            if((matchedDiary != undefined)) {
              return (
               <>
                <Link href={"/diary/"+matchedDiary.diaryId} className="flex items-center justify-center mt-2 dayBox">
                   <div className="relative w-6 h-6 duration-200 sm:w-10 sm:h-10 lg:w-12 lg:h-12 hover:opacity-80 hover:scale-105">
                     <Image src={emotionIcon(matchedDiary.emotion)} alt="emotion" placeholder='empty' width={100} height={100}/>
                   </div>
                </Link>
               </>
              )
            }
            // 일기가 없을 때에는 일기 쓰기 버튼 보여주기
            else if (view === 'month') {
              let selectedDate = moment(date).format("YYYYMMDD")
              return (
                <>
                  <div className="flex items-center justify-center mt-2 overflow-visible dayBox group">
                   <Link href={'/diary/create/'+ encodeURIComponent(btoa(selectedDate))} className="relative w-6 h-6 overflow-visible duration-200 opacity-0 group sm:w-10 sm:h-10 group-hover:opacity-100 hover:opacity-80 hover:scale-105">
                    <PlusCircleIcon alt="add" placeholder='empty' className='text-zinc-200'/>
                    <p className='px-1 text-[4px] lg:text-[5px] text-center text-zinc-400 opacity-0 group-hover:opacity-100 h-fit w-100 rounded-xl bg-zinc-200'>일기 쓰기</p>
                   </Link>
                  </div>
                </>
               )
            }
          }}
        />
      </div>
    </>
  )
}

// data의 emotion과 component 매칭하기 위한 함수
function emotionIcon(emotion) {
  let answer;
  switch (emotion){
    case "감정없음": 
      answer = nothingIcon;
      break; 
    case "놀람":
      answer = surprisedIcon;
      break;
    case "두려움":
      answer = scaredIcon; 
      break;
    case "불확실":
      answer = unsureIcon; 
      break; 
    case "지루함":
      answer = boredIcon; 
      break; 
    case "슬픔":
      answer = sadIcon; 
      break; 
    case "싫음":
      answer = badIcon; 
      break; 
    case "좋음":
      answer = goodIcon; 
      break; 
    case "창피함":
      answer = embarrassedIcon; 
      break; 
  }
  return answer;
}