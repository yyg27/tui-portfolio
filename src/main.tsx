import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/variables.css'
import './styles/globals.css'
import './styles/typography.css'
import './index.css'
import App from './App.tsx'

// the mobile browser bar follows the theme background
const themeColor = document.querySelector('meta[name="theme-color"]')!
const syncThemeColor = () => themeColor.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--background').trim())
new MutationObserver(syncThemeColor).observe(document.documentElement, { attributeFilter: ['data-theme'] })
syncThemeColor()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
