import { getCookie } from "cookies-next";

export async function getUserInfo() {

    const userId = getCookie("userId");
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/members/" + process.env.NEXT_PUBLIC_USER_ID)
    return res;
}