import { useState, useEffect, useCallback } from 'react';
import { SheetRow } from '../types';
import { SAMPLE_SHEET_DATA } from '../data/content';
import {
  getConfiguredApiUrl,
  setConfiguredApiUrl,
  fetchLiveSheetData,
  calculateTotals,
  STORAGE_KEY_LAST_SYNC,
} from '../services/googleSheetService';

export interface UseLiveSheetDataReturn {
  rows: SheetRow[];
  clientName: string;
  updatedAt: string | null;
  totalSpent: number;
  totalLeads: number;
  blendedCpl: number;
  budgetCap: number;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  apiUrl: string;
  refresh: () => Promise<void>;
  updateApiUrl: (url: string) => Promise<boolean>;
  resetToDemo: () => void;
}

export const useLiveSheetData = (): UseLiveSheetDataReturn => {
  const [apiUrl, setApiUrlState] = useState<string>('');
  const [rows, setRows] = useState<SheetRow[]>(SAMPLE_SHEET_DATA);
  const [clientName, setClientName] = useState<string>('Wellness Client (Tier-1 Metro) • 10-Day Sprint Log');
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [budgetCap, setBudgetCap] = useState<number>(5000);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize configured API URL and cached last sync time
  useEffect(() => {
    const configured = getConfiguredApiUrl();
    setApiUrlState(configured);
    if (typeof window !== 'undefined') {
      const lastSync = localStorage.getItem(STORAGE_KEY_LAST_SYNC);
      if (lastSync) setUpdatedAt(lastSync);
    }
  }, []);

  // Fetch function
  const fetchData = useCallback(async (urlToFetch?: string) => {
    const targetUrl = (urlToFetch !== undefined ? urlToFetch : apiUrl).trim();

    if (!targetUrl) {
      // Revert to demo benchmark data
      setRows(SAMPLE_SHEET_DATA);
      setClientName('Wellness Client (Tier-1 Metro) • 10-Day Sprint Log');
      setIsLive(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchLiveSheetData(targetUrl);
      setRows(result.rows);
      setClientName(result.clientName);
      setUpdatedAt(result.updatedAt);
      setBudgetCap(result.budgetCap || 5000);
      setIsLive(true);
      setError(null);
    } catch (err: any) {
      console.warn('Failed to fetch live sheet data, falling back to benchmark sample:', err);
      setError(err.message || 'Failed to sync with Google Sheet');
      // Keep sample data visible so UI never breaks
      if (!isLive) {
        setRows(SAMPLE_SHEET_DATA);
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, isLive]);

  // Initial fetch when apiUrl is detected
  useEffect(() => {
    if (apiUrl) {
      fetchData(apiUrl);
    }
  }, [apiUrl, fetchData]);

  // Expose update API URL action
  const updateApiUrl = async (newUrl: string): Promise<boolean> => {
    const trimmed = newUrl.trim();
    setConfiguredApiUrl(trimmed);
    setApiUrlState(trimmed);

    if (!trimmed) {
      resetToDemo();
      return true;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchLiveSheetData(trimmed);
      setRows(result.rows);
      setClientName(result.clientName);
      setUpdatedAt(result.updatedAt);
      setBudgetCap(result.budgetCap || 5000);
      setIsLive(true);
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to connect to Google Apps Script');
      setIsLive(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDemo = () => {
    setConfiguredApiUrl('');
    setApiUrlState('');
    setRows(SAMPLE_SHEET_DATA);
    setClientName('Wellness Client (Tier-1 Metro) • 10-Day Sprint Log');
    setIsLive(false);
    setError(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_LAST_SYNC);
    }
  };

  const refresh = async () => {
    if (apiUrl) {
      await fetchData(apiUrl);
    }
  };

  // Compute totals dynamically
  const totals = calculateTotals(rows, budgetCap);

  return {
    rows,
    clientName,
    updatedAt,
    totalSpent: totals.totalSpent,
    totalLeads: totals.totalLeads,
    blendedCpl: totals.blendedCpl,
    budgetCap: totals.budgetCap,
    isLive,
    isLoading,
    error,
    apiUrl,
    refresh,
    updateApiUrl,
    resetToDemo,
  };
};
