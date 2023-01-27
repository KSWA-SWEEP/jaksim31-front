import moment from "moment";
import { getDiaryList } from "../../../api/getDiaryList";
import CalendarList from "./calendarList";

async function getDiaryListData() {

    // 오늘 기준으로 initialData의 날짜 범위 지정
    let today = new Date();
    let startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    let options = new Object();
    options.startDate = moment(startDate).format("YYYY-MM-DD");
    options.endDate = moment(endDate).format("YYYY-MM-DD");

    const res = await getDiaryList(options);
    
    if (res.status != 200) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
}

export default async function calendarList() {
    const diaryList = await getDiaryListData();
    
    return (
        <>
            <div className="relative">
                <CalendarList className="flex w-full" diaryList={diaryList}/>
            </div>
        </>
    )
}