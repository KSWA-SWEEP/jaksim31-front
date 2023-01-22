export async function updateUserInfo(data, userId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/members/" + userId, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return res;
}