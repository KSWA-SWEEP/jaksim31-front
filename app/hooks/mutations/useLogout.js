import { deleteCookie } from "cookies-next";
import { useMutation } from "react-query";
import { logout } from "../../api/logout";

export const useLogout = (queryClient) => 
    useMutation(
        logout,
        {   
            onSuccess: () => {
                queryClient.removeQuries(["USER_INFO"]);
            }
        }
    );

