export async function getDiary(diaryId) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/diaries/"+process.env.NEXT_PUBLIC_USER_ID+"/"+diaryId);
    return res;
}