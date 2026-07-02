import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { mockPromotions, nextPromoId, isWithinDateRange } from '../features/promotions/utils/promotionsMockData';

/**
 * PromotionsContext – Estado global del módulo de Promociones.
 *
 * Provee:
 *  - promotions          : Promotion[]  (todas, activas o no)
 *  - activePromotions    : Promotion[]  (activas + vigentes → vista cliente)
 *  - addPromotion(promo) : crea una nueva promo
 *  - togglePromotion(id) : pausa / reanuda una promo
 *  - removePromotion(id) : elimina una promo
 */

const PromotionsContext = createContext(null);

export function PromotionsProvider({ children }) {
  const [promotions, setPromotions] = useState(mockPromotions);

  /** Promos visibles en la vista de cliente: activas Y dentro del rango de fechas */
  const activePromotions = useMemo(
    () => promotions.filter((p) => p.active && isWithinDateRange(p)),
    [promotions]
  );

  const addPromotion = useCallback((promoData) => {
    const newPromo = {
      id: nextPromoId(),
      ...promoData,
      active: true,
    };
    setPromotions((prev) => [newPromo, ...prev]);
  }, []);

  const togglePromotion = useCallback((id) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  }, []);

  const removePromotion = useCallback((id) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <PromotionsContext.Provider
      value={{
        promotions,
        activePromotions,
        addPromotion,
        togglePromotion,
        removePromotion,
      }}
    >
      {children}
    </PromotionsContext.Provider>
  );
}

/** Hook de acceso rápido */
export function usePromotions() {
  const ctx = useContext(PromotionsContext);
  if (!ctx) throw new Error('usePromotions must be used within <PromotionsProvider>');
  return ctx;
}

export default PromotionsContext;
