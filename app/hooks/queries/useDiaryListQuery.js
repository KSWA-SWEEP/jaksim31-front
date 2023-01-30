import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListQuery = (options) =>
    useQuery(
        ['DIARY_LIST',(((options != undefined)&&(options.startDate != undefined))? (options.startDate.substr(0, 7)) : (""))], 
        async () => {
            const response = await getDiaryList(options);
            return response.json()
        },
        {
            staleTime: 5 * 60 * 1000,
        }
    );