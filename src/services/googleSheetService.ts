import { SheetRow } from '../types';
import { SAMPLE_SHEET_DATA } from '../data/content';

export const STORAGE_KEY_API_URL = 'markyt_google_sheet_api_url';
export const STORAGE_KEY_LAST_SYNC = 'markyt_google_sheet_last_sync';

export interface SheetApiResponse {
  status?: string;
  clientName?: string;
  updatedAt?: string;
  budgetCap?: number;
  rows?: SheetRow[];
  data?: SheetRow[];
  error?: string;
}

export interface LiveSheetState {
  rows: SheetRow[];
  clientName: string;
  updatedAt: string | null;
  budgetCap: number;
  totalSpent: number;
  totalLeads: number;
  blendedCpl: number;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
}

export const APPS_SCRIPT_TEMPLATE = `function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Campaign_Tracker") || ss.getSheets()[0];
    var data = sheet.getDataRange().getValues();
    
    if (!data || data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "empty",
        clientName: sheet.getName(),
        updatedAt: new Date().toISOString(),
        budgetCap: 5000,
        rows: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Header row is index 0
    var rows = [];
    for (var i = 1; i < data.length; i++) {
      var r = data[i];
      // Skip empty rows
      if (r[0] === "" && r[1] === "" && r[2] === "") continue;
      
      var day = String(r[0] || ("Day " + i)).trim();
      var channel = String(r[1] || "Meta Ads").trim();
      var amountSpent = parseFloat(String(r[2]).replace(/[^0-9.]/g, '')) || 0;
      var impressions = parseInt(String(r[3]).replace(/[^0-9]/g, ''), 10) || 0;
      var cpm = parseFloat(String(r[4]).replace(/[^0-9.]/g, '')) || (impressions > 0 ? (amountSpent / impressions) * 1000 : 0);
      var linkClicks = parseInt(String(r[5]).replace(/[^0-9]/g, ''), 10) || 0;
      var ctr = String(r[6] || (impressions > 0 ? ((linkClicks / impressions) * 100).toFixed(2) + "%" : "0%")).trim();
      var cpc = parseFloat(String(r[7]).replace(/[^0-9.]/g, '')) || (linkClicks > 0 ? amountSpent / linkClicks : 0);
      var leads = parseInt(String(r[8]).replace(/[^0-9]/g, ''), 10) || 0;
      var conversionRate = String(r[9] || (linkClicks > 0 ? ((leads / linkClicks) * 100).toFixed(1) + "%" : "0%")).trim();
      var costPerLead = parseFloat(String(r[10]).replace(/[^0-9.]/g, '')) || (leads > 0 ? amountSpent / leads : 0);
      var strategicNote = String(r[11] || "").trim();

      rows.push({
        day: day,
        channel: channel,
        amountSpent: amountSpent,
        impressions: impressions,
        cpm: cpm,
        linkClicks: linkClicks,
        ctr: ctr.includes('%') ? ctr : ctr + '%',
        cpc: cpc,
        leads: leads,
        conversionRate: conversionRate.includes('%') ? conversionRate : conversionRate + '%',
        costPerLead: costPerLead,
        strategicNote: strategicNote
      });
    }

    var response = {
      status: "success",
      clientName: sheet.getName(),
      updatedAt: new Date().toISOString(),
      budgetCap: 5000,
      rows: rows
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}`;

/**
 * Gets the configured Google Apps Script Web App URL from localStorage or env
 */
export const getConfiguredApiUrl = (): string => {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(STORAGE_KEY_API_URL);
  if (stored && stored.trim().length > 0) return stored.trim();
  return (import.meta.env.VITE_GOOGLE_SHEET_API_URL || '').trim();
};

/**
 * Saves or clears the configured Google Apps Script Web App URL
 */
export const setConfiguredApiUrl = (url: string): void => {
  if (typeof window === 'undefined') return;
  if (!url || url.trim().length === 0) {
    localStorage.removeItem(STORAGE_KEY_API_URL);
  } else {
    localStorage.setItem(STORAGE_KEY_API_URL, url.trim());
  }
};

/**
 * Normalizes raw row data from Google Apps Script into verified SheetRow objects
 */
