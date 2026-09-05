import emptyIllustration from '../../assets/images/NotFound.png'; // Projendeki görselin adı/yolu
import css from './EmptyState.module.css';

export default function EmptyState({ onClear, onViewAll }) {
  return (
    <div className={css.container}>
      <img
        src={emptyIllustration}
        alt="No campers found"
        className={css.image}
      />
      <h2 className={css.title}>No campers found</h2>
      <p className={css.description}>
        We couldn't find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={css.buttonGroup}>
        <button type="button" className={css.clearBtn} onClick={onClear}>
          ✕ Clear filters
        </button>
        <button type="button" className={css.viewAllBtn} onClick={onViewAll}>
          View all campers
        </button>
      </div>
    </div>
  );
}