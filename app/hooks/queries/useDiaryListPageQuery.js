import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListPageQuery = (options) =>
    useQuery(
        ['DIARY_LIST', (options.page).toString()], 
        async () => {
            const response = await getDiaryList(options);
            return response.json()
        }
    );