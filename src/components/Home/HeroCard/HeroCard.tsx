import styles from "./HeroCard.module.css";
import { socialLinks } from "../../../data/social.data";

export default function HeroCard() {
    return (
        <section className={styles.heroCard}>
            <div className={styles.portrait}>
                <pre>
{`
   /\\_/\\\\
  ( o.o )
   > ^ <
`}
                </pre>
            </div>

            <div className={styles.content}>
                <div className={styles.intro}>
                    <h1>Yiğit Gültekin</h1>

                    <p>
                        Computer Engineering Student passionate about Linux,
                        lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    </p>
                </div>

                <div className={styles.links}>
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            [{link.short}] {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}