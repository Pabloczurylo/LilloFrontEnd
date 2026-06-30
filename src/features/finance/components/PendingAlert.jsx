import { AlertCircle } from 'lucide-react';

/**
 * PendingAlert – Barra de notificación naranja en la parte inferior
 * que avisa sobre movimientos pendientes de confirmación.
 */
export default function PendingAlert({ count }) {
  if (!count || count === 0) return null;

  return (
    <div
      id="pending-alert"
      className="flex items-center gap-2 px-4 py-3 bg-amber-50
                 border border-amber-200 rounded-2xl"
    >
      <AlertCircle size={16} className="text-amber-600 shrink-0" strokeWidth={2} />
      <p className="text-xs font-semibold text-amber-700 flex-1 leading-tight">
        Tenés{' '}
        <span className="font-extrabold">{count} movimientos</span>{' '}
        pendientes de confirmación
      </p>
    </div>
  );
}
