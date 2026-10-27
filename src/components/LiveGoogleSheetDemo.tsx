import React, { useState } from 'react';
import { useLiveSheetData } from '../hooks/useLiveSheetData';
import { GoogleSheetSyncModal } from './GoogleSheetSyncModal';
import {
  Table,
  CheckCircle2,
  Eye,
  FileSpreadsheet,
  TrendingDown,
  LayoutGrid,
  Columns,
  Info,
  RefreshCw,
  Settings,
  AlertCircle,
  Radio,
} from 'lucide-react';

export const LiveGoogleSheetDemo: React.FC = () => {
  const [viewMode, setViewMode] = useState<'all' | 'key'>('all');
  const [expandedNoteIndex, setExpandedNoteIndex] = useState<number | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const {
    rows,
    clientName,
    updatedAt,
    totalSpent,
    totalLeads,
    blendedCpl,
    budgetCap,
    isLive,
    isLoading,
    error,
    apiUrl,
    refresh,
    updateApiUrl,
    resetToDemo,
  } = useLiveSheetData();

  return (
    <section id="live-sheet" className="relative pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-14 bg-gradient-to-b from-[#E7F6EC] via-[#EFF9F2] to-[#E6F4EA] text-slate-950 overflow-hidden border-b border-emerald-900/10 scroll-mt-[54px]">
      
      {/* Ambient Light Green Glows */}
      <div className="absolute -top-24 right-10 w-96 h-96 bg-emerald-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl pointer-events-none" />


      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Headline - tightened vertical rhythm */}
        <div className="max-w-3xl mx-auto text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950 text-white text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Campaign Data & Telemetry</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-slate-950 tracking-tight leading-[1.1]">
            Real Spend. <span className="squiggly-underline">Real Returns.</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
            Here's what the first 10 days of your test actually look like — all {rows.length} days visible in one unified sheet.
          </p>
        </div>

        {/* Sync Error Notice if any */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{error} — showing verified benchmark sample data.</span>
            </div>
            <button
              onClick={() => setIsSyncModalOpen(true)}
              className="text-amber-950 font-bold underline shrink-0 hover:text-black cursor-pointer"
            >
              Configure Sheet
            </button>
          </div>
        )}

        {/* Google Sheet Campaign Performance Tracker Container */}
        <div className="bg-white/95 backdrop-blur-sm border border-emerald-950/15 rounded-2xl overflow-hidden shadow-lg shadow-emerald-950/5">
          
          {/* Simulated Google Sheet Top Bar */}
          <div 
            id="live-sheet-header-bar"
            className="bg-emerald-950 text-white px-3.5 sm:px-5 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm border border-emerald-400/40 shadow-xs shrink-0">
                <Table className="w-4 h-4" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm font-heading font-bold tracking-tight text-white flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Markyt_Campaign_Tracker.xlsx
                  </span>
                  
                  {isLive ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[9px] sm:text-[10px] font-mono font-bold uppercase flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                      Live Sync Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[9px] sm:text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                      <Radio className="w-2.5 h-2.5 text-emerald-400" />
                      Verified Client Benchmark
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-emerald-200/90 font-mono block">
                  {clientName}
                </span>
              </div>
            </div>

            {/* View Mode & Live Sync Controls */}
            <div className="flex items-center gap-2">
              {/* Refresh Button (if connected to live sheet) */}
              {isLive && (
                <button
                  type="button"
                  onClick={refresh}
                  disabled={isLoading}
                  title="Refresh latest rows from Google Sheet"
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700/60 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Sync</span>
                </button>
              )}

              {/* Connect / Manage Sheet Button */}
              <button
                type="button"
                onClick={() => setIsSyncModalOpen(true)}
                title="Connect your Google Sheet or Web App"
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isLive
                    ? 'bg-emerald-900/90 border-emerald-700/60 text-emerald-200 hover:text-white hover:bg-emerald-800'
                    : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 border-emerald-400 shadow-xs'
                }`}
              >
                <Settings className="w-3 h-3" />
                <span>{isLive ? 'Sheet Settings' : 'Connect Sheet'}</span>
              </button>

              {/* View Mode Controls */}
              <div className="bg-emerald-900/90 p-1 rounded-xl border border-emerald-700/60 flex items-center gap-1 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'all'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-xs'
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
                  }`}
                  title="Fit all columns onto screen without sliding"
                >
                  <Columns className="w-3 h-3" />
                  <span>All Columns</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('key')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'key'
                      ? 'bg-emerald-400 text-slate-950 font-bold shadow-xs'
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
                  }`}
                  title="Focus on Core KPIs (Spend, Leads, CPL, Strategy)"
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>Key KPIs</span>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop & Tablet Table (All Visible at once) */}
          <div className="hidden md:block w-full">
            <table className="w-full text-left text-[11px] font-mono table-fixed">
              <thead className="bg-emerald-50/80 text-emerald-950 font-bold border-b border-emerald-200/80 uppercase tracking-wider text-[10px]">
                {viewMode === 'all' ? (
                  <tr>
                    <th className="py-2.5 px-2 w-[5%]">Day</th>
                    <th className="py-2.5 px-2 w-[13%]">Creative / Channel</th>
                    <th className="py-2.5 px-1.5 w-[7%] text-right">Spend</th>
                    <th className="py-2.5 px-1.5 w-[6.5%] text-right">Impr.</th>
                    <th className="py-2.5 px-1.5 w-[6%] text-right">CPM</th>
                    <th className="py-2.5 px-1.5 w-[5%] text-right">Clicks</th>
                    <th className="py-2.5 px-1.5 w-[5.5%] text-right">CTR</th>
                    <th className="py-2.5 px-1.5 w-[5.5%] text-right">CPC</th>
                    <th className="py-2.5 px-1.5 w-[6.5%] text-center">Leads</th>
                    <th className="py-2.5 px-1.5 w-[5.5%] text-right">Conv%</th>
                    <th className="py-2.5 px-1.5 w-[7.5%] text-right">CPL</th>
                    <th className="py-2.5 px-2.5 w-[31%]">Strategic Learning Note</th>
                  </tr>
                ) : (
                  <tr>
                    <th className="py-2.5 px-3 w-[7%]">Day</th>
                    <th className="py-2.5 px-3 w-[18%]">Creative / Channel</th>
                    <th className="py-2.5 px-3 w-[11%] text-right">Amount Spent</th>
                    <th className="py-2.5 px-3 w-[10%] text-right">Clicks (CPC)</th>
                    <th className="py-2.5 px-3 w-[10%] text-center">Leads</th>
                    <th className="py-2.5 px-3 w-[12%] text-right">Cost per Lead</th>
                    <th className="py-2.5 px-3 w-[32%]">Strategic Learning Note</th>
                  </tr>
                )}
              </thead>
              <tbody className="divide-y divide-emerald-100/60 text-slate-800">
                {rows.map((row, idx) => (
                  <tr 
                    key={`${row.day}-${idx}`} 
                    className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-emerald-50/30'} hover:bg-emerald-100/50`}
                  >
                    {/* Day */}
                    <td className="py-2 px-2 font-bold text-slate-950 truncate">
                      {row.day}
                    </td>

                    {/* Channel / Creative */}
                    <td className="py-2 px-2 text-slate-800">
                      <div className="truncate font-medium text-slate-900" title={row.channel}>
                        {row.channel.replace(' | Meta', '')}
                      </div>
                      <span className="text-[9px] text-slate-500 font-sans block truncate">Meta Ads</span>
                    </td>

                    {/* Amount Spent */}
                    <td className="py-2 px-1.5 font-bold text-slate-950 text-right truncate">
                      ₹{row.amountSpent.toFixed(0)}
                    </td>

                    {viewMode === 'all' ? (
                      <>
                        {/* Impressions */}
                        <td className="py-2 px-1.5 text-slate-600 text-right truncate">
                          {row.impressions.toLocaleString()}
                        </td>

                        {/* CPM */}
                        <td className="py-2 px-1.5 text-slate-600 text-right truncate">
                          ₹{row.cpm.toFixed(0)}
                        </td>

                        {/* Link Clicks */}
                        <td className="py-2 px-1.5 font-semibold text-slate-900 text-right truncate">
                          {row.linkClicks}
                        </td>

                        {/* CTR */}
                        <td className="py-2 px-1.5 text-slate-700 text-right truncate">
                          {row.ctr}
                        </td>

                        {/* CPC */}
                        <td className="py-2 px-1.5 text-slate-700 text-right truncate">
                          ₹{row.cpc.toFixed(1)}
                        </td>
                      </>
                    ) : (
                      /* Combined Clicks & CPC for Key View */
                      <td className="py-2 px-3 text-right truncate">
                        <span className="font-semibold text-slate-900">{row.linkClicks}</span>
                        <span className="text-[10px] text-slate-500 ml-1">(@₹{row.cpc.toFixed(1)})</span>
                      </td>
                    )}

                    {/* Leads */}
                    <td className="py-2 px-1.5 text-center">
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 font-bold text-[10px] border border-emerald-300/60">
                        {row.leads} {row.leads === 1 ? 'Lead' : 'Leads'}
                      </span>
                    </td>

                    {viewMode === 'all' && (
                      /* Conversion Rate */
                      <td className="py-2 px-1.5 font-semibold text-emerald-800 text-right truncate">
                        {row.conversionRate}
                      </td>
                    )}

                    {/* Cost per Lead */}
                    <td className="py-2 px-1.5 font-bold text-slate-950 text-right truncate">
                      <span className="text-emerald-950 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">
                        ₹{row.costPerLead.toFixed(0)}
                      </span>
                    </td>

                    {/* Strategic Note - fully legible and wrapped to fit width */}
                    <td className="py-2 px-2.5 text-[11px] font-sans text-slate-600 leading-snug">
                      <p className="line-clamp-2 hover:line-clamp-none transition-all cursor-default" title={row.strategicNote}>
                        {row.strategicNote}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card / Compact View (No horizontal scrolling on mobile either!) */}
          <div className="md:hidden divide-y divide-slate-200">
            {rows.map((row, idx) => {
              const isExpanded = expandedNoteIndex === idx;
              return (
                <div key={`${row.day}-${idx}`} className="p-3 bg-white hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-950 text-white px-2 py-0.5 rounded">
                        {row.day}
                      </span>
                      <span className="font-sans font-semibold text-xs text-slate-900">
                        {row.channel.replace(' | Meta', '')}
                      </span>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono font-bold text-[11px]">
                      {row.leads} {row.leads === 1 ? 'Lead' : 'Leads'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono bg-slate-50 p-2 rounded-lg border border-slate-200/60 mb-2">
                    <div>
                      <span className="block text-[9px] text-slate-500 uppercase">Spend</span>
                      <span className="font-bold text-slate-950">₹{row.amountSpent.toFixed(0)}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-500 uppercase">Clicks</span>
                      <span className="font-medium text-slate-800">{row.linkClicks}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-500 uppercase">CTR</span>
                      <span className="font-medium text-slate-800">{row.ctr}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-500 uppercase">Cost/Lead</span>
                      <span className="font-bold text-emerald-700">₹{row.costPerLead.toFixed(0)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedNoteIndex(isExpanded ? null : idx)}
                    className="w-full text-left text-[11px] font-sans text-slate-600 bg-emerald-50/60 hover:bg-emerald-50 p-2 rounded border border-emerald-200/50 flex items-start gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span className={isExpanded ? 'block' : 'line-clamp-1'}>
                      {row.strategicNote}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Bar */}
          <div className="bg-emerald-50/90 border-t border-emerald-200/80 px-3.5 sm:px-6 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono">
              <div>
                <span className="text-emerald-800/70 block text-[9px] uppercase font-bold tracking-wider">
                  {rows.length} Days Logged
                </span>
                <span className="text-sm sm:text-base font-heading font-bold text-slate-950 tracking-tight">
                  ₹{totalSpent.toFixed(2)}{' '}
                  <span className="text-[11px] text-slate-500 font-mono font-normal">
                    / ₹{budgetCap.toLocaleString()} sprint
                  </span>
                </span>
              </div>

              <div>
                <span className="text-emerald-800/70 block text-[9px] uppercase font-bold tracking-wider">
                  Verified Leads
                </span>
                <span className="text-sm sm:text-base font-heading font-bold text-emerald-700 flex items-center gap-1 tracking-tight">
                  {totalLeads} Leads
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>

              <div>
                <span className="text-emerald-800/70 block text-[9px] uppercase font-bold tracking-wider">
                  Blended CPL
                </span>
                <span className="text-sm sm:text-base font-heading font-bold text-slate-950 flex items-center gap-1 tracking-tight">
                  ₹{blendedCpl.toFixed(2)}
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>
            </div>

            {/* Live Telemetry Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-900/80">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold">100% Transparent Telemetry</span>
            </div>
          </div>

        </div>

      </div>

      {/* Google Sheet Sync Configuration Modal */}
      <GoogleSheetSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        currentUrl={apiUrl}
        isLive={isLive}
        onSaveUrl={updateApiUrl}
        onResetToDemo={resetToDemo}
      />
    </section>
  );
};


