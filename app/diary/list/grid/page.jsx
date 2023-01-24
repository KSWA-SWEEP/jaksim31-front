import { getDiaryList } from "../../../api/getDiaryList";
import DiaryGridList from "./gridList";
import SearchBox from "./SearchBox";

async function getDiaryListData() {
    // 로그인시 가져온 userId (db의 objectId) 를 쿠키 or Local Storage로부터 가져와서 넣어주기
    // const res = await getDiaryList({userId});
    // 지금은 test 용 하나의 userId 하드코딩으로 넣어줌..
    const res = await getDiaryList(process.env.NEXT_PUBLIC_USER_ID);
    
    if (res.status != 200) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
}

export default async function gridList() {
    const diaryList = await getDiaryListData();

    return (
        <>
            {/* 검색 영역 */}
            <div className="mx-auto mt-5 font-medium rounded-3xl bg-red-100/60 lg:mt-2 lg:mb-5 sm:mx-6 lg:mx-8 text-md text-zinc-600">
                <SearchBox/>
            </div>

            <div className="relative">
                <DiaryGridList className="w-full" diaryList={diaryList}/>
            </div>
        </>
    )
}