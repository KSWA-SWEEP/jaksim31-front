import { useQuery } from "react-query";

export const useTokenQuery = (grantType, accessToken, refreshToken, expTime) =>
    useQuery(
        ['TOKEN'], 
        () => {
            let data = new Object();
            data.grantType = grantType;
            data.accessToken = accessToken;
            data.refreshToken = refreshToken;
            data.expTime = expTime;
            return data;
        },
        { 
            cacheTime: 5 * 60 * 1000
        }
    );