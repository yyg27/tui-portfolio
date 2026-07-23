import styles from "./Sidebar.module.css";
import Navigation from "../Navigation/Navigation";

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <header>
                <a href="/">yyg27</a>
            </header>
            <Navigation />
        </aside>
    );
}

