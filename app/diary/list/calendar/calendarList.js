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
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import './Calendar.css'
import Loading from './loading';
import { useDiaryListQuery } from '../../../hooks/queries/useDiaryListQuery';

const emotions = [
  {
    name: "😕 싫음",
    src: badIcon,
    alt: "bad",
  },
  {
    name: "😑 지루함",
    src: boredIcon,
    alt: "bored",
  },
  {
    name: "🤢 창피함",
    src: embarrassedIcon,
    alt: "embarrassed",
  },
  {
    name: "🥰 좋음",
    src: goodIcon,
    alt: "good",
  },
  {
    name: "😶 감정없음",
    src: nothingIcon,
    alt: "nothing",
  },
  {
    name: "😯 놀람",
    src: surprisedIcon,
    alt: "surprised",
  },
  {
    name: "😬 두려움",
    src: scaredIcon,
    alt: "scared",
  },
  {
    name: "😭 슬픔",
    src: sadIcon,
    alt: "sad",
  },
  {
    name: "🤔 불확실",
    src: unsureIcon,
    alt: "unsure",
  },
]

export default function CalendarList(props) {
  const [clickState, setClickState] = useState([]);
  const Calendar = dynamic(() => import('react-calendar'), { ssr: false, })

  // react-query
  const { data, isLoading, isPlaceholderData, isPreviousData, isRefetching, isFetching, isFetched, isError } = useDiaryListQuery(props.diaryList, "", "")

  // react Query로 받은 값 diarys에 넣어주기
  let diarys = data.content;

  // 필터링 전 전체 일기 저장을 위한 변수
  let allDiaries = data.content;

  // useEffect 사용해서 선택한 감정만 filtering 해서 보여주기
  // 목록에서 감정 필터링 하는 경우 데이터의 변화가 일어날 가능성이 적기 때문에 새로 data fetching 없이 cache된 react-query의 data 사용 
  useEffect(() => {
    let filteredDiaries = allDiaries;
    if(clickState.length > 0)
    {
      filteredDiaries = filteredDiaries.filter(diary => clickState.includes(diary.emotion))
    }
    diarys = filteredDiaries;
  }, [clickState])

  // loading
  if ( isLoading || isFetching ) return <Loading className="flex justify-center"/>

  // error
  if ( isError ) return <Error className="flex justify-center"/>
  
  // 감정 선택 상태 관리
  function setEmotionState(e, emotion) {
    // 선택되어 있지 않은 경우 (새로운 감정 추가)
    if(!clickState.includes(emotion)){
      setClickState([...clickState, emotion])
      e.target.classList.remove("opacity-60")
      e.target.classList.add("opacity-100", "drop-shadow-lg")
    } 
    // 이미 선택되어 있는 경우 (감정 제외)
    else {
      setClickState(clickState.filter((clickedItem) => clickedItem !== emotion));
      e.target.classList.add("opacity-60")
      e.target.classList.remove("opacity-100", "drop-shadow-lg")
    }
  }
  
  return (
    <>
      <div className='w-[75vw] lg:w-[65vw] xl:w-[55vw]'>
        <div className='flex mt-10 mb-10 sm:mx-6 md:mx-10 lg:mt-4 lg:mx-12 place-content-between'>
          {/* 감정 아이콘 버튼 */}
          {/* TODO - 감정 아이콘 클릭시 해당 감정 일기 가져오는 함수 만들기 */}
          {emotions.map((emotion) => (
              <Image src={emotion.src} alt={emotion.alt} placeholder='empty' className='duration-200 opacity-60 hover:scale-105 hover:opacity-100'/>
            <div key={emotion.name} className="relative w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 tooltip" onClick={(e) => setEmotionState(e, emotion.name)} data-tip={emotion.name}>
            </div>
          ))}
        </div>
      </div>
      {/* Calendar */}
      <div className='flex justify-center mb-5 md:mb-12 sm:mt-5 md:mt-10'>
        <Calendar
          className="w-[75vw] lg:w-[65vw] xl:w-[50vw]"
          value={new Date()}
          formatDay={(locale, date) => moment(date).format("DD")}
          tileContent={({ date, view }) => {
            let matchedDiary = diarys.find(({diaryDate}) => moment(diaryDate).format('YYYY-MM-DD') == moment(date).format("YYYY-MM-DD"))
            
            if(view === 'month') {
              // 일기가 있을 경우 해당 일기에 맞는 아이콘 보여주기 => 클릭시 일기 조회 페이지로 이동
              if(matchedDiary != undefined) {
                // 데이터의 emotion과 일치하는 emotionSet 설정 (아이콘 src 가져오기 위함)
                let matchedEmotion = emotions.find(({name}) => matchedDiary.emotion.includes(name))
                return (
                <>
                  <Link href={"/diary/"+matchedDiary.diaryId} className="flex items-center justify-center mt-2 dayBox">
                    <div className="relative w-6 h-6 duration-200 sm:w-10 sm:h-10 lg:w-12 lg:h-12 hover:drop-shadow-lg hover:opacity-80 hover:scale-105">
                      <Image src={matchedEmotion.src} alt="emotion" placeholder='empty' width={100} height={100}/>
                    </div>
                  </Link>
                </>
                )
              }
              // 오늘 이전의 날짜에 대해 일기가 없을 때에는 일기 쓰기 버튼 보여주기
              else if (moment() > moment(date)) {
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
              // 오늘 이후의 날짜에 대해 이전과 같은 크기의 view를 보여주기 위해 빈 div 삽입
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
          }}
        />
      </div>
    </>
  )
}