'use client';

import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            if(error == 'NOT_FOUND_USER' || error == 'NOT_FOUND_AUTHENTICATION' || error == 'SESSION_EXPIRED' || error == 'NO_PERMISSION') {
                // TODO: BE 수정되면 로그아웃 하기
                console.log("Request logout")
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