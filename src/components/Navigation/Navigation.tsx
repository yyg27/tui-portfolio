import { navigationItems } from "../../data/navigation.data";
import styles from "./Navigation.module.css";
import Icon from "../Icon/Icon";

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
                            aria-label={isCollapsed ? item.label : undefined}
                            aria-current={item.href === activePage ? "page" : undefined}
                            className={item.href === activePage ? styles.active : ''}
                        >
                            <span className={styles.navIcon}><Icon name={item.icon} /></span>
                            {!isCollapsed && <span className={styles.navText}>{item.label}</span>}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
