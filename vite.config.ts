import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'

// short commit hash for the hero card; Vercel builds get it from an env var, local builds from git
function buildHash() {
  try {
    return (process.env.VERCEL_GIT_COMMIT_SHA ?? execSync('git rev-parse HEAD').toString()).trim().slice(0, 7)
  } catch {
    return 'dev'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { 'import.meta.env.VITE_BUILD': JSON.stringify(buildHash()) },
})
