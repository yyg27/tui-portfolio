import styles from "./Home.module.css";
import SystemCard from "./SystemCard/SystemCard";

export default function Home() {
    return (
        <section className={styles.home}>
            <SystemCard />
        </section>
    );
}