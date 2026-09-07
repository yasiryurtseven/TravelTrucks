import mapIcon from '../../assets/svg/Map.svg';
import css from './Filters.module.css';

export default function Filters({
  filters,
  onChange,
  onSearch,
  onReset,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    onChange({
      target: {
        name,
        value: checked,
      },
    });
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
            value={filters.location || ''}
            onChange={onChange}
            className={css.input}
          />
        </div>
      </div>

      <h3 className={css.title}>Filters</h3>

      <div className={css.section}>
        <h4 className={css.subtitle}>Vehicle equipment</h4>
        <div className={css.optionsList}>
          {[
            { id: 'AC', label: 'AC' },
            { id: 'kitchen', label: 'Kitchen' },
            { id: 'TV', label: 'TV' },
            { id: 'bathroom', label: 'Bathroom' },
          ].map(({ id, label }) => (
            <label key={id} className={css.radioLabel}>
              <input
                type="checkbox"
                name={id}
                checked={Boolean(filters[id])}
                onChange={handleCheckboxChange}
                className={css.radio}
              />
              <span className={css.radioText}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Camper form */}
      <div className={css.section}>
        <h4 className={css.subtitle}>Camper form</h4>
        <div className={css.optionsList}>
          {[
            { value: 'alcove', label: 'Alcove' },
            { value: 'panelTruck', label: 'Panel Van' },
            { value: 'fullyIntegrated', label: 'Integrated' },
          ].map(({ value, label }) => (
            <label key={value} className={css.radioLabel}>
              <input
                type="radio"
                name="form"
                value={value}
                checked={filters.form === value}
                onChange={onChange}
                className={css.radio}
              />
              <span className={css.radioText}>{label}</span>
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