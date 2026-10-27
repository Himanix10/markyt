import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  FileSpreadsheet,
  Check,
  Copy,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Code2,
  Radio,
  Zap,
  Share2,
  Sparkles,
  Link as LinkIcon,
  Globe2,
} from 'lucide-react';
import {
  APPS_SCRIPT_TEMPLATE,
  isGoogleSpreadsheetUrl,
  isGoogleAppsScriptUrl,
} from '../services/googleSheetService';

interface GoogleSheetSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  isLive: boolean;
  onSaveUrl: (url: string) => Promise<boolean>;
  onResetToDemo: () => void;
}

export const GoogleSheetSyncModal: React.FC<GoogleSheetSyncModalProps> = ({
  isOpen,
  onClose,
  currentUrl,
  isLive,
  onSaveUrl,
  onResetToDemo,
}) => {
  const [inputUrl, setInputUrl] = useState(currentUrl || '');
  const [activeTab, setActiveTab] = useState<'connect' | 'quickshare' | 'appsscript'>('connect');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync internal state when currentUrl changes
  React.useEffect(() => {
    setInputUrl(currentUrl || '');
  }, [currentUrl]);

  if (!isOpen) return null;

  const trimmedUrl = inputUrl.trim();
  const isSheetLink = isGoogleSpreadsheetUrl(trimmedUrl);
  const isScriptLink = isGoogleAppsScriptUrl(trimmedUrl);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmedUrl) {
      setStatusMessage({
        type: 'error',
        text: 'Please paste your Google Sheet link or Apps Script URL.',
      });
      return;
    }

    if (!isSheetLink && !isScriptLink) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter a valid Google Sheet URL (https://docs.google.com/spreadsheets/d/...) or a deployed Apps Script URL (https://script.google.com/macros/s/.../exec).',
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const success = await onSaveUrl(trimmedUrl);
    setIsSubmitting(false);

    if (success) {
      setStatusMessage({
        type: 'success',
        text: isSheetLink
          ? 'Connected successfully to Google Sheet! Live campaign data is now syncing.'
          : 'Connected successfully to Apps Script Web App! Live telemetry active.',
      });
      setTimeout(() => {
        onClose();
      }, 1300);
    } else {
      setStatusMessage({
        type: 'error',
        text: isSheetLink
          ? 'Could not load Sheet. Please make sure your Google Sheet sharing is set to "Anyone with the link can view". (File > Share > General access: Anyone with the link).'
          : 'Could not connect. Verify you deployed your Apps Script Web App with "Who has access: Anyone" and try again.',
      });
    }
  };

  const handleReset = () => {
    setInputUrl('');
    onResetToDemo();
    setStatusMessage({
      type: 'success',
      text: 'Reverted to verified benchmark demo data.',
    });
  };

  const copyScriptCode = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window with iOS Liquid Glass Styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden z-10 my-8 text-slate-900"
        >
          {/* Header - Liquid Glass Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-900 text-white p-5 sm:p-6 border-b border-white/10 relative overflow-hidden">
            {/* Liquid specular highlight */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center font-bold shadow-inner">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
                      <span>Google Sheet Live Integration</span>
                    </h3>
                    {isLive ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-mono font-bold flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                        LIVE ACTIVE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-white/15 text-emerald-200 text-[10px] font-mono font-bold border border-white/10">
                        DEMO BENCHMARK
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-200/80 mt-0.5 font-medium">
                    Direct Google Sheet Link <span className="text-emerald-400 font-bold">(Zero Setup)</span> • Instant Updates • 100% Free
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 mt-5 bg-white/10 p-1 rounded-xl text-xs font-heading font-bold relative z-10 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('connect')}
                className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'connect'
                    ? 'bg-emerald-400 text-slate-950 shadow-sm font-black'
                    : 'text-emerald-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>1. Connect Link</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('quickshare')}
                className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'quickshare'
                    ? 'bg-emerald-400 text-slate-950 shadow-sm font-black'
                    : 'text-emerald-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>2. Share Guide (10s)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('appsscript')}
                className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'appsscript'
                    ? 'bg-emerald-400 text-slate-950 shadow-sm font-black'
                    : 'text-emerald-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>3. Apps Script (Code)</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
            {/* TAB 1: CONNECT */}
            {activeTab === 'connect' && (
              <form onSubmit={handleConnect} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700">
                      Google Sheet URL or Web App Link
                    </label>
                    <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Direct Sheet links supported!
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="url"
                      value={inputUrl}
                      onChange={(e) => {
                        setInputUrl(e.target.value);
                        setStatusMessage(null);
                      }}
                      placeholder="https://docs.google.com/spreadsheets/d/18sP8IDMZ... or https://script.google.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono text-slate-950 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all shadow-inner"
                    />
                  </div>

                  {/* Real-time Link Detection Indicator */}
                  {isSheetLink && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2.5 p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 text-xs flex items-start gap-2.5 shadow-xs"
                    >
                      <Globe2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-heading font-bold text-emerald-900 flex items-center gap-1.5">
                          <span>Direct Google Sheet Link Detected!</span>
                          <span className="px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-mono">Zero Code</span>
                        </div>
                        <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                          Just make sure your Sheet is shared as <strong>"Anyone with the link can view"</strong> (in Google Sheets, click Share &gt; General access &gt; Anyone with the link).
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {isScriptLink && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2.5 p-3 rounded-xl bg-teal-50/90 border border-teal-200 text-teal-950 text-xs flex items-start gap-2.5 shadow-xs"
                    >
                      <Zap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-heading font-bold text-teal-900">
                          Apps Script Web App Endpoint Detected
                        </div>
                        <p className="text-[11px] text-teal-800 mt-0.5 leading-relaxed">
                          Syncing through your deployed Google Apps Script webhook.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {!isSheetLink && !isScriptLink && trimmedUrl.length > 0 && (
                    <p className="text-[11px] text-amber-700 mt-1.5 leading-relaxed flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>Paste your standard Google Sheet URL copied directly from your browser bar.</span>
                    </p>
                  )}

                  {!trimmedUrl && (
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      Simply paste the link to your Google Sheet (e.g. <code>https://docs.google.com/spreadsheets/d/...</code>). Any changes made in your Sheet will update right on this dashboard.
                    </p>
                  )}
                </div>

                {/* Status Feedback Message */}
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs shadow-xs ${
                      statusMessage.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border-rose-200 text-rose-900'
                    }`}
                  >
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <span className="font-medium leading-relaxed">{statusMessage.text}</span>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-slate-500 hover:text-slate-800 font-mono font-medium underline py-2 cursor-pointer transition-colors"
                  >
                    Revert to Default Benchmark Data
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-heading font-bold cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-heading font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Connecting & Syncing...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-amber-300" />
                          <span>Save & Sync Sheet</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 2: ZERO-CODE SHARE GUIDE (10 SECONDS) */}
            {activeTab === 'quickshare' && (
              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-950 shadow-xs">
                  <p className="font-heading font-bold text-sm mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>How to connect any Google Sheet in 10 seconds:</span>
                  </p>
                  <p className="leading-relaxed text-slate-700">
                    No coding or deployment required! Markyt reads public shared Google Sheets directly.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong className="text-slate-950 font-heading">Open your Google Sheet & Click "Share":</strong>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        In the top-right corner of your Google Sheet, click the big blue <strong>Share</strong> button.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong className="text-slate-950 font-heading">Set General Access to "Anyone with the link":</strong>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Under <strong>General access</strong>, switch from <em>Restricted</em> to <strong>"Anyone with the link"</strong> with role <strong>"Viewer"</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong className="text-slate-950 font-heading">Copy & Paste Link:</strong>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Click <strong>Copy link</strong>, switch back to tab 1 (<strong>Connect Link</strong>), paste it into the box, and click <strong>Save & Sync Sheet</strong>!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-600 text-[11px]">
                  <strong className="text-slate-900 block mb-0.5 font-heading">Recommended Column Headers in Row 1:</strong>
                  <div className="font-mono text-[10px] bg-white p-2 rounded border border-slate-200 text-slate-800 break-words mt-1">
                    Day | Channel | Spend | Impressions | CPM | Clicks | CTR | CPC | Leads | Conv % | Cost per Lead | Strategic Note
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab('connect')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Go to Connect Link</span>
                    <LinkIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: APPS SCRIPT WEB APP (ADVANCED) */}
            {activeTab === 'appsscript' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-950">
                      Google Apps Script Web App (Alternative Method)
                    </h4>
                    <p className="text-xs text-slate-600">
                      Use this if you prefer a private JSON endpoint instead of a public shared Sheet link.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={copyScriptCode}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden bg-slate-950 text-emerald-300 p-4 font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto border border-slate-800">
                  <pre>{APPS_SCRIPT_TEMPLATE}</pre>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-heading font-bold text-slate-900">How to deploy in Apps Script:</p>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600">
                    <li>In your Google Sheet, go to <strong>Extensions &gt; Apps Script</strong>.</li>
                    <li>Paste the copied script and click the <strong>Save</strong> disk icon.</li>
                    <li>Click <strong>Deploy &gt; New deployment</strong> &gt; Select type <strong>Web app</strong>.</li>
                    <li>Set <strong>Who has access: Anyone</strong> and click <strong>Deploy</strong>.</li>
                    <li>Paste the resulting Web App URL in tab 1.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
