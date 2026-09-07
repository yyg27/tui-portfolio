export interface Skill {
    name: string;
}

export interface SkillGroup {
    category: string;
    items: Skill[];
}

export const skillsData: SkillGroup[] = [
    { 
        category: "LANGUAGES", 
        items: [
            { name: "C" },
            { name: "C++" },
            { name: "Python" },
            { name: "JavaScript" },
            { name: "TypeScript" }
        ]
    },
    { 
        category: "FRONTEND & MOBILE", 
        items: [
            { name: "HTML5" },
            { name: "CSS" },
            { name: "TailwindCSS" },
            { name: "React" },
            { name: "React Native" },
            { name: "NextJS" },
            { name: "Expo" }
        ]
    },
    { 
        category: "BACKEND & DATABASES", 
        items: [
            { name: "NodeJS" },
            { name: "Express.js" },
            { name: "NestJS" },
            { name: "Prisma" },
            { name: "PostgreSQL" },
            { name: "MongoDB" }
        ]
    },
    { 
        category: "SYSTEMS & TOOLS", 
        items: [
            { name: "Linux" },
            { name: "Git" }
        ]
    }
];
