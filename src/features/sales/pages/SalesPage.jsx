import { useState } from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';
import SalesBasket from '../components/SalesBasket';
import SalesSummaryBar from '../components/SalesSummaryBar';
import AddProductModal from '../components/AddProductModal';
import SalesHistory from '../components/SalesHistory';
import { mockSalesHistory, generateSaleId } from '../utils/salesMockData';

/**
 * SalesPage – Página principal del módulo de Ventas.
 *
 * Responsive layout:
 *  - Mobile  (<1024px): tabs "Venta Actual" / "Historial"
 *                       SalesSummaryBar fija arriba del BottomNav
 *  - Desktop (≥1024px): 2 columnas – canasta izquierda, historial derecha
 */
export default function SalesPage() {
  // ── Basket state ──
  const [basketItems, setBasketItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ── History state ──
  const [salesHistory, setSalesHistory] = useState(mockSalesHistory);

  // ── Mobile tab ──
  const [activeTab, setActiveTab] = useState('basket'); // 'basket' | 'history'

  // ── Success flash ──
  const [successFlash, setSuccessFlash] = useState(false);

  // Computed
  const basketTotal = basketItems.reduce((sum, it) => sum + it.total, 0);

  // ── Handlers ──
  const handleAddItem = (item) => {
    setBasketItems((prev) => [...prev, item]);
  };

  const handleRemoveItem = (id) => {
    setBasketItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleRegisterSale = () => {
    if (basketItems.length === 0) return;

    const newSale = {
      id: generateSaleId(),
      customerName: 'Cliente general',
      items: basketItems.map((it) => ({
        name: it.name,
        quantity: it.quantity,
        unit: it.unit,
        unitPrice: it.unitPrice,
      })),
      total: basketTotal,
      status: 'completado',
      time: new Date().toISOString(),
    };

    setSalesHistory((prev) => [newSale, ...prev]);
    setBasketItems([]);

    // Mostrar flash de éxito y cambiar a tab historial en mobile
    setSuccessFlash(true);
    setTimeout(() => setSuccessFlash(false), 3500);
    setActiveTab('history');
  };

  const handleStatusChange = (id, newStatus) => {
    setSalesHistory((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  // ── Render ──
  return (
    <div className="min-h-screen bg-[#faf8f5]">

      {/* ── Page header ── */}
      <div className="px-5 pt-6 pb-4 lg:px-8 lg:pt-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-green-800">
            Venta Actual
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-black mt-1.5 leading-tight">
            Canasta de Productos
          </h1>
          <p className="text-sm text-stone-400 mt-1.5 leading-relaxed hidden lg:block">
            Agregá productos, revisá el total y registrá la venta.
          </p>
        </div>
        {/* Badge Caja Activa */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                        bg-orange-50 border border-orange-200 text-orange-700 shrink-0 mt-1">
          <Settings size={12} strokeWidth={2} />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">
            Caja Activa
          </span>
        </div>
      </div>

      {/* ── Success toast ── */}
      {successFlash && (
        <div className="mx-5 mb-3 flex items-center gap-3 px-4 py-3.5
                        bg-green-50 border border-green-200 rounded-2xl
                        animate-[fadeIn_.3s_ease] lg:mx-8">
          <CheckCircle2 size={18} className="text-green-700 shrink-0" />
          <p className="text-sm font-semibold text-green-800">
            ¡Venta registrada correctamente!
          </p>
        </div>
      )}

      {/* ── Mobile tabs ── */}
      <div className="lg:hidden flex px-5 mb-4 gap-1.5 bg-transparent">
        <button
          id="tab-basket"
          type="button"
          onClick={() => setActiveTab('basket')}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest
                      rounded-xl transition-all cursor-pointer
                      ${activeTab === 'basket'
                        ? 'bg-green-900 text-white shadow-sm'
                        : 'bg-white text-stone-500 border border-stone-200 hover:bg-stone-50'
                      }`}
        >
          Venta Actual
          {basketItems.length > 0 && (
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold
                              ${activeTab === 'basket'
                                ? 'bg-white/20 text-white'
                                : 'bg-green-100 text-green-800'
                              }`}>
              {basketItems.length}
            </span>
          )}
        </button>
        <button
          id="tab-history"
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest
                      rounded-xl transition-all cursor-pointer
                      ${activeTab === 'history'
                        ? 'bg-green-900 text-white shadow-sm'
                        : 'bg-white text-stone-500 border border-stone-200 hover:bg-stone-50'
                      }`}
        >
          Historial
          {salesHistory.length > 0 && (
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold
                              ${activeTab === 'history'
                                ? 'bg-white/20 text-white'
                                : 'bg-green-100 text-green-800'
                              }`}>
              {salesHistory.length}
            </span>
          )}
        </button>
      </div>

      {/* ── Main layout ── */}
      <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-6 lg:px-8 lg:pb-10">

        {/* ── LEFT: Canasta ── */}
        {/* Mobile: visible solo en tab 'basket' */}
        {/* Desktop: siempre visible */}
        <div
          className={`${activeTab === 'basket' ? 'block' : 'hidden'} lg:block`}
        >
          {/* Agregar espacio extra en mobile para el SalesSummaryBar fijo */}
          <div className="pb-[10rem] lg:pb-0">
            <SalesBasket
              items={basketItems}
              onRemove={handleRemoveItem}
              onAddClick={() => setShowModal(true)}
            />
            {/* Desktop summary bar */}
            <div className="mx-0 lg:block hidden">
              <SalesSummaryBar
                total={basketTotal}
                itemCount={basketItems.length}
                onConfirm={handleRegisterSale}
                disabled={basketItems.length === 0}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Historial ── */}
        {/* Mobile: visible solo en tab 'history' */}
        {/* Desktop: siempre visible */}
        <div
          className={`px-5 lg:px-0 pb-8 lg:pb-0
                      ${activeTab === 'history' ? 'block' : 'hidden'} lg:block`}
        >
          <SalesHistory
            sales={salesHistory}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      {/* ── Mobile fixed SalesSummaryBar (shown only in basket tab) ── */}
      {activeTab === 'basket' && (
        <SalesSummaryBar
          total={basketTotal}
          itemCount={basketItems.length}
          onConfirm={handleRegisterSale}
          disabled={basketItems.length === 0}
        />
      )}

      {/* ── Add Product Modal ── */}
      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
}
