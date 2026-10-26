import type { CSSProperties } from "react";
import styles from "./Skills.module.css";
import { skillsData } from "../../data/skills.data";

const W = 240;
const H = 170;
const total = skillsData.reduce((n, group) => n + group.items.length, 0);

// deterministic 0..1 from a string, so the sky looks the same on every visit
function rand(seed: string, salt: number) {
    let h = 2166136261 ^ salt;
    for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return ((h >>> 0) % 1000) / 1000;
}

// stars sit on a jittered ellipse whose start angle depends on the category, so every
// constellation curls differently; the open path (no closing segment) reads as a figure
function placeStars(category: string, names: string[]) {
    const n = names.length;
    const start = rand(category, 0) * Math.PI * 2;
    const span = n <= 2 ? Math.PI : Math.PI * 1.7;
    return names.map((name, i) => {
        const angle = start + (n === 1 ? 0 : (i * span) / (n - 1));
        const r = 0.75 + rand(name, 1) * 0.3;
        const x = W / 2 + Math.cos(angle) * 84 * r;
        const y = H / 2 + Math.sin(angle) * 52 * r;
        return { name, x, y, upper: y < H / 2, twinkle: rand(name, 3) };
    });
}

function placeDust(seed: string) {
    return Array.from({ length: 18 }, (_, i) => ({
        x: rand(seed, i * 3 + 10) * W,
        y: rand(seed, i * 3 + 11) * H,
        r: 0.5 + rand(seed, i * 3 + 12) * 0.7,
    }));
}

export default function Skills() {
    return (
        <section className={styles.skillsContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Skills</h1>
                <p className={styles.subtitle}>{total} stars across {skillsData.length} constellations</p>
            </header>

            <div className={styles.sky}>
                <div className={styles.meteorLayer} aria-hidden="true">
                    <span className={styles.meteor} />
                </div>
                {skillsData.map((group, gi) => {
                    const stars = placeStars(group.category, group.items.map(item => item.name));
                    return (
                        <figure key={group.category} className={styles.constellation} style={{ "--i": gi } as CSSProperties}>
                            <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
                                {placeDust(group.category).map((d, i) => (
                                    <circle key={i} className={styles.dust} cx={d.x} cy={d.y} r={d.r} />
                                ))}
                                <polyline className={styles.line} pathLength={1} points={stars.map(s => `${s.x},${s.y}`).join(" ")} />
                                {stars.map(s => (
                                    <g key={s.name} className={styles.starGroup} style={{ "--t": s.twinkle } as CSSProperties}>
                                        <circle className={styles.halo} cx={s.x} cy={s.y} r={7} />
                                        <circle className={styles.star} cx={s.x} cy={s.y} r={3.2} />
                                        <text className={styles.label} x={s.x} y={s.upper ? s.y - 12 : s.y + 19}>{s.name}</text>
                                    </g>
                                ))}
                            </svg>
                            <figcaption className={styles.caption}>
                                <span className={styles.name}>{group.category}</span>
                                <span className={styles.count}>{group.items.length} stars</span>
                            </figcaption>
                            <ul className={styles.srOnly}>
                                {group.items.map(item => <li key={item.name}>{item.name}</li>)}
                            </ul>
                        </figure>
                    );
                })}
            </div>
        </section>
    );
}
