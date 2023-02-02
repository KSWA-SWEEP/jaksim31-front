import { getCookie, setCookie } from "cookies-next";
import { useMutation } from "react-query";
import { deleteDiary } from "../../api/deleteDiary";

export const useDiaryDelete = (diaryId, queryClient) =>
    useMutation(
        async () => {
            
            const response = await deleteDiary(diaryId)
            .then(resp => resp.status != 200 ? resp.json() : resp)
            .then(respData => {
                if(respData.errorCode) {
                    throw respData;
                }
            })
            
            return response;
        },
        {
            onSuccess: async (response) => {
                let todayDiaryId = getCookie('todayDiaryId');
                if(diaryId == todayDiaryId)
                {
                    setCookie('todayDiaryId', "");
                }
            }, 
            onError: async (response) => {
                alert(response.errorMessage+"😥");
            }
        }
    );