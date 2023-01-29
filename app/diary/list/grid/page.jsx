import { cookies } from "next/headers";
import { getDiaryList } from "../../../api/getDiaryList";
import { getUserInfo } from "../../../api/getUserInfo";
import DiaryGridList from "./gridList";

// async function getDiaryListData() {

//     const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/diaries/"+process.env.NEXT_PUBLIC_USER_ID+"?page=0&size=6");
    
//     if (res.status != 200) {
//       throw new Error('Failed to fetch data');
//     }
  
//     return res.json();
// }

export default async function gridList() {
    // const diaryList = await getDiaryListData();

    return (
        <>
            <div className="relative">
                <DiaryGridList className="w-full" />
                {/* <DiaryGridList className="w-full" diaryList={diaryList}/> */}
            </div>
        </>
    )
}