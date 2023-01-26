import { useMutation } from "react-query";
import { updateUserInfo } from "../../api/updateUserInfo";

export const useUserInfoUpdate = (userId, queryClient) =>
    useMutation(
        async ({data}) => {
            const response = await updateUserInfo(data, userId);
        },
        {
            onSuccess: async (response) => {
                queryClient.invalidateQueries(["USER_INFO"]);
            }
        }
    );
