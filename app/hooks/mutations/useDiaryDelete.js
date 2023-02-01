import { getCookie, setCookie } from "cookies-next";
import { useMutation } from "react-query";
import { deleteDiary } from "../../api/deleteDiary";

export const useDiaryDelete = (diaryId, queryClient) =>
    useMutation(
        async () => {

            let returnData = new Object();
            
            const response = await deleteDiary(diaryId)
            .then(resp => resp.json())
            .then(respData => {
                if(respData.errorCode) {
                    throw respData.errorCode;
                }

                returnData = respData;
            })

            return returnData;
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