import { useState, useEffect, useLayoutEffect, useCallback, useRef, type CSSProperties } from "react";
import styles from "./Terminal.module.css";
import { themes as validThemes } from "../../data/themes.data";
import { navigationItems } from "../../data/navigation.data";
import { systemInfo } from "../../data/system.data";
import { socialLinks } from "../../data/social.data";
import { writeStorage } from "../../utils/storage";

// "github", "linkedin", "mail", "cv" open the same links as the hero buttons
const links = Object.fromEntries(socialLinks.map(l => [l.label.toLowerCase(), l.href]));
const linkCommands = Object.keys(links);

const HELP_MESSAGE = [
    "AVAILABLE COMMANDS:",
    "  /home, /projects, /skills, /journey, /contact  (or 'cd <page>')",
    `  /theme <name>  (${validThemes.join(" | ")})`,
    "  neofetch       (system info)",
    "  whoami         (who is this)",
    `  ${linkCommands.join(", ")}  (open links)`,
    "  /help          (list commands)",
    "  clear          (clear output)",
    "  [TAB] complete  [UP/DOWN] history",
].join("\n");

const NEOFETCH = ["yyg27@portfolio", "-".repeat(15), ...systemInfo.map(i => `${i.label}: ${i.value}`)].join("\n");

const routes: Record<string, string> = { "/": "/", "cd": "/", "cd ~": "/", "cd ..": "/" };
for (const { label, href } of navigationItems) {
    const page = label.toLowerCase();
    routes[`/${page}`] = routes[page] = routes[`cd ${page}`] = href;
}

const completions = [...new Set([...Object.keys(routes), "/help", "clear", "neofetch", "whoami", ...linkCommands, ...validThemes.map(t => `/theme ${t}`)])];

function commonPrefix(words: string[]) {
    return words.reduce((a, b) => {
        let i = 0;
        while (i < a.length && a[i] === b[i]) i++;
        return a.slice(0, i);
    });
}

export default function Terminal({ mobileOpen }: { mobileOpen: boolean }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState("");
    const [caret, setCaret] = useState(0);
    const [output, setOutput] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1); // -1: not browsing history

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
                writeStorage("theme", themeName);
                window.dispatchEvent(new Event("storage"));
                setOutput(`[SYS] Theme set to: ${themeName}`);
            } else {
                setOutput(`[ERR] Unknown theme '${themeName}'. Valid: ${validThemes.join(", ")}`);
            }
        } else if (cmd === "neofetch") {
            setOutput(NEOFETCH);
        } else if (cmd === "whoami") {
            setOutput(`yyg27 (${systemInfo[0].value})`);
        } else if (Object.hasOwn(links, cmd)) {
            const href = links[cmd];
            if (href.startsWith("mailto:")) window.location.href = href;
            else window.open(href, "_blank", "noopener");
            setOutput(`[SYS] Opening ${href.replace(/^(https?:\/\/(www\.)?|mailto:)/, "")}`);
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

    useEffect(() => {
        if (mobileOpen) inputRef.current?.focus();
    }, [mobileOpen]);

    // the native caret is hidden; a block cursor is drawn at the caret position instead
    const syncCaret = () => setCaret(inputRef.current?.selectionStart ?? 0);
    useLayoutEffect(() => {
        setCaret(inputRef.current?.selectionStart ?? 0);
    }, [input]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            executeCommand(input);
            if (input.trim()) setHistory(h => [...h, input.trim()]);
            setHistoryIndex(-1);
            setInput("");
        } else if (e.key === "ArrowUp" && history.length) {
            e.preventDefault();
            const i = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(i);
            setInput(history[i]);
        } else if (e.key === "ArrowDown" && historyIndex !== -1) {
            e.preventDefault();
            const i = historyIndex + 1;
            setHistoryIndex(i < history.length ? i : -1);
            setInput(i < history.length ? history[i] : "");
        } else if (e.key === "Tab" && input.trim()) {
            // empty input keeps normal Tab so keyboard users can leave the field
            e.preventDefault();
            const typed = input.trimStart().toLowerCase();
            const matches = completions.filter(c => c.startsWith(typed));
            if (!matches.length) return;
            setInput(commonPrefix(matches));
            if (matches.length > 1) setOutput(matches.join("  "));
        }
    };

    return (
        <div className={`${styles.terminal} ${mobileOpen ? styles.mobileOpen : ""}`}>
            {output && (
                <div className={styles.output}>
                    {/* key replays the line-by-line print for each new output */}
                    <pre key={output}>
                        {output.split("\n").map((line, i) => (
                            <span key={i} className={styles.outLine} style={{ "--i": i } as CSSProperties}>{line || " "}</span>
                        ))}
                    </pre>
                </div>
            )}
            <div className={styles.inputRow}>
                <span className={styles.prompt}>yyg27@portfolio:~$</span>
                <div className={styles.inputWrapper}>
                    <span className={styles.caretLayer} aria-hidden="true">
                        {input.slice(0, caret)}<span className={styles.blockCaret}>█</span>
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onSelect={syncCaret}
                        placeholder="Type /help for available commands or enter a route..."
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
}
