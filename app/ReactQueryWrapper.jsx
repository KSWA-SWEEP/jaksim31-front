'use client';

import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import { logout } from "./api/logout";

const controller = new AbortController();

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: async (error) => {
            console.log(error)
            if (error.errorCode == 'NO_AUTHORIZATION' || error.errorCode == 'INVALID_ID' || error.errorCode == 'NOT_FOUND_USER') {
                window.location.href = "/home/landing";
                logout();
                controller.abort();
                alert(error.errorMessage+"😥\n계속하려면 다시 로그인 해주세요.");
                queryClient.removeQueries();
            } else if(error.errorCode == 'NOT_FOUND_AUTHENTICATION' || error.errorCode == 'SESSION_EXPIRED' || error.errorCode == 'NO_PERMISSION' || error.errorCode == 'EMPTY_TOKEN') {
                try {
                    window.location.href = "/home/landing";
                    controller.abort();
                    alert(error.errorMessage+"😥\n계속하려면 다시 로그인 해주세요.");
                    queryClient.removeQueries();
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