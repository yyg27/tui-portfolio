import styles from "./Home.module.css";
import SystemCard from "./SystemCard/SystemCard";
import HeroCard from "./HeroCard/HeroCard";

export default function Home() {
    return (
        <section className={styles.home}>
            <SystemCard />
            <HeroCard />
        </section>
    );
}