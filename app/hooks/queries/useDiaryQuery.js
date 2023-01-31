import { useQuery } from "react-query";
import { getDiary } from "../../api/getDiary";

export const useDiaryQuery = (diaryId) =>
    useQuery(
        ['DIARY', diaryId], 
        async () => {

            let returnData = new Object();
            
            const response = await getDiary(diaryId)
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
            staleTime: 60 * 1000,
            enabled: !!diaryId,
        }
    );