import css from './VehicleDetails.module.css';

export default function VehicleDetails({ camper }) {
  const {
    form,
    length,
    width,
    height,
    tank,
    consumption,
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
  } = camper;

  const formatUnit = (val, unit) => {
    if (!val) return '-';
    return String(val).includes(unit) ? val : `${val} ${unit}`;
  };

  return (
    <div className={css.card}>
      <h3 className={css.title}>Vehicle details</h3>

      <div className={css.badges}>
        {transmission && <span className={css.badge}>{transmission}</span>}
        {engine && <span className={css.badge}>{engine}</span>}
        {AC && <span className={css.badge}>AC</span>}
        {bathroom && <span className={css.badge}>Bathroom</span>}
        {kitchen && <span className={css.badge}>Kitchen</span>}
        {TV && <span className={css.badge}>TV</span>}
        {radio && <span className={css.badge}>Radio</span>}
        {refrigerator && <span className={css.badge}>Refrigerator</span>}
        {microwave && <span className={css.badge}>Microwave</span>}
        {gas && <span className={css.badge}>Gas</span>}
        {water && <span className={css.badge}>Water</span>}
        {form && <span className={css.badge}>{form}</span>}
      </div>

      <div className={css.divider} />

      {/* Teknik Özellikler Tablosu */}
      <div className={css.table}>
        <div className={css.row}>
          <span className={css.label}>Form</span>
          <span className={css.value}>{form || '-'}</span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Length</span>
          <span className={css.value}>{formatUnit(length, 'm')}</span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Width</span>
          <span className={css.value}>{formatUnit(width, 'm')}</span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Height</span>
          <span className={css.value}>{formatUnit(height, 'm')}</span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Tank</span>
          <span className={css.value}>{formatUnit(tank, 'l')}</span>
        </div>
        <div className={css.row}>
          <span className={css.label}>Consumption</span>
          <span className={css.value}>{consumption || '-'}</span>
        </div>
      </div>
    </div>
  );
}