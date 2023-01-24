import { getDiaryList } from "../../../api/getDiaryList";
import CalendarList from "./calendarList";

async function getDiaryListData() {
    // 로그인시 가져온 userId (db의 objectId) 를 쿠키 or Local Storage로부터 가져와서 넣어주기
    // 지금은 test 용 하나의 userId 하드코딩으로 넣어줌..
    const res = await getDiaryList(process.env.NEXT_PUBLIC_USER_ID);
    
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