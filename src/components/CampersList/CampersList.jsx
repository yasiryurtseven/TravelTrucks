import CamperCard from '../CamperCard/CamperCard';
import css from './CampersList.module.css';

export default function CampersList({ items, onLoadMore, hasMore, isLoading }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {items.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          className={css.loadMoreBtn}
          onClick={onLoadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
}