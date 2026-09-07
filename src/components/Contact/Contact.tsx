import styles from "./Contact.module.css";
import { socialLinks } from "../../data/social.data";

export default function Contact() {
    return (
        <section className={styles.contactContainer}>
            <div className={styles.idCard}>
                <div className={styles.cardHeader}>
                    <span className={styles.sysText}>[ ID_CARD ]</span>
                    <span className={styles.sysText}>ACCESS: ROOT</span>
                </div>
                
                <div className={styles.cardBody}>
                    <div className={styles.photoWrapper}>
                        <img src="/portrait.jpeg" alt="YYG Profile" className={styles.photo} />
                    </div>
                    
                    <div className={styles.details}>
                        <div className={styles.row}>
                            <span className={styles.label}>ID:</span>
                            <span className={styles.value}>YYG27</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>NAME:</span>
                            <span className={styles.value}>YUSUF YIGIT GULTEKIN</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>ROLE:</span>
                            <span className={styles.value}>SOFTWARE ENGINEER</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>STATUS:</span>
                            <span className={styles.statusBlink}>ACTIVE</span>
                        </div>

                        <div className={styles.socialBox}>
                            <div className={styles.boxTitle}>// COMMUNICATION_LINKS</div>
                            <div className={styles.linksWrapper}>
                                {socialLinks.map(link => (
                                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={styles.socialLink}>
                                        <span className={styles.icon}>[{link.short}]</span> {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
