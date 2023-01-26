export async function getUserInfoLoginId(loginId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/members?loginId=" + loginId)
    return res;
}