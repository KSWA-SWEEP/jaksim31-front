import { useMutation } from "react-query";
import { updateUserInfo } from "../../api/updateUserInfo";

export const useUserInfoUpdate = (queryClient) =>
    useMutation(
        async ({data}) => {
            const response = await updateUserInfo(data);
        },
        {
            onSuccess: async (response) => {
                queryClient.invalidateQueries(["USER_INFO"]);
            }
        }
    );
