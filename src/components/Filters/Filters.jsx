import mapIcon from '../../assets/svg/Map.svg';
import css from './Filters.module.css';

export default function Filters({
  filters,
  onChange,
  onSearch,
  onReset,
}) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller
    onSearch();        // Arama fonksiyonunu tetikler
  };

  return (
    <form className={css.container} onSubmit={handleSubmit}>
      {/* Location Input */}
      <div className={css.section}>
        <label className={css.label} htmlFor="location">Location</label>
        <div className={css.inputWrapper}>
          <img src={mapIcon} alt="Location" className={css.icon} />
          <input
            id="location"
            type="text"
            name="location"
            placeholder="City"
            value={filters.location}
            onChange={onChange}
            className={css.input}
          />
        </div>
      </div>

      <h3 className={css.title}>Filters</h3>

      {/* Vehicle Type (Form) */}
      <div className={css.section}>
        <h4 className={css.subtitle}>Camper form</h4>
        <div className={css.optionsList}>
          {['alcove', 'panelTruck', 'fullyIntegrated'].map((form) => (
            <label key={form} className={css.radioLabel}>
              <input
                type="radio"
                name="form"
                value={form}
                checked={filters.form === form}
                onChange={onChange}
                className={css.radio}
              />
              <span className={css.radioText}>
                {form === 'panelTruck'
                  ? 'Panel Van'
                  : form === 'fullyIntegrated'
                  ? 'Integrated'
                  : 'Alcove'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Engine */}
      <div className={css.section}>
        <h4 className={css.subtitle}>Engine</h4>
        <div className={css.optionsList}>
          {['diesel', 'petrol', 'hybrid'].map((eng) => (
            <label key={eng} className={css.radioLabel}>
              <input
                type="radio"
                name="engine"
                value={eng}
                checked={filters.engine === eng}
                onChange={onChange}
                className={css.radio}
              />
              <span className={css.radioText}>{eng}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div className={css.section}>
        <h4 className={css.subtitle}>Transmission</h4>
        <div className={css.optionsList}>
          {['automatic', 'manual'].map((trans) => (
            <label key={trans} className={css.radioLabel}>
              <input
                type="radio"
                name="transmission"
                value={trans}
                checked={filters.transmission === trans}
                onChange={onChange}
                className={css.radio}
              />
              <span className={css.radioText}>{trans}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={css.buttonGroup}>
        <button type="submit" className={css.searchBtn}>
          Search
        </button>
        <button type="button" className={css.clearBtn} onClick={onReset}>
          ✕ Clear filters
        </button>
      </div>
    </form>
  );
}