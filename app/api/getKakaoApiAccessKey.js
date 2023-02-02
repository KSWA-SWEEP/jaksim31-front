export async function getKakaoApiAccessKey() {
    
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL+'/kic-api-auth', 
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "auth": {
                    "identity": {
                        "methods": [
                            "application_credential"
                        ],
                        "application_credential": {
                            "id": process.env.NEXT_PUBLIC_KAKAO_API_AUTH_ACCESSKEY,
                            "secret": process.env.NEXT_PUBLIC_KAKAO_API_AUTH_SECRET
                        }
                    }
                }
            })
        }
    );

    return res.headers.get('x-subject-token');
}