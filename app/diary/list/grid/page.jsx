import { cookies } from "next/headers";
import DiaryGridList from "./gridList";

export default async function gridList() {

    return (
        <>
            <div className="relative">
                <DiaryGridList className="w-full" />
            </div>
        </>
    )
}