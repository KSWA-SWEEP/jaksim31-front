import { useMutation } from "react-query";
import { login } from "../../api/login";

export const useLogin = (queryClient) => 
    useMutation(
        async ({data}) => {
            
            const response = await login(data)
            .then(resp => resp.status != 200 ? resp.json() : resp)
            .then(respData => {
                if(respData.errorCode) {
                    throw respData;
                }
            })

            return response;
        },
        {   
            onError: async (response) => {
                if(response == undefined) {
                    alert("로그인에 실패하였습니다😥\n회원 가입하시거나 올바른 비밀번호를 입력해주세요!")
                } else { 
                    alert(response.errorMessage+"😥")
                }
            }
        }
    );

