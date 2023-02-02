import { useMutation } from "react-query";
import { logout } from "../../api/logout";
import { updateUserInfo } from "../../api/updateUserInfo";

export const useUserInfoUpdate = (queryClient) =>
    useMutation(
        async ({data}) => {
            
            const response = await updateUserInfo(data)
            .then(resp => resp.status != 200 ? resp.json() : resp)
            .then(respData => {
                if(respData.errorCode) {
                    throw respData;
                }
            })
            
            return response;
        },
        {
            retry: false,
            onSuccess: async (response) => {
                alert("개인정보가 수정되었습니다 😊");
                queryClient.resetQueries(["USER_INFO"]);
            },
            onError: async (response) => {
                queryClient.resetQueries(["USER_INFO"]);
            }
        }
    );
