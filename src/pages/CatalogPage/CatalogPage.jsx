import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import { incrementPage, resetCampers, setFilters, resetFilters } from '../../redux/campersSlice';
import CampersList from '../../components/CampersList/CampersList';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Loader/Loader';
import EmptyState from '../../components/EmptyState/EmptyState';
import css from './CatalogPage.module.css';

const initialFilters = {
  location: '',
  form: '',
  engine: '',
  transmission: '',
  AC: false,
  kitchen: false,
  TV: false,
  bathroom: false,
};

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { items, total, page, isLoading, error } = useSelector(
    (state) => state.campers
  );

  const [localFilters, setLocalFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  // İlk yükleme
  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit: 4, filters: initialFilters }));

    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setActiveFilters(localFilters);
    dispatch(setFilters(localFilters));
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit: 4, filters: localFilters }));
  };

  const handleReset = () => {
    setLocalFilters(initialFilters);
    setActiveFilters(initialFilters);
    dispatch(resetFilters());
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit: 4, filters: initialFilters }));
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(incrementPage());
    dispatch(fetchCampers({ page: nextPage, limit: 4, filters: activeFilters }));
  };

  // Hem total kontrolü hem de backend parça sınır kontrolü
  const hasMore = items.length > 0 && items.length < total;

  return (
    <main className={css.pageContainer}>
      {/* Sadece ilk sayfa yüklenirken tam sayfa loader */}
      {isLoading && page === 1 && <Loader />}

      <div className={css.contentWrapper}>
        <Filters
          filters={localFilters}
          onChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <section className={css.listSection}>
          {!isLoading && items.length === 0 && !error ? (
            <EmptyState onClear={handleReset} onViewAll={handleReset} />
          ) : (
            <CampersList
              items={items}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              isLoading={isLoading && page > 1}
            />
          )}
        </section>
      </div>
    </main>
  );
}