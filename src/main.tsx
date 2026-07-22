import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DossierProvider } from './contexts/DossierContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DossierProvider>
      <App />
    </DossierProvider>
  </StrictMode>,
)
