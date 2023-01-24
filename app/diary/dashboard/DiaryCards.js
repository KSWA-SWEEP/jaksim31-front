import userData from "../../../public/data/user.json";
import Link from "next/link";
// app/common/header/Profile에서 거의 다 가져왔지만 일부 수정하기 위해 component 따로 생성.
export default function UserProfile() {
    const user = userData;
    // 제일 최근 일기의 ID만 추출해서 /diary/ 뒤에 붙여줌.
    const firstDiary = "/diary/"+user.recent_diaries[0].diary_id;
    return (
        <>
            <div
                className="w-full max-w-md p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform bg-zinc-100 shadow-xl lg:max-w-lg rounded-xl">
                <div className="px-4 py-3 mb-0 border-0 rounded-t">
                    <div className="flex flex-wrap items-center">
                        <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                        <h2 className="text-2xl font-bold text-zinc-700">
                        최근 일기 📝
                        </h2>
                        </div>
                        {/* "See All" 버튼 */}
                        <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
                        <Link
                            className="px-3 py-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-500 rounded outline-none active:bg-indigo-600 focus:outline-none"
                            type="button"
                            href="/diary/list/grid"
                        >
                            See all
                        </Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col text-center justify-items-center'>
                    <br></br>
                    {/* 날짜 */}
                    <div className='text-xl font-extrabold text-zinc-700'>
                        {user.recent_diaries[0].diaryDate}
                    </div>
                    {/* 썸네일 사진 */}
                    <div className="justify-center m-5 avatar">
                        <Link 
                        className="w-50 rounded-xl"
                        type="button"
                        href={firstDiary}>
                            <img src={user.recent_diaries[0].thumbnail}/>
                        </Link>
                    </div>
                    {/* Keywords */}
                    <div className='flex flex-row justify-items-center align-middle'>
                                        {user.recent_diaries[0].keywords.map((keyword) => (
                                            <div key={keyword}
                                                 className="px-3 py-1 mb-1 mr-2 text-l align-middle font-medium w-fit text-zinc-500 bg-zinc-200 rounded-xl dark:bg-zinc-200 dark:text-zinc-800 ">
                                                #{keyword}
                                            </div>
                                        ))}
                                    </div>
                    <div className='w-full'>
                        <div className="grid grid-cols-3">
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
}