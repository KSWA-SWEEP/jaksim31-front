import { useMutation } from "react-query";
import { updateUserInfo } from "../../api/updateUserInfo";

export const useUserInfoUpdate = (queryClient) =>
    useMutation(
        async ({data}) => {

            let returnData = new Object();
            
            const response = await updateUserInfo(data)
            .then(resp => resp.json())
            .then(respData => {
                if(respData.errorCode) {
                    throw respData.errorCode;
                }

                returnData = respData;
            })

            return returnData;
        },
        {
            onSuccess: async (response) => {
                alert("개인정보가 수정되었습니다 😊");
                queryClient.invalidateQueries(["USER_INFO"]);
            },
            onError: async (response) => {
                alert(response);
            }
        }
    );
