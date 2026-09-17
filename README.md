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

**[tui-portfolio-ecru.vercel.app](https://tui-portfolio-ecru.vercel.app/)**

----------

## Features

- Responsive Design: Mobile, tablet, and desktop support.
- Interactive Terminal: Working commands (`ls`, `cd`, `whoami`, `theme`).
- Fastfetch Dashboard: System info and portrait presentation.
- 18 Dynamic Themes: Gruvbox, Nord, Dracula, Matrix, etc. with instant switching.
- Custom 404: CRT-glitch hardware aesthetic for broken routes.
- Centralized Content: TypeScript data files for easy management.
- Static Architecture: No backend or database required.
- Vercel Ready: Optimized for instant deployment.

----------

## Tech Stack

-   **React 18**
-   **TypeScript 5**
-   **Vite**
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

-   **`system.data.ts`**: Fastfetch system info (Bio, OS, Editor, Shell)
-   **`projects.data.ts`**: Your GitHub projects and descriptions
-   **`skills.data.ts`**: Tech stack, frontend, backend, and tools
-   **`social.data.ts`**: GitHub, LinkedIn, Mail, and CV links

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

### Resume (CV)

```text
public/Yusuf_Yiğit_Gültekin_Resume.pdf
```

To update your CV, replace this file while ensuring the filename matches the link in `src/data/social.data.ts`.

### Favicon

```text
public/favicon.svg
```

The terminal `>_` tab icon.

----------

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   ├── portrait.txt
│   └── Yusuf_Yiğit_Gültekin_Resume.pdf
│
├── src/
│   ├── components/
│   │   ├── Terminal/
│   │   ├── Sidebar/
│   │   ├── Home/
│   │   └── NotFound/
│   │
│   ├── data/
│   │   ├── projects.data.ts
│   │   ├── skills.data.ts
│   │   ├── social.data.ts
│   │   └── system.data.ts
│   │
│   ├── styles/
│   │   └── variables.css
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

----------

## Developer

**Yusuf Yiğit Gültekin**

GitHub: **[@yyg27](https://github.com/yyg27)**

----------

## License

This project is the proprietary property of Yusuf Yiğit Gültekin. All rights reserved. 
The design, content, and source code may not be reused, copied, or redistributed without permission.
