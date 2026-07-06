import { useState, useEffect, useMemo, useCallback } from 'react';
import { getProductsAPI, createProductAPI, updateProductAPI, deleteProductAPI } from '../../../services/productsService';
import { getCategoriesAPI } from '../../../services/categoriesService';
import InventoryHeader from '../components/InventoryHeader';
import SearchFilter from '../components/SearchFilter';
import ProductCard from '../components/ProductCard';
import NewProductForm from '../components/NewProductForm';
import { ChevronDown, RefreshCw, AlertCircle } from 'lucide-react';

/**
 * Normaliza un producto de la API para el listado del panel de administración.
 */
function normalizeAdminProduct(apiProduct) {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    ref: apiProduct.id.substring(0, 8).toUpperCase(), // Usamos parte del UUID como referencia/código
    price: Number(apiProduct.price_per_unit),
    category: apiProduct.category?.name ?? 'Sin categoría',
    category_id: apiProduct.category_id,
    unit: apiProduct.unit === 'unidad' ? 'UN' : apiProduct.unit === 'kg' ? 'KG' : apiProduct.unit?.toUpperCase() ?? 'UN',
    imageUrl: apiProduct.image_url ?? 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80',
    description: apiProduct.description ?? '',
    stock: Number(apiProduct.stock_current),
    is_active: apiProduct.is_active,
  };
}

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Para admin incluimos inactivos
      const [apiProducts, apiCategories] = await Promise.all([
        getProductsAPI({ include_inactive: true }),
        getCategoriesAPI()
      ]);
      setProducts(apiProducts.map(normalizeAdminProduct));
      setCategories(apiCategories);
    } catch (err) {
      console.error('Error loading inventory:', err);
      setError('No se pudo cargar el inventario. Asegurate de estar autenticado.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /** Filter products by name, category or ref based on search query */
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q)
    );
  }, [searchQuery, products]);

  /** Products currently visible (paginated) */
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas desactivar este producto?')) {
      try {
        await deleteProductAPI(id);
        // Actualizar localmente marcándolo como inactivo
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, is_active: false } : p))
        );
      } catch (err) {
        alert('Error al desactivar el producto');
      }
    }
  };

  const handleSaveProduct = async (data) => {
    try {
      const payload = {
        name: data.name,
        price_per_unit: data.price,
        category_id: data.category_id || null,
        unit: data.unit === 'UN' ? 'unidad' : 'kg',
        stock_current: data.stock !== undefined ? data.stock : 0,
        image_url: data.imageUrl || null,
        description: data.description || null,
      };

      if (editingProduct) {
        await updateProductAPI(editingProduct.id, payload);
      } else {
        await createProductAPI(payload);
      }
      setShowForm(false);
      setEditingProduct(null);
      await loadData();
    } catch (err) {
      alert('Error al guardar el producto: ' + (err.response?.data?.error ?? err.message));
    }
  };

  /* ---- Loading View ---- */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#faf8f5]">
        <span className="w-10 h-10 rounded-full border-3 border-stone-200 border-t-green-800 animate-spin" />
        <p className="text-sm font-semibold text-stone-400">Cargando inventario…</p>
      </div>
    );
  }

  /* ---- Error View ---- */
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 bg-[#faf8f5]">
        <AlertCircle size={40} className="text-red-500" />
        <p className="text-base font-bold text-stone-700 text-center">{error}</p>
        <button
          type="button"
          onClick={loadData}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-green-900 cursor-pointer hover:bg-green-800"
        >
          <RefreshCw size={15} />
          Reintentar
        </button>
      </div>
    );
  }

  /* ---- Form view ---- */
  if (showForm) {
    return (
      <div className="min-h-screen bg-[#faf8f5] lg:bg-stone-200/60 lg:flex lg:items-start lg:justify-center lg:py-10 lg:px-8">
        <div className="lg:w-full lg:max-w-lg lg:rounded-3xl lg:overflow-hidden lg:shadow-xl lg:border lg:border-stone-200">
          <NewProductForm
            product={editingProduct}
            categories={categories}
            onSave={handleSaveProduct}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      </div>
    );
  }

  /* ---- List view ---- */
  return (
    <div className="min-h-screen px-5 py-6 flex flex-col gap-6 lg:px-8 lg:py-8">
      <InventoryHeader
        onAddProduct={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
        onImport={() => console.log('Import price list')}
      />

      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Product list / grid */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        aria-label="Lista de productos"
      >
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-stone-400 text-sm">
              No se encontraron productos en el inventario.
            </p>
          </div>
        )}
      </section>

      {/* Load more */}
      {hasMore && (
        <button
          id="load-more-btn"
          onClick={() => setVisibleCount((prev) => prev + 6)}
          className="flex items-center justify-center gap-2 py-3 text-sm
                     font-medium text-stone-500 hover:text-stone-700
                     transition-colors cursor-pointer mx-auto"
        >
          Ver más productos
          <ChevronDown size={16} />
        </button>
      )}
    </div>
  );
}
