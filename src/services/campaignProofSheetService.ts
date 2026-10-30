import { CampaignProofData, CAMPAIGN_PROOF_ROWS } from '../data/campaignProofData';

export const STORAGE_KEY_CAMPAIGN_PROOF_URL = 'markyt_campaign_proof_sheet_url';
export const DEFAULT_CAMPAIGN_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1JwWWs33PEisnF5F4t92HI3_Ew_BDtMrYoM1OBlYjGTI/export?format=csv';

/**
 * Normalizes any Google Sheet URL (including /edit, /edit?usp=sharing, /edit#gid=0, etc.)
 * into a direct public CSV export endpoint.
 */
export const normalizeGoogleSheetUrl = (rawUrl: string): string => {
  let url = (rawUrl || '').trim();
  if (!url) return '';

  // Handle standard Google Sheets URLs (e.g. /edit, /edit?usp=sharing, /edit#gid=0, etc.)
  const sheetMatch = url.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (sheetMatch) {
    const sheetId = sheetMatch[1];
    
    // Check if there is a specific gid (sheet tab)
    const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';

    // If it's already an export or gviz URL, keep it
    if (url.includes('/export?format=csv') || url.includes('/gviz/tq?tqx=out:csv')) {
      return url;
    }

    // Direct Google Sheets CSV export
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}`;
  }

  return url;
};

/**
 * Gets the configured Campaign Proof Google Sheet URL from localStorage, env, or verified default
 */
export const getCampaignProofSheetUrl = (): string => {
  if (typeof window === 'undefined') return DEFAULT_CAMPAIGN_SHEET_URL;
  const stored = localStorage.getItem(STORAGE_KEY_CAMPAIGN_PROOF_URL);
  if (stored && stored.trim().length > 0) return normalizeGoogleSheetUrl(stored.trim());
  
  const envUrl = (import.meta.env.VITE_CAMPAIGN_PROOF_SHEET_URL || '').trim();
  if (envUrl) return normalizeGoogleSheetUrl(envUrl);

  return DEFAULT_CAMPAIGN_SHEET_URL;
};

/**
 * Saves or clears the configured Campaign Proof Google Sheet URL
 */
export const setCampaignProofSheetUrl = (url: string): void => {
  if (typeof window === 'undefined') return;
  if (!url || url.trim().length === 0) {
    localStorage.removeItem(STORAGE_KEY_CAMPAIGN_PROOF_URL);
  } else {
    localStorage.setItem(STORAGE_KEY_CAMPAIGN_PROOF_URL, normalizeGoogleSheetUrl(url.trim()));
  }
};

/**
 * Parses CSV text into verified CampaignProofData rows
 */
export const parseCsvToRows = (csvText: string): CampaignProofData[] => {
  const lines = csvText.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  // Parse CSV line handling quoted fields
  const parseLine = (text: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const rawHeaders = parseLine(lines[0]);
  const headers = rawHeaders.map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const rows: CampaignProofData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const vals = parseLine(lines[i]);
    if (vals.every(v => v === '')) continue;

    const getVal = (keys: string[], fallbackIdx: number): string => {
      for (const k of keys) {
        const foundIdx = headers.findIndex(h => h.includes(k));
        if (foundIdx !== -1 && vals[foundIdx] !== undefined) return vals[foundIdx];
      }
      return vals[fallbackIdx] || '';
    };

    let rawCampaign = getVal(['campaign', 'client', 'name'], 0);
    if (!rawCampaign) continue;

    let badgeText = '';
    let badgeVariant: 'amber' | 'emerald' = 'amber';

    // Extract inline badges like '(Day 2 data)' or '(New)'
    const badgeMatch = rawCampaign.match(/\((day[^)]*|data[^)]*|new[^)]*)\)/i);
    if (badgeMatch) {
      badgeText = badgeMatch[1].trim();
      rawCampaign = rawCampaign.replace(badgeMatch[0], '').trim();
    } else {
      // Also check separate badge column if provided
      const explicitBadge = getVal(['badge'], -1);
      if (explicitBadge) {
        badgeText = explicitBadge;
        badgeVariant = explicitBadge.toLowerCase().includes('day') ? 'amber' : 'emerald';
      }
    }

    const statusRaw = getVal(['delivery', 'status'], 1).toLowerCase();
    const status: 'Active' | 'Completed' = statusRaw.includes('complete') ? 'Completed' : 'Active';

    const resultsRaw = getVal(['results', 'result'], 2);
    const results = parseInt(resultsRaw.replace(/[^0-9]/g, ''), 10) || 0;

    const resultsUnit = getVal(['resulttype', 'unit', 'type'], 3) || 'conversations';
    const isPurchase = resultsUnit.toLowerCase().includes('purchase') || rawCampaign.toLowerCase().includes('clothing');

    let costPerResult = getVal(['costresult', 'cost', 'cpr'], 4);
    if (costPerResult && !costPerResult.startsWith('₹') && !costPerResult.startsWith('$')) {
      costPerResult = `₹${costPerResult}`;
    }

    const costPerUnit = getVal(['costbasis', 'basis', 'per'], 5) || (isPurchase ? 'per purchase' : 'per conv.');

    let amountSpent = getVal(['amountspent', 'spent', 'amount'], 6);
    if (amountSpent && !amountSpent.startsWith('₹') && !amountSpent.startsWith('$')) {
      amountSpent = `₹${amountSpent}`;
    }

    const budgetNote = getVal(['budgetspendnote', 'budgetnote', 'budget', 'note'], 7) || (amountSpent ? `${amountSpent} spent` : '');

    rows.push({
      campaign: rawCampaign,
      status,
      isPurchase,
      isDayOne: badgeText.toLowerCase().includes('day'),
      badge: badgeText ? {
        text: badgeText.toUpperCase(),
        variant: badgeVariant,
      } : undefined,
      results,
      resultsUnit,
      costPerResult: costPerResult || '₹0.00',
      costPerUnit,
      amountSpent: amountSpent || '₹0.00',
      budgetNote: budgetNote || undefined,
    });
  }

  return rows;
};

/**
 * Normalizes JSON array from Google Apps Script Web App
 */
export const normalizeJsonRows = (data: any): CampaignProofData[] => {
  const list = Array.isArray(data) ? data : (data.campaigns || data.rows || data.data || []);
  if (!Array.isArray(list) || list.length === 0) return [];

  return list.map((item: any) => {
    let rawCampaign = String(item.campaign || item.Campaign || item.client || item.name || '').trim();
    if (!rawCampaign) return null;

    let badgeText = '';
    const badgeMatch = rawCampaign.match(/\((day[^)]*|data[^)]*|new[^)]*)\)/i);
    if (badgeMatch) {
      badgeText = badgeMatch[1].trim();
      rawCampaign = rawCampaign.replace(badgeMatch[0], '').trim();
    } else {
      const bRaw = item.badge || item.Badge || '';
      badgeText = typeof bRaw === 'string' ? bRaw : (bRaw?.text || '');
    }

    const statusRaw = String(item.status || item.Status || item.delivery || item.Delivery || 'Active').trim().toLowerCase();
    const status: 'Active' | 'Completed' = statusRaw.includes('complete') ? 'Completed' : 'Active';

    const results = Number(item.results ?? item.Results ?? 0) || 0;
    const resultsUnit = String(item.resultsUnit || item.ResultsUnit || item.resultType || (rawCampaign.toLowerCase().includes('clothing') ? 'website purchases' : 'conversations')).trim();
    const isPurchase = Boolean(item.isPurchase) || resultsUnit.toLowerCase().includes('purchase');

    let costPerResult = String(item.costPerResult || item.CostPerResult || item.cost || item.cpr || '₹0.00').trim();
    if (costPerResult && !costPerResult.startsWith('₹') && !costPerResult.startsWith('$')) {
      costPerResult = `₹${costPerResult}`;
    }

    const costPerUnit = String(item.costPerUnit || item.CostPerUnit || item.costBasis || (isPurchase ? 'per purchase' : 'per conv.')).trim();

    let amountSpent = String(item.amountSpent || item.AmountSpent || item.spent || item.amount || '₹0.00').trim();
    if (amountSpent && !amountSpent.startsWith('₹') && !amountSpent.startsWith('$')) {
      amountSpent = `₹${amountSpent}`;
    }

    const budgetNote = item.budgetNote || item.BudgetNote || item.budgetSpendNote ? String(item.budgetNote || item.BudgetNote || item.budgetSpendNote).trim() : undefined;

    return {
      campaign: rawCampaign,
      status,
      isPurchase,
      isDayOne: badgeText.toLowerCase().includes('day'),
      badge: badgeText ? {
        text: badgeText.toUpperCase(),
        variant: badgeText.toLowerCase().includes('day') ? 'amber' : 'emerald',
      } : undefined,
      results,
      resultsUnit,
      costPerResult,
      costPerUnit,
      amountSpent,
      budgetNote,
    };
  }).filter((r): r is CampaignProofData => r !== null);
};

/**
 * Fetches campaign rows from Google Sheet URL
 */
export const fetchCampaignProofRows = async (apiUrl?: string): Promise<{ rows: CampaignProofData[]; isLive: boolean; error?: string }> => {
  const rawUrl = (apiUrl || getCampaignProofSheetUrl()).trim();
  const url = normalizeGoogleSheetUrl(rawUrl);

  if (!url) {
    return { rows: CAMPAIGN_PROOF_ROWS, isLive: false };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'text/csv, application/json, text/plain, */*',
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const text = await res.text();

    // Check if JSON
    try {
      const json = JSON.parse(text);
      const parsedRows = normalizeJsonRows(json);
      if (parsedRows.length > 0) {
        return { rows: parsedRows, isLive: true };
      }
    } catch {
      // Not JSON, parse as CSV
      const csvRows = parseCsvToRows(text);
      if (csvRows.length > 0) {
        return { rows: csvRows, isLive: true };
      }
    }

    return { rows: CAMPAIGN_PROOF_ROWS, isLive: false, error: 'No campaign rows found in sheet response' };
  } catch (err: any) {
    console.warn('[CampaignProofSheet] Live sync error:', err.message);
    return { rows: CAMPAIGN_PROOF_ROWS, isLive: false, error: err.message };
  }
};
