import { getCookie, setCookie } from "cookies-next";
import { useMutation } from "react-query";
import { deleteDiary } from "../../api/deleteDiary";

export const useDiaryDelete = (diaryId, queryClient) =>
    useMutation(
        async () => {
            const response = await deleteDiary(diaryId);
        },
        {
            onSuccess: async (response) => {
                let todayDiaryId = getCookie('todayDiaryId');
                if(diaryId == todayDiaryId)
                {
                    setCookie('todayDiaryId', "");
                }
                queryClient.resetQueries(["DIARY_LIST"]);
                queryClient.resetQueries(["USER_INFO"]);
            }
        }
    );