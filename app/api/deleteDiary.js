import { getCookie } from "cookies-next";

export async function deleteDiary(diaryId) {
    
    const userId = getCookie("userId");
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/diaries/"+userId+"/"+diaryId, {
        method:"DELETE"
    });
    return res;
}