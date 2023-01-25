import { setCookie, getCookie } from "cookies-next";
import { Router, useRouter } from "next/router";
import { useMutation } from "react-query";
import { getUserInfoLoginId } from "../../api/getUserInfoLoginId";
import { login } from "../../api/login";

export const useLogin = (queryClient) => 
    useMutation(
        ({data}) => login(data),
        {   
            onSuccess: (data) => {

                queryClient.invalidateQueries(["USER_INFO"]);

                // 토큰 데이터 저장
                queryClient.setQueryData(
                    ["TOKEN"], 
                    {"grantType" : data.grantType, "accessToken" : data.accessToken, "refreshToken" : data.refreshToken, "expTime" : data.expTime}
                );

                // loginId 쿠키 저장
                setCookie("loginId", data.loginId, {path: "/", maxAge: 60 * 60 * 24, sameSite: true});
                
                // loginId 기반 유저 정보 호출해서, userId 쿠키 저장
                getUserInfoLoginId(data.loginId)
                    .then(resp => resp.json())
                    .then(respData => {
                    setCookie("userId", respData.userId, {path: "/", maxAge: 60 * 60 * 24, sameSite: true});
                    });
                
                // TODO: emotion count 값 가져오기
            },
            onError: async (response) => {
                alert(response)
            }
        }
    );

