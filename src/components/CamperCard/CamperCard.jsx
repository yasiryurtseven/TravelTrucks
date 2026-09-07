import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { toggleFavorite } from '../../redux/campersSlice';
import css from './CamperCard.module.css';

// SVG importları
import starIcon from '../../assets/svg/RatingFull.svg';
import mapIcon from '../../assets/svg/Map.svg';
import petrolIcon from '../../assets/svg/gas.svg';
import transIcon from '../../assets/svg/Property 1=automatic.svg';
import formIcon from '../../assets/svg/car.svg';
import heartDefault from '../../assets/svg/HeartDefault.svg'; 
import heartPressed from '../../assets/svg/HeartPressed.svg'; 

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.campers.favorites);
  const isFavorite = favorites.map(String).includes(String(camper.id));

  const coverImage = camper.gallery?.[0]?.thumb || camper.gallery?.[0];

  const formattedLocation = camper.location
    ? camper.location.split(',').map((s) => s.trim()).reverse().join(', ')
    : '';

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper.id));

    if (!isFavorite) {
      iziToast.success({
        title: 'Added',
        message: `${camper.name} added to favorites!`,
        position: 'topRight',
        timeout: 2500,
      });
    } else {
      iziToast.info({
        title: 'Removed',
        message: `${camper.name} removed from favorites.`,
        position: 'topRight',
        timeout: 2500,
      });
    }
  };

  return (
    <li className={css.card}>
      <img src={coverImage} alt={camper.name} className={css.image} />

      <div className={css.content}>
        <div className={css.header}>
          <h2 className={css.title}>{camper.name}</h2>
          <div className={css.priceGroup}>
            <span className={css.price}>
              €{Number(camper.price).toFixed(2)}
            </span>
            <button
              type="button"
              className={css.favoriteBtn}
              onClick={handleFavoriteClick}
              aria-label="Toggle favorite"
            >
              <img
                src={isFavorite ? heartPressed : heartDefault}
                alt="Favorite"
                className={css.heartIcon}
              />
            </button>
          </div>
        </div>

        {/* Puan ve Konum */}
        <div className={css.meta}>
          <span className={css.rating}>
            <img src={starIcon} alt="Rating" className={css.icon} />
            {camper.rating}({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={css.location}>
            <img src={mapIcon} alt="Location" className={css.icon} />
            {formattedLocation}
          </span>
        </div>

        {/* Açıklama */}
        <p className={css.description}>{camper.description}</p>

        {/* Rozetler */}
        <ul className={css.badges}>
          <li className={css.badge}>
            <img src={petrolIcon} alt="Engine" className={css.badgeIcon} />
            <span className={css.badgeText}>{camper.engine}</span>
          </li>
          <li className={css.badge}>
            <img src={transIcon} alt="Transmission" className={css.badgeIcon} />
            <span className={css.badgeText}>{camper.transmission}</span>
          </li>
          <li className={css.badge}>
            <img src={formIcon} alt="Form" className={css.badgeIcon} />
            <span className={css.badgeText}>{camper.form}</span>
          </li>
        </ul>

        <Link
          to={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={css.button}
        >
          Show more
        </Link>
      </div>
    </li>
  );
}