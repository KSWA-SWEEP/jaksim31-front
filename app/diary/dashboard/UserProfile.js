import userData from "../../../public/data/user.json";

// app/common/header/Profile에서 거의 다 가져왔지만 일부 수정하기 위해 component 따로 생성.
export default function UserProfile() {
    const user = userData;
    return (
        <>
            <div
                className="w-full max-w-md p-6 pt-4 mb-6 overflow-hidden text-left align-middle transition-all transform bg-zinc-100 shadow-xl lg:max-w-lg rounded-xl">
                <h2 className="text-xl font-semibold text-zinc-700">
                My Profile🙋
                </h2>
                <div className='flex flex-col text-center justify-items-center'>
                    {/* 프로필 사진 */}
                    <div className="justify-center m-5 avatar">
                        <div className="w-32 rounded-full">
                            <img src={user.profile_photo}/>
                        </div>
                    </div>
                    {/* 이름 */}
                    <div className='text-3xl font-extrabold text-zinc-700'>
                        {user.name}
                    </div>
                    
                    {/* divider */}
                    <div className="my-6 border-b-2"></div>
                    <div className='w-full'>
                        <div className="grid grid-cols-3">
                            {/* 총 작성한 일기 수 */}
                            <div className='col-span-3 mb-1 sm:col-span-1'>
                                <div className="mb-1 text-lg text-zinc-600">
                                    작성한<br></br>일기장들
                                </div>
                                <div className='text-3xl font-bold'>
                                    {user.diary_total}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
}