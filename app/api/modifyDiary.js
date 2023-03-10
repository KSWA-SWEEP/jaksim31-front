export async function modifyDiary(data, diaryId) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v1/diaries/"+diaryId, {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res;
}