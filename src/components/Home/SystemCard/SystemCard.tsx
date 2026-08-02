import styles from "./SystemCard.module.css";
import { systemInfo } from "../../../data/system.data";


export default function SystemCard() {
    return (
        <section className={styles.systemCard}>

    <header className={styles.header}>
        <h2>yyg27@portfolio</h2>
    </header>

    <div className={styles.info}>
        {systemInfo.map((item) => (
            <div className={styles.infoRow} key={item.label}>

                <span className={styles.label}>
                    {item.label}:
                </span>

                <span className={styles.value}>
                    {item.value}
                </span>

            </div>
        ))}
    </div>

</section>
    );
}