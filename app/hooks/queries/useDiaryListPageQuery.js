import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListPageQuery = (options) =>
    useQuery(
        ['DIARY_LIST', 'PAGES', (options.page).toString()], 
        async () => {
            const response = await getDiaryList(options);
            return response.json()
        },
        {
            staleTime: 5 * 60 * 1000,
        }
    );