export async function modifyDiary(data, diaryId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/diaries/"+diaryId, {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res;
}