export const normalizeSheetRows = (rawRows: any[]): SheetRow[] => {
  if (!Array.isArray(rawRows)) return [];

  return rawRows.map((item, index) => {
    const day = String(item.day || item['Day'] || `Day ${index + 1}`).trim();
    const channel = String(item.channel || item['Channel'] || item['Creative / Channel'] || 'Meta Ads').trim();
    const amountSpent = Number(item.amountSpent ?? item['Amount Spent'] ?? item.spend ?? 0) || 0;
    const impressions = Number(item.impressions ?? item['Impressions'] ?? item.impr ?? 0) || 0;
    const cpm = Number(item.cpm ?? item['CPM'] ?? (impressions > 0 ? (amountSpent / impressions) * 1000 : 0)) || 0;
    const linkClicks = Number(item.linkClicks ?? item['Clicks'] ?? item.clicks ?? 0) || 0;
    const ctrRaw = String(item.ctr ?? item['CTR'] ?? (impressions > 0 ? ((linkClicks / impressions) * 100).toFixed(2) + '%' : '0%')).trim();
    const ctr = ctrRaw.includes('%') ? ctrRaw : `${ctrRaw}%`;
    const cpc = Number(item.cpc ?? item['CPC'] ?? (linkClicks > 0 ? amountSpent / linkClicks : 0)) || 0;
    const leads = Number(item.leads ?? item['Leads'] ?? 0) || 0;
    const convRaw = String(item.conversionRate ?? item['Conv %'] ?? (linkClicks > 0 ? ((leads / linkClicks) * 100).toFixed(1) + '%' : '0%')).trim();
    const conversionRate = convRaw.includes('%') ? convRaw : `${convRaw}%`;
    const costPerLead = Number(item.costPerLead ?? item['Cost per Lead'] ?? item['CPL'] ?? (leads > 0 ? amountSpent / leads : 0)) || 0;
    const strategicNote = String(item.strategicNote ?? item['Strategic Note'] ?? item['Strategic Learning Note'] ?? '').trim();

    return {
      day,
      channel,
      amountSpent,
      impressions,
      cpm,
      linkClicks,
      ctr,
      cpc,
      leads,
      conversionRate,
      costPerLead,
      strategicNote,
    };
  });
};

/**
 * Calculates aggregated totals from rows
 */
export const calculateTotals = (rows: SheetRow[], budgetCap = 5000) => {
  const totalSpent = rows.reduce((acc, row) => acc + (row.amountSpent || 0), 0);
  const totalLeads = rows.reduce((acc, row) => acc + (row.leads || 0), 0);
  const blendedCpl = totalLeads > 0 ? totalSpent / totalLeads : 0;

  return {
    totalSpent: Math.round(totalSpent * 100) / 100,
    totalLeads,
    blendedCpl: Math.round(blendedCpl * 100) / 100,
    budgetCap,
  };
};

/**
 * Checks if a given string is a standard Google Spreadsheet URL
 */
export const isGoogleSpreadsheetUrl = (url: string): boolean => {
  return /docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/i.test(url.trim());
};

/**
 * Checks if a given string is a Google Apps Script Web App URL
 */
export const isGoogleAppsScriptUrl = (url: string): boolean => {
  return /script\.google\.com\/macros\/s\/[a-zA-Z0-9-_]+/i.test(url.trim());
};

/**
 * Extracts spreadsheetId and gid from a Google Sheets URL
 */
