import { lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader.jsx';
const HomePage = lazy(() => import('./pages/HomePage'));
const CamperDetailsPage = lazy(() => import('./pages/CapmerDetailsPage/CamperDetailsPage.jsx'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage.jsx'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage.jsx'));

function App() {
    return (
        <>
        <Header />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/catalog/:id" element={<CamperDetailsPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </Suspense>
        </>
            
    )
}

export default App;