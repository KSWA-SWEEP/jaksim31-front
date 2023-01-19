import { useQuery } from "react-query";
import { getUserInfo } from "../../api/getUserInfo";

export const useUserInfoQuery = (userInfo) =>
    useQuery(
        ['USER_INFO'], 
        async () => {
            const response = await getUserInfo("63c78cb847558c27220ad503");
            return response.json();
        },
        { 
            cacheTime: 50000,
            staleTime: 50000,
            initialData: userInfo,
        }
    );