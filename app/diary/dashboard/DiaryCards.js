import userData from "../../../public/data/user.json";

// app/common/header/Profile에서 거의 다 가져왔지만 일부 수정하기 위해 component 따로 생성.
export default function UserProfile() {
    const user = userData;
    return (
        <>
            <div
                className="w-full max-w-md p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform bg-zinc-100 shadow-xl lg:max-w-lg rounded-xl">
                <h2 className="text-xl font-semibold text-zinc-700">
                최근 일기 📝
                </h2>
                <div className='flex flex-col text-center justify-items-center'>
                    {/* 프로필 사진 */}
                    <div className="justify-center m-5 avatar">
                        <div className="w-32 rounded-xl">
                            <img src={user.recent_diaries[0].thumbnail}/>
                        </div>
                    </div>
                    {/* 이름 */}
                    <div className='text-xl font-extrabold text-zinc-700'>
                        {user.recent_diaries[0].date}
                    </div>
                    <br></br>
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