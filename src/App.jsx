import { lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';

const HomePage = lazy(() => import('./pages/HomePage'));
const CamperDetailsPage = lazy(() => import('./pages/CamperDetailsPage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));

function App() {
    return (
        <>
        <Header />
            <Suspense fallback={<div>Loading...</div>}>
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