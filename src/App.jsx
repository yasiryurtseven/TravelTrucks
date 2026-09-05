import { lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader.jsx';
const HomePage = lazy(() => import('./pages/HomePage'));
const CamperDetailsPage = lazy(() => import('./pages/CamperDetailsPage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage.jsx'));

function App() {
    return (
        <>
        <Header />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/catalog/:id" element={<CamperDetailsPage />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </Suspense>
        </>
            
    )
}

export default App;