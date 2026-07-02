import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { PromotionsProvider } from './context/PromotionsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PromotionsProvider>
        <App />
      </PromotionsProvider>
    </BrowserRouter>
  </StrictMode>,
)
