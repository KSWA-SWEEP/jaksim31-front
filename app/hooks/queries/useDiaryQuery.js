import { useQuery } from "react-query";
import { getDiary } from "../../api/getDiary";

export const useDiaryQuery = (diaryId) =>
    useQuery(
        ['DIARY', diaryId], 
        async () => {
            const response = await getDiary(diaryId);

            // if (!response.status != 200) {
            //     throw new Error('Failed to fetch data');
            // }

            return response.json()
        },
        {
            staleTime: 60 * 1000,
            enabled: !!diaryId,
        }
    );