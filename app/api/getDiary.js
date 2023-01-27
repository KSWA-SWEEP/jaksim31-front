export async function getDiary(userId, diaryId) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/diaries/"+userId+"/"+diaryId);
    return res;
}