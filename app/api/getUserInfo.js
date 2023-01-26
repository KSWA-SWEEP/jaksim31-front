import { getCookie } from "cookies-next";

export async function getUserInfo() {

    const userId = getCookie("userId");
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/members/" + userId)
    return res;
}