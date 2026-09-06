import { useState } from "react";
import styles from "./Terminal.module.css";

export default function Terminal() {
    const [input, setInput] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const cmd = input.trim().toLowerCase();
            if (cmd === "/projects" || cmd === "cd projects") {
                window.location.href = "/projects";
            } else if (cmd === "/skills" || cmd === "cd skills") {
                window.location.href = "/skills";
            } else if (cmd === "/contact" || cmd === "cd contact") {
                window.location.href = "/contact";
            } else if (cmd === "/home" || cmd === "cd home") {
                window.location.href = "/";
            } else if (cmd === "clear") {
                setInput("");
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
