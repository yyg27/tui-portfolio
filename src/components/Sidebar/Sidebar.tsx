import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import Navigation from "../Navigation/Navigation";

export default function Sidebar() {
    const [frame, setFrame] = useState(0);
    const [time, setTime] = useState(new Date());
    const [isCollapsed, setIsCollapsed] = useState(() => {
        return localStorage.getItem("sidebarCollapsed") === "true";
    });
    const frames = ["/", "-", "\\", "|"];

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", String(isCollapsed));
    }, [isCollapsed]);

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
            
            <div className={styles.footer}>
                <div className={`${styles.clock} ${isCollapsed ? styles.clockCollapsed : ''}`}>
                    {!isCollapsed ? `SYS_TIME: ${timeString}` : timeString}
                </div>
                <div className={styles.actions}>
                    {isCollapsed ? (
                        <>
                            <button onClick={() => setIsCollapsed(!isCollapsed)} className={styles.actionBtn} title="Toggle Sidebar">
                                {"[>]"}
                            </button>
                            <button className={styles.actionBtn} title="Toggle Theme">
                                [T]
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={styles.actionBtn} title="Toggle Theme">
                                [T]
                            </button>
                            <button onClick={() => setIsCollapsed(!isCollapsed)} className={styles.actionBtn} title="Toggle Sidebar">
                                {"[<]"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
}

