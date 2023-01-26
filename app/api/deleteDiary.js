export async function deleteDiary(userId, diaryId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/diaries/"+userId+"/"+diaryId, {
        method:"DELETE"
    });
    return res;
}