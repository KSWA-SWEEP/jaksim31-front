export async function getDiaryList(userId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/diaries/"+`${userId}`);
    return res;
}