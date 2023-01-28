import { getDiaryList } from "../../../api/getDiaryList";
import { getUserInfo } from "../../../api/getUserInfo";
import DiaryGridList from "./gridList";

async function getDiaryListData() {
    let options = new Object();
    options.page ="0";
    options.size = "6";
    const res = await getDiaryList(options);
    
    if (res.status != 200) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
}

async function getUserInfoData() {
    const res = await getUserInfo();

    if (res.status != 200) {
        throw new Error('Failed to fetch data');
    }
 
    return res.json();
}

export default async function gridList() {
    const diaryList = await getDiaryListData();
    const userInfo = await getUserInfoData();

    return (
        <>
            <div className="relative">
                <DiaryGridList className="w-full" diaryList={diaryList} userInfo={userInfo}/>
            </div>
        </>
    )
}