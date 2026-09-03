import { Link } from 'react-router-dom';
import css from './CamperCard.module.css';

// SVG importları
import starIcon from '../../assets/svg/RatingFull.svg';
import mapIcon from '../../assets/svg/Map.svg';
import petrolIcon from '../../assets/svg/gas.svg';
import transIcon from '../../assets/svg/Property 1=automatic.svg';
import formIcon from '../../assets/svg/car.svg';

export default function CamperCard({ camper }) {
  const coverImage = camper.gallery?.[0]?.thumb || camper.gallery?.[0];

  return (
    <li className={css.card}>
      <img src={coverImage} alt={camper.name} className={css.image} />

      <div className={css.content}>
        {/* Üst Satır: Başlık ve Fiyat */}
        <div className={css.header}>
          <h2 className={css.title}>{camper.name}</h2>
          <span className={css.price}>€{camper.price}</span>
        </div>

        {/* Puan ve Konum */}
        <div className={css.meta}>
          <span className={css.rating}>
            <img src={starIcon} alt="Rating" className={css.icon} />
            {camper.rating}({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={css.location}>
            <img src={mapIcon} alt="Location" className={css.icon} />
            {camper.location}
          </span>
        </div>

        {/* Açıklama */}
        <p className={css.description}>{camper.description}</p>

        {/* Rozetler (Badges) */}
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

        {/* Detay Butonu */}
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