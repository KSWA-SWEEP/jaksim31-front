import { useQuery } from "react-query";
import { getEmotionCount } from "../../api/getEmotionCount";

export const useEmotionCountQuery = (options, key, emotionCount) =>
    useQuery(
        ['EMOTION_COUNT', key], 
        async () => {

            let returnData = new Object();

            const response = await getEmotionCount(options)
            .then(resp => resp.json())
            .then(respData => {
                if(respData.errorCode) {
                    throw respData;
                }

                returnData = respData;
            })

            return returnData;
        },
        { 
            initialData: emotionCount,
            retry: false,
            cacheTime: 10 * 60 * 1000,
            staleTime: 10 * 60 * 1000,
        }
    );