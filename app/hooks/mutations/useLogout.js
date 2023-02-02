import { deleteCookie } from "cookies-next";
import { useMutation } from "react-query";
import { logout } from "../../api/logout";

export const useLogout = (queryClient) => 
    useMutation(
        logout,
        {   
            retry: false,
            onSuccess: () => {
                alert("로그아웃 되었습니다 😊");
                    
                // landing page로 이동
                window.location.href = "/home/landing";
                queryClient.removeQuries(["USER_INFO"]);
            }
        }
    );

