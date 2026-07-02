import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * AddProductModal – Modal/bottom-sheet para agregar un producto a la canasta.
 *
 * Mobile  : bottom-sheet que sube desde abajo con animación slide-up.
 * Desktop : modal centrado con backdrop.
 *
 * Props:
 *  - isOpen   : boolean
 *  - onClose  : () => void
 *  - onAdd    : (item) => void  – recibe { name, quantity, unit, unitPrice, total }
 */
export default function AddProductModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [unit, setUnit] = useState('KG');
  const [error, setError] = useState('');
  const nameRef = useRef(null);

  // Auto-focus nombre cuando se abre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameRef.current?.focus(), 100);
      setError('');
    } else {
      // Reset al cerrar
      setName('');
      setQuantity('');
      setUnitPrice('');
      setUnit('KG');
      setError('');
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const parsedQty = parseFloat(quantity);
  const parsedPrice = parseFloat(unitPrice);
  const total = (!isNaN(parsedQty) && !isNaN(parsedPrice))
    ? parsedQty * parsedPrice
    : null;

  const isValid = name.trim() && parsedQty > 0 && parsedPrice >= 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setError('Completá el nombre, cantidad y precio antes de continuar.');
      return;
    }
    onAdd({
      id: Date.now(),
      name: name.trim(),
      quantity: parsedQty,
      unit,
      unitPrice: parsedPrice,
      total: parsedQty * parsedPrice,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        id="add-product-modal-backdrop"
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
                   transition-opacity duration-300"
      />

      {/* ── Panel ── */}
      {/* Mobile: bottom-sheet; Desktop: modal centered */}
      <div
        id="add-product-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Agregar producto a la venta"
        className="fixed z-50
                   bottom-0 inset-x-0 rounded-t-3xl
                   lg:inset-auto lg:top-1/2 lg:left-1/2
                   lg:-translate-x-1/2 lg:-translate-y-1/2
                   lg:w-[420px] lg:rounded-3xl
                   bg-white shadow-2xl
                   animate-[slideUp_.25s_ease-out]"
      >
        {/* Handle bar – mobile only */}
        <div className="lg:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-200" />
        </div>

        <div className="px-6 pt-4 pb-3 lg:pt-7 lg:pb-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-xl font-extrabold text-stone-900 leading-tight">
                Registrar Venta
              </h2>
              <p className="text-sm text-stone-400 mt-0.5">
                Completá los detalles del producto.
              </p>
            </div>
            <button
              type="button"
              id="modal-close-btn"
              onClick={onClose}
              aria-label="Cerrar modal"
              className="w-8 h-8 flex items-center justify-center rounded-xl
                         text-stone-400 hover:bg-stone-100 hover:text-stone-700
                         transition-colors cursor-pointer shrink-0 mt-0.5"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 mb-4
                            bg-red-50 border border-red-200 rounded-2xl">
              <AlertTriangle size={16} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form id="add-product-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Nombre del producto */}
            <div>
              <label
                htmlFor="product-name-input"
                className="text-[11px] font-bold uppercase tracking-widest text-stone-500"
              >
                Nombre del Producto
              </label>
              <input
                id="product-name-input"
                ref={nameRef}
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                placeholder="Ej: Pechuga de Pollo, Tomate..."
                className="mt-2 w-full px-4 py-3.5 text-sm text-stone-800
                           placeholder:text-stone-300 bg-stone-50 border border-stone-200
                           rounded-2xl outline-none focus:border-green-700
                           focus:ring-2 focus:ring-green-700/20 transition-all"
              />
            </div>

            {/* Cantidad + Unidad */}
            <div>
              <label
                htmlFor="product-quantity-input"
                className="text-[11px] font-bold uppercase tracking-widest text-stone-500"
              >
                Peso / Cantidad
              </label>
              <div className="flex mt-2 rounded-2xl overflow-hidden border border-stone-200
                              bg-stone-50 focus-within:border-green-700
                              focus-within:ring-2 focus-within:ring-green-700/20 transition-all">
                <input
                  id="product-quantity-input"
                  type="number"
                  min="0"
                  step="0.01"
                  value={quantity}
                  onChange={(e) => { setQuantity(e.target.value); setError(''); }}
                  placeholder="0.00"
                  className="flex-1 px-4 py-3.5 text-xl font-bold text-stone-700
                             placeholder:text-stone-300 bg-transparent outline-none"
                />
                {/* Unit toggle */}
                <div className="flex items-center border-l border-stone-200">
                  {['KG', 'UN', 'DOZ'].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      className={`px-3 py-1.5 text-[11px] font-bold transition-colors cursor-pointer
                                  ${unit === u
                                    ? 'text-green-900 bg-green-50'
                                    : 'text-stone-400 hover:text-stone-600'
                                  }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Precio unitario */}
            <div>
              <label
                htmlFor="product-price-input"
                className="text-[11px] font-bold uppercase tracking-widest text-stone-500"
              >
                Precio Final
              </label>
              <div className="flex mt-2 items-center rounded-2xl border border-stone-200
                              bg-stone-50 focus-within:border-green-700
                              focus-within:ring-2 focus-within:ring-green-700/20 transition-all">
                <span className="pl-4 text-xl font-bold text-green-700 select-none">$</span>
                <input
                  id="product-price-input"
                  type="number"
                  min="0"
                  step="0.01"
                  value={unitPrice}
                  onChange={(e) => { setUnitPrice(e.target.value); setError(''); }}
                  placeholder="0.00"
                  className="flex-1 px-3 py-3.5 text-xl font-bold text-stone-700
                             placeholder:text-stone-300 bg-transparent outline-none"
                />
              </div>
              {/* Preview total */}
              {total !== null && total > 0 && (
                <p className="mt-1.5 text-xs text-stone-400 text-right">
                  {quantity} {unit} × ${parsedPrice.toFixed(2)} ={' '}
                  <span className="font-bold text-green-800">${total.toFixed(2)}</span>
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-2.5 pt-1 pb-safe">
              <button
                id="confirm-add-product-btn"
                type="submit"
                className={`flex items-center justify-center gap-2.5 w-full py-4 px-5
                            font-bold text-base rounded-2xl transition-all
                            cursor-pointer shadow-md
                            ${isValid
                              ? 'bg-green-900 hover:bg-green-800 active:scale-[.98] text-white'
                              : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            }`}
              >
                <CheckCircle2 size={18} />
                Registrar Venta
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 text-sm font-bold uppercase tracking-widest
                           text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
