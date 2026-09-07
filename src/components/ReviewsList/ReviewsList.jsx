import ratingFull from '../../assets/svg/RatingFull.svg';
import ratingEmpty from '../../assets/svg/RatingEmty.svg';
import css from './ReviewsList.module.css';

export default function ReviewsList({ reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className={css.container}>
        <h3 className={css.title}>Reviews</h3>
        <p className={css.noReviews}>No reviews yet for this campervan.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h3 className={css.title}>Reviews</h3>
      <div className={css.list}>
        {reviews.map((rev, i) => (
          <div key={i} className={css.card}>
            <div className={css.header}>
              <div className={css.avatar}>
                {rev.reviewer_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h4 className={css.name}>{rev.reviewer_name}</h4>
                <div className={css.stars}>
                  {[...Array(5)].map((_, s) => (
                    <img
                      key={s}
                      src={s < rev.reviewer_rating ? ratingFull : ratingEmpty}
                      alt={s < rev.reviewer_rating ? 'star filled' : 'star empty'}
                      className={css.starIcon}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className={css.comment}>{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}