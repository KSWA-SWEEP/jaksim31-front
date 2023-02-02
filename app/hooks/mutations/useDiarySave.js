import moment from "moment";
import { useMutation } from "react-query";
import { addDiary } from "../../api/addDiary";
import { modifyDiary } from "../../api/modifyDiary";
import { setCookie } from "cookies-next";

export const useDiarySave = (queryClient, saveType, diaryId) =>
    useMutation(
        async ({data}) => {

            let returnData = new Object();

            let response = await (saveType === "create" ? addDiary(data) : modifyDiary(data, diaryId))
            .then(resp => resp.json())
            .then(respData => {
                if(respData.errorCode) {
                    throw respData;
                }
                returnData = respData;
            })

            return returnData;

        },
        {
            onSuccess: async (data) => {
                let today = moment(new Date()).format("YYYY-MM-DD");

                if(data.diaryDate == today)
                {
                    setCookie('todayDiaryId', data.diaryId);
                }
            },
            onError: async (data) => {
              alert(data.errorMessage+"😥");
            },
        }
    );