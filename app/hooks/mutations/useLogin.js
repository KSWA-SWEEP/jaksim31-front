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
                alert(response.errorMessage+"😥")
            }
        }
    );

