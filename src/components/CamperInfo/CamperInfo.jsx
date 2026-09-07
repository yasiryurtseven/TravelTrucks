import ratingFull from '../../assets/svg/RatingFull.svg';
import mapIcon from '../../assets/svg/Map.svg';
import css from './CamperInfo.module.css';

export default function CamperInfo({ camper }) {
  const { name, price, rating, reviews = [], location, description } = camper;

  return (
    <div className={css.card}>
      <h1 className={css.title}>{name}</h1>
      <div className={css.meta}>
        <div className={css.metaItem}>
          <img src={ratingFull} alt="Rating" className={css.icon} />
          <span>{rating}({reviews.length} Reviews)</span>
        </div>
        <div className={css.metaItem}>
          <img src={mapIcon} alt="Location" className={css.icon} />
          <span>{location}</span>
        </div>
      </div>
      <p className={css.price}>€{price ? Number(price).toFixed(0) : '0'}</p>
      <p className={css.description}>{description}</p>
    </div>
  );
}