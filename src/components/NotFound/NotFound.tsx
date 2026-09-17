import { useEffect, useRef } from "react";
import styles from "./NotFound.module.css";

export default function NotFound({ pageName }: { pageName: string }) {
    const bigRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const subRef = useRef<HTMLHeadingElement>(null);
    const tearRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chars = "▓█▒░#@%&8§4Ø0";
        const junk = "!@#$%^&*<>/\\|~░▒▓█";

        // 404 text scramble
        const bigInterval = setInterval(() => {
            if (Math.random() > 0.45) return;
            let n = 0;
            const id = setInterval(() => {
                const s = "404".split("").map((c) => {
                    return Math.random() < 0.5 ? chars[Math.floor(Math.random() * chars.length)] : c;
                }).join("");
                
                if (bigRef.current) {
                    if (bigRef.current.firstChild) bigRef.current.firstChild.nodeValue = s;
                    bigRef.current.setAttribute("data-text", s);
                }
                
                if (++n > 4) {
                    clearInterval(id);
                    if (bigRef.current) {
                        if (bigRef.current.firstChild) bigRef.current.firstChild.nodeValue = "404";
                        bigRef.current.setAttribute("data-text", "404");
                    }
                }
            }, 55);
        }, 1800);

        // Path description scramble
        const descInterval = setInterval(() => {
            if (Math.random() > 0.3) return;
            if (!descRef.current) return;
            const base = "path not found: ";
            const s = base.split("").map((c) => {
                return (c !== " " && Math.random() < 0.09) ? junk[Math.floor(Math.random() * junk.length)] : c;
            }).join("");
            descRef.current.innerHTML = `${s}<span class="${styles.accent}">/${pageName}</span>`;
            setTimeout(() => {
                if (descRef.current) descRef.current.innerHTML = `${base}<span class="${styles.accent}">/${pageName}</span>`;
            }, 120);
        }, 2200);

        // Subtitle signal lost alert
        const alertInterval = setInterval(() => {
            if (Math.random() > 0.6) return; // 60% chance to run
            if (!subRef.current) return;
            subRef.current.classList.add(styles.alert);
            subRef.current.textContent = "SIGNAL LOST";
            subRef.current.setAttribute("data-text", "SIGNAL LOST");
            setTimeout(() => {
                if (subRef.current) {
                    subRef.current.classList.remove(styles.alert);
                    subRef.current.textContent = "PAGE NOT FOUND";
                    subRef.current.setAttribute("data-text", "PAGE NOT FOUND");
                }
            }, 800);
        }, 2000);

        // Window shake and RGB shift
        const shakeInterval = setInterval(() => {
            const r = Math.random();
            if (r < 0.22) {
                bigRef.current?.classList.add(styles.shake);
                subRef.current?.classList.add(styles.shake);
                setTimeout(() => {
                    bigRef.current?.classList.remove(styles.shake);
                    subRef.current?.classList.remove(styles.shake);
                }, 600);
            }
            if (r > 0.78) {
                bigRef.current?.classList.add(styles.rgb);
                subRef.current?.classList.add(styles.rgb);
                setTimeout(() => {
                    bigRef.current?.classList.remove(styles.rgb);
                    subRef.current?.classList.remove(styles.rgb);
                }, 500);
            }
        }, 1600);

        // Screen tearing
        const tearInterval = setInterval(() => {
            if (Math.random() > 0.4) return;
            if (!tearRef.current) return;
            tearRef.current.style.top = Math.random() * window.innerHeight + "px";
            tearRef.current.style.height = (4 + Math.random() * 26) + "px";
            tearRef.current.style.transform = "translateX(" + (Math.random() * 30 - 15) + "px)";
            tearRef.current.style.opacity = "1";
            setTimeout(() => {
                if (tearRef.current) tearRef.current.style.opacity = "0";
            }, 70 + Math.random() * 110);
        }, 1200);

        return () => {
            clearInterval(bigInterval);
            clearInterval(descInterval);
            clearInterval(alertInterval);
            clearInterval(shakeInterval);
            clearInterval(tearInterval);
        };
    }, [pageName]);

    return (
        <div ref={containerRef} className={styles.container}>
            <div ref={tearRef} className={styles.tear}></div>
            <div className={styles.glow}></div>
            <div className={styles.scanlines}></div>

            <div className={styles.content}>
                <h1 ref={bigRef} className={styles.massive} data-text="404">
                    404
                    <span className={styles.slice}>404</span>
                </h1>
                <h2 ref={subRef} className={styles.subtitle} data-text="PAGE NOT FOUND">
                    PAGE NOT FOUND
                </h2>
                
                <div className={styles.textBlock}>
                    <p ref={descRef} className={styles.desc}>
                        path not found: <span className={styles.accent}>/{pageName}</span>
                    </p>
                    
                    <p className={styles.suggestedTitle}>Suggested actions:</p>
                    <ul className={styles.list}>
                        <li>1. check for typos in the url</li>
                        <li>
                            2. return to <a href="/" className={styles.link}>~/home</a>
                        </li>
                        <li>3. use the terminal to navigate</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
