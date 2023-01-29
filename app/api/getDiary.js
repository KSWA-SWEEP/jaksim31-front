import { getCookie } from "cookies-next";

export async function getDiary(diaryId) {

    const userId = getCookie("userId");
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/diaries/"+userId+"/"+diaryId);
    return res;
}