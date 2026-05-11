import { BrowserRouter, Routes, Route} from 'react-router'
import { Home } from './src/pages/Home.tsx';
import { Page2 } from './src/pages/Page2.tsx';
import { Page3 } from './src/pages/Page3.tsx';
import { Page4 } from './src/pages/page4.tsx';
import { ProtectedRoute } from './src/components/ProtectedRoute.tsx';


export function AppRoutes(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>} />
                    <Route path='/page2' element={<ProtectedRoute><Page2/></ProtectedRoute>}/>
                    <Route path='/page3' element={<ProtectedRoute><Page3/></ProtectedRoute>}/>
                    <Route path='/page4' element={<ProtectedRoute><Page4/></ProtectedRoute>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}
