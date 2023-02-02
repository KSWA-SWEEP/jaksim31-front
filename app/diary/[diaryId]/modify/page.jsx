import BackButton from "../../common/backButton";
import DiaryInputFormat from "../../common/diaryInputFormat";
import moment from "moment";
import { getDiary } from "../../../api/getDiary";
import DiaryDate from "./date";

// async function getDiaryData(diaryId) {
//   const res = await getDiary(diaryId);

//   if (res.status != 200) {
//     throw new Error('Failed to fetch data');  
//   }

//   return res.json();
// }

export default async function diaryModify({ params }) {  

  const { diaryId } = params;
  // const diary = await getDiaryData(diaryId);  

  // let date = diary.diaryDate;

  return (
    <>
      <div className="p-1 sm:p-4">
        <BackButton/>
        <div className="flex justify-center w-full">
          <div className="text-2xl font-extrabold text-center lg:text-3xl text-zinc-500">
            일기 수정
          </div>
        </div>

        {/* 입력 구간 */}
        <div className="lg:px-28">
          <DiaryDate diaryId={diaryId}/>
          {/* <div className="m-6 text-2xl font-bold">
            {moment(date).format("YYYY. MM. DD.")} 
          </div> */}
          <div className="relative text-sm sm:text-lg">
            <div>
              {/* <DiaryInputFormat diaryId={diaryId} content={diary.content.toString()} date={date}/> */}
              <DiaryInputFormat diaryId={diaryId}/>
            </div>
          </div>      
        </div>
      </div>
    </>

  )
}