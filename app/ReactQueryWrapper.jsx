'use client';

import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            if(error == 'NOT_FOUND_USER' || error == 'NOT_FOUND_AUTHENTICATION' || error == 'SESSION_EXPIRED' || error == 'NO_PERMISSION' || error == 'EMPTY_TOKEN') {
                try {
                    alert("세션이 만료되었거나 유효하지 않은 요청입니다.\n계속하려면 다시 로그인 해주세요.")
                    window.location.href = "/home/landing";
                } catch(e) {
                    console.log(e);
                }
            }
        
        },
    })
});

const ReactQueryWrapper = ({children}) => (
    <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
);

export default ReactQueryWrapper;