import { Link } from "react-router-dom";
import css from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={css.hero}>
            <h1 className={css.title}>Campers of your dreams</h1>
            <p className={css.subtitle}>You can find everything you want in our catalog</p>
            <Link className={css.button} to="/catalog">View Now</Link>
        </section>
    )
}