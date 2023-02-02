import { deleteCookie } from "cookies-next";
import { useMutation } from "react-query";
import { logout } from "../../api/logout";

export const useLogout = (queryClient) => 
    useMutation(
        logout,
        {   
            retry: false,
            onSuccess: () => {
                queryClient.removeQuries(["USER_INFO"]);
            }
        }
    );

