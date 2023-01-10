import BackButton from "../../common/backButton";
import DiaryInputFormat from "../../common/diaryInputFormat";
import diaryData from '../../../../public/data/dairy.json'

export default function diaryModify() {  
  const diary = diaryData;

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
            {diary.date} 
          </div>
          <div className="relative text-sm sm:text-lg">
            <div>
              <DiaryInputFormat Contents={diary.Contents.toString()} date={diary.date}/>
            </div>
          </div>      
        </div>
      </div>
    </>

  )
}