import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <div className={css.spinner}></div>
        <h3 className={css.title}>Loading tracks...</h3>
        <p className={css.text}>
          Please wait while we fetch the best travel trucks for you
        </p>
      </div>
    </div>
  );
}