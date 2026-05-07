import { Plus, Upload } from 'lucide-react';

/**
 * InventoryHeader – Top section of the inventory page.
 * Contains the "GESTIÓN DE STOCK" label, "Inventario" title,
 * "+ Añadir Producto" primary button, and "Importar lista de precios" secondary button.
 */
export default function InventoryHeader({ onAddProduct, onImport }) {
  return (
    <header className="flex flex-col gap-3">
      {/* Section label */}
      <p className="text-xs font-bold uppercase tracking-widest text-green-800">
        Gestión de Stock
      </p>

      {/* Main title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-black leading-tight">
        Inventario
      </h1>

      {/* Primary action – Add product */}
      <button
        id="add-product-btn"
        onClick={onAddProduct}
        className="flex items-center justify-center gap-2 w-full py-3 px-5
                   bg-green-900 hover:bg-green-800 active:bg-green-950
                   text-white font-semibold text-sm rounded-2xl
                   transition-colors shadow-sm cursor-pointer"
      >
        <Plus size={18} strokeWidth={2.5} />
        Añadir Producto
      </button>

      {/* Secondary action – Import */}
      <button
        id="import-list-btn"
        onClick={onImport}
        className="flex items-center justify-center gap-2 w-full py-3 px-5
                   bg-white hover:bg-stone-50 active:bg-stone-100
                   text-stone-700 font-medium text-sm rounded-2xl
                   border border-stone-200 transition-colors cursor-pointer"
      >
        <Upload size={16} />
        Importar lista de precios
      </button>
    </header>
  );
}
