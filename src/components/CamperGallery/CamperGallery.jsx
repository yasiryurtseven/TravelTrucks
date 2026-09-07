import { useState } from 'react';
import css from './CamperGallery.module.css';

export default function CamperGallery({ gallery = [], name = '' }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!gallery.length) return null;

  const getMainSrc = (item) => {
    if (!item) return '';
    return typeof item === 'string' ? item : item.original || item.thumb;
  };

  const getThumbSrc = (item) => {
    if (!item) return '';
    return typeof item === 'string' ? item : item.thumb || item.original;
  };

  return (
    <div className={css.galleryContainer}>
      {/* Büyük Ana Görsel */}
      <div className={css.mainImageWrapper}>
        <img
          src={getMainSrc(gallery[selectedImage])}
          alt={name}
          className={css.mainImage}
        />
      </div>

      {/* Küçük Thumbnailler */}
      <div className={css.thumbnailsList}>
        {gallery.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`${css.thumbBtn} ${index === selectedImage ? css.active : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={getThumbSrc(item)}
              alt={`${name} preview ${index + 1}`}
              className={css.thumbImg}
            />
          </button>
        ))}
      </div>
    </div>
  );
}