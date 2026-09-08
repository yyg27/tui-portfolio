import { navigationItems } from "../../data/navigation.data";
import styles from "./Navigation.module.css";

export default function Navigation({ isCollapsed = false }: { isCollapsed?: boolean }) {
    const activePage = window.location.pathname;

    return (
        <nav>
            <ul className={`${styles.navigationList} ${isCollapsed ? styles.collapsed : ''}`}>
                {navigationItems.map((item) => (
                    <li key={item.href}>
                        <a 
                            href={item.href} 
                            title={item.label}
                            className={item.href === activePage ? styles.active : ''}
                        >
                            {!isCollapsed && (
                                <span className={styles.navArrow} style={{ width: '1rem', display: 'inline-block', fontFamily: 'monospace' }}>
                                    {item.href === activePage ? ">" : ""}
                                </span>
                            )}
                            <span className={styles.navText}>
                                {isCollapsed ? `[${item.label[0]}]` : item.label}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}