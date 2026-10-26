import { navigationItems } from "../../data/navigation.data";
import styles from "./Navigation.module.css";
import Icon from "../Icon/Icon";

// currentPage comes from App, so "/Skills/" still marks Skills and a click re-renders the highlight
export default function Navigation({ currentPage, isCollapsed = false }: { currentPage: string; isCollapsed?: boolean }) {
    return (
        <nav>
            <ul className={`${styles.navigationList} ${isCollapsed ? styles.collapsed : ''}`}>
                {navigationItems.map((item) => {
                    const active = item.label.toLowerCase() === currentPage;
                    return (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                title={item.label}
                                aria-label={isCollapsed ? item.label : undefined}
                                aria-current={active ? "page" : undefined}
                                className={active ? styles.active : ''}
                            >
                                <span className={styles.navIcon}><Icon name={item.icon} /></span>
                                {!isCollapsed && <span className={styles.navText}>{item.label}</span>}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
