import { useState, useEffect } from "react";
import styles from "./HeroCard.module.css";
import { socialLinks } from "../../../data/social.data";

export default function HeroCard() {
    const [textLen, setTextLen] = useState(0);
    const title = "YUSUF YIGIT GULTEKIN";
    const desc = "Computer engineering student graduating January 2027. Building toward IT, one repo at a time.";
    const fullText = title + desc;

    useEffect(() => {
        if (textLen < fullText.length) {
            const timer = setTimeout(() => setTextLen(l => l + 1), 30);
            return () => clearTimeout(timer);
        }
    }, [textLen, fullText.length]);

    const displayTitle = title.slice(0, textLen);
    const displayDesc = textLen > title.length ? desc.slice(0, textLen - title.length) : "";

    return (
        <section className={styles.heroCard}>
            <div className={styles.sysStatus}>[ OK ] SYS_BOOT</div>
            
            <div className={styles.intro}>
                <h1>{displayTitle}{textLen < title.length ? <span className={styles.blink}>█</span> : ""}</h1>
                <p>
                    {displayDesc}{textLen >= title.length && textLen < fullText.length ? <span className={styles.blink}>█</span> : ""}
                </p>
                {textLen === fullText.length && (
                    <div className={styles.links}>
                        {socialLinks.map((link) => (
                            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                                [{link.short}] {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
            
            <div className={styles.sysMem}>MEM_ALLC: 1024KB</div>
        </section>
    );
}