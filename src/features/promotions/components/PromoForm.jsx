import { useState, useMemo } from 'react';
import { Search, CheckCircle2, AlertTriangle, Megaphone } from 'lucide-react';
import { mockProducts } from '../../../utils/mockData';
import { applyDiscount } from '../utils/promotionsMockData';

/**
 * PromoForm – Formulario para crear una nueva promoción.
 * Fiel al mockup: 3 pasos numerados + botón "ACTIVAR OFERTA".
 *
 * Props:
 *  - onActivate : (promoData) => void  – llamado al enviar el form
 */
export default function PromoForm({ onActivate }) {
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [discount, setDiscount] = useState('');
  const [origin, setOrigin] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  /** Autocomplete sobre mockProducts */
  const suggestions = useMemo(() => {
    if (!search.trim() || selectedProduct) return [];
    const q = search.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q)
    );
  }, [search, selectedProduct]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSearch(product.name);
    setShowSuggestions(false);
  };

  const handleClearProduct = () => {
    setSelectedProduct(null);
    setSearch('');
  };

  const discountNum = parseInt(discount, 10);
  const isValid =
    selectedProduct &&
    discountNum > 0 &&
    discountNum <= 100 &&
    startDate &&
    endDate &&
    endDate >= startDate;

  const previewPrice = selectedProduct && discountNum > 0
    ? applyDiscount(selectedProduct.price, discountNum)
    : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    onActivate({
      product: selectedProduct,
      discount: discountNum,
      origin: origin.trim() || selectedProduct.category,
      startDate,
      endDate,
    });

    // Reset
    setSelectedProduct(null);
    setSearch('');
    setDiscount('');
    setOrigin('');
    setStartDate('');
    setEndDate('');
    setStatus('success');
    setTimeout(() => setStatus(null), 3500);
  };

  return (
    <form
      id="promo-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-stone-100 shadow-sm p-5 flex flex-col gap-6"
    >
      {/* Success / Error feedback */}
      {status === 'success' && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-2xl
                        animate-[fadeIn_.3s_ease]">
          <CheckCircle2 size={16} className="text-green-700 shrink-0" />
          <p className="text-sm font-semibold text-green-800">¡Oferta activada correctamente!</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl
                        animate-[fadeIn_.3s_ease]">
          <AlertTriangle size={16} className="text-red-500 shrink-0" />
          <p className="text-sm font-semibold text-red-700">Completá todos los campos correctamente.</p>
        </div>
      )}

      {/* ─── PASO 1: Producto ─── */}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 mb-2">
          1. Seleccionar Producto
        </p>
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            id="promo-product-search"
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelectedProduct(null); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Buscar en catálogo (ej. Tomate...)"
            className="w-full pl-10 pr-10 py-3.5 text-sm text-stone-700
                       placeholder:text-stone-400 bg-stone-50 border border-stone-200
                       rounded-2xl outline-none focus:border-green-700
                       focus:ring-2 focus:ring-green-700/20 transition-all"
          />
          {selectedProduct && (
            <button type="button" onClick={handleClearProduct}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer">
              ✕
            </button>
          )}

          {/* Dropdown sugerencias */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 top-full mt-1 w-full bg-white border border-stone-200
                           rounded-2xl shadow-lg overflow-hidden">
              {suggestions.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onMouseDown={() => handleSelectProduct(p)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm
                               text-stone-700 hover:bg-stone-50 transition-colors text-left cursor-pointer"
                  >
                    <img src={p.imageUrl} alt={p.name}
                      className="w-8 h-8 rounded-xl object-cover shrink-0" />
                    <span>
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-stone-400 ml-1.5 text-xs">{p.ref}</span>
                    </span>
                    <span className="ml-auto text-xs text-stone-400 shrink-0">${p.price.toLocaleString('es-AR')}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chip de producto seleccionado */}
        {selectedProduct && (
          <div className="mt-2 flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-3.5 py-2.5">
            <img src={selectedProduct.imageUrl} alt={selectedProduct.name}
              className="w-9 h-9 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-green-900 truncate">{selectedProduct.name}</p>
              <p className="text-[10px] text-green-700">{selectedProduct.ref} · ${selectedProduct.price.toLocaleString('es-AR')} / {selectedProduct.unit}</p>
            </div>
            {previewPrice && (
              <div className="text-right shrink-0">
                <p className="text-[10px] text-stone-400 line-through">${selectedProduct.price.toLocaleString('es-AR')}</p>
                <p className="text-sm font-extrabold text-green-700">${previewPrice.toLocaleString('es-AR')}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── PASO 2: Descuento ─── */}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 mb-2">
          2. Descuento
        </p>
        <div className="flex items-center rounded-2xl border border-stone-200 bg-stone-50
                        focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/20 transition-all">
          <input
            id="promo-discount-input"
            type="number"
            min="1"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0"
            className="flex-1 px-4 py-3.5 text-xl font-bold text-stone-700
                       placeholder:text-stone-300 bg-transparent outline-none"
          />
          <span className="pr-4 text-xl font-bold text-stone-400 select-none">%</span>
        </div>

        {/* Slider visual */}
        {discountNum > 0 && discountNum <= 100 && (
          <div className="mt-2 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all"
                style={{ width: `${discountNum}%` }}
              />
            </div>
            <span className="text-[11px] font-bold text-orange-600">-{discountNum}%</span>
          </div>
        )}
      </div>

      {/* ─── PASO 2b: Origen (opcional) ─── */}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 mb-2">
          Origen / Etiqueta{' '}
          <span className="text-stone-300 font-normal normal-case tracking-normal">(opcional)</span>
        </p>
        <input
          id="promo-origin-input"
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Ej: Granja Local, Ecuador..."
          className="w-full px-4 py-3 text-sm text-stone-700 placeholder:text-stone-400
                     bg-stone-50 border border-stone-200 rounded-2xl outline-none
                     focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all"
        />
      </div>

      {/* ─── PASO 3: Vigencia ─── */}
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-stone-500 mb-2">
          3. Vigencia
        </p>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <input
              id="promo-start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3.5 text-sm text-stone-700
                         bg-stone-50 border border-stone-200 rounded-2xl outline-none
                         focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all
                         cursor-pointer"
            />
          </div>
          <div className="relative">
            <input
              id="promo-end-date"
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3.5 text-sm text-stone-700
                         bg-stone-50 border border-stone-200 rounded-2xl outline-none
                         focus:border-green-700 focus:ring-2 focus:ring-green-700/20 transition-all
                         cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* ─── Botón Activar ─── */}
      <button
        id="activate-promo-btn"
        type="submit"
        className={`flex items-center justify-center gap-2.5 w-full py-4 px-5
                    font-bold text-base rounded-2xl transition-all cursor-pointer shadow-md
                    ${isValid
                      ? 'bg-green-900 hover:bg-green-800 active:scale-[.98] text-white'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
      >
        <Megaphone size={18} />
        Activar Oferta
      </button>
    </form>
  );
}
