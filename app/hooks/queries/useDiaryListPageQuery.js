import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListPageQuery = (options, diaryList) =>
    useQuery(
        ['DIARY_LIST', 'PAGES', (options.page).toString()], 
        async () => {

            let returnData = new Object();
            
            const response = await getDiaryList(options)
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
            initialData: diaryList,
            retry: false,
            staleTime: 5 * 60 * 1000,
        }
    );