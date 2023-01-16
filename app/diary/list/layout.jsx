import '../../globals.css'

import ViewTypeTab from './ViewTypeTab';
import ListBox from './ListBox';
import SearchBox from './grid/SearchBox';

export default function listLayout ({ children }) {

    return (
        <>
            <nav className='flex justify-center mt-4'>
                <ViewTypeTab/>
            </nav>

            {/* 하위 page 영역 */}
            <div className='flex justify-center min-h-screen lg:m-10'>
                <ListBox>
                    {children}
                </ListBox>
            </div>
        </>
    )
}
