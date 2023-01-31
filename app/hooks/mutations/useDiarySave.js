import moment from "moment";
import { useMutation } from "react-query";
import { addDiary } from "../../api/addDiary";
import { modifyDiary } from "../../api/modifyDiary";
import { setCookie } from "cookies-next";

export const useDiarySave = (queryClient, saveType, diaryId) =>
    useMutation(
        async ({data}) => {

            let response;

            // 일기 생성
            if (saveType === "create")
            {
                response = await addDiary(data);
            }  
            // 일기 수정
            else {
                response = await modifyDiary(data, diaryId);
            }

            return response.json();
        },
        {
            onSuccess: async (data) => {
                let today = moment(new Date()).format("YYYY-MM-DD");

                if(data.diaryDate == today)
                {
                    setCookie('todayDiaryId', data.diaryId);
                }
                queryClient.invalidateQueries(["DIARY_LIST"]);
                queryClient.invalidateQueries(["EMOTION_COUNT"]);
            }
        }
    );