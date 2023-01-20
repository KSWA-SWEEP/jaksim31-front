import BackButton from "../../common/backButton";
import DiaryInputFormat from "../../common/diaryInputFormat";
import moment from "moment";
import { getDiary } from "../../../api/getDiary";

async function getDiaryData(diaryId) {
  // TODO
  // 로그인시 가져온 userId (db의 objectId) 를 쿠키 or Local Storage로부터 가져와서 넣어주기
  // 지금은 test 용 하나의 userId 하드코딩으로 넣어줌..
  const res = await getDiary("63c78cb847558c27220ad503", diaryId);

  if (res.status != 200) {
    throw new Error('Failed to fetch data');  
  }

  return res.json();
}

export default async function diaryModify({ params }) {  

  const { diaryId } = params;
  const diary = await getDiaryData(diaryId);  

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
              <DiaryInputFormat diaryId={diaryId} content={diary.content.toString()} date={date}/>
            </div>
          </div>      
        </div>
      </div>
    </>

  )
}