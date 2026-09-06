import { useState, useEffect } from "react";
import styles from "./Projects.module.css";

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    visibility: string;
}

const FEATURED_PROJECTS = [
    { name: "eva-unit-01-autonomous-exploration", customDescription: "" },
    { name: "aptt", customDescription: "" },
    { name: "AnimalsAR_mediapie", customDescription: "" },
    { name: "custom_transport_protocol", customDescription: "" },
    { name: "multi_user_chat_app", customDescription: "" },
];

export default function Projects() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [isGrid, setIsGrid] = useState(true);

    useEffect(() => {
        fetch("https://api.github.com/users/yyg27/repos?per_page=100")
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) return;
                
                const filtered = FEATURED_PROJECTS.map(config => {
                    const found = data.find((r: Repo) => r.name === config.name);
                    if (found) {
                        return {
                            ...found,
                            description: config.customDescription || found.description
                        };
                    }
                    return null;
                }).filter(Boolean) as Repo[];

                setRepos(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className={styles.loading}>[SYS] FETCHING_GITHUB_REPOS...</div>;
    }

    return (
        <div>
            <div className={styles.controls}>
                <span className={styles.title}>/projects</span>
                <button onClick={() => setIsGrid(!isGrid)} className={styles.layoutBtn}>
                    [ {isGrid ? 'LIST' : 'GRID'} ]
                </button>
            </div>
            <section className={`${styles.projectsContainer} ${isGrid ? styles.grid : styles.list}`}>
            {repos.map(repo => (
                <div key={repo.id} className={styles.repoCard}>
                    <div className={styles.repoHeader}>
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className={styles.repoName}>
                            {repo.name}
                        </a>
                        <span className={styles.repoVisibility}>{repo.visibility}</span>
                    </div>
                    {repo.description && (
                        <div className={styles.repoDescription}>
                            {repo.description}
                        </div>
                    )}
                    <div className={styles.repoFooter}>
                        {repo.language && (
                            <div className={styles.repoLang}>
                                <div className={styles.langColor}></div>
                                <span>{repo.language}</span>
                            </div>
                        )}
                        <div>★ {repo.stargazers_count}</div>
                    </div>
                </div>
            ))}
            {repos.length === 0 && <div>Projeler bulunamadı veya FEATURED_PROJECTS listesi boş.</div>}
        </section>
        </div>
    );
}
