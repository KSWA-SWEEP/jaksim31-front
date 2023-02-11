import { render, screen, waitFor} from "@testing-library/react";
import CreateDiary from "../../app/diary/create/[date]/createDiary";
import { QueryClient, QueryClientProvider } from "react-query";
import { act } from 'react-dom/test-utils';
import 'intersection-observer';

const queryClient = new QueryClient();

const setUp = () => {

    // props로 넘겨줄 오늘 날짜 구하기
    let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
    let tempDate = new Date();
    let date = `${tempDate.getFullYear()}${formatTwoDigits(tempDate.getMonth()+1)}${formatTwoDigits(tempDate.getDate())}`;

    const { component } = render(
        <QueryClientProvider client={queryClient}>
            <CreateDiary date={encodeURIComponent(btoa(date))}/>
        </QueryClientProvider>
    );

    return component;
}

describe('일기 작성하기 테스트', () => {

    beforeEach(() => {

        // 일기 작성 컴포넌트 렌더링
        act(() => setUp());
    })

    describe('1. 일기 작성 페이지에 접속했을 때', () => {
        it('일기 작성 컴포넌트가 렌더링 된다.', async () => {

            // 일기 작성 컴포넌트가 존재하는지 확인
            const diaryInput = screen.getByTestId('diaryInput');
            await waitFor(() => {
                expect(diaryInput).toBeInTheDocument();
            });
        })
    })
})