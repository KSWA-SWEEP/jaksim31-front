import { getCookie } from "cookies-next";

export async function updateUserInfo(data) {

    const userId = getCookie("userId");
    
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v1/members/" + userId, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return res;
}