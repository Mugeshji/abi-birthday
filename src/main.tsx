import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { preloadAllImages } from './utils/preloadImages'

// Trigger instant parallel asset preloading into browser cache
preloadAllImages();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
