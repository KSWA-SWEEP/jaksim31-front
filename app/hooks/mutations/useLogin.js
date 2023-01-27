import { useMutation } from "react-query";
import { login } from "../../api/login";

export const useLogin = (queryClient) => 
    useMutation(
        ({data}) => login(data),
        {   
            onError: async (response) => {
                alert(response)
            }
        }
    );

