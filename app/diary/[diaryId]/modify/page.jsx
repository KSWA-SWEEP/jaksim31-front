import BackButton from "../../common/backButton";
import DiaryInputFormat from "../../common/diaryInputFormat";
import diaryData from '../../../../public/data/dairy.json'
import moment from "moment";

export default function diaryModify() {  
  const diary = diaryData;
  let date = diary.date;

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
          <div className="m-6 text-2xl font-bold">
            {moment(date).format("YYYY. MM. DD.")} 
          </div>
          <div className="relative text-sm sm:text-lg">
            <div>
              <DiaryInputFormat content={diary.content.toString()} date={date}/>
            </div>
          </div>      
        </div>
      </div>
    </>

  )
}