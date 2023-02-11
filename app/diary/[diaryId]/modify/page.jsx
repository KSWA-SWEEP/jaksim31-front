import BackButton from "../../common/backButton";
import DiaryInputFormat from "../../common/diaryInputFormat";
import moment from "moment";
import { cookies } from "next/headers";

async function getDiaryData(diaryId, userId, atk, rtk) {
    
  let res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL+"/api/v1/diaries/"+userId+"/"+diaryId, 
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

export default async function diaryModify({ params }) {  

  const { diaryId } = params;
  const cookieStore = cookies();
  const userId = cookieStore.get('userId');
  const atk = cookieStore.get('atk');
  const rtk = cookieStore.get('rtk');
  const diary = await getDiaryData(diaryId, userId.value, atk.value, rtk.value);

  let date = diary.diaryDate;

  return (
    <>
      <div className="p-1 sm:p-4">
        <BackButton/>
        <div className="flex justify-center w-full">
          <div className="text-2xl font-extrabold text-center lg:text-3xl text-zinc-500 dark:text-zinc-100">
            일기 수정
          </div>
        </div>

        {/* 입력 구간 */}
        <div className="lg:px-28">
          <div className="m-6 text-2xl font-bold">
            {moment(date).format("YYYY. MM. DD.")} 
          </div>
          <div className="relative text-sm sm:text-lg">
            <div>
              <DiaryInputFormat diaryId={diaryId} diary={diary}/>
            </div>
          </div>      
        </div>
      </div>
    </>

  )
}