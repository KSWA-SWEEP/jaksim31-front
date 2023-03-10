'use client';

import React, { useEffect, useState } from 'react';
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
import { PlusCircleIcon, CalendarDaysIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import './Calendar.css'
import Loading from './loading';
import { useDiaryListQuery } from '../../../hooks/queries/useDiaryListQuery';

const emotions = [
  {
    name: "π μ«μ",
    src: badIcon,
    alt: "bad",
  },
  {
    name: "π μ§λ£¨ν¨",
    src: boredIcon,
    alt: "bored",
  },
  {
    name: "π€’ μ°½νΌν¨",
    src: embarrassedIcon,
    alt: "embarrassed",
  },
  {
    name: "π₯° μ’μ",
    src: goodIcon,
    alt: "good",
  },
  {
    name: "πΆ κ°μ μμ",
    src: nothingIcon,
    alt: "nothing",
  },
  {
    name: "π― λλ",
    src: surprisedIcon,
    alt: "surprised",
  },
  {
    name: "π¬ λλ €μ",
    src: scaredIcon,
    alt: "scared",
  },
  {
    name: "π­ μ¬ν",
    src: sadIcon,
    alt: "sad",
  },
  {
    name: "π€ λΆνμ€",
    src: unsureIcon,
    alt: "unsure",
  },
]

export default function CalendarList() {
  const [clickState, setClickState] = useState([]);
  const [filteredDiaries, setFilteredDiaries] = useState([]);
  const [isEmotionClicked, setIsEmotionClicked] = useState(false);
  const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(value.getFullYear(), value.getMonth(), 1));
  const [endDate, setEndDate] = useState(new Date(value.getFullYear(), value.getMonth() + 1, 0));
  const Calendar = dynamic(() => import('react-calendar'), { ssr: false, })

  // react-query
  let options = new Object();
  options.startDate = moment(startDate).format("YYYY-MM-DD");
  options.endDate = moment(endDate).format("YYYY-MM-DD");
  const { data, error, isLoading, isFetching, isError } = useDiaryListQuery(options)

  // react Queryλ‘ λ°μ κ° diarysμ λ£μ΄μ£ΌκΈ°
  let diarys = (data != undefined ? data.content : []);

  // νν°λ§ μ  μ μ²΄ μΌκΈ° μ μ₯μ μν λ³μ
  let allDiaries = (data != undefined ? data.content : []);

  // useEffect μ¬μ©ν΄μ μ νν κ°μ λ§ filtering ν΄μ λ³΄μ¬μ£ΌκΈ°
  // λͺ©λ‘μμ κ°μ  νν°λ§ νλ κ²½μ° λͺ©λ‘ λ°μ΄ν°μ λ³νκ° μΌμ΄λ  κ°λ₯μ±μ΄ μ κΈ° λλ¬Έμ μλ‘ data fetching μμ΄ cacheλ react-queryμ data μ¬μ©
  useEffect(() => {
    if(clickState.length > 0)
    {
      setIsEmotionClicked(true)
      setFilteredDiaries(allDiaries.filter(diary => clickState.includes(diary.emotion)))
    }
    else {
      setIsEmotionClicked(false)
    }
  }, [clickState])

  useEffect(() => {
    diarys = filteredDiaries;
  }, [filteredDiaries])

  useEffect(() => {
    setClickState([]);
    setDateRange(value);
  }, [value])

  // error
  if ( isError ) return (
    <div className="flex justify-center">
        <div className="my-16 text-2xl text-center">
            π₯<br/>{error}
            <div className="mt-6">
                <Link href="/diary/list/calendar" prefetch={false} replace={true} className="font-semibold duration-200 border-opacity-0 outline-none sm:text-base text-zinc-50 bg-zinc-400 hover:bg-zinc-500 btn outline-0 border-spacing-0 hover:scale-105">μλ‘κ³ μΉ¨</Link>
            </div>
        </div>
    </div>
)

  // loading
  if ( isLoading || isFetching || data == undefined ) return <Loading className="flex justify-center"/>
  
  // κ°μ  μ ν μν κ΄λ¦¬
  function setEmotionState(e, emotion) {
    // μ νλμ΄ μμ§ μμ κ²½μ° (μλ‘μ΄ κ°μ  μΆκ°)
    if(!clickState.includes(emotion)){
      setClickState([...clickState, emotion])
      e.target.classList.remove("opacity-60")
      e.target.classList.add("opacity-100", "drop-shadow-lg")
    } 
    // μ΄λ―Έ μ νλμ΄ μλ κ²½μ° (κ°μ  μ μΈ)
    else {
      setClickState(clickState.filter((clickedItem) => clickedItem !== emotion));
      e.target.classList.add("opacity-60")
      e.target.classList.remove("opacity-100", "drop-shadow-lg")
    }
  }

  const resetEmotions = (e) => {
    setClickState([]);
  }

  function setDateRange(date) {
    setStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setEndDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    onChange(date);
  }
  
  return (
    <>
      <div className='w-[75vw] lg:w-[65vw] xl:w-[55vw]'>
        <div className='flex mt-10 mb-8 sm:mx-6 md:mx-10 lg:mt-4 lg:mx-12 place-content-between'>
          {/* κ°μ  μμ΄μ½ λ²νΌ */}
          {emotions.map((emotion) => (
            <div key={emotion.name} className="relative w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 tooltip" onClick={(e) => {setEmotionState(e, emotion.name);}} data-tip={emotion.name}>
              <Image data-testid={emotion.name} src={emotion.src} alt={emotion.alt} placeholder='empty' priority className={'duration-200 opacity-60 hover:scale-105 hover:opacity-100' + (((clickState.length == 0)&&(isEmotionClicked)) ? ' opacity-100 drop-shadow-lg' : ' opacity-60')}/>
            </div>
          ))}
        </div>
      </div>         
      <div className='flex justify-center'>
        <div className='flex items-center px-2 py-1 mx-2 text-xs text-white duration-200 hover:scale-105 rounded-xl w-fit bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-600 dark:hover:bg-zinc-500' onClick={(e) => {resetEmotions(e);}} data-testid="resetEmotionButton"><ArrowPathIcon className='w-3 h-3 mr-1 text-white'/>κ°μ  μ ν μ΄κΈ°ν</div>
        <div className='flex items-center px-2 py-1 mx-2 text-xs text-white duration-200 bg-red-300 hover:scale-105 rounded-xl w-fit hover:bg-red-400 dark:bg-blue-300/50 dark:hover:bg-blue-400/70' onClick={(e) => {resetEmotions(e); onChange(new Date());}} data-testid="goTodayButton"><CalendarDaysIcon className='w-3 h-3 mr-1 text-white'/>μ€λλ‘ μ΄λνκΈ°</div>
      </div>
      {/* Calendar */}
      <div className='flex justify-center mb-5 md:mb-12 sm:mt-2'>
        
        <Calendar
          className="w-[75vw] lg:w-[65vw] xl:w-[50vw]"
          value={value}
          onChange={onChange}
          showNeighboringMonth={false}
          formatDay={(locale, date) => moment(date).format("DD")}
          onActiveStartDateChange={({ action, activeStartDate, value, view }) => setDateRange(activeStartDate)}
          tileContent={({ date, view }) => {
            if(diarys != undefined) {
              let matchedDiary = diarys.find(({diaryDate}) => moment(diaryDate).format('YYYY-MM-DD') == moment(date).format("YYYY-MM-DD"))
            
              if(view === 'month') {
                // μΌκΈ°κ° μμ κ²½μ° ν΄λΉ μΌκΈ°μ λ§λ μμ΄μ½ λ³΄μ¬μ£ΌκΈ° => ν΄λ¦­μ μΌκΈ° μ‘°ν νμ΄μ§λ‘ μ΄λ
                if(matchedDiary != undefined) {
                  // λ°μ΄ν°μ emotionκ³Ό μΌμΉνλ emotionSet μ€μ  (μμ΄μ½ src κ°μ Έμ€κΈ° μν¨)
                  let matchedEmotion = emotions.find(({name}) => matchedDiary.emotion.includes(name))
                  return (
                  <>
                    <Link data-testid="goDiaryPage" href={"/diary/"+matchedDiary.diaryId} className="flex items-center justify-center mt-2 dayBox">
                      <div className="relative w-6 h-6 duration-200 sm:w-10 sm:h-10 lg:w-12 lg:h-12 hover:drop-shadow-lg hover:opacity-80 hover:scale-105">
                        <Image src={matchedEmotion.src} alt="emotion" placeholder='empty'/>
                      </div>
                    </Link>
                  </>
                  )
                }
                // μ€λ μ΄μ μ λ μ§μ λν΄ μΌκΈ°κ° μμ λμλ μΌκΈ° μ°κΈ° λ²νΌ λ³΄μ¬μ£ΌκΈ°
                else if (moment() > moment(date)) {
                  let selectedDate = moment(date).format("YYYYMMDD")
                  return (
                    <>
                      <div className="flex items-center justify-center mt-2 overflow-visible dayBox group">
                      <Link data-testid="writeDiary" href={'diary/create/'+ encodeURIComponent(btoa(selectedDate))} className="relative w-6 h-6 overflow-visible duration-200 opacity-0 group sm:w-10 sm:h-10 group-hover:opacity-100 hover:opacity-80 hover:scale-105">
                        <PlusCircleIcon alt="add" placeholder='empty' className='text-zinc-200'/>
                        <p className='px-1 text-[4px] lg:text-[5px] text-center text-zinc-400 opacity-0 group-hover:opacity-100 h-fit w-100 rounded-xl bg-zinc-200'>μΌκΈ° μ°κΈ°</p>
                      </Link>
                      </div>
                    </>
                  )
                }
                // μ€λ μ΄νμ λ μ§μ λν΄ μ΄μ κ³Ό κ°μ ν¬κΈ°μ viewλ₯Ό λ³΄μ¬μ£ΌκΈ° μν΄ λΉ div μ½μ
                else {
                  return (
                    <>
                      <div className="flex items-center justify-center mt-2 overflow-visible dayBox group">
                        <div className="relative w-6 h-6 overflow-visible duration-200 opacity-0 group sm:w-10 sm:h-10 group-hover:opacity-100 hover:opacity-80 hover:scale-105">
                        </div>
                      </div>
                    </>
                  )
                }
              }
            }
          }}
        />
      </div>
    </>
  )
}