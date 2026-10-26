import type { CSSProperties } from "react";
import styles from "./NotFound.module.css";
import { navigationItems } from "../../data/navigation.data";

// figlet -f "ANSI Shadow" 404
const BIG_404 = `██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═████╗██║  ██║
███████║██║██╔██║███████║
╚════██║████╔╝██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝`;

export default function NotFound({ pageName }: { pageName: string }) {
    const prompt = <span className={styles.prompt}>yyg27@portfolio:~$</span>;

    const lines = [
        <>{prompt} cd /{pageName}</>,
        <span className={styles.error}>bash: cd: /{pageName}: No such file or directory</span>,
        <h1 className={styles.big}>
            <span aria-hidden="true" data-text={BIG_404}>{BIG_404}</span>
            <span className={styles.srOnly}>404: page not found</span>
        </h1>,
        <span className={styles.comment}># this page doesn't exist. pick a directory:</span>,
        <>{prompt} ls ~</>,
        <nav className={styles.ls} aria-label="Pages">
            {navigationItems.map((item) => (
                <a key={item.href} href={item.href}>{item.label.toLowerCase()}/</a>
            ))}
        </nav>,
        <>{prompt} <span className={styles.cursor}>█</span></>,
    ];

    return (
        <div className={styles.screen}>
            {lines.map((line, i) => (
                // lines print one after another, like a shell replaying the session
                <div key={i} className={styles.line} style={{ "--i": i } as CSSProperties}>
                    {line}
                </div>
            ))}
        </div>
    );
}
