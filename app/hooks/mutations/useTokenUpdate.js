import { useMutation } from "react-query";
import { updateToken } from "../../api/updateToken";

export const useTokenUpdate = (queryClient) =>
    useMutation(
        ({data}) => updateToken(data),
        {
            onSuccess: (data) => {
                queryClient.setQueryData(
                    ["TOKEN"], 
                    {"grantType" : data.grantType, "accessToken" : data.accessToken, "refreshToken" : data.refreshToken, "expTime" : data.expTime}
                );
            }
        }
    );
