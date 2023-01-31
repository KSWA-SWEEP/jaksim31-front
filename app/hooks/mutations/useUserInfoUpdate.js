import { useMutation } from "react-query";
import { updateUserInfo } from "../../api/updateUserInfo";

export const useUserInfoUpdate = (queryClient) =>
    useMutation(
        async ({data}) => {
            
            const response = await updateUserInfo(data)
            .then(resp => resp.status != 200 ? resp.json() : resp)
            .then(respData => {
                if(respData.errorCode) {
                    throw respData.errorCode;
                }
            })

            return response;
        },
        {
            onSuccess: async (response) => {
                queryClient.refetchQueries(["USER_INFO"]);
            }
        }
    );
