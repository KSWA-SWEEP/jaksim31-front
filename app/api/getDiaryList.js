export async function getDiaryList(options) {

    // options에 담긴 리스트 옵션 parameter로 변환 => key가 존재하며, 값이 비어있지 않은 경우에만 붙이기
    let params = "?";
    for (const [key, value] of Object.entries(options)) {
        if((value.toString() != "") && (value.toString() != undefined))
            params = params+"&"+key+"="+value
    }

    let res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/diaries/"+process.env.NEXT_PUBLIC_USER_ID+params);

    return res;
}