import DiaryGridList from "./gridList";
import SearchBox from "./SearchBox";

export default function gridList() {
    return (
        <>
            {/* 검색 영역 */}
            <div className="font-medium rounded-3xl bg-red-100/60 lg:mt-2 mt-5 lg:mb-5 lg:mx-16 mx-7 text-md text-zinc-600">
                <SearchBox/>
            </div>

            <div className="relative">
                <DiaryGridList className="w-full"/>
            </div>
        </>
    )
}