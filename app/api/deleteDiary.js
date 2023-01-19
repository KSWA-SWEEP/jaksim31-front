export async function deleteDiary(diaryId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/diaries/"+diaryId, {
        method:"DELETE"
    });
    return res;
}