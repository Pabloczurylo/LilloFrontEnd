import { useState, useMemo } from 'react';
import { mockProducts } from '../../../utils/mockData';
import InventoryHeader from '../components/InventoryHeader';
import SearchFilter from '../components/SearchFilter';
import ProductCard from '../components/ProductCard';
import NewProductForm from '../components/NewProductForm';
import { ChevronDown } from 'lucide-react';

/**
 * InventoryPage – Main container for the Inventory feature.
 * Manages search filtering, view toggling (list ↔ new-product form),
 * and renders the full product list using mockData.
 */
export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  /** Filter products by name or category based on search query */
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return mockProducts;
    const q = searchQuery.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  /** Products currently visible (paginated) */
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleEdit = (product) => {
    console.log('Edit product:', product);
  };

  const handleDelete = (id) => {
    console.log('Delete product:', id);
  };

  const handleSaveNewProduct = (data) => {
    console.log('Save new product:', data);
    setShowForm(false);
  };

  /* ---- Form view ---- */
  if (showForm) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <NewProductForm
          onSave={handleSaveNewProduct}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  /* ---- List view ---- */
  return (
    <div className="min-h-screen bg-[#faf8f5] px-5 py-6 flex flex-col gap-6">
      <InventoryHeader
        onAddProduct={() => setShowForm(true)}
        onImport={() => console.log('Import price list')}
      />

      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Product list */}
      <section className="flex flex-col gap-4" aria-label="Lista de productos">
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
          <div className="text-center py-12">
            <p className="text-stone-400 text-sm">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </section>

      {/* Load more */}
      {hasMore && (
        <button
          id="load-more-btn"
          onClick={() => setVisibleCount((prev) => prev + 4)}
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
