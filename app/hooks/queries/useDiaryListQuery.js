import { useQuery } from "react-query";
import { getDiaryList } from "../../api/getDiaryList";

export const useDiaryListQuery = () =>
    useQuery(
        ['DIARY_LIST'], 
        async () => {
            const response = await getDiaryList("63c0cc06645d5d4a0786cea8");

            if (!response.ok) {
            throw new Error('Failed to fetch data');
            }
            return response.json()
        },
        { 
            staleTime: 20 * 1000,
        }
    );