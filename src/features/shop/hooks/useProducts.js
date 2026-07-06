import { useState, useEffect } from 'react';
import { getProductsAPI } from '../../../services/productsService';
import { getCategoriesAPI } from '../../../services/categoriesService';

/**
 * Mapeo de nombre de categoría → badge visual.
 * Se usa para asignar el estilo de "Orgánico", "Temporada", etc.
 * Podés extenderlo según las categorías reales de tu BD.
 */
const CATEGORY_TO_BADGE = {
  verduras:  'temporada',
  frutas:    'temporada',
  lácteos:   'artesanal',
  lacteos:   'artesanal',
  panadería: 'artesanal',
  panaderia: 'artesanal',
  carnes:    'premium',
  aves:      'premium',
  huevos:    'organico',
  almacén:   'organico',
  almacen:   'organico',
};

/**
 * Emoji por defecto según categoría.
 */
const CATEGORY_TO_EMOJI = {
  verduras:  '🥦',
  frutas:    '🍎',
  lácteos:   '🧀',
  lacteos:   '🧀',
  panadería: '🍞',
  panaderia: '🍞',
  carnes:    '🥩',
  aves:      '🍗',
  huevos:    '🥚',
  almacén:   '🫙',
  almacen:   '🫙',
};

/**
 * Normaliza un producto de la API al shape que espera ShopProductCard:
 *   { id, name, provider, price, unit, category, badge, emoji, imageUrl }
 */
function normalizeProduct(apiProduct) {
  const catName = apiProduct.category?.name ?? '';
  const catKey  = catName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Descuento activo (si existe promoción vigente en el producto)
  const activePromo = apiProduct.promotions?.find((p) => p.is_active) ?? null;
  const originalPrice = Number(apiProduct.price_per_unit);
  const finalPrice = activePromo
    ? Math.round(originalPrice * (1 - Number(activePromo.discount_percentage) / 100))
    : originalPrice;

  return {
    id:            apiProduct.id,
    name:          apiProduct.name,
    description:   apiProduct.description ?? '',
    provider:      catName ? `${catName} · ${apiProduct.unit?.toUpperCase()}` : apiProduct.unit?.toUpperCase() ?? '',
    price:         finalPrice,
    originalPrice: activePromo ? originalPrice : null,
    unit:          apiProduct.unit,
    category:      catName,
    badge:         CATEGORY_TO_BADGE[catKey] ?? 'local',
    emoji:         CATEGORY_TO_EMOJI[catKey] ?? '🛒',
    imageUrl:      apiProduct.image_url ?? null,
    stock:         Number(apiProduct.stock_current),
    hasDiscount:   !!activePromo,
    discountPct:   activePromo ? Number(activePromo.discount_percentage) : 0,
  };
}

/**
 * useProducts — Hook que carga y normaliza productos desde la API.
 *
 * Retorna:
 *  - products      : producto normalizado[]
 *  - categories    : string[] de nombres de categorías (dinámico)
 *  - loading       : boolean
 *  - error         : string | null
 *  - refetch()     : recarga manual
 */
export function useProducts() {
  const [products,   setProducts]   = useState([]);
  const [categories, setCategories] = useState(['Todos los productos']);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [apiProducts, apiCategories] = await Promise.all([
        getProductsAPI(),
        getCategoriesAPI(),
      ]);

      const normalized = apiProducts.map(normalizeProduct);
      setProducts(normalized);

      // Categorías dinámicas desde la API
      const catNames = ['Todos los productos', ...apiCategories.map((c) => c.name)];
      setCategories(catNames);
    } catch (err) {
      console.error('useProducts error:', err);
      setError('No se pudieron cargar los productos. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, categories, loading, error, refetch: fetchData };
}
