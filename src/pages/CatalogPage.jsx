import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../redux/operations';
import { incrementPage } from '../redux/campersSlice';
import CampersList from '../components/CampersList/CampersList';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { items, total, page, isLoading, error } = useSelector(
    (state) => state.campers
  );

  // İlk yükleme: Sadece sayfa 1 için veri çek
  useEffect(() => {
    dispatch(fetchCampers({ page: 1, limit: 4 }));
  }, [dispatch]);

  // Load more butonuna tıklandığında:
  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(incrementPage());
    dispatch(fetchCampers({ page: nextPage, limit: 4 }));
  };

  // Daha yüklenecek araç var mı kontrolü
  const hasMore = items.length < total;

  return (
    <main style={{ padding: '48px 64px' }}>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <CampersList
        items={items}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        isLoading={isLoading}
      />
    </main>
  );
}