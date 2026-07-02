import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { PromotionsProvider } from './context/PromotionsContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PromotionsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </PromotionsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

