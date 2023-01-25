export async function getDiaryList(userId, page, size) {
    let res;
    if((page != "") && (size != "")) {
        res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/diaries/"+userId+"?page="+page+"&size="+size);
    } else {
        res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/diaries/"+userId);
    }

    return res;
}