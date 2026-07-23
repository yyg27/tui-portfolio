import { navigationItems } from "../../data/navigation.data";
import styles from "./Navigation.module.css";

export default function Navigation() {
    const activePage = "/";

    return (
        <nav>
            <ul className={styles.navigationList}>
                {navigationItems.map((item) => (
                    <li key={item.href}>
                        <a href={item.href}>
                            <span>
                            {item.href === activePage ? "> " : ""}
                            </span>
                            <span>
                            {item.label}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}