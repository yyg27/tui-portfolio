import { useState } from "react";
import styles from "./Terminal.module.css";

export default function Terminal() {
    const [input, setInput] = useState("");

    const routes: Record<string, string> = {
        "/": "/",
        "/home": "/",
        "home": "/",
        "cd home": "/",
        "cd": "/",
        "cd ~": "/",
        "cd ..": "/",
        "/projects": "/projects",
        "projects": "/projects",
        "cd projects": "/projects",
        "/skills": "/skills",
        "skills": "/skills",
        "cd skills": "/skills",
        "/journey": "/journey",
        "journey": "/journey",
        "cd journey": "/journey",
        "/contact": "/contact",
        "contact": "/contact",
        "cd contact": "/contact",
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const cmd = input.trim().toLowerCase();
            if (routes[cmd]) {
                window.history.pushState({}, "", routes[cmd]);
                window.dispatchEvent(new PopStateEvent("popstate"));
            } else if (cmd.startsWith("/theme ")) {
                const themeName = cmd.split(" ")[1];
                const validThemes = ["amber", "matrix", "cyan", "dracula", "royal", "layor", "peach", "fener"];
                if (validThemes.includes(themeName)) {
                    document.documentElement.setAttribute('data-theme', themeName);
                    localStorage.setItem("theme", themeName);
                    window.dispatchEvent(new Event("storage"));
                }
            }
            setInput("");
        }
    };

    return (
        <div className={styles.terminal}>
            <span className={styles.prompt}>yyg27@portfolio:~$</span>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a command (e.g. /projects) and press Enter..."
                    autoFocus
                />
            </div>
        </div>
    );
}
