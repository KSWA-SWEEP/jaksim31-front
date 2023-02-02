export async function addDiary(data) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v1/diaries", {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res;
}