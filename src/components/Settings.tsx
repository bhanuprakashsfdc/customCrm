import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Building2, 
  Sparkles, 
  Globe,
  Download,
  Upload,
  RotateCcw,
  X,
  Check
} from 'lucide-react';
import { useConfig, ThemeColors } from '@/src/context/ConfigContext';
import { cn } from '@/src/lib/utils';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabId = 'colors' | 'branding' | 'content' | 'features' | 'import';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'colors', label: 'Colors', icon: <Palette className="w-4 h-4" /> },
  { id: 'branding', label: 'Branding', icon: <Building2 className="w-4 h-4" /> },
  { id: 'content', label: 'Content', icon: <Type className="w-4 h-4" /> },
  { id: 'features', label: 'Features', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'import', label: 'Import/Export', icon: <Globe className="w-4 h-4" /> },
];

const colorFields: { key: keyof ThemeColors; label: string }[] = [
  { key: 'primary', label: 'Primary' },
  { key: 'primaryContainer', label: 'Primary Container' },
  { key: 'onPrimary', label: 'On Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'tertiary', label: 'Tertiary' },
  { key: 'surface', label: 'Surface' },
  { key: 'surfaceContainer', label: 'Surface Container' },
  { key: 'surfaceContainerLow', label: 'Surface Low' },
  { key: 'surfaceContainerHigh', label: 'Surface High' },
  { key: 'background', label: 'Background' },
  { key: 'onBackground', label: 'On Background' },
  { key: 'onSurface', label: 'On Surface' },
  { key: 'onSurfaceVariant', label: 'On Surface Variant' },
  { key: 'error', label: 'Error' },
  { key: 'outline', label: 'Outline' },
];

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const { config, updateThemeColor, updateBranding, updateContent, updateFeatures, resetConfig, exportConfig, importConfig } = useConfig();
  const [activeTab, setActiveTab] = useState<TabId>('colors');
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [showImportSuccess, setShowImportSuccess] = useState(false);

  const handleExport = () => {
    const json = exportConfig();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.branding.companyName.replace(/\s+/g, '-').toLowerCase()}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (importConfig(importText)) {
      setImportError('');
      setShowImportSuccess(true);
      setImportText('');
      setTimeout(() => setShowImportSuccess(false), 2000);
    } else {
      setImportError('Invalid JSON configuration');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md h-full bg-surface-container border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold font-headline text-white">Customize Theme</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
                activeTab === tab.id 
                  ? "text-primary bg-primary/10" 
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">Customize your theme colors. Changes apply instantly.</p>
              <div className="grid grid-cols-2 gap-3">
                {colorFields.map((field) => (
                  <div key={field.key as string} className="space-y-2">
                    <label className="text-xs text-slate-400 font-medium">{field.label}</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.theme.colors[field.key]}
                        onChange={(e) => updateThemeColor(field.key, e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                      <input
                        type="text"
                        value={config.theme.colors[field.key]}
                        onChange={(e) => updateThemeColor(field.key, e.target.value)}
                        className="flex-1 bg-surface-container-lowest border border-white/10 rounded-lg px-2 py-1 text-xs text-slate-300 font-mono focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Company Name</label>
                <input
                  type="text"
                  value={config.branding.companyName}
                  onChange={(e) => updateBranding({ companyName: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Tagline</label>
                <input
                  type="text"
                  value={config.branding.tagline}
                  onChange={(e) => updateBranding({ tagline: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Primary Button Text</label>
                <input
                  type="text"
                  value={config.branding.primaryButtonText}
                  onChange={(e) => updateBranding({ primaryButtonText: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Footer Text</label>
                <input
                  type="text"
                  value={config.branding.footerText}
                  onChange={(e) => updateBranding({ footerText: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-400 font-medium">Show "Powered By"</label>
                <button
                  onClick={() => updateBranding({ showPoweredBy: !config.branding.showPoweredBy })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    config.branding.showPoweredBy ? "bg-primary" : "bg-surface-container-high"
                  )}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full transition-transform",
                    config.branding.showPoweredBy ? "left-7 bg-white" : "left-1 bg-slate-400"
                  )} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Dashboard Title</label>
                <input
                  type="text"
                  value={config.content.dashboard.title}
                  onChange={(e) => updateContent({ dashboard: { ...config.content.dashboard, title: e.target.value } })}
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Dashboard Subtitle</label>
                <input
                  type="text"
                  value={config.content.dashboard.subtitle}
                  onChange={(e) => updateContent({ dashboard: { ...config.content.dashboard, subtitle: e.target.value } })}
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Leads Pipeline Title</label>
                <input
                  type="text"
                  value={config.content.pipeline.leadsTitle}
                  onChange={(e) => updateContent({ pipeline: { ...config.content.pipeline, leadsTitle: e.target.value } })}
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 font-medium">Deals Pipeline Title</label>
                <input
                  type="text"
                  value={config.content.pipeline.dealsTitle}
                  onChange={(e) => updateContent({ pipeline: { ...config.content.pipeline, dealsTitle: e.target.value } })}
                  className="w-full bg-surface-container-lowest border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-primary/50 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-medium">AI Features</p>
                  <p className="text-xs text-slate-400">Enable AI-powered insights</p>
                </div>
                <button
                  onClick={() => updateFeatures({ aiEnabled: !config.features.aiEnabled })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    config.features.aiEnabled ? "bg-primary" : "bg-surface-container-high"
                  )}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full transition-transform",
                    config.features.aiEnabled ? "left-7 bg-white" : "left-1 bg-slate-400"
                  )} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-medium">Intelligence Panel</p>
                  <p className="text-xs text-slate-400">Show AI insights panel</p>
                </div>
                <button
                  onClick={() => updateFeatures({ showIntelligencePanel: !config.features.showIntelligencePanel })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    config.features.showIntelligencePanel ? "bg-primary" : "bg-surface-container-high"
                  )}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full transition-transform",
                    config.features.showIntelligencePanel ? "left-7 bg-white" : "left-1 bg-slate-400"
                  )} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-medium">Kanban View</p>
                  <p className="text-xs text-slate-400">Enable Kanban board view</p>
                </div>
                <button
                  onClick={() => updateFeatures({ enableKanbanView: !config.features.enableKanbanView })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    config.features.enableKanbanView ? "bg-primary" : "bg-surface-container-high"
                  )}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full transition-transform",
                    config.features.enableKanbanView ? "left-7 bg-white" : "left-1 bg-slate-400"
                  )} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white font-medium">Table View</p>
                  <p className="text-xs text-slate-400">Enable table view for pipelines</p>
                </div>
                <button
                  onClick={() => updateFeatures({ enableTableView: !config.features.enableTableView })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    config.features.enableTableView ? "bg-primary" : "bg-surface-container-high"
                  )}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 rounded-full transition-transform",
                    config.features.enableTableView ? "left-7 bg-white" : "left-1 bg-slate-400"
                  )} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="p-4 bg-surface-container-low rounded-xl border border-white/5">
                <p className="text-sm text-slate-400 mb-3">Export your configuration</p>
                <button
                  onClick={handleExport}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Config
                </button>
              </div>

              <div className="p-4 bg-surface-container-low rounded-xl border border-white/5">
                <p className="text-sm text-slate-400 mb-3">Import configuration</p>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste JSON configuration here..."
                  className="w-full h-32 bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono resize-none focus:border-primary/50 focus:outline-none"
                />
                {importError && (
                  <p className="text-xs text-red-400 mt-2">{importError}</p>
                )}
                {showImportSuccess && (
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Configuration imported!
                  </p>
                )}
                <button
                  onClick={handleImport}
                  disabled={!importText.trim()}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-2 bg-tertiary/10 hover:bg-tertiary/20 text-tertiary rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  Import Config
                </button>
              </div>

              <button
                onClick={resetConfig}
                className="w-full flex items-center justify-center gap-2 py-2 text-red-400 hover:text-red-300 text-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}