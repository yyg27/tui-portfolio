import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import Navigation from "../Navigation/Navigation";

export default function Sidebar() {
    const [frame, setFrame] = useState(0);
    const [time, setTime] = useState(new Date());
    const [isCollapsed, setIsCollapsed] = useState(false);
    const frames = ["/", "-", "\\", "|"];

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
            <header className={styles.header}>
                <a href="/">
                    <span style={{ marginRight: '8px', opacity: 0.8 }}>
                        {isCollapsed ? "***" : `[${frames[frame]}]`}
                    </span>
                    {!isCollapsed && "yyg27"}
                </a>
            </header>
            <Navigation isCollapsed={isCollapsed} />
            
            <div className={styles.footer}>
                <div className={styles.clock}>
                    {!isCollapsed ? `SYS_TIME: ${timeString}` : timeString.split(':')[0] + 'h'}
                </div>
                <div className={styles.actions}>
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className={styles.actionBtn} title="Toggle Sidebar">
                        {isCollapsed ? '[>]' : '[<]'}
                    </button>
                    <button className={styles.actionBtn} title="Toggle Theme">
                        [T]
                    </button>
                </div>
            </div>
        </aside>
    );
}

