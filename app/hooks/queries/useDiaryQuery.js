import { useQuery } from "react-query";
import { getDiary } from "../../api/getDiary";

export const useDiaryQuery = (diaryId, diary) =>
    useQuery(
        ['DIARY', diaryId], 
        async () => {
            const response = await getDiary("63c78cb847558c27220ad503", diaryId);

            if (!response.status != 200) {
                throw new Error('Failed to fetch data');
            }
            return response.json()
        },
        {
            initialData: diary,
            staleTime: 60 * 1000,
        }
    );