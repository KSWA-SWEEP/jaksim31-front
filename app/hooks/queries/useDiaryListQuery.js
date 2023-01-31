import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListQuery = (options) =>
    useQuery(
        ['DIARY_LIST',(((options != undefined)&&(options.startDate != undefined))? (options.startDate.substr(0, 7)) : (""))], 
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