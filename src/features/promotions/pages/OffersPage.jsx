import { useState, useMemo } from 'react';
import { Flame } from 'lucide-react';
import { usePromotions } from '../../../context/PromotionsContext';
import { useCart } from '../../../context/CartContext';
import { applyDiscount } from '../utils/promotionsMockData';
import CategoryFilterBar from '../components/CategoryFilterBar';
import OfferCard from '../components/OfferCard';
import EmptyOffersState from '../components/EmptyOffersState';
import CartPreviewBar from '../../shop/components/CartPreviewBar';

/**
 * OffersPage – Vista de cliente: muestra las ofertas activas y vigentes.
 * Ruta: /ofertas
 *
 * Responsive:
 *  - Mobile  (<1024px): lista 1 columna con tarjetas verticales
 *  - Desktop (≥1024px): grid 3 columnas
 */
export default function OffersPage() {
  const { activePromotions } = usePromotions();
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  /** Filtra por categoría seleccionada */
  const filteredOffers = useMemo(() => {
    if (selectedCategory === 'Todas') return activePromotions;
    return activePromotions.filter(
      (p) => p.product?.category === selectedCategory
    );
  }, [activePromotions, selectedCategory]);

  /** Conteo de ofertas por categoría (para los badges de los filtros) */
  const counts = useMemo(() => {
    const map = { Todas: activePromotions.length };
    activePromotions.forEach((p) => {
      const cat = p.product?.category;
      if (cat) map[cat] = (map[cat] ?? 0) + 1;
    });
    return map;
  }, [activePromotions]);

  const { addItem } = useCart();

  /**
   * Al agregar desde Ofertas, el producto entra al carrito con el precio
   * con descuento ya aplicado, de modo que el total del pedido lo refleje.
   */
  const handleAddToCart = (promo) => {
    const { product, discount } = promo;
    if (!product) return;
    const discountedPrice = applyDiscount(product.price, discount);
    addItem({
      // Usamos el id de la promo para distinguirlo del producto sin descuento
      id: `promo-${promo.id}`,
      name: product.name,
      price: discountedPrice,
      unit: product.unit,
      category: product.category,
      imageUrl: product.imageUrl,
      emoji: '🏷️',
      badge: 'temporada',
      provider: `Oferta · ${product.unit}`,
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">

      {/* ── Page header ── */}
      <div className="px-5 pt-6 pb-5 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-2 mb-1">
          <Flame size={16} className="text-orange-500" strokeWidth={2} />
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
            Promociones
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 leading-tight">
          Ofertas Imperdibles
        </h1>
        <p className="text-sm text-stone-400 mt-1.5 leading-relaxed">
          Frescura de granja a precios que no volverán.
        </p>
      </div>

      {/* ── Category filter ── */}
      <div className="mb-5 lg:px-8">
        <CategoryFilterBar
          selected={selectedCategory}
          onChange={setSelectedCategory}
          counts={counts}
        />
      </div>

      {/* ── Offers grid ── */}
      <div className="px-5 pb-36 lg:px-8 lg:pb-16">
        {filteredOffers.length === 0 ? (
          <EmptyOffersState
            title={
              selectedCategory === 'Todas'
                ? 'Sin ofertas activas por ahora'
                : `Sin ofertas en ${selectedCategory}`
            }
            subtitle={
              selectedCategory === 'Todas'
                ? 'El admin aún no ha activado ninguna promoción.'
                : 'Probá con otra categoría o volvé más tarde.'
            }
          />
        ) : (
          <section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            aria-label="Ofertas disponibles"
          >
            {filteredOffers.map((promo) => (
              <OfferCard
                key={promo.id}
                promo={promo}
                onAdd={handleAddToCart}
              />
            ))}
          </section>
        )}

        {/* Contador de resultados */}
        {filteredOffers.length > 0 && (
          <p className="text-center text-xs text-stone-400 mt-6">
            {filteredOffers.length} {filteredOffers.length === 1 ? 'oferta disponible' : 'ofertas disponibles'}
          </p>
        )}
      </div>

      {/* ── Barra flotante del carrito ── */}
      <CartPreviewBar />
    </div>
  );
}
