import DiaryInputFormat from "../../common/diaryInputFormat";
import Link from "next/link";

const CreateDiary = (props) => {

  // decoode date
  let date = atob(unescape(decodeURIComponent(props.date)))

  // 받은 date가 숫자 형식이 맞는지 확인
  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }
  
  // 받은 date가 날짜 형식이 맞는지 확인
  function dateIsValid(value) {
    return value instanceof Date;
  }

  return (
    <>
      {
        // date가 날짜가 아닐 경우 감지
        (isNumeric(date) && dateIsValid(new Date(date)))
        ?
        <>
          <div className="relative flex m-6 text-2xl font-bold">
            <div>
              {/* YYYY. MM. DD. 형식으로 date 표시 */}
              {date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1. $2. $3.')}
            </div>
          </div>
          <div className="relative text-sm sm:text-lg">
            <div>
              <DiaryInputFormat date={date}/>
            </div>
          </div>  
        </>
        :
        <div className="flex flex-col items-center justify-center w-full">
          <div className="my-5 text-lg">
            날짜가 잘못되었습니다. 
          </div>
          <Link href="diary/list/calendar" className="mx-2 mb-4 text-base font-semibold duration-200 border-opacity-0 outline-none text-zinc-50 bg-zinc-400 hover:bg-zinc-500 btn outline-0 border-spacing-0 hover:scale-105">목록으로</Link>
        </div>
      }
          
    </>
  );
};
  
export default CreateDiary;
  