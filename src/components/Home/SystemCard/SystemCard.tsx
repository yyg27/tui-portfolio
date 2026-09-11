import { useState, useEffect, useRef } from "react";
import styles from "./SystemCard.module.css";
import { systemInfo } from "../../../data/system.data";

export default function SystemCard() {
    const [asciiPortrait, setAsciiPortrait] = useState("Loading portrait...");
    const portraitRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/portrait.txt")
            .then((res) => {
                if (!res.ok) throw new Error("Could not load portrait.txt");
                return res.text();
            })
            .then((text) => setAsciiPortrait(text))
            .catch(() => setAsciiPortrait("Failed to load portrait.txt"));
    }, []);

    useEffect(() => {
        if (portraitRef.current) {
            const el = portraitRef.current;
            const targetX = el.scrollWidth * 0.7 - el.clientWidth / 2;
            el.scrollLeft = Math.max(0, targetX);
        }
    }, [asciiPortrait]);

    return (
        <section className={styles.systemCard}>
            <div ref={portraitRef} className={styles.portrait}>
                <pre>{asciiPortrait}</pre>
            </div>

            <div className={styles.content}>
                <h1 className={styles.fastfetchHeader}>
                    <span style={{color: 'var(--accent)'}}>yyg27</span>@<span style={{color: 'var(--accent)'}}>portfolio</span>
                    <span className={styles.cursor}>█</span>
                </h1>
                <div className={styles.separator}>-------------------------</div>
                
                <div className={styles.fastfetchInfo}>
                    {systemInfo.map((info) => (
                        <div key={info.label} className={styles.infoRow}>
                            <span className={styles.label}>{info.label}:</span>
                            <span className={styles.value}>{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}