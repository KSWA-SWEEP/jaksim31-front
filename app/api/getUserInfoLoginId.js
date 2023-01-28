export async function getUserInfoLoginId(loginId) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/members?loginId=" + loginId)
    return res;
}