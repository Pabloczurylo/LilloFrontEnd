import { useState, useEffect, useCallback } from 'react';
import { Settings, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import SalesBasket from '../components/SalesBasket';
import SalesSummaryBar from '../components/SalesSummaryBar';
import AddProductModal from '../components/AddProductModal';
import SalesHistory from '../components/SalesHistory';
import { getSalesAPI, createSaleAPI } from '../../../services/salesService';

export default function SalesPage() {
  const [basketItems, setBasketItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [salesHistory, setSalesHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeTab, setActiveTab] = useState('basket'); // 'basket' | 'history'
  const [successFlash, setSuccessFlash] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const basketTotal = basketItems.reduce((sum, it) => sum + it.total, 0);

  const loadSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSalesAPI();
      
      // Mapeamos el formato de la API al formato local del historial visual
      setSalesHistory(data.map(sale => ({
        id: sale.id,
        customerName: sale.seller?.full_name ?? 'Venta rápida',
        items: sale.items.map(it => ({
          name: it.product?.name ?? 'Producto',
          quantity: Number(it.quantity),
          unit: it.product?.unit === 'unidad' ? 'UN' : 'KG',
          unitPrice: Number(it.unit_price_at_sale),
        })),
        total: Number(sale.total_amount),
        status: sale.status === 'completada' ? 'completado' : 'pendiente',
        time: sale.sale_date,
      })));
    } catch (err) {
      console.error('Error fetching sales history:', err);
      setError('No se pudo cargar el historial de ventas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSales();
  }, [loadSales]);

  const handleAddItem = (item) => {
    // Si ya existe en la canasta, sumamos cantidad
    setBasketItems((prev) => {
      const existing = prev.find((it) => it.id === item.id);
      if (existing) {
        return prev.map((it) =>
          it.id === item.id
            ? { ...it, quantity: it.quantity + item.quantity, total: (it.quantity + item.quantity) * it.unitPrice }
            : it
        );
      }
      return [...prev, item];
    });
  };

  const handleRemoveItem = (id) => {
    setBasketItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleRegisterSale = async () => {
    if (basketItems.length === 0 || submitting) return;

    setSubmitting(true);
    try {
      await createSaleAPI({
        payment_method: 'efectivo', // Valor por defecto
        items: basketItems.map((it) => ({
          product_id: it.id, // ID UUID de producto
          quantity: it.quantity,
        })),
      });

      setBasketItems([]);
      setSuccessFlash(true);
      setTimeout(() => setSuccessFlash(false), 3500);

      // Recargar historial completo
      await loadSales();
      setActiveTab('history');
    } catch (err) {
      console.error('Error registering sale:', err);
      alert('Error al registrar la venta: ' + (err.response?.data?.error ?? err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    // Las ventas son completadas directo por el backend en este flujo, se simula localmente si cambian
    setSalesHistory((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  /* ---- Loading State ---- */
  if (loading && salesHistory.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#faf8f5]">
        <span className="w-10 h-10 rounded-full border-3 border-stone-200 border-t-green-800 animate-spin" />
        <p className="text-sm font-semibold text-stone-400">Cargando ventas y POS…</p>
      </div>
    );
  }

  /* ---- Error State ---- */
  if (error && salesHistory.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 bg-[#faf8f5]">
        <AlertCircle size={40} className="text-red-500" />
        <p className="text-base font-bold text-stone-700 text-center">{error}</p>
        <button
          type="button"
          onClick={loadSales}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-green-900 cursor-pointer hover:bg-green-800"
        >
          <RefreshCw size={15} />
          Reintentar
        </button>
      </div>
    );
  }

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
        <div className={`${activeTab === 'basket' ? 'block' : 'hidden'} lg:block`}>
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
                disabled={basketItems.length === 0 || submitting}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Historial ── */}
        <div className={`px-5 lg:px-0 pb-8 lg:pb-0 ${activeTab === 'history' ? 'block' : 'hidden'} lg:block`}>
          <SalesHistory
            sales={salesHistory}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      {/* ── Mobile fixed SalesSummaryBar ── */}
      {activeTab === 'basket' && (
        <SalesSummaryBar
          total={basketTotal}
          itemCount={basketItems.length}
          onConfirm={handleRegisterSale}
          disabled={basketItems.length === 0 || submitting}
        />
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddItem}
      />
    </div>
  );
}
