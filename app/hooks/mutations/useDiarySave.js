import moment from "moment";
import { useMutation } from "react-query";
import { addDiary } from "../../api/addDiary";
import { modifyDiary } from "../../api/modifyDiary";
import { setCookie } from "cookies-next";

export const useDiarySave = (queryClient, saveType, diaryId) =>
    useMutation(
        async ({data}) => {

            let response = await (saveType === "create" ? addDiary(data) : modifyDiary(data, diaryId))
            .then(resp => ((saveType === "create" ? resp.status != 201 : resp.status != 200) ? resp.json() : resp))
            .then(respData => {
                if(respData.errorCode) {
                    throw respData;
                }
            })

            return response;

        },
        {
            onError: async (data) => {
              alert(data.errorMessage+"😥");
              queryClient.invalidateQueries(["DIARY_LIST"]);
              queryClient.invalidateQueries(["USER_INFO"]);
              queryClient.invalidateQueries(["EMOTION_COUNT"]);
            },
        }
    );