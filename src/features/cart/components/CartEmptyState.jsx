import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

/**
 * CartEmptyState – Estado vacío cuando el carrito no tiene ítems.
 */
export default function CartEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-sm"
        style={{ background: '#edfaf0' }}
      >
        <ShoppingBag size={36} strokeWidth={1.5} style={{ color: '#2d7d2d' }} />
      </div>
      <h2 className="text-xl font-extrabold text-stone-900 mb-1">Tu canasta está vacía</h2>
      <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
        Agregá productos desde el catálogo para armar tu pedido.
      </p>
      <button
        id="cart-empty-go-shop"
        type="button"
        onClick={() => navigate('/pedido')}
        className="mt-6 flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold
                   cursor-pointer transition-all hover:opacity-90 active:scale-95"
        style={{ background: '#1a5c1a', color: '#ffffff' }}
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        Ver productos
      </button>
    </div>
  );
}
