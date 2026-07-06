import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  getPromotionsAPI,
  createPromotionAPI,
  updatePromotionAPI,
  deletePromotionAPI,
} from '../services/promotionsService';

/**
 * PromotionsContext – Estado global del módulo de Promociones.
 *
 * Carga promociones reales desde GET /api/promotions (público).
 * Las mutaciones (crear, editar, eliminar) requieren JWT de admin.
 *
 * Provee:
 *  - promotions          : Promotion[]  (todas las cargadas desde la API)
 *  - activePromotions    : Promotion[]  (is_active=true → vista cliente)
 *  - loading             : boolean
 *  - error               : string | null
 *  - addPromotion(data)  : crea una nueva promo vía API
 *  - togglePromotion(id, is_active) : activa/pausa una promo vía API
 *  - removePromotion(id) : elimina una promo vía API
 *  - refetch()           : recarga desde la API
 */

const PromotionsContext = createContext(null);

export function PromotionsProvider({ children }) {
  const [promotions, setPromotions] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const fetchPromotions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPromotionsAPI();
      setPromotions(data);
    } catch (err) {
      console.error('fetchPromotions error:', err);
      setError('No se pudieron cargar las promociones.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  /** Promos visibles en la vista de cliente: las que llegaron del API ya son activas+vigentes */
  const activePromotions = useMemo(
    () => promotions.filter((p) => p.is_active),
    [promotions]
  );

  /**
   * Crea una nueva promoción (solo admin).
   * promoData: { product_id, discount_percentage, start_date, end_date }
   */
  const addPromotion = useCallback(async (promoData) => {
    const newPromo = await createPromotionAPI(promoData);
    setPromotions((prev) => [newPromo, ...prev]);
    return newPromo;
  }, []);

  /**
   * Activa o pausa una promoción (solo admin).
   * @param {string} id
   * @param {boolean} is_active
   */
  const togglePromotion = useCallback(async (id, is_active) => {
    const updated = await updatePromotionAPI(id, { is_active });
    setPromotions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  }, []);

  /**
   * Elimina una promoción (solo admin).
   */
  const removePromotion = useCallback(async (id) => {
    await deletePromotionAPI(id);
    setPromotions((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <PromotionsContext.Provider
      value={{
        promotions,
        activePromotions,
        loading,
        error,
        addPromotion,
        togglePromotion,
        removePromotion,
        refetch: fetchPromotions,
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
