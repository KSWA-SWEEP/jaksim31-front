import BackButton from "../../common/backButton";
import DiaryInputFormat from "../../common/diaryInputFormat";
import diaryData from '../../../../public/data/dairy.json'

export default function diaryModify() {  
  const diary = diaryData;
  let date = diary.date;
  
  // 일기 작성 페이지와 형식 맞추기 위해 가져온 데이터의 date(ISODate 형식)를 YYYYMMDD로 변환
  date = date.split("T")[0];
  date = date.replace(/-/g, '');

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
            {date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1. $2. $3.')} 
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