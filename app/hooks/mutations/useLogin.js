import { setCookie } from "cookies-next";
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

                // refreshToken 쿠키에 저장
                setCookie("refreshToken", data.refreshToken, {path: "/", sameSite: "lax"});
                
                // TODO: 유저 정보 조회 관련 API 수정되면, userId 기반 API 호출 예정
                // loginId 기반 유저 정보 호출해서, userId 쿠키 저장
                getUserInfoLoginId(data.loginId)
                    .then(resp => resp.json())
                    .then(respData => {
                    setCookie("userId", respData.userId, {path: "/", sameSite: "lax"});
                    });
                
                // TODO: emotion count 값 가져오기
            },
            onError: async (response) => {
                alert(response)
            }
        }
    );

