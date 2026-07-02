import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { PromotionsProvider } from './context/PromotionsContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PromotionsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </PromotionsProvider>
    </BrowserRouter>
  </StrictMode>,
)

