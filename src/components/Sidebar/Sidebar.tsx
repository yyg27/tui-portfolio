import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import Navigation from "../Navigation/Navigation";
import Icon from "../Icon/Icon";
import { themes, darkThemes, lightThemes, themeColors } from "../../data/themes.data";
import { readStorage, writeStorage } from "../../utils/storage";

const bootTime = Date.now(); // module load = page load, so uptime survives sidebar remounts
const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

interface SidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

// own component so the 80ms tick re-renders only the spinner, not the whole sidebar
function Spinner() {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setFrame(f => (f + 1) % frames.length);
        }, 80);
        return () => clearInterval(timer);
    }, []);

    return <>[{frames[frame]}]</>;
}

// own component too, so the 1s tick doesn't re-render the theme menu and navigation
function Uptime({ showLabel }: { showLabel: boolean }) {
    const [now, setNow] = useState(Date.now);

    useEffect(() => {
        const clock = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(clock);
    }, []);

    const up = Math.floor((now - bootTime) / 1000);
    const time = [up / 3600, (up / 60) % 60, up % 60].map(n => String(Math.floor(n)).padStart(2, "0")).join(":");
    return <>{showLabel ? `UPTIME: ${time}` : time}</>;
}

export default function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
    // read from the page, not storage: it's set even when storage is blocked or the terminal changed it while the sidebar was hidden
    const current = document.documentElement.getAttribute("data-theme") ?? "";
    const [themeIndex, setThemeIndex] = useState(() => Math.max(0, themes.indexOf(current)));
    const [themeTab, setThemeTab] = useState<'dark' | 'light'>(() => lightThemes.includes(current) ? 'light' : 'dark');

    useEffect(() => {
        const currentTheme = themes[themeIndex];
        document.documentElement.setAttribute('data-theme', currentTheme);
        writeStorage("theme", currentTheme);
    }, [themeIndex]);

    // the terminal's /theme command and other tabs change the theme through here too
    useEffect(() => {
        const select = (name: string | null) => {
            const idx = name ? themes.indexOf(name) : -1;
            if (idx !== -1) {
                setThemeIndex(idx);
                setThemeTab(lightThemes.includes(name!) ? 'light' : 'dark');
            }
        };
        const fromTerminal = (e: Event) => select((e as CustomEvent<string>).detail);
        const fromOtherTab = () => select(readStorage("theme"));
        window.addEventListener("theme", fromTerminal);
        window.addEventListener("storage", fromOtherTab);
        return () => {
            window.removeEventListener("theme", fromTerminal);
            window.removeEventListener("storage", fromOtherTab);
        };
    }, []);

    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (!target.closest('#theme-menu') && !target.closest('#theme-toggle-btn')) {
                setIsThemeMenuOpen(false);
            }
        };
        if (isThemeMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isThemeMenuOpen]);
    
    const handleThemeSelect = (idx: number) => {
        setThemeIndex(idx);
    };

    const renderThemeBtn = (theme: string) => {
        const idx = themes.indexOf(theme);
        return (
            <button 
                key={theme}
                className={styles.themeOptionBtn}
                onClick={() => handleThemeSelect(idx)}
                title={`Set theme: ${theme}`}
            >
                <span 
                    className={styles.themeDot} 
                    style={{ backgroundColor: themeColors[theme] }}
                />
                <span className={styles.themeText} style={{ color: themeColors[theme] }}>
                    {themeIndex === idx ? `[${theme}]` : ` ${theme} `}
                </span>
            </button>
        );
    };

    const currentThemesList = themeTab === 'dark' ? darkThemes : lightThemes;

    return (
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
            <header className={`${styles.header} ${isCollapsed ? styles.headerCollapsed : ''}`}>
                <a href="/">
                    <span style={{ marginRight: isCollapsed ? '0' : '8px', opacity: 0.8 }}>
                        {isCollapsed ? "~" : <Spinner />}
                    </span>
                    {!isCollapsed && "yyg27"}
                </a>
            </header>
            <Navigation isCollapsed={isCollapsed} />
            
            {isThemeMenuOpen && (
                <div id="theme-menu" className={styles.themeMenu}>
                    <div style={{ display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-start', marginBottom: '8px', flexShrink: 0 }}>
                        <button 
                            onClick={() => setIsThemeMenuOpen(false)}
                            style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'monospace' }}
                            title="Close Menu"
                        >
                            [V]
                        </button>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1, minHeight: '0' }}>
                        {currentThemesList.map(renderThemeBtn)}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px', borderTop: '1px solid var(--border)', paddingTop: '4px', flexShrink: 0 }}>
                        <button 
                            onClick={() => setThemeTab('dark')}
                            style={{ background: 'none', border: 'none', color: themeTab === 'dark' ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                            title="Dark Themes"
                        >
                            {isCollapsed ? (
                                <span style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#000', border: '2px solid #fff', opacity: themeTab === 'dark' ? 1 : 0.4 }} />
                            ) : (
                                themeTab === 'dark' ? '[DARK]' : 'DARK'
                            )}
                        </button>
                        <button 
                            onClick={() => setThemeTab('light')}
                            style={{ background: 'none', border: 'none', color: themeTab === 'light' ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                            title="Light Themes"
                        >
                            {isCollapsed ? (
                                <span style={{ display: 'inline-block', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#fff', border: '2px solid #000', opacity: themeTab === 'light' ? 1 : 0.4 }} />
                            ) : (
                                themeTab === 'light' ? '[LIGHT]' : 'LIGHT'
                            )}
                        </button>
                    </div>
                </div>
            )}
            
            <div className={styles.footer}>
                <div className={`${styles.clock} ${isCollapsed ? styles.clockCollapsed : ''}`}>
                    <Uptime showLabel={!isCollapsed} />
                </div>
                <div className={styles.actions}>
                    <button id="theme-toggle-btn" onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className={`${styles.actionBtn} ${isThemeMenuOpen ? styles.activeThemeBtn : ''}`} title="Themes" aria-label="Themes" aria-expanded={isThemeMenuOpen}>
                        <Icon name="theme" />
                    </button>
                    <button onClick={onToggleCollapse} className={`${styles.actionBtn} ${styles.collapseBtn}`} title="Toggle Sidebar">
                        {isCollapsed ? "[>]" : "[<]"}
                    </button>
                </div>
            </div>
        </aside>
    );
}

