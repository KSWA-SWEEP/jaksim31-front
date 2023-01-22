export async function checkPassword(data, loginId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/members/" + loginId + "/password", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return res;
}