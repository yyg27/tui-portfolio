import { useEffect, useState } from "react";
import styles from "./BootScreen.module.css";
import { themes } from "../../data/themes.data";

const LINES = [
    "Started Network Manager.",
    "Mounted /home/yyg27.",
    `Loaded ${themes.length} themes.`,
    "Started tui-portfolio.service.",
    "Reached target Portfolio.",
];
const USER = "yyg27";

// line step, typing step and the pause before fading out, in ms
const LINE_MS = 150;
const TYPE_MS = 70;
const HOLD_MS = 400;
const FADE_MS = 250;

export default function BootScreen({ onDone }: { onDone: () => void }) {
    const [step, setStep] = useState(0); // lines shown, then typed login chars
    const [leaving, setLeaving] = useState(false);
    const total = LINES.length + USER.length;

    useEffect(() => {
        if (leaving) {
            const t = setTimeout(onDone, FADE_MS);
            return () => clearTimeout(t);
        }
        const t = step < total
            ? setTimeout(() => setStep(s => s + 1), step < LINES.length ? LINE_MS : TYPE_MS)
            : setTimeout(() => setLeaving(true), HOLD_MS);
        return () => clearTimeout(t);
    }, [step, leaving, total, onDone]);

    // any key or click skips straight to the site
    useEffect(() => {
        const skip = () => setLeaving(true);
        window.addEventListener("keydown", skip);
        window.addEventListener("pointerdown", skip);
        return () => {
            window.removeEventListener("keydown", skip);
            window.removeEventListener("pointerdown", skip);
        };
    }, []);

    const typed = USER.slice(0, Math.max(0, step - LINES.length));

    return (
        <div className={`${styles.boot} ${leaving ? styles.leaving : ""}`} aria-hidden="true">
            {LINES.slice(0, step).map(line => (
                <div key={line}>
                    [ <span className={styles.ok}>OK</span> ] {line}
                </div>
            ))}
            {step >= LINES.length && (
                <div className={styles.login}>
                    yyg27 login: {typed}<span className={styles.cursor}>█</span>
                </div>
            )}
            <div className={styles.hint}>press any key to skip</div>
        </div>
    );
}
