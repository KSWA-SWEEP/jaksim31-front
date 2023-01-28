export async function checkIsMember(data) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/members/", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return res;
}