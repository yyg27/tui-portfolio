import { useState } from "react";
import styles from "./Terminal.module.css";

const validThemes = ["amber", "matrix", "cyan", "dracula", "royal", "layor", "peach", "fener"];

const HELP_MESSAGE = [
    "AVAILABLE COMMANDS:",
    "  /home, /projects, /skills, /journey, /contact  (or 'cd <page>')",
    `  /theme <name>  (${validThemes.join(" | ")})`,
    "  /help          (list commands)",
    "  clear          (clear output)",
].join("\n");

export default function Terminal() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string | null>(null);

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
                setOutput(null);
            } else if (cmd === "/help" || cmd === "help") {
                setOutput(HELP_MESSAGE);
            } else if (cmd === "clear") {
                setOutput(null);
            } else if (cmd.startsWith("/theme ")) {
                const themeName = cmd.split(" ")[1];
                if (validThemes.includes(themeName)) {
                    document.documentElement.setAttribute('data-theme', themeName);
                    localStorage.setItem("theme", themeName);
                    window.dispatchEvent(new Event("storage"));
                    setOutput(`[SYS] Theme set to: ${themeName}`);
                } else {
                    setOutput(`[ERR] Unknown theme '${themeName}'. Valid: ${validThemes.join(", ")}`);
                }
            } else if (cmd) {
                setOutput(`command not found: ${cmd}. Type /help for available commands.`);
            }
            setInput("");
        }
    };

    return (
        <div className={styles.terminal}>
            {output && (
                <div className={styles.output}>
                    <pre>{output}</pre>
                </div>
            )}
            <div className={styles.inputRow}>
                <span className={styles.prompt}>yyg27@portfolio:~$</span>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        className={styles.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type /help for available commands or enter a route..."
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}