export const extractSpreadsheetInfo = (url: string): { spreadsheetId: string; gid: string } | null => {
  const trimmed = url.trim();
  const idMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/i);
  if (!idMatch) return null;
  const gidMatch = trimmed.match(/[#&?]gid=([0-9]+)/i);
  return {
    spreadsheetId: idMatch[1],
    gid: gidMatch ? gidMatch[1] : '0',
  };
};

/**
 * Robust parser converting Google Visualization API table into verified SheetRow[] objects
 */
export const parseGvizTableToRows = (table: any): SheetRow[] => {
  if (!table || !table.rows || !Array.isArray(table.rows) || table.rows.length === 0) {
    return [];
  }

  const cols = table.cols || [];
  const rows = table.rows;

  // Check if first row contains column headers
  const firstRowStrings = (rows[0]?.c || []).map((cell: any) => {
    if (!cell) return '';
    return String(cell.v !== null && cell.v !== undefined ? cell.v : cell.f || '').trim();
  });

  const hasHeaderRow = firstRowStrings.some((s: string) => {
    const l = s.toLowerCase();
    return (
      l.includes('day') ||
      l.includes('spend') ||
      l.includes('channel') ||
      l.includes('click') ||
      l.includes('lead') ||
      l.includes('cpl') ||
      l.includes('cost') ||
      l.includes('cpm')
    );
  });

  const headerIndices: Record<string, number> = {};
  let dataRows = rows;

  if (hasHeaderRow) {
    firstRowStrings.forEach((str: string, idx: number) => {
      const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (clean) headerIndices[clean] = idx;
    });
    dataRows = rows.slice(1);
  } else {
    // Check cols from table.cols if labels are present
    cols.forEach((col: any, idx: number) => {
      const label = (col.label || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (label) headerIndices[label] = idx;
    });
  }

  const findCol = (keys: string[], fallbackIndex: number): number => {
    for (const k of keys) {
      for (const [header, idx] of Object.entries(headerIndices)) {
        if (header.includes(k)) return idx;
      }
    }
    return fallbackIndex;
  };

  const dayIdx = findCol(['day', 'date', 'sprint'], 0);
  const channelIdx = findCol(['channel', 'platform', 'creative', 'source'], 1);
  const spendIdx = findCol(['amountspent', 'spend', 'budget', 'cost', 'spent'], 2);
  const imprIdx = findCol(['impression', 'impressions', 'views', 'reach', 'impr'], 3);
  const cpmIdx = findCol(['cpm'], 4);
  const clicksIdx = findCol(['linkclicks', 'clicks', 'click'], 5);
  const ctrIdx = findCol(['ctr'], 6);
  const cpcIdx = findCol(['cpc'], 7);
  const leadsIdx = findCol(['leads', 'lead', 'conv', 'conversions', 'results'], 8);
  const crIdx = findCol(['conversionrate', 'convrate', 'convpercent', 'cr'], 9);
  const cplIdx = findCol(['costperlead', 'cpl'], 10);
  const noteIdx = findCol(['strategicnote', 'note', 'notes', 'comment', 'learning'], 11);

  const getCellVal = (cList: any[], idx: number): any => {
    if (!cList || idx === undefined || idx < 0 || idx >= cList.length) return '';
    const cell = cList[idx];
    if (!cell) return '';
    return cell.v !== null && cell.v !== undefined ? cell.v : cell.f || '';
  };

  const parsed: SheetRow[] = [];

  dataRows.forEach((row: any, i: number) => {
    const c = row.c || [];
    // Check if entire row is empty/null
    const isAllNull = c.every((cell: any) => !cell || cell.v === null || cell.v === '');
    if (isAllNull) return;

    const rawDay = getCellVal(c, dayIdx);
    const day = String(rawDay || `Day ${i + 1}`).trim();
    const channel = String(getCellVal(c, channelIdx) || 'Meta Ads').trim();
    const amountSpent = parseFloat(String(getCellVal(c, spendIdx)).replace(/[^0-9.]/g, '')) || 0;
    const impressions = parseInt(String(getCellVal(c, imprIdx)).replace(/[^0-9]/g, ''), 10) || 0;
    const cpm =
      parseFloat(String(getCellVal(c, cpmIdx)).replace(/[^0-9.]/g, '')) ||
      (impressions > 0 ? (amountSpent / impressions) * 1000 : 0);
    const linkClicks = parseInt(String(getCellVal(c, clicksIdx)).replace(/[^0-9]/g, ''), 10) || 0;
    const rawCtr = String(getCellVal(c, ctrIdx)).trim();
    const ctr = rawCtr
      ? rawCtr.includes('%')
        ? rawCtr
        : `${rawCtr}%`
      : impressions > 0
      ? `${((linkClicks / impressions) * 100).toFixed(2)}%`
      : '0%';
    const cpc =
      parseFloat(String(getCellVal(c, cpcIdx)).replace(/[^0-9.]/g, '')) ||
      (linkClicks > 0 ? amountSpent / linkClicks : 0);
    const leads = parseInt(String(getCellVal(c, leadsIdx)).replace(/[^0-9]/g, ''), 10) || 0;
    const rawCr = String(getCellVal(c, crIdx)).trim();
    const conversionRate = rawCr
      ? rawCr.includes('%')
        ? rawCr
        : `${rawCr}%`
      : linkClicks > 0
      ? `${((leads / linkClicks) * 100).toFixed(1)}%`
      : '0%';
    const cpl =
      parseFloat(String(getCellVal(c, cplIdx)).replace(/[^0-9.]/g, '')) ||
      (leads > 0 ? amountSpent / leads : 0);
    const strategicNote = String(getCellVal(c, noteIdx) || '').trim();

    parsed.push({
      day,
      channel,
      amountSpent: Math.round(amountSpent * 100) / 100,
      impressions,
      cpm: Math.round(cpm * 100) / 100,
      linkClicks,
      ctr,
      cpc: Math.round(cpc * 100) / 100,
      leads,
      conversionRate,
      costPerLead: Math.round(cpl * 100) / 100,
      strategicNote,
    });
  });

  return parsed;
};

/**
 * Fetches live Google Sheet data directly via GViz JSONP callback (CORS-free, instant)
 */
export const fetchGoogleSpreadsheetData = async (
  sheetUrl: string
): Promise<{ rows: SheetRow[]; clientName: string; updatedAt: string; budgetCap: number }> => {
  const info = extractSpreadsheetInfo(sheetUrl);
  if (!info) {
    throw new Error('Invalid Google Sheet URL. Expected format: https://docs.google.com/spreadsheets/d/{SHEET_ID}/...');
  }

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('Direct Google Sheet sync requires a browser environment.');
  }

  const rawGvizData: any = await new Promise((resolve, reject) => {
    const callbackName = `__gviz_cb_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const script = document.createElement('script');

    const timeoutId = setTimeout(() => {
      cleanup();
      reject(
        new Error(
          'Google Sheet connection timed out (10s). Please ensure your Google Sheet sharing is set to "Anyone with the link can view". In Google Sheets: Click Share > General access > Anyone with the link.'
        )
      );
    }, 10000);

    const cleanup = () => {
      clearTimeout(timeoutId);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete (window as any)[callbackName];
    };

    (window as any)[callbackName] = (data: any) => {
      cleanup();
      if (!data) {
        reject(new Error('Received empty response from Google Sheet.'));
        return;
      }
      if (data.status === 'error') {
        const detail =
          data.errors?.[0]?.detailed_message ||
          data.errors?.[0]?.message ||
          'Google Sheet access denied';
        reject(
          new Error(
            `${detail}. Please ensure your Google Sheet is set to "Anyone with the link can view".`
          )
        );
        return;
      }
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(
        new Error(
          'Failed to connect to Google Sheet. Check that the Sheet URL is correct and sharing is set to "Anyone with the link can view".'
        )
      );
    };

    script.src = `https://docs.google.com/spreadsheets/d/${info.spreadsheetId}/gviz/tq?tqx=responseHandler:${callbackName}&gid=${info.gid}`;
    document.head.appendChild(script);
  });

  const parsedRows = parseGvizTableToRows(rawGvizData.table);
  if (parsedRows.length === 0) {
    throw new Error(
      'Google Sheet connected, but 0 valid data rows were found. Check that row 1 has headers (Day, Channel, Spend, etc.) and rows below have data.'
    );
  }

  const updatedAt = new Date().toISOString();
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_LAST_SYNC, updatedAt);
  }

  return {
    rows: parsedRows,
    clientName: 'Live Google Sheet Sync',
    updatedAt,
    budgetCap: 5000,
  };
};

