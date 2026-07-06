import { useState, useMemo, useEffect } from 'react';
import { Search, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getProductsAPI } from '../../../services/productsService';
import { applyDiscount } from '../utils/promotionsUtils';

export default function PromoForm({ onActivate }) {
  const [dbProducts, setDbProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [discount, setDiscount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [submitting, setSubmitting] = useState(false);

  // Cargar productos
  useEffect(() => {
    getProductsAPI()
      .then((data) => {
        setDbProducts(data.map(p => ({
          id: p.id,
          name: p.name,
          ref: p.id.substring(0, 8).toUpperCase(),
          price: Number(p.price_per_unit),
          category: p.category?.name ?? 'General',
        })));
      })
      .catch(err => console.error('Error loading search products for promo form:', err));
  }, []);

  /** Autocomplete */
  const suggestions = useMemo(() => {
    if (!search.trim() || selectedProduct) return [];
    const q = search.toLowerCase();
    return dbProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q)
    );
  }, [search, selectedProduct, dbProducts]);

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
    endDate >= startDate &&
    !submitting;

  const previewPrice = selectedProduct && discountNum > 0
    ? applyDiscount(selectedProduct.price, discountNum)
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      await onActivate({
        product_id: selectedProduct.id,
        discount_percentage: discountNum,
        start_date: startDate,
        end_date: endDate,
      });

      // Reset
      setSelectedProduct(null);
      setSearch('');
      setDiscount('');
      setStartDate('');
      setEndDate('');
      setStatus('success');
      setTimeout(() => setStatus(null), 3500);
    } catch (err) {
      console.error('Error setting promotion:', err);
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id="promo-form"
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-stone-100 shadow-sm p-5 flex flex-col gap-6"
    >
      {/* Success / Error feedback */}
      {status === 'success' && (
        <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-200 rounded-2xl animate-[fadeIn_.3s_ease]">
          <CheckCircle2 size={16} className="text-green-700 shrink-0" />
          <p className="text-sm font-semibold text-green-800">¡Oferta activada correctamente!</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl animate-[fadeIn_.3s_ease]">
          <AlertTriangle size={16} className="text-red-500 shrink-0" />
          <p className="text-sm font-semibold text-red-700">Por favor revisá los datos ingresados.</p>
        </div>
      )}

      {/* PASO 1: Elegir producto */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-5 rounded-full bg-green-900 text-white text-[10px] font-bold flex items-center justify-center">1</span>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Seleccionar Producto</p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedProduct(null);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
            placeholder="Ej. Tomate Perita..."
            className="w-full px-4 py-3 text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-green-700"
          />
          {selectedProduct && (
            <button type="button" onClick={handleClearProduct} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold hover:text-stone-600 cursor-pointer">✕</button>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 top-full mt-1 w-full bg-white border border-stone-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
              {suggestions.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onMouseDown={() => handleSelectProduct(p)}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors text-left cursor-pointer"
                  >
                    <span>{p.name}</span>
                    <span className="text-xs text-stone-400">${p.price}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* PASO 2: Descuento */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-5 rounded-full bg-green-900 text-white text-[10px] font-bold flex items-center justify-center">2</span>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Porcentaje de Descuento</p>
        </div>

        <div className="relative">
          <input
            type="number"
            min="1"
            max="100"
            required
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Ej. 25"
            className="w-full px-4 py-3 text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-green-700 pr-10"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 font-bold">%</span>
        </div>
      </div>

      {/* PASO 3: Fechas */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-5 rounded-full bg-green-900 text-white text-[10px] font-bold flex items-center justify-center">3</span>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">Vigencia de Oferta</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-stone-400 block mb-1">Inicio</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2.5 text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-green-700"
            />
          </div>
          <div>
            <label className="text-[10px] text-stone-400 block mb-1">Fin</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2.5 text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-green-700"
            />
          </div>
        </div>
      </div>

      {/* Preview box */}
      {previewPrice !== null && (
        <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100 flex flex-col gap-1">
          <p className="text-xs text-green-800 font-semibold">Resumen de Oferta:</p>
          <p className="text-sm font-bold text-stone-800">
            {selectedProduct.name}
          </p>
          <p className="text-xs text-stone-500">
            Precio: <span className="line-through">${selectedProduct.price}</span> →{' '}
            <span className="text-green-700 font-bold">${previewPrice}</span>
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        id="confirm-promo-btn"
        type="submit"
        disabled={!isValid || submitting}
        className={`w-full py-4 text-center text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer ${
          isValid ? 'bg-green-900 hover:bg-green-800' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
      >
        Activar Oferta
      </button>
    </form>
  );
}
