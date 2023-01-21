import { useMutation } from "react-query";
import { addDiary } from "../../api/addDiary";
import { modifyDiary } from "../../api/modifyDiary";

export const useDiarySave = (queryClient, saveType, diaryId) =>
    useMutation(
        async ({data}) => {
            // 일기 생성의 경우
            if (saveType === "create")
            {
                const response = await addDiary(data);
            }  
            else {
                const response = await modifyDiary(data, diaryId);
            }
        },
        {
            onSuccess: async (response) => {
                queryClient.invalidateQueries(["DIARY_LIST"]);
            }
        }
    );