/**
 * Fetches live data from either a direct Google Sheet URL or Google Apps Script Web App URL
 */
export const fetchLiveSheetData = async (
  apiUrl: string
): Promise<{ rows: SheetRow[]; clientName: string; updatedAt: string; budgetCap: number }> => {
  const url = apiUrl.trim();
  if (!url) {
    throw new Error('No Google Sheet or Web App URL provided');
  }

  // Branch 1: Direct Google Sheet URL (docs.google.com/spreadsheets)
  if (isGoogleSpreadsheetUrl(url)) {
    return await fetchGoogleSpreadsheetData(url);
  }

  // Branch 2: Google Apps Script Web App URL (script.google.com)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with HTTP ${response.status}`);
    }

    const json = await response.json();

    if (json.status === 'error') {
      throw new Error(json.message || 'Google Apps Script returned an execution error');
    }

    const rawRows = Array.isArray(json) ? json : json.rows || json.data || [];
    const normalized = normalizeSheetRows(rawRows);

    if (normalized.length === 0) {
      throw new Error('Sheet returned 0 data rows. Check header names and row data.');
    }

    const clientName = json.clientName || 'Live Google Sheet Sync';
    const updatedAt = json.updatedAt || new Date().toISOString();
    const budgetCap = Number(json.budgetCap) || 5000;

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_LAST_SYNC, updatedAt);
    }

    return {
      rows: normalized,
      clientName,
      updatedAt,
      budgetCap,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Google Apps Script request timed out (12s). Check if deployment is active.');
    }
    throw err;
  }
};
