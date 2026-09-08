import styles from "./Journey.module.css";

const history = [
    {
        date: "2001",
        title: "Hello World",
        desc: "DOĞDUK"
    }
];

export default function Journey() {
    return (
        <section className={styles.container}>
            <div className={styles.header}>$ git log --oneline --author="yyg27"</div>
            <div className={styles.timeline}>
                {history.map((item, i) => (
                    <div key={i} className={styles.event}>
                        <div className={styles.date}>{item.date}</div>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.desc}>{item.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
