export async function getUserInfo(userId) {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+"/v0/members/"+`${userId}`)
                        // .then(res => res.json())
                        // .then(data => console.log(data))
                        // .catch(e => console.log(e));
    return res;
}