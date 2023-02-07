import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../app/common/header/Login"
import { QueryClient, QueryClientProvider } from "react-query";
import { act } from 'react-dom/test-utils';
import 'intersection-observer';

const queryClient = new QueryClient();

const setUp = () => {

    const { component } = render(
        <QueryClientProvider client={queryClient}>
            <Login/>
        </QueryClientProvider>
    );

    return component;
}

describe('일반 로그인 테스트', () => {

    beforeEach(() => {

        // 로그인 컴포넌트 렌더링
        act(() => setUp());
    
        // 시작하기 버튼 클릭
        const startButton = screen.getByTestId('startButton');
        act(() => fireEvent.click(startButton));
    })

    describe('1. 아이디와 비밀번호를 바르게 입력했을 때', () => {
        it('대시보드 페이지가 렌더링 된다.', async () => {

            // fetch mocking
            fetch = jest.fn().mockResolvedValue({
                status: 200,
            });

            Object.defineProperty(window, "location", {
                value: new URL("http://localhost:3000/diary/dashboard"),
                configurable: true,
            });

            const emailInput = screen.getByTestId('loginEmailInput');
            const passwordInput = screen.getByTestId('passwordInput');
            const loginButton = screen.getByTestId('loginSubmitButton');

            // 이메일과 비밀번호 입력 전, 로그인 버튼 비활성화 여부 확인
            expect(loginButton).toBeDisabled();

            // 이메일 입력
            act(() => fireEvent.change(emailInput, { target: { value: "test@gmail.com" } }));
            
            // 비밀번호 입력
            act(() => fireEvent.change(passwordInput, { target: { value: "qwer1234!" } }));

            // 로그인 버튼 클릭
            act(() => fireEvent.click(loginButton));

            // 로그인 성공 후 페이지 이동을 확인
            await waitFor(() => {
                expect(window.location.pathname).toContain('/diary/dashboard');
            });
        })
    }),
    
    describe('2. 계정 정보가 없는 아이디를 입력했을 때', () => {
        it('"사용자를 찾을 수 없습니다." alert 창을 띄운다.', async () => {

            // fetch mocking
            fetch = jest.fn().mockResolvedValue({
                status: 404,
            });

            jest.spyOn(window, 'alert').mockImplementation(() => {});

            const emailInput = screen.getByTestId('loginEmailInput');
            const passwordInput = screen.getByTestId('passwordInput');
            const loginButton = screen.getByTestId('loginSubmitButton');

            // 이메일과 비밀번호 입력 전, 로그인 버튼 비활성화 여부 확인
            expect(loginButton).toBeDisabled();

            // 이메일 입력
            act(() => fireEvent.change(emailInput, { target: { value: "wrong@gmail.com" } }));
            
            // 비밀번호 입력
            act(() => fireEvent.change(passwordInput, { target: { value: "qwer1234!" } }));

            // 로그인 버튼 클릭
            act(() => fireEvent.click(loginButton));

            // 로그인 실패 후 alert를 확인한다.
            await waitFor(() => {
                expect(window.alert).toBeCalled();
            });
        })
    }),

    describe('3. 잘못된 비밀번호를 입력했을 때', () => {
        it('"비밀번호를 잘못 입력하였습니다." alert 창을 띄운다.', async () => {

            // fetch mocking
            fetch = jest.fn().mockResolvedValue({
                status: 401,
            });

            jest.spyOn(window, 'alert').mockImplementation(() => {});

            const emailInput = screen.getByTestId('loginEmailInput');
            const passwordInput = screen.getByTestId('passwordInput');
            const loginButton = screen.getByTestId('loginSubmitButton');

            // 이메일과 비밀번호 입력 전, 로그인 버튼 비활성화 여부 확인
            expect(loginButton).toBeDisabled();

            // 이메일 입력
            act(() => fireEvent.change(emailInput, { target: { value: "test@gmail.com" } }));
            
            // 비밀번호 입력
            act(() => fireEvent.change(passwordInput, { target: { value: "wrong" } }));

            // 로그인 버튼 클릭
            act(() => fireEvent.click(loginButton));

            // 로그인 실패 후 alert를 확인한다.
            await waitFor(() => {
                expect(window.alert).toBeCalled();
            });
      
        })
    })
})