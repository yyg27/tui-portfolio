import styles from "./Journey.module.css";

const history = [
    {
        date: "2020-2021",
        title: "Hello World",
        desc: "Graduated from Kozan Science High School and started studying Computer Engineering at Konya Food and Agriculture University, skipping the preparatory year by ranking #1."
    },
    {
        date: "2021-2023",
        title: "First Lines of Code",
        desc: "Learned the fundamentals of programming with Python, then shifted my focus to Java to build a stronger foundation in computer science, object-oriented design, and software architecture. Alongside this, I spent a lot of time modding The Elder Scrolls V: Skyrim, which grew into a deeper interest in understanding how things work under the hood."
    },
    {
        date: "2023",
        title: "Homecoming",
        desc: "Transferred to Çukurova University to continue studying Computer Engineering in my hometown of Adana, Turkey."
    },
    {
        date: "2023-2024",
        title: "A Change of Scenery",
        desc: "With this fresh start, I dove into web development with HTML, CSS, and JavaScript, while also co-developing a Block Blast-inspired game in C using raylib. I also went deep into Skyrim modding —resolving complex record conflicts with SSEEdit, curating my own modpack, and translating mods into Turkish for myself and my friends."
    },
    {
        date: "2024",
        title: "The Linux Rabbit Hole",
        desc: "Started my Linux journey with Ubuntu and gradually fell deeper into it. Eventually moved to Arch, started customizing my setup, and got increasingly comfortable working from the terminal."
    },
    {
        date: "2024-2025",
        title: "Into the Unknown",
        desc: "Started exploring different sides of development, from web and networking to AR and machine learning. Built a bunch of projects along the way and got a taste of everything from low-level programming to AI"
    },
    {
        date: "2025-2026",
        title: "Into the Real World",
        desc: "Started focusing more on the things I actually enjoyed building. Continued working on a mobile app with a friend, built my own CLI tools, experimented with systems and AI, and started taking on web projects both for clients and for myself."
    },
    {  
        date: "2026 and Beyond",
        title: "Further on Up the Road",
        desc: "There is still plenty left to explore. For now, I’m continuing to build things I find interesting, work on real projects, and see where the road takes me next."
    }
];

export default function Journey() {
    return (
        <section className={styles.container}>
            <div className={styles.header}>$ git log --oneline --author="yyg27"</div>
            <div className={styles.timeline}>
                {history.map((item, i) => (
                    <div key={i} className={styles.event}>
                        <div className={styles.date}>{item.date}</div>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.desc}>{item.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
