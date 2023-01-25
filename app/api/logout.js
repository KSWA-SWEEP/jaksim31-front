export async function logout() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/members/logout", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
    });

    return res;
}