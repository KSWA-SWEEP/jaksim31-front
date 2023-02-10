import { cookies } from "next/headers";
import DiaryGridList from "./gridList";

async function getDiaryListData(userId, atk, rtk) {
    let res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL+"/api/v1/diaries/"+userId+"?page=0&size=6", 
        {
            cache : 'no-store', 
            headers: {
                Cookie: `atk=${atk}; rtk=${rtk};`
            }
        }
    );
    
    if (res.status != 200) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function gridList() {
    const cookieStore = cookies();
    const userId = cookieStore.get('userId');
    const atk = cookieStore.get('atk');
    const rtk = cookieStore.get('rtk');
    const diaryList = await getDiaryListData(userId.value, atk.value, rtk.value);

    return (
        <>
            <div className="relative">
                {/* <DiaryGridList className="w-full" /> */}
                <DiaryGridList className="w-full" diaryList={diaryList}/>
            </div>
        </>
    )
}