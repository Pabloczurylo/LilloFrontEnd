import { useCart } from '../../../context/CartContext';
import { fmtPrice } from '../../shop/utils/shopMockData';
import { MessageCircle } from 'lucide-react';

/** Número de WhatsApp del negocio (sin espacios ni +) */
const WA_NUMBER = '5491100000000';
const STORE_NAME = 'Verdulería Lillo';

/**
 * CartSummaryCard – Card sticky con el total estimado y botón de WhatsApp.
 *
 * Al hacer clic en "Enviar Pedido por WhatsApp" abre wa.me con un mensaje
 * preformateado con todos los productos, cantidades y total.
 */
export default function CartSummaryCard() {
  const { cartItems, totalItems, totalPrice } = useCart();

  const handleWhatsApp = () => {
    const lines = cartItems
      .map(
        (i) =>
          `• ${i.product.name} x${i.quantity}  →  ${fmtPrice(i.product.price * i.quantity)}`
      )
      .join('\n');

    const msg =
      `Hola ${STORE_NAME}! 🌿 Quiero hacer el siguiente pedido:\n\n` +
      `${lines}\n\n` +
      `*Total estimado: ${fmtPrice(totalPrice)}*\n` +
      `(${totalItems} ${totalItems === 1 ? 'producto' : 'productos'})\n\n` +
      `¡Gracias! 🙌`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="rounded-2xl p-5 mt-4"
      style={{
        background: 'linear-gradient(135deg, #edfaf0 0%, #d4f0da 100%)',
      }}
    >
      {/* Eyebrow */}
      <p
        className="text-[10px] font-extrabold uppercase tracking-widest mb-1"
        style={{ color: '#2d7d2d' }}
      >
        Total estimado
      </p>

      {/* Total + contador */}
      <div className="flex items-end justify-between gap-2 mb-4">
        <p
          className="font-extrabold leading-none"
          style={{ fontSize: '34px', color: '#0f2910', letterSpacing: '-1px' }}
        >
          {fmtPrice(totalPrice)}
        </p>
        <p className="text-sm font-semibold text-stone-500 pb-1">
          {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      {/* Botón WhatsApp */}
      <button
        id="whatsapp-order-btn"
        type="button"
        onClick={handleWhatsApp}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl
                   text-white font-extrabold text-[15px] cursor-pointer
                   transition-all hover:opacity-95 active:scale-[0.98] shadow-md"
        style={{ background: 'linear-gradient(135deg, #25d366 0%, #128c40 100%)' }}
        aria-label={`Enviar pedido por WhatsApp, total ${fmtPrice(totalPrice)}`}
      >
        <MessageCircle size={20} strokeWidth={2} />
        Enviar Pedido por WhatsApp
      </button>

      {/* Disclaimer */}
      <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-stone-500 mt-3">
        Confirmación instantánea con el productor
      </p>
    </div>
  );
}
