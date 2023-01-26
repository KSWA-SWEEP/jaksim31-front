import { useQuery } from "react-query";
import { getUserInfo } from "../../api/getUserInfo";

export const useUserInfoQuery = (userId, userInfo) =>
    useQuery(
        ['USER_INFO'], 
        async () => {
            const response = await getUserInfo(userId);
            return response.json();
        },
        { 
            initialData: userInfo,
            cacheTime: 5 * 60 * 1000,
            staleTime: 5 * 60 * 1000,
        }
    );