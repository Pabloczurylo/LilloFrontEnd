import { useState, useMemo } from 'react';
import { Leaf, ChevronDown, RefreshCw, AlertCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ShopProductCard from '../components/ShopProductCard';
import CartPreviewBar from '../components/CartPreviewBar';

/**
 * ShopPage – Vista catálogo de productos para clientes.
 * Ruta: /pedido
 *
 * Carga productos reales desde la API (GET /api/products).
 * Las categorías se generan dinámicamente desde la BD.
 *
 * Responsive:
 *  - Mobile  (<1024px): 1 columna, scroll vertical
 *  - Desktop (≥1024px): grid 2–4 columnas
 */
export default function ShopPage() {
  const { products, categories, loading, error, refetch } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('Todos los productos');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos los productos') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setFilterOpen(false);
  };

  // ── Estado de carga ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: '#faf8f5' }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '3px solid #d1d5db',
            borderTopColor: '#2d7d2d',
            animation: 'spin 0.8s linear infinite',
            display: 'block',
          }}
        />
        <p className="text-sm font-semibold text-stone-400">Cargando productos…</p>
      </div>
    );
  }

  // ── Estado de error ─────────────────────────────────────────────────────
  if (error) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-6"
        style={{ background: '#faf8f5' }}
      >
        <AlertCircle size={40} style={{ color: '#ef4444' }} />
        <p className="text-base font-bold text-stone-700 text-center">{error}</p>
        <button
          type="button"
          onClick={refetch}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: '#2d7d2d' }}
        >
          <RefreshCw size={15} />
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: '#faf8f5' }}>

      {/* ── Page header ── */}
      <div className="px-5 pt-6 pb-4 lg:px-8 lg:pt-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-1.5 mb-2">
          <Leaf size={13} strokeWidth={2.5} style={{ color: '#2d7d2d' }} />
          <p
            className="text-[10px] font-extrabold uppercase tracking-widest"
            style={{ color: '#2d7d2d' }}
          >
            Tu pedido actual
          </p>
        </div>

        <h1
          className="font-extrabold leading-tight"
          style={{ fontSize: '28px', color: '#0f2910', letterSpacing: '-0.5px' }}
        >
          Cesta de Frescura
        </h1>
        <p className="text-sm text-stone-500 mt-1.5 leading-relaxed max-w-xs">
          Seleccioná los mejores productos orgánicos directos del campo a tu hogar.
          Todo es fresco, todo es real.
        </p>
      </div>

      {/* ── Filtro categoría ── */}
      <div className="px-5 pb-4 lg:px-8 relative">
        <button
          id="shop-category-filter"
          type="button"
          onClick={() => setFilterOpen((v) => !v)}
          className="flex items-center justify-between w-full max-w-xs px-4 py-3 rounded-xl
                     border text-sm font-semibold transition-all cursor-pointer"
          style={{
            background: '#ffffff',
            borderColor: filterOpen ? '#2d7d2d' : '#e5e3df',
            color: '#1a1a1a',
          }}
          aria-expanded={filterOpen}
          aria-haspopup="listbox"
        >
          <span>{selectedCategory}</span>
          <ChevronDown
            size={16}
            strokeWidth={2}
            style={{
              color: '#6b6b6b',
              transform: filterOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
            }}
          />
        </button>

        {/* Dropdown */}
        {filterOpen && (
          <ul
            role="listbox"
            aria-label="Filtrar por categoría"
            className="absolute left-5 lg:left-8 top-full mt-1 z-40 min-w-[220px]
                       rounded-xl border border-stone-200 overflow-hidden"
            style={{
              background: '#ffffff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              animation: 'fadeIn 0.15s ease',
            }}
          >
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selectedCategory === cat}
                  onClick={() => handleSelectCategory(cat)}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium
                             transition-colors cursor-pointer"
                  style={{
                    color: selectedCategory === cat ? '#1a5c1a' : '#4a4a4a',
                    background: selectedCategory === cat ? '#edfaf0' : 'transparent',
                  }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Productos grid ── */}
      <div
        className="px-5 pb-36 lg:px-8 lg:pb-16"
        onClick={() => filterOpen && setFilterOpen(false)}
      >
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🛒</p>
            <p className="text-base font-bold text-stone-700">Sin productos en esta categoría</p>
            <p className="text-sm text-stone-400 mt-1">Probá con otra categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ── Barra flotante del carrito ── */}
      <CartPreviewBar />
    </div>
  );
}
