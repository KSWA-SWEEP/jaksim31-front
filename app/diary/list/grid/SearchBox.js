'use client';

import DateRangePicker from "../DateRangePicker";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import {useState} from "react";

const SearchBox = () => {
    // 날짜 형식을 YYYY-MM-DD로 설정
    function setDateFormat(date){
        let result = date.getFullYear().toString() + "-" + (date.getMonth()+1).toString().padStart(2,'0') + "-" + date.getDate().toString().padStart(2,'0')
        return result
    }

    // 검색 옵션
    const [query,setQuery] = useState("");
    const [emotion, setEmotion] = useState("");
    const [sort, setSort] = useState("");
    const [startDate, setStartDate] = useState(setDateFormat(new Date(1999,0,1)));
    const [endDate, setEndDate] = useState(setDateFormat(new Date()));

    // 검색 옵션 설정값 가져오기
    // 검색어
    const onQueryChange =(e)=>{
        setQuery(e.target.value);
    }
    // 감정
    const onEmotionChange =(e)=>{
        setEmotion(e.target.value);
    }
    // 정렬
    const onSortChange =(e)=>{
        setSort(e.target.value)
    }

    // 검색
    function search(){
        // check
        console.log("검색어 : " + query + "\nemotion : " + emotion + "\nstartDate : " + startDate + "\nendDate : " + endDate + "\nsort형식 : " + sort);
        const data = new Object();
        let url = "/v1/diaries/{userId}?"
        // TODO 일기 검색 API에 query parameter로 넘기면 됨.
        url = url+"query="+query+"&emotion="+emotion+"&startDate="+startDate+"&endDate="+endDate+"&sort="+startDate
    }


    return (
      <div className="collapse rounded-3xl">
          <input type="checkbox" className="peer" /> 
            <div className="collapse-title peer-checked:bg-secondary peer-checked:text-secondary-content">
                <div className='relative flex items-center justify-center'>
                    <MagnifyingGlassIcon className='block w-5 h-5 ml-2 mr-5'/>
                    <div className='text-lg'>
                        검색하기
                    </div>
                </div>
            </div>
            <div className="pb-0 collapse-content peer-checked:bg-secondary peer-checked:text-secondary-content"> 
                <div className='m-1 sm:m-4'>
                    <div className="md:col-span-2">
                        <div className="overflow-hidden">
                            <div className="grid grid-cols-6 sm:gap-2">
                                {/* 단어 검색 */}
                                <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                    <label htmlFor="search-word" className="block text-base font-medium text-zinc-700">
                                        검색어
                                    </label>
                                    <input
                                        type="text"
                                        name="query"
                                        id="query"
                                        autoComplete="search-word"
                                        placeholder='검색어를 입력하세요'
                                        onChange={onQueryChange}
                                        className="w-full pl-4 mt-1 shadow-sm border-zinc-300 focus:outline-zinc-300 h-9 rounded-xl "
                                    />
                                </div>

                                {/* 감정 검색 */}
                                <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                    <label htmlFor="emotion" className="block text-base font-medium text-zinc-700">
                                        감정
                                    </label>
                                    <select
                                        id="emotion"
                                        name="emotion"
                                        autoComplete="emotion-value"
                                        onClick={onEmotionChange}
                                        className="w-full px-3 py-2 mt-1 shadow-sm border-zinc-300 focus:outline-zinc-300 h-9 rounded-xl "
                                    >
                                        <option>전체</option>
                                        <option>감정없음</option>
                                        <option>놀람</option>
                                        <option>불확실</option>
                                        <option>슬픔</option>
                                        <option>싫음</option>
                                        <option>좋음</option>
                                        <option>지루함</option>
                                        <option>창피함</option>
                                    </select>
                                </div>

                                {/* 달력 형식일 경우 아래 두 항목 (기간, 정렬) 비활성화 필요 */}
                                {/* 기간 검색 */}
                                <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-base font-medium text-zinc-700">
                                        기간
                                    </label>
                                    <DateRangePicker setStartDate={setStartDate} setEndDate={setEndDate} setDateFormat={setDateFormat} />
                                </div>

                                {/* 정렬 */}
                                <div className="col-span-6 px-2 py-1 sm:col-span-3">
                                    <label htmlFor="sort" className="block text-base font-medium text-zinc-700 ">
                                        정렬
                                    </label>
                                    <select
                                        id="sort"
                                        name="sort"
                                        autoComplete="sort-value"
                                        onClick={onSortChange}
                                        className="w-full px-3 py-2 mt-1 shadow-sm border-zinc-300 focus:outline-zinc-300 h-9 rounded-xl "
                                    >
                                        <option>오래된 순</option>
                                        <option>최신순</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    onClick={search}
                                    className="justify-center px-4 py-2 mx-1 mt-5 text-sm font-medium border border-transparent shadow-sm w-30 rounded-xl bg-primary text-primary-content hover:bg-primary-focus focus:outline-none focus:ring-2">
                                    검색하기🔍
                                </button>
                                <button
                                    className="justify-center px-4 py-2 mx-1 mt-5 text-sm font-medium bg-red-200 border border-transparent shadow-sm w-30 rounded-xl text-accent-content hover:bg-accent-focus focus:outline-none focus:ring-2">
                                    초기화
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  };
  
  export default SearchBox;
  