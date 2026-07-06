import { useState } from 'react';
import { Save, X } from 'lucide-react';

export default function NewMovementModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    transaction_type: 'gasto',
    amount: '',
    concept: '',
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.concept) {
      alert('Completá el importe y concepto.');
      return;
    }
    setSubmitting(true);
    try {
      await onSave({
        transaction_type: formData.transaction_type,
        amount: parseFloat(formData.amount),
        concept: formData.concept.trim(),
      });
      setFormData({ transaction_type: 'gasto', amount: '', concept: '' });
      onClose();
    } catch (err) {
      alert('Error al guardar movimiento.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-[fadeIn_0.2s_ease]">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-stone-100">
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-extrabold text-stone-900 text-lg">Nuevo Movimiento de Caja</h3>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Tipo de Movimiento</label>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setFormData(p => ({ ...p, transaction_type: 'ingreso' }))}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                  formData.transaction_type === 'ingreso'
                    ? 'bg-green-50 border-green-200 text-green-700 font-bold'
                    : 'bg-stone-50 border-stone-100 text-stone-400'
                }`}
              >
                Ingreso
              </button>
              <button
                type="button"
                onClick={() => setFormData(p => ({ ...p, transaction_type: 'gasto' }))}
                className={`flex-1 py-2 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                  formData.transaction_type === 'gasto'
                    ? 'bg-red-50 border-red-200 text-red-700 font-bold'
                    : 'bg-stone-50 border-stone-100 text-stone-400'
                }`}
              >
                Gasto / Egreso
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="mov-concept" className="text-xs font-bold uppercase tracking-wider text-stone-500">Concepto</label>
            <input
              id="mov-concept"
              type="text"
              required
              value={formData.concept}
              onChange={(e) => setFormData(p => ({ ...p, concept: e.target.value }))}
              placeholder="Ej. Pago de luz, Proveedor Papas..."
              className="mt-2 w-full px-4 py-2.5 text-sm text-stone-700 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label htmlFor="mov-amount" className="text-xs font-bold uppercase tracking-wider text-stone-500">Importe</label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-500">$</span>
              <input
                id="mov-amount"
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.amount}
                onChange={(e) => setFormData(p => ({ ...p, amount: e.target.value }))}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2.5 text-sm text-stone-700 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-green-700"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-bold text-stone-500 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 text-sm font-bold text-white bg-green-900 hover:bg-green-800 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-stone-400 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
