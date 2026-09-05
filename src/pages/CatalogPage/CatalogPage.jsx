import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/operations';
import { incrementPage, resetCampers } from '../../redux/campersSlice';
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
};

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { items, total, page, isLoading } = useSelector(
    (state) => state.campers
  );

  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  useEffect(() => {
    dispatch(fetchCampers({ page: 1, limit: 4, filters: initialFilters }));
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setActiveFilters(filters);
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit: 4, filters }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setActiveFilters(initialFilters);
    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, limit: 4, filters: initialFilters }));
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(incrementPage());
    dispatch(fetchCampers({ page: nextPage, limit: 4, filters: activeFilters }));
  };

  const hasMore = items.length < total;

  return (
    <main className={css.pageContainer}>
      {isLoading && <Loader />}

      <div className={css.contentWrapper}>
        <Filters
          filters={filters}
          onChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <section className={css.listSection}>
          {!isLoading && items.length === 0 ? (
            <EmptyState onClear={handleReset} onViewAll={handleReset} />
          ) : (
            <CampersList
              items={items}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              isLoading={isLoading}
            />
          )}
        </section>
      </div>
    </main>
  );
}