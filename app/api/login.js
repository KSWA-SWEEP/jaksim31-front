export async function login(data) {

    let returnData = new Object();

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/members/login", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(respData => {
        if(respData.errorMessage) {     // 로그인 요청 시 에러 발생한 경우
            throw new Error(respData.errorMessage);
        }
        // console.log(respData)
        returnData = respData;
    });

    return returnData;
}