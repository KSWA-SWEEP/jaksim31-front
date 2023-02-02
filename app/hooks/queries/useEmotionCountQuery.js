import { useQuery } from "react-query";
import { getEmotionCount } from "../../api/getEmotionCount";

export const useEmotionCountQuery = (options, key) =>
    useQuery(
        ['EMOTION_COUNT', key], 
        async () => {

            let returnData = new Object();

            const response = await getEmotionCount(options)
            .then(resp => resp.json())
            .then(respData => {
                if(respData.errorCode) {
                    throw respData.errorCode;
                }

                returnData = respData;
            })

            return returnData;
        },
        { 
            retry: false,
            cacheTime: 10 * 60 * 1000,
            staleTime: 10 * 60 * 1000,
        }
    );