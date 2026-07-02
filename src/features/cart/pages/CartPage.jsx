import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummaryCard from '../components/CartSummaryCard';
import CartEmptyState from '../components/CartEmptyState';

/**
 * CartPage – Vista de resumen del pedido antes de enviarlo por WhatsApp.
 * Ruta: /pedido/resumen
 *
 * Diseño fiel al mockup (imagen 2):
 *  - Header "Tu Pedido" con back arrow y tabs Productos / Resumen
 *  - Lista scrolleable de CartItem
 *  - CartSummaryCard sticky al fondo
 *
 * Responsive:
 *  - Mobile  (<1024px): stack vertical, summary card fija al scroll
 *  - Desktop (≥1024px): layout de 2 columnas (lista | card)
 */
export default function CartPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#faf8f5' }}>

      {/* ── Header ── */}
      <div className="px-5 pt-6 pb-4 lg:px-8 lg:pt-8">
        {/* Tabs Productos / Resumen */}
        <div className="flex gap-1 mb-5 border-b border-stone-200">
          <button
            id="cart-tab-productos"
            type="button"
            onClick={() => navigate('/pedido')}
            className="px-4 pb-3 text-sm font-semibold transition-colors cursor-pointer"
            style={{ color: '#9ca3af', borderBottom: '2px solid transparent' }}
          >
            Productos
          </button>
          <button
            id="cart-tab-resumen"
            type="button"
            className="px-4 pb-3 text-sm font-bold transition-colors cursor-pointer"
            style={{ color: '#1a5c1a', borderBottom: '2px solid #1a5c1a' }}
          >
            Resumen
          </button>
        </div>

        <h1
          className="font-extrabold leading-tight"
          style={{ fontSize: '28px', color: '#0f2910', letterSpacing: '-0.5px' }}
        >
          Tu Pedido
        </h1>
        <p className="text-sm text-stone-500 mt-1 leading-relaxed">
          Revisá los tesoros artesanales seleccionados antes de confirmar.
        </p>
      </div>

      {/* ── Contenido ── */}
      {cartItems.length === 0 ? (
        <CartEmptyState />
      ) : (
        <div className="lg:flex lg:gap-8 lg:px-8 lg:items-start lg:pb-12">

          {/* Lista de ítems */}
          <div className="flex-1 px-5 pb-4 lg:px-0 flex flex-col gap-3">
            {cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Card resumen */}
          <div className="px-5 pb-24 lg:px-0 lg:pb-0 lg:w-80 lg:shrink-0 lg:sticky lg:top-6">
            <CartSummaryCard />
          </div>
        </div>
      )}
    </div>
  );
}
