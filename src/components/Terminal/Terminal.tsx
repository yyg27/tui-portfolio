import { useState, useEffect, useCallback } from "react";
import styles from "./Terminal.module.css";
import { themes as validThemes } from "../../data/themes.data";
import { navigationItems } from "../../data/navigation.data";

const HELP_MESSAGE = [
    "AVAILABLE COMMANDS:",
    "  /home, /projects, /skills, /journey, /contact  (or 'cd <page>')",
    `  /theme <name>  (${validThemes.join(" | ")})`,
    "  /help          (list commands)",
    "  clear          (clear output)",
].join("\n");

const routes: Record<string, string> = { "/": "/", "cd": "/", "cd ~": "/", "cd ..": "/" };
for (const { label, href } of navigationItems) {
    const page = label.toLowerCase();
    routes[`/${page}`] = routes[page] = routes[`cd ${page}`] = href;
}

export default function Terminal() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string | null>(null);

    const executeCommand = useCallback((raw: string) => {
        const cmd = raw.trim().toLowerCase();
        if (Object.hasOwn(routes, cmd)) {
            window.history.pushState({}, "", routes[cmd]);
            window.dispatchEvent(new PopStateEvent("popstate"));
            setOutput(null);
        } else if (cmd === "/help" || cmd === "help") {
            setOutput(HELP_MESSAGE);
        } else if (cmd === "toggle-help") {
            setOutput(prev => prev ? null : HELP_MESSAGE);
        } else if (cmd === "clear") {
            setOutput(null);
        } else if (cmd === "/theme" || cmd.startsWith("/theme ")) {
            const themeName = cmd.split(/\s+/)[1];
            if (!themeName) {
                setOutput(`Usage: /theme <name>\nAvailable: ${validThemes.join(", ")}`);
            } else if (validThemes.includes(themeName)) {
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
    }, []);

    useEffect(() => {
        const onCustomCmd = (e: Event) => {
            const customEvent = e as CustomEvent<string>;
            if (customEvent.detail) {
                executeCommand(customEvent.detail);
            }
        };
        window.addEventListener("terminal-command", onCustomCmd);
        return () => window.removeEventListener("terminal-command", onCustomCmd);
    }, [executeCommand]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(input);
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
