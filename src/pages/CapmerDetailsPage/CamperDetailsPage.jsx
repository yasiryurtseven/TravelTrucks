import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../redux/operations';
import { clearCurrentCamper } from '../../redux/campersSlice';
import CamperGallery from '../../components/CamperGallery/CamperGallery';
import CamperInfo from '../../components/CamperInfo/CamperInfo';
import VehicleDetails from '../../components/VehicleDetails/VehicleDetails';
import BookingForm from '../../components/BookingForm/BookingForm';
import ReviewsList from '../../components/ReviewsList/ReviewsList';
import Loader from '../../components/Loader/Loader';
import css from './CamperDetailsPage.module.css';

export default function CamperDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCamper, isLoading, error } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCamperById(id));
    return () => {
      dispatch(clearCurrentCamper());
    };
  }, [dispatch, id]);

  if (isLoading) return <Loader />;

  if (error || (!isLoading && !currentCamper)) {
    return (
      <main className={css.page}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>Camper not found!</h2>
          <p style={{ margin: '16px 0 24px', color: '#6C717B' }}>
            The campervan you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/catalog"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              backgroundColor: '#E44848',
              color: '#fff',
              borderRadius: '200px',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Back to Catalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={css.page}>
      {/* ÜST BÖLÜM: Sol Galeri - Sağ Bilgiler ve Özellikler */}
      <div className={css.upSection}>
        <div className={css.leftColumn}>
          <CamperGallery gallery={currentCamper.gallery} name={currentCamper.name} />
        </div>
        <div className={css.rightColumn}>
          <CamperInfo camper={currentCamper} />
          <VehicleDetails camper={currentCamper} />
        </div>
      </div>

      {/* ALT BÖLÜM: Sol Yorumlar - Sağ Rezervasyon Formu */}
      <div className={css.downSection}>
        <div className={css.leftColumn}>
          <ReviewsList reviews={currentCamper.reviews} />
        </div>
        <div className={css.rightColumn}>
          <BookingForm />
        </div>
      </div>
    </main>
  );
}