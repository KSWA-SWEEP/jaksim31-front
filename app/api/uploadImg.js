import { getKakaoApiAccessKey } from "./getKakaoApiAccessKey";
import { getCookie } from "cookies-next";

export async function uploadImg(content, option, extension) {

    const userId = getCookie("userId");

    // api accesskey 발급
    const apiKey = await getKakaoApiAccessKey().then(resp => resp = resp);
    
    // 프로필 이미지의 경우 이미지 형식이 다를 수 있음 - 확장자 설정
    let contentType = (((extension == undefined)||(extension == "")) ? 'image/jpeg' : extension);

    // 파일 저장하는 경로 및 이름 썸네일의 경우 YYYY-MM-DD.jpeg | 프로필 이미지의 경우 profile.(확장자)
    let path = userId+'/'+option+((extension == undefined) ? '.jpeg' : '.'+extension.replace('image/', ''));

    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL+'/kic-upload/'+path, 
        {
            method:"PUT",
            headers: {
                'X-Auth-Token' : apiKey,
                'Content-Type' : contentType,
                'Transfer-Encoding' : 'gzip',
            },
            body: content,
            credentials: 'omit', 
        }
    );

    return res;
}