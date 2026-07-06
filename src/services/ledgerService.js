/**
 * ledgerService.js — API Service para el Libro Diario y Métricas Financieras.
 */
import api from './api';

/**
 * Obtiene todos los asientos del libro diario.
 */
export async function getLedgerEntriesAPI(params = {}) {
  const { data } = await api.get('/ledger', { params });
  return data;
}

/**
 * Crea un nuevo asiento en el libro diario.
 * @param {{ transaction_type: 'ingreso'|'gasto', amount: number, concept: string, reference_id?: string }} entryData
 */
export async function createLedgerEntryAPI(entryData) {
  const { data } = await api.post('/ledger', entryData);
  return data;
}

/**
 * Elimina un asiento del libro diario (solo admin).
 */
export async function deleteLedgerEntryAPI(id) {
  const { data } = await api.delete(`/ledger/${id}`);
  return data;
}

/**
 * Obtiene el resumen financiero (ingresos, gastos, balance neto) del periodo.
 */
export async function getLedgerSummaryAPI(params = {}) {
  const { data } = await api.get('/ledger/metrics/summary', { params });
  return data;
}

/**
 * Obtiene la métrica agrupada de balance diario por fechas.
 */
export async function getLedgerBalanceAPI(params = {}) {
  const { data } = await api.get('/ledger/metrics/balance', { params });
  return data;
}
