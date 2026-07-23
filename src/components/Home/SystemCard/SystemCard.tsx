import styles from "./SystemCard.module.css";


export default function SystemCard() {
    return (
        <section className={styles.systemCard}>
            <div className={styles.left}> 
                <pre>
{`
 /\\_/\\\\
( o.o )
 > ^ <
`}
                </pre>
            </div>
            <div className={styles.right}>Neofetch</div>
        </section>
    );
}