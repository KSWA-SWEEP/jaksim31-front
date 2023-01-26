import { useMutation } from "react-query";
import { updateToken } from "../../api/updateToken";

export const useTokenUpdate = (userId, queryClient) =>
    useMutation(
        ({data}) => updateToken(data, userId),
        {
            onSuccess: (data) => {
                queryClient.setQueryData(
                    ["TOKEN"], 
                    {"grantType" : data.grantType, "accessToken" : data.accessToken, "refreshToken" : data.refreshToken, "expTime" : data.expTime}
                );
            }
        }
    );
