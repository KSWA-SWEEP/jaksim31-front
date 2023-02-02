'use client';

import moment from "moment";
import { useDiaryQuery } from "../../../hooks/queries/useDiaryQuery";


export default function DiaryDate(props) {
    
    const { data, isLoading, isFetching, isFetched, isError } = useDiaryQuery(props.diaryId)

    if ( isLoading || data == undefined ) return <div className="m-6 text-2xl font-bold">수정할 일기 날짜</div>
    
    return (
        <div className="m-6 text-2xl font-bold">
            {moment(data.diaryDate).format("YYYY. MM. DD.")} 
        </div>
    )
}  