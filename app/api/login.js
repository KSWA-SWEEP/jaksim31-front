export async function login(data) {

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/v0/members/login", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    return res;
}