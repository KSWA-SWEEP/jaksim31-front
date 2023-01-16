import DiaryGridList from "./gridList";
import SearchBox from "./SearchBox";

export default function gridList() {
    return (
        <>
            {/* 검색 영역 */}
            <div className="mx-auto mt-5 font-medium rounded-3xl bg-red-100/60 lg:mt-2 lg:mb-5 sm:mx-6 lg:mx-8 text-md text-zinc-600">
                <SearchBox/>
            </div>

            <div className="relative">
                <DiaryGridList className="w-full"/>
            </div>
        </>
    )
}