import React from "react";
import Link from "next/link";
import userData from "../../../public/data/user.json";

// components

export default function RecentDiaries() {
    const user = userData;


    return (
        <>
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words shadow-lg rounded-xl bg-zinc-100">
                <div className="px-4 py-3 mb-0 border-0 rounded-t">
                    <div className="flex flex-wrap items-center">
                        <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                            <h3 className="text-base font-semibold text-zinc-700">
                                최근 일기
                            </h3>
                        </div>
                        <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
                            {/*일기 전체 목록으로 이동*/}
                            <Link href={'diary/list/grid'}>
                                <button
                                    className="px-3 py-2 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-500 rounded outline-none active:bg-indigo-600 focus:outline-none"
                                    type="button"
                                >
                                    See all
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                                날짜
                            </th>
                            <th className="px-3 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                                감정
                            </th>
                            <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                                키워드
                            </th>
                            <th className="px-1 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-zinc-50 text-zinc-500 border-zinc-100 whitespace-nowrap">
                                바로가기
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*user정보에 들어있는 recent_diaries 한개씩 출력*/}
                        {   user.recent_diaries.map(({diary_id, date, emotion, keywords}) => (
                                <tr>
                                    <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                        {date}
                                    </th>
                                    <td className="p-4 px-3 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                        {emotion}
                                    </td>
                                    <td className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                        {keywords.map((value, i) => (<i className="mr-4 fas fa-arrow-up textarea-bordered">{value}{"   "}</i>))}
                                    </td>
                                    <td className="p-2 px-3 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                        {/*일기 조회 페이지로 이동*/}
                                        <Link href={'/diary/'+diary_id}>
                                            <button className="px-3 py-2 text-blue-900 bg-blue-100 border border-transparent rounded-md">
                                                조회하기
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
