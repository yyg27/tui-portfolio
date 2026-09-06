import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import Navigation from "../Navigation/Navigation";

export default function Sidebar() {
    const [frame, setFrame] = useState(0);
    const [time, setTime] = useState(new Date());
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
        <aside className={styles.sidebar}>
            <header className={styles.header}>
                <a href="/">
                    <span style={{ marginRight: '8px', opacity: 0.8, fontFamily: 'monospace' }}>
                        [{frames[frame]}]
                    </span>
                    yyg27
                </a>
            </header>
            <Navigation />
            
            <div style={{
                marginTop: 'auto',
                padding: '1rem',
                borderTop: '1px solid var(--accent)',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: 'var(--accent)',
                textAlign: 'center'
            }}>
                SYS_TIME: {timeString}
            </div>
        </aside>
    );
}

