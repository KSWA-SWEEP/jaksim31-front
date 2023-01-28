import { getCookie, setCookie } from "cookies-next";
import { useMutation } from "react-query";
import { deleteDiary } from "../../api/deleteDiary";

export const useDiaryDelete = (diaryId, queryClient) =>
    useMutation(
        async () => {
            const response = await deleteDiary(process.env.NEXT_PUBLIC_USER_ID, diaryId);
        },
        {
            onSuccess: async (response) => {
                let todayDiaryId = getCookie('todayDiaryId');
                if(diaryId == todayDiaryId)
                {
                    setCookie('todayDiaryId', "");
                }
                queryClient.invalidateQueries(["DIARY_LIST"]);
                queryClient.removeQueries(["DIARY", diaryId]);
            }
        }
    );