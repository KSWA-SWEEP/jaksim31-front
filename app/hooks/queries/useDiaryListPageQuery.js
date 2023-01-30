import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListPageQuery = (options) =>
    useQuery(
        ['DIARY_LIST', 'PAGES', (options.page).toString()], 
        async () => {

            let returnData = new Object();
            
            const response = await getDiaryList(options)
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
            staleTime: 5 * 60 * 1000,
        }
    );