import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { fmtPrice } from '../utils/shopUtils';

/**
 * CartPreviewBar – Barra flotante sticky en el fondo que aparece cuando
 * hay al menos 1 ítem en el carrito. Muestra el total y navega a /pedido/resumen.
 */
export default function CartPreviewBar() {
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) return null;

  return (
    <div
      className="fixed bottom-20 lg:bottom-6 left-1/2 z-50 px-4 w-full max-w-lg"
      style={{ transform: 'translateX(-50%)', animation: 'slideUpBar 0.3s ease' }}
    >
      <button
        id="cart-preview-bar"
        type="button"
        onClick={() => navigate('/pedido/resumen')}
        className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl
                   shadow-xl cursor-pointer transition-all hover:opacity-95 active:scale-[0.99]"
        style={{
          background: 'linear-gradient(135deg, #1a5c1a 0%, #2d7d2d 100%)',
          color: '#ffffff',
        }}
        aria-label={`Ver resumen del pedido: ${totalItems} productos, total ${fmtPrice(totalPrice)}`}
      >
        {/* Ícono + badge */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag size={22} strokeWidth={2} />
            <span
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center
                         justify-center text-[10px] font-extrabold"
              style={{ background: '#ffffff', color: '#1a5c1a' }}
            >
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <p className="text-[11px] font-semibold opacity-80 leading-none">Tu pedido</p>
            <p className="text-[13px] font-extrabold leading-tight mt-0.5">
              {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
            </p>
          </div>
        </div>

        {/* Total + flecha */}
        <div className="flex items-center gap-2">
          <p className="text-lg font-extrabold">{fmtPrice(totalPrice)}</p>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          >
            <ArrowRight size={16} strokeWidth={2.5} />
          </div>
        </div>
      </button>

      <style>{`
        @keyframes slideUpBar {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
