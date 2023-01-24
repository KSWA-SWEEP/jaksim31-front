import { useQuery } from "react-query";
import { getUserInfo } from "../../api/getUserInfo";

export const useUserInfoQuery = (userInfo) =>
    useQuery(
        ['USER_INFO'], 
        async () => {
            const response = await getUserInfo(process.env.NEXT_PUBLIC_USER_ID);
            return response.json();
        },
        { 
            cacheTime: 50000,
            staleTime: 50000,
            initialData: userInfo,
        }
    );