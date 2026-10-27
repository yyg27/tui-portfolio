import type { ReactNode } from "react";

const stroke = (children: ReactNode) => (
    <g fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="square" strokeLinejoin="miter">{children}</g>
);

// brand paths from Simple Icons (CC0); the rest are hand-drawn with square corners to match the sharp UI
const icons = {
    github: (
        <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    ),
    linkedin: (
        <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
    mail: stroke(<>
        <path d="M2 4h20v16H2Z" />
        <path d="m2 5 10 8 10-8" />
    </>),
    file: stroke(<>
        <path d="M14 2H4v20h16V8Z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8M16 17H8" />
    </>),
    home: stroke(<>
        <path d="M3 10 12 3l9 7v11H3Z" />
        <path d="M9 21v-7h6v7" />
    </>),
    folder: stroke(
        <path d="M2 4h7l2 3h11v13H2Z" />
    ),
    sparkle: stroke(
        <path d="M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
    ),
    branch: stroke(<>
        <path d="M6 3v12" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
    </>),
    idcard: stroke(<>
        <path d="M2 5h20v14H2Z" />
        <circle cx="9" cy="11" r="2" />
        <path d="M6.17 15a3 3 0 0 1 5.66 0M16 10h2M16 14h2" />
    </>),
    // painter's palette; round by nature, like the git branch nodes
    theme: stroke(<>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        <g fill="currentColor" stroke="none">
            <circle cx="13.5" cy="6.5" r="1.4" />
            <circle cx="17.5" cy="10.5" r="1.4" />
            <circle cx="8.5" cy="7.5" r="1.4" />
            <circle cx="6.5" cy="12.5" r="1.4" />
        </g>
    </>),
};

export type IconName = keyof typeof icons;

export default function Icon({ name }: { name: IconName }) {
    // a theme's --icon colours every icon; unset, the var is invalid and the icon inherits its text colour
    return (
        <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" style={{ flexShrink: 0, color: "var(--icon)" }}>
            {icons[name]}
        </svg>
    );
}
