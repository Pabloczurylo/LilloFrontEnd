import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, CheckCircle2, AlertTriangle, Loader } from 'lucide-react';
import { getProductsAPI } from '../../../services/productsService';
import { reportLossAPI } from '../../../services/lossesService';

const MOTIVOS = [
  { id: 'mal_estado', label: 'Mal estado', emoji: '🥀' },
  { id: 'vencimiento', label: 'Vencimiento', emoji: '📅' },
  { id: 'dano_fisico', label: 'Daño físico', emoji: '🖼️' },
  { id: 'otro', label: 'Otro', emoji: '···' },
];

export default function LossForm({ onSuccess }) {
  const [search, setSearch] = useState('');
  const [dbProducts, setDbProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('KG');
  const [showUnitMenu, setShowUnitMenu] = useState(false);
  const [motivo, setMotivo] = useState('mal_estado');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Cargar productos al inicializar
  useEffect(() => {
    getProductsAPI()
      .then((data) => {
        setDbProducts(data.map(p => ({
          id: p.id,
          name: p.name,
          ref: p.id.substring(0, 8).toUpperCase(),
          category: p.category?.name ?? 'General',
          unit: p.unit === 'unidad' ? 'UN' : p.unit === 'kg' ? 'KG' : p.unit?.toUpperCase() ?? 'UN',
        })));
      })
      .catch(err => console.error('Error fetching search products:', err));
  }, []);

  /** Filter products by search text */
  const suggestions = useMemo(() => {
    if (!search.trim() || selectedProduct) return [];
    const q = search.toLowerCase();
    return dbProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q)
    );
  }, [search, selectedProduct, dbProducts]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setSearch(product.name);
    setUnit(product.unit || 'KG');
    setShowSuggestions(false);
  };

  const handleClearProduct = () => {
    setSelectedProduct(null);
    setSearch('');
    setUnit('KG');
  };

  const isValid = selectedProduct && parseFloat(quantity) > 0 && motivo && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setErrorMessage('Completá todos los campos antes de continuar.');
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      await reportLossAPI({
        product_id: selectedProduct.id,
        quantity: parseFloat(quantity),
        reason: motivo, // Enums del backend: mal_estado, vencimiento, dano_fisico, otro
        notes: notes.trim() || null,
      });

      setStatus('success');
      onSuccess?.();

      // Reset
      setSelectedProduct(null);
      setSearch('');
      setQuantity('');
      setUnit('KG');
      setMotivo('mal_estado');
      setNotes('');
      setTimeout(() => setStatus(null), 3500);
    } catch (err) {
      console.error('Error reporting loss:', err);
      setErrorMessage(err.response?.data?.error ?? 'Error al registrar la merma.');
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const categoryEmoji = (catName) => {
    const name = catName.toLowerCase();
    if (name.includes('verdura')) return '🥬';
    if (name.includes('frut')) return '🍊';
    if (name.includes('pan')) return '🍞';
    if (name.includes('lact') || name.includes('láct')) return '🧀';
    return '📦';
  };

  return (
    <form
      id="loss-form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-0"
    >
      {/* ── Success toast ── */}
      {status === 'success' && (
        <div
          className="mx-5 mb-4 flex items-center gap-3 px-4 py-3.5
                     bg-green-50 border border-green-200 rounded-2xl
                     animate-[fadeIn_.3s_ease]"
        >
          <CheckCircle2 size={18} className="text-green-700 shrink-0" />
          <p className="text-sm font-semibold text-green-800">
            ¡Merma registrada correctamente!
          </p>
        </div>
      )}

      {/* ── Error toast ── */}
      {status === 'error' && (
        <div
          className="mx-5 mb-4 flex items-center gap-3 px-4 py-3.5
                     bg-red-50 border border-red-200 rounded-2xl
                     animate-[fadeIn_.3s_ease]"
        >
          <AlertTriangle size={18} className="text-red-500 shrink-0" />
          <p className="text-sm font-semibold text-red-700">
            {errorMessage || 'Completá todos los campos antes de continuar.'}
          </p>
        </div>
      )}

      {/* ── Card container ── */}
      <div className="mx-5 bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col gap-6">

        {/* Product search */}
        <div>
          <label
            htmlFor="loss-product-search"
            className="text-xs font-bold uppercase tracking-wider text-stone-500"
          >
            Producto Afectado
          </label>
          <div className="relative mt-2">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
            <input
              id="loss-product-search"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedProduct(null);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
              placeholder="Buscar tomate, lechuga..."
              className="w-full pl-10 pr-10 py-3 text-sm text-stone-700
                         placeholder:text-stone-400 bg-stone-50 border border-stone-200
                         rounded-xl outline-none focus:border-green-700
                         focus:ring-2 focus:ring-green-700/20 transition-all"
            />
            {selectedProduct && (
              <button
                type="button"
                onClick={handleClearProduct}
                aria-label="Limpiar selección"
                className="absolute right-3.5 top-1/2 -translate-y-1/2
                           text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="absolute z-20 top-full mt-1 w-full bg-white border
                           border-stone-200 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto"
              >
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onMouseDown={() => handleSelectProduct(p)}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm
                                 text-stone-700 hover:bg-stone-50 transition-colors text-left cursor-pointer"
                    >
                      <span className="text-lg leading-none">
                        {categoryEmoji(p.category)}
                      </span>
                      <span>
                        <span className="font-semibold">{p.name}</span>
                        <span className="text-stone-400 ml-1.5 text-xs">{p.ref}</span>
                      </span>
                      <span className="ml-auto text-xs text-stone-400 shrink-0">{p.unit}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Selected product chip */}
          {selectedProduct && (
            <div className="mt-2 flex items-center gap-2 bg-green-50 border border-green-200
                            rounded-xl px-3.5 py-2.5">
              <span className="text-base leading-none">
                {categoryEmoji(selectedProduct.category)}
              </span>
              <div>
                <p className="text-xs font-bold text-green-900">{selectedProduct.name}</p>
                <p className="text-[10px] text-green-700">{selectedProduct.ref} · {selectedProduct.category}</p>
              </div>
              <button
                type="button"
                onClick={handleClearProduct}
                className="ml-auto text-green-700 hover:text-green-900 text-xs cursor-pointer"
                aria-label="Cambiar producto"
              >
                Cambiar
              </button>
            </div>
          )}
        </div>

        {/* Quantity + unit */}
        <div>
          <label
            htmlFor="loss-quantity"
            className="text-xs font-bold uppercase tracking-wider text-stone-500"
          >
            Cantidad a Registrar
          </label>
          <div className="flex gap-2 mt-2">
            <input
              id="loss-quantity"
              type="number"
              min="0"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0.00"
              className="flex-1 px-4 py-3 text-sm text-stone-700 text-right
                         placeholder:text-stone-400 bg-stone-50 border border-stone-200
                         rounded-xl outline-none focus:border-green-700
                         focus:ring-2 focus:ring-green-700/20 transition-all"
            />
            {/* Unit selector (locked to product unit for precision) */}
            <div className="relative">
              <button
                type="button"
                disabled
                className="flex items-center gap-2 px-4 py-3 bg-stone-100 border
                           border-stone-200 rounded-xl text-sm font-semibold text-stone-400
                           min-w-[80px] justify-between cursor-not-allowed"
              >
                {unit}
              </button>
            </div>
          </div>
        </div>

        {/* Reason picker */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Motivo Principal
          </p>
          <div className="grid grid-cols-2 gap-2.5 mt-2">
            {MOTIVOS.map(({ id, label, emoji }) => (
              <button
                key={id}
                type="button"
                id={`motivo-${id}`}
                onClick={() => setMotivo(id)}
                className={`flex flex-col items-center gap-1.5 py-4 px-3 rounded-2xl
                           border-2 transition-all cursor-pointer text-center
                           ${motivo === id
                             ? 'border-[#e8734a] bg-[#fef3ed] shadow-sm'
                             : 'border-stone-100 bg-stone-50 hover:bg-stone-100 hover:border-stone-200'
                           }`}
              >
                <span className={`text-2xl leading-none transition-all ${motivo === id ? 'scale-110' : ''}`}>
                  {emoji === '···'
                    ? <span className="text-lg font-bold text-stone-400 tracking-widest">···</span>
                    : emoji}
                </span>
                <span
                  className={`text-xs font-semibold leading-tight
                    ${motivo === id ? 'text-[#c05a34]' : 'text-stone-600'}`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional notes */}
        <div>
          <label
            htmlFor="loss-notes"
            className="text-xs font-bold uppercase tracking-wider text-stone-500"
          >
            Observaciones{' '}
            <span className="text-stone-300 font-normal normal-case tracking-normal">
              (opcional)
            </span>
          </label>
          <textarea
            id="loss-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej. Se detectó moho al abrir el cajón..."
            className="mt-2 w-full px-4 py-3 text-sm text-stone-700
                       placeholder:text-stone-400 bg-stone-50 border border-stone-200
                       rounded-xl outline-none focus:border-green-700
                       focus:ring-2 focus:ring-green-700/20 transition-all resize-none
                       leading-relaxed"
          />
        </div>
      </div>

      {/* ── Submit ── */}
      <div className="px-5 pt-5 pb-2">
        <button
          id="register-loss-btn"
          type="submit"
          disabled={!isValid || submitting}
          className={`flex items-center justify-center gap-2.5 w-full py-4 px-5
                     font-semibold text-base rounded-2xl transition-all shadow-md
                     cursor-pointer
                     ${isValid
                       ? 'bg-green-900 hover:bg-green-800 active:bg-green-950 text-white'
                       : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                     }`}
        >
          {submitting ? (
            <span className="w-5 h-5 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
          Registrar Pérdida
        </button>
      </div>
    </form>
  );
}
