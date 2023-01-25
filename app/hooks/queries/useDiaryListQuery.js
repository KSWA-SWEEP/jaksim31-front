import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListQuery = (diaryList, page, size) =>
    useQuery(
        ['DIARY_LIST'], 
        async () => {
            const response = await getDiaryList(process.env.NEXT_PUBLIC_USER_ID, page, size);
            return response.json()
        },
        {
            initialData: diaryList,
            staleTime: 5 * 60 * 1000,
        }
    );