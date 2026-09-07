import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCampers } from '../../redux/operations';
import CamperCard from '../../components/CamperCard/CamperCard';
import Loader from '../../components/Loader/Loader';
import css from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const { items, favorites, isLoading } = useSelector((state) => state.campers);

  // Sayfa yenilendiğinde boşsa hepsini çek
  useEffect(() => {
    if (items.length === 0 && favorites.length > 0) {
      dispatch(fetchCampers({ page: 1, limit: 100 }));
    }
  }, [dispatch, items.length, favorites.length]);

  if (isLoading && items.length === 0) {
    return <Loader />;
  }

  const favoriteCampers = items.filter((camper) =>
    favorites.map(String).includes(String(camper.id))
  );

  if (favorites.length === 0 || (!isLoading && favoriteCampers.length === 0)) {
    return (
      <main className={css.page}>
        <div className={css.emptyContainer}>
          <h2 className={css.emptyTitle}>No favorite campers yet!</h2>
          <p className={css.emptyText}>
            You haven't added any campers to your favorites list yet. Go to the
            catalog and click the heart icon to save your favorites.
          </p>
          <Link to="/catalog" className={css.catalogBtn}>
            Go to Catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Favorite Campers</h1>
        <ul className={css.list}>
          {favoriteCampers.map((camper) => (
            <li key={camper.id} className={css.listItem}>
              <CamperCard camper={camper} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}