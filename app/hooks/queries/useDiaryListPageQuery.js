import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListPageQuery = (page, size) =>
    useQuery(
        ['DIARY_LIST', page], 
        async () => {
            const response = await getDiaryList(process.env.NEXT_PUBLIC_USER_ID, page, size);
            return response.json()
        },
        {
            staleTime: 5 * 60 * 1000,
        }
    );