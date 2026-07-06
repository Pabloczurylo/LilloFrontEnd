import { useState, useEffect, useMemo, useRef } from 'react';
import { X, CheckCircle2, AlertTriangle, Search } from 'lucide-react';
import { getProductsAPI } from '../../../services/productsService';

export default function AddProductModal({ isOpen, onClose, onAdd }) {
  const [dbProducts, setDbProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [unit, setUnit] = useState('KG');
  const [error, setError] = useState('');
  const searchRef = useRef(null);

  // Cargar productos
  useEffect(() => {
    if (isOpen) {
      getProductsAPI()
        .then((data) => {
          setDbProducts(data.map(p => ({
            id: p.id,
            name: p.name,
            ref: p.id.substring(0, 8).toUpperCase(),
            price: Number(p.price_per_unit),
            unit: p.unit === 'unidad' ? 'UN' : p.unit === 'kg' ? 'KG' : p.unit?.toUpperCase() ?? 'UN',
            category: p.category?.name ?? 'General',
          })));
        })
        .catch(err => console.error('Error loading search products for sales:', err));

      setTimeout(() => searchRef.current?.focus(), 100);
      setError('');
    } else {
      setSearch('');
      setSelectedProduct(null);
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

  // Sugerencias
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
    setUnitPrice(product.price);
    setUnit(product.unit);
    setShowSuggestions(false);
  };

  const handleClearProduct = () => {
    setSelectedProduct(null);
    setSearch('');
    setUnitPrice('');
    setUnit('KG');
  };

  const parsedQty = parseFloat(quantity);
  const parsedPrice = parseFloat(unitPrice);
  const total = (!isNaN(parsedQty) && !isNaN(parsedPrice))
    ? parsedQty * parsedPrice
    : null;

  const isValid = selectedProduct && parsedQty > 0 && parsedPrice >= 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setError('Elegí un producto, completá la cantidad y el precio antes de continuar.');
      return;
    }
    onAdd({
      id: selectedProduct.id, // ID real de base de datos
      name: selectedProduct.name,
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
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Agregar producto a la venta"
        className="fixed z-50 bottom-0 inset-x-0 rounded-t-3xl lg:inset-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[420px] lg:rounded-3xl bg-white shadow-2xl animate-[slideUp_.25s_ease-out]"
      >
        <div className="lg:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-200" />
        </div>

        <div className="px-6 pt-4 pb-3 lg:pt-7 lg:pb-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-xl font-extrabold text-stone-900 leading-tight">Agregar Item</h2>
              <p className="text-sm text-stone-400 mt-0.5">Buscá un producto y poné la cantidad.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors cursor-pointer shrink-0 mt-0.5"
            >
              <X size={18} />
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 mb-4 bg-red-50 border border-red-200 rounded-2xl">
              <AlertTriangle size={16} className="text-red-500 shrink-0" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Buscador de Producto */}
            <div className="relative">
              <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500">Buscar Producto *</label>
              <div className="relative mt-2">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedProduct(null);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                  placeholder="Escribí nombre del producto..."
                  className="w-full pl-9 pr-10 py-3 text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-green-700"
                />
                {selectedProduct && (
                  <button type="button" onClick={handleClearProduct} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold hover:text-stone-600 cursor-pointer">✕</button>
                )}
              </div>

              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-20 top-full mt-1 w-full bg-white border border-stone-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
                  {suggestions.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onMouseDown={() => handleSelectProduct(p)}
                        className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors text-left cursor-pointer"
                      >
                        <span>{p.name} <span className="text-xs text-stone-400">({p.ref})</span></span>
                        <span className="text-xs font-semibold text-green-700">${p.price}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Cantidad */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500">Cantidad *</label>
              <div className="flex mt-2 rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 focus-within:border-green-700 transition-all">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={quantity}
                  onChange={(e) => { setQuantity(e.target.value); setError(''); }}
                  placeholder="0.00"
                  className="flex-1 px-4 py-3.5 text-xl font-bold text-stone-700 bg-transparent outline-none"
                />
                <div className="flex items-center px-4 border-l border-stone-200 text-stone-400 font-bold">
                  {unit}
                </div>
              </div>
            </div>

            {/* Precio Unitario */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-widest text-stone-500">Precio Unitario</label>
              <div className="flex mt-2 items-center rounded-2xl border border-stone-200 bg-stone-50 focus-within:border-green-700 transition-all">
                <span className="pl-4 text-xl font-bold text-green-700 select-none">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={unitPrice}
                  onChange={(e) => { setUnitPrice(e.target.value); setError(''); }}
                  placeholder="0.00"
                  className="flex-1 px-3 py-3.5 text-xl font-bold text-stone-700 bg-transparent outline-none"
                />
              </div>
              {total !== null && total > 0 && (
                <p className="mt-1.5 text-xs text-stone-400 text-right">
                  {quantity} {unit} × ${parsedPrice.toFixed(2)} ={' '}
                  <span className="font-bold text-green-800">${total.toFixed(2)}</span>
                </p>
              )}
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-2.5 pt-1 pb-safe">
              <button
                type="submit"
                disabled={!isValid}
                className={`flex items-center justify-center gap-2.5 w-full py-4 px-5 font-bold text-base rounded-2xl transition-all cursor-pointer shadow-md ${
                  isValid ? 'bg-green-900 hover:bg-green-800 text-white' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 size={18} />
                Agregar a la Canasta
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 text-sm font-bold uppercase tracking-widest text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
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
