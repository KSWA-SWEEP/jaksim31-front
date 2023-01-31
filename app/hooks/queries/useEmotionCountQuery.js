import { useQuery } from "react-query";
import { getEmotionCount } from "../../api/getEmotionCount";

export const useEmotionCountQuery = (options) =>
    useQuery(
        ['EMOTION_COUNT'], 
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
            cacheTime: 5 * 60 * 1000,
            staleTime: 5 * 60 * 1000,
        }
    );