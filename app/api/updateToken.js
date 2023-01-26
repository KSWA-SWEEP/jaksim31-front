export async function updateToken(data, userId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/members/" + userId + "/reissue", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return res;
}