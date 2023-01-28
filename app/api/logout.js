export async function logout() {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/members/logout", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    });

    return res;
}