<div align="center">
  <h1>> TUI Portfolio_</h1>
  <p>A modern, single-page terminal-inspired portfolio website developed for developers who live in the CLI.</p>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
</div>

<br />

The website provides an interactive command-line interface, a fastfetch-style profile presentation, dynamic theme switching, and keyboard/mouse navigation. Visitors can explore projects, skills, and contact details just like navigating a Unix terminal.

The project was built with **React**, **TypeScript**, and **Vite**, focusing on minimal dependencies, high performance, and a simple content management structure.

## Live Demo

**[yyg27.runs-on.dev](https://yyg27.runs-on.dev)**

----------

## Features

- Responsive Design: Mobile, tablet, and desktop support, with an app-style icon tab bar on phones.
- Sharp SVG Icons: One small icon set for navigation, links, and the theme switcher, no icon library needed.
- Interactive Terminal: Page routes (`/projects`, `cd skills`, ...), `/theme <name>`, `neofetch`, `whoami`, `github`, `linkedin`, `mail`, `cv`, `/help` and `clear`, with Tab completion and ↑/↓ command history. Desktop only.
- Fastfetch Dashboard: System info and portrait presentation.
- Skill Constellations: Skills drawn as a star map, one constellation per category, laid out automatically from the data file.
- 19 Dynamic Themes: Gruvbox, Nord, Dracula, Matrix, etc. with instant switching. Dark themes get a CRT-style phosphor glow on text.
- Custom 404: A shell session with a glitching figlet `404` and links to every page.
- Live Status: Sidebar uptime counter and the deployed commit hash on the home page.
- Accessible: Keyboard navigable, screen reader labels, and reduced motion respected.
- Centralized Content: TypeScript data files for easy management.
- Static Architecture: No backend or database required.
- Vercel Ready: Optimized for instant deployment.

----------

## Tech Stack

-   **React 19**
-   **TypeScript 6**
-   **Vite 8**
-   **CSS Modules (Vanilla CSS)**
-   **ESLint**

----------

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/yyg27/tui-portfolio.git
cd tui-portfolio
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### Production

Create a production build:

```bash
npm run build
```

Start the production server (preview):

```bash
npm run preview
```

### Linting

Run ESLint with:

```bash
npm run lint
```

----------

## Content Management

Website content is centralized in TypeScript data files located in:

```text
src/data/
```

This allows all personal portfolio content to be updated without modifying the React components or CSS logic. The following information can be managed from these files:

-   **`system.data.ts`**: Fastfetch system info (Bio, OS, Editor, Shell), also printed by the `neofetch` command
-   **`skills.data.ts`**: Skill categories and items; each category becomes a constellation on the Skills page
-   **`social.data.ts`**: GitHub, LinkedIn, Mail, and CV links (also available as terminal commands)
-   **`themes.data.ts`**: Theme names shared by the theme menu and the `/theme` command
-   **`navigation.data.ts`**: Pages shown in the sidebar, the terminal routes, and the 404 page

The list of featured GitHub repositories lives in `src/components/Projects/Projects.tsx` (`FEATURED_PROJECTS`); descriptions are fetched from the GitHub API.

Changes made during local development are reflected immediately.

> Changes to the production website require a new deployment.

----------

## Images & Media

Static media files are stored in the `public` directory.

### Profile ASCII/Photo

```text
public/portrait.txt
```

To replace the fastfetch portrait, update the ASCII art in this file. (Or replace it with an actual image if you prefer a standard photo).

```text
public/portrait.jpeg
```

The photo on the Contact page ID card, also used as the link preview image (`og:image` in `index.html`).

### Resume (CV)

```text
public/Yusuf_Yiğit_Gültekin_Resume.pdf
```

To update your CV, replace this file while ensuring the filename matches the link in `src/data/social.data.ts`.

### Favicon

```text
public/favicon.svg
```

A single star from the Skills constellations, used as the tab icon. It switches colour with the browser's light or dark mode.

----------

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   ├── portrait.jpeg
│   ├── portrait.txt
│   └── Yusuf_Yiğit_Gültekin_Resume.pdf
│
├── src/
│   ├── components/
│   │   ├── Contact/
│   │   ├── Home/
│   │   ├── Icon/
│   │   ├── Journey/
│   │   ├── Navigation/
│   │   ├── NotFound/
│   │   ├── Projects/
│   │   ├── Sidebar/
│   │   ├── Skills/
│   │   └── Terminal/
│   │
│   ├── data/
│   │   ├── navigation.data.ts
│   │   ├── skills.data.ts
│   │   ├── social.data.ts
│   │   ├── system.data.ts
│   │   └── themes.data.ts
│   │
│   ├── styles/
│   │   └── variables.css
│   │
│   ├── utils/
│   │   └── storage.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

### Directory Overview

| Path | Description |
|---|---|
| `src/components/` | Reusable UI and layout components |
| `src/components/Terminal/` | The interactive CLI engine |
| `src/data/` | Centralized website content |
| `src/styles/` | Global styles and theme variables |
| `src/utils/` | Small helpers (safe `localStorage` access) |
| `src/App.tsx` | Main application router |
| `public/` | Static files (Favicon, CV, ASCII art) |

----------

## Deployment

The website is optimized for deployment on **Vercel** or **Netlify**.

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Production
```

The `BUILD:` hash on the home page comes from `VERCEL_GIT_COMMIT_SHA` on Vercel (keep "Automatically expose System Environment Variables" enabled) and from `git rev-parse HEAD` in local builds. It shows `dev` when neither is available.

----------

## Developer

**Yusuf Yiğit Gültekin**

GitHub: **[@yyg27](https://github.com/yyg27)**

----------

## License

This project is the proprietary property of Yusuf Yiğit Gültekin. All rights reserved. 
The design, content, and source code may not be reused, copied, or redistributed without permission.
