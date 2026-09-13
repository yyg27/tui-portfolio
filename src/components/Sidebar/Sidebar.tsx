import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import Navigation from "../Navigation/Navigation";

const themes = ["amber", "matrix", "cyan", "dracula", "royal", "layor", "peach", "fener", "evangelion", "emerald", "coral", "cyberpunk", "everforest", "nord"];
const darkThemes = ["amber", "matrix", "cyan", "dracula", "layor", "peach", "fener", "evangelion", "cyberpunk", "everforest", "nord"];
const lightThemes = ["royal", "emerald", "coral"];
const themeColors: Record<string, string> = {
    amber: "#ffb000",
    matrix: "#27c93f",
    cyan: "#2196f3",
    dracula: "#bd93f9",
    royal: "#014BAA",
    layor: "#F8F3F0",
    peach: "#FE8254",
    fener: "#E4A419",
    evangelion: "#8338EC",
    emerald: "#013E37",
    coral: "#f0544d",
    cyberpunk: "#fcee09",
    everforest: "#a7c080",
    nord: "#81a1c1",
};
const frames = ["/", "-", "\\", "|"];

interface SidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

export default function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
    const [frame, setFrame] = useState(0);
    const [time, setTime] = useState(new Date());
    
    const [themeIndex, setThemeIndex] = useState(() => {
        const saved = localStorage.getItem("theme");
        const idx = saved ? themes.indexOf(saved) : 0;
        return idx !== -1 ? idx : 0;
    });

    const [themeTab, setThemeTab] = useState<'dark' | 'light'>(() => {
        const saved = localStorage.getItem("theme");
        return saved && lightThemes.includes(saved) ? 'light' : 'dark';
    });

    useEffect(() => {
        const currentTheme = themes[themeIndex];
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem("theme", currentTheme);
    }, [themeIndex]);

    useEffect(() => {
        const syncTheme = () => {
            const saved = localStorage.getItem("theme");
            const idx = saved ? themes.indexOf(saved) : -1;
            if (idx !== -1) {
                setThemeIndex(idx);
                setThemeTab(lightThemes.includes(saved!) ? 'light' : 'dark');
            }
        };
        window.addEventListener("storage", syncTheme);
        return () => window.removeEventListener("storage", syncTheme);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setFrame(f => (f + 1) % frames.length);
        }, 150);
        
        const clock = setInterval(() => {
            setTime(new Date());
        }, 1000);
        
        return () => {
            clearInterval(timer);
            clearInterval(clock);
        };
    }, []);

    const timeString = time.toLocaleTimeString('en-US', { hour12: false });
    
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
                        {isCollapsed ? "***" : `[${frames[frame]}]`}
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
                    {!isCollapsed ? `SYS_TIME: ${timeString}` : timeString}
                </div>
                <div className={styles.actions}>
                    <button id="theme-toggle-btn" onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className={`${styles.actionBtn} ${isThemeMenuOpen ? styles.activeThemeBtn : ''}`} title="Themes">
                        [T]
                    </button>
                    <button onClick={onToggleCollapse} className={`${styles.actionBtn} ${styles.collapseBtn}`} title="Toggle Sidebar">
                        {isCollapsed ? "[>]" : "[<]"}
                    </button>
                </div>
            </div>
        </aside>
    );
}

