import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListQuery = (diaryList, size) =>
    useQuery(
        ['DIARY_LIST'], 
        async () => {
            const response = await getDiaryList("63c78cb847558c27220ad503", "0", size);
            return response.json()
        },
        {
            initialData: diaryList,
            staleTime: 5 * 60 * 1000,
        }
    );