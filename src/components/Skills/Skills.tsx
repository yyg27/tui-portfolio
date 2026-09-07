import styles from "./Skills.module.css";
import { skillsData } from "../../data/skills.data";

export default function Skills() {
    return (
        <section className={styles.skillsContainer}>
            <div className={styles.header}>
                <span className={styles.title}>[ SKILLS ]</span>
                <span className={styles.blinker}>_</span>
            </div>
            
            <div className={styles.group}>
                {skillsData.map((group) => (
                    <div key={group.category} className={styles.categoryBlock}>
                        <div className={styles.categoryTitle}>// {group.category}</div>
                        <div className={styles.items}>
                            {group.items.map((item) => (
                                <div key={item.name} className={styles.skillRow}>
                                    <div className={styles.skillHeader}>
                                        <span>{item.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
