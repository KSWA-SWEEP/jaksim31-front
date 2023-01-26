import { useMutation } from "react-query";
import { deleteDiary } from "../../api/deleteDiary";

export const useDiaryDelete = (diaryId, queryClient) =>
    useMutation(
        async () => {
            const response = await deleteDiary(process.env.NEXT_PUBLIC_USER_ID, diaryId);
        },
        {
            onSuccess: async (response) => {
                queryClient.invalidateQueries(["DIARY_LIST"]);
                queryClient.removeQueries(["DIARY", diaryId]);
            }
        }
    );