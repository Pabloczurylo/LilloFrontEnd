import { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';

const UNITS = ['UN', 'KG'];

/**
 * NewProductForm – Form for creating or editing a product.
 * Matches the "Nuevo Producto" mockup.
 */
export default function NewProductForm({ product, categories = [], onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    unit: 'UN',
    imageUrl: '',
    description: '',
    stock: 0
  });

  // Si se pasa un producto para editar, inicializar el formulario con sus datos
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category_id: product.category_id || '',
        unit: product.unit || 'UN',
        imageUrl: product.imageUrl || '',
        description: product.description || '',
        stock: product.stock || 0
      });
    }
  }, [product]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category_id) {
      alert('Por favor completa los campos requeridos (Nombre, Precio y Categoría)');
      return;
    }
    onSave?.({
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseFloat(formData.stock) || 0,
    });
  };

  /** Map category name to emoji */
  const getCategoryEmoji = (catId) => {
    const cat = categories.find((c) => c.id === catId);
    if (!cat) return '📦';
    const name = cat.name.toLowerCase();
    if (name.includes('verdura')) return '🥬';
    if (name.includes('frut')) return '🍊';
    if (name.includes('pan')) return '🍞';
    if (name.includes('lact') || name.includes('láct')) return '🧀';
    if (name.includes('almacen') || name.includes('almacén')) return '🫒';
    return '📦';
  };

  return (
    <form
      id="new-product-form"
      onSubmit={handleSubmit}
      className="flex flex-col min-h-screen bg-[#faf8f5]"
    >
      {/* Header section */}
      <div className="px-5 pt-6 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-green-800">
          Administración
        </p>
        <h1 className="text-3xl font-extrabold text-black mt-2 leading-tight">
          {product ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
        <p className="text-sm text-stone-400 mt-2 leading-relaxed">
          {product 
            ? 'Modifica las características y el precio del artículo de tu catálogo.'
            : 'Agrega nuevos artículos a tu catálogo con la frescura y calidad de siempre.'}
        </p>
      </div>

      {/* Form body card */}
      <div className="mx-5 mt-2 bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col gap-6">
        {/* Icon preview */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Icono Representativo
          </label>
          <div className="mt-2 flex items-center gap-4 bg-stone-50 rounded-xl p-4 border border-stone-100">
            <span className="text-3xl">
              {formData.category_id ? getCategoryEmoji(formData.category_id) : '📦'}
            </span>
            <div>
              <p className="text-sm font-semibold text-stone-700">
                Asignado por categoría
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                El sistema asignará automáticamente un ícono basado en la categoría seleccionada.
              </p>
            </div>
          </div>
        </div>

        {/* Product name */}
        <div>
          <label
            htmlFor="product-name"
            className="text-xs font-bold uppercase tracking-wider text-stone-500"
          >
            Nombre del Producto *
          </label>
          <input
            id="product-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Ej. Tomate Cherry Orgánico"
            className="mt-2 w-full px-4 py-3 text-sm text-stone-700
                       placeholder:text-stone-400 bg-stone-50 border border-stone-200
                       rounded-xl outline-none focus:border-green-700
                       focus:ring-2 focus:ring-green-700/20 transition-all"
          />
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="product-price"
            className="text-xs font-bold uppercase tracking-wider text-stone-500"
          >
            Precio de Venta *
          </label>
          <div className="relative mt-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-stone-500">
              $
            </span>
            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 text-sm text-stone-700
                         placeholder:text-stone-400 bg-stone-50 border border-stone-200
                         rounded-xl outline-none focus:border-green-700
                         focus:ring-2 focus:ring-green-700/20 transition-all"
            />
          </div>
        </div>

        {/* Current Stock */}
        <div>
          <label
            htmlFor="product-stock"
            className="text-xs font-bold uppercase tracking-wider text-stone-500"
          >
            Stock Inicial / Actual
          </label>
          <input
            id="product-stock"
            type="number"
            min="0"
            step="0.001"
            value={formData.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
            placeholder="0"
            className="mt-2 w-full px-4 py-3 text-sm text-stone-700
                       placeholder:text-stone-400 bg-stone-50 border border-stone-200
                       rounded-xl outline-none focus:border-green-700
                       focus:ring-2 focus:ring-green-700/20 transition-all"
          />
        </div>

        {/* Category select */}
        <div>
          <label
            htmlFor="product-category"
            className="text-xs font-bold uppercase tracking-wider text-stone-500"
          >
            Categoría *
          </label>
          <select
            id="product-category"
            required
            value={formData.category_id}
            onChange={(e) => handleChange('category_id', e.target.value)}
            className="mt-2 w-full px-4 py-3 text-sm text-stone-700
                       bg-stone-50 border border-stone-200 rounded-xl
                       outline-none focus:border-green-700 appearance-none
                       focus:ring-2 focus:ring-green-700/20 transition-all cursor-pointer"
          >
            <option value="">Seleccionar...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="product-image"
            className="text-xs font-bold uppercase tracking-wider text-stone-500"
          >
            URL de la Imagen (Opcional)
          </label>
          <input
            id="product-image"
            type="url"
            value={formData.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="mt-2 w-full px-4 py-3 text-sm text-stone-700
                       placeholder:text-stone-400 bg-stone-50 border border-stone-200
                       rounded-xl outline-none focus:border-green-700
                       focus:ring-2 focus:ring-green-700/20 transition-all"
          />
        </div>

        {/* Unit toggle */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Unidad de Medida
          </p>
          <div className="flex gap-2 mt-2">
            {UNITS.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => handleChange('unit', u)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl border transition-colors cursor-pointer
                  ${
                    formData.unit === u
                      ? 'bg-white border-stone-300 text-stone-900 shadow-sm'
                      : 'bg-stone-50 border-stone-100 text-stone-400 hover:bg-stone-100'
                  }`}
              >
                {u === 'UN' ? 'Unidad' : 'Kilogramo (KG)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="mt-auto px-5 pt-8 pb-8 flex flex-col gap-3">
        <button
          id="save-product-btn"
          type="submit"
          className="flex items-center justify-center gap-2 w-full py-4 px-5
                     bg-green-900 hover:bg-green-800 active:bg-green-950
                     text-white font-semibold text-base rounded-2xl
                     transition-colors shadow-md cursor-pointer"
        >
          <Save size={18} />
          {product ? 'Actualizar Producto' : 'Guardar Producto'}
        </button>

        <button
          id="cancel-product-btn"
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center gap-2 w-full py-3
                     text-stone-500 hover:text-stone-700 font-medium text-sm
                     transition-colors cursor-pointer"
        >
          Cancelar y volver
        </button>
      </div>
    </form>
  );
}
