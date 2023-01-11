import '../../globals.css'

import ViewTypeTab from './ViewTypeTab';
import ListBox from './ListBox';
import SearchBox from './SearchBox';

export default function listLayout ({ children }) {

    return (
        <>
            <nav className='flex justify-center mt-4'>
                <ViewTypeTab/>
            </nav>
            
            {/* 검색 영역 */}
            <div className="font-medium rounded-3xl bg-red-100/60 mt-7 lg:mx-16 mx-7 text-md text-zinc-600">
                <SearchBox/>
            </div>

            {/* 하위 page 영역 */}
            <div className='flex justify-center min-h-screen lg:m-10'>
                <ListBox>
                    {children}
                </ListBox>
            </div>
        </>
    )
}
