import React, { useState, useRef } from 'react';
import { Upload, Download, FileSpreadsheet, X, Check, AlertCircle, Plus } from 'lucide-react';

interface BulkUploadProps {
  objectType: string;
  onUpload: (data: any[]) => Promise<void>;
  onExport: () => any[];
  fields: string[];
}

interface ImportResult {
  success: boolean;
  row: number;
  message: string;
}

export default function BulkUpload({ objectType, onUpload, onExport, fields }: BulkUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setResults([]);
    
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        data.push(row);
      }
      
      setPreviewData(data.slice(0, 10));
      setImporting(true);
    } catch (error) {
      setResults([{ success: false, row: 0, message: 'Failed to parse file' }]);
    }
    
    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImport = async () => {
    setUploading(true);
    const newResults: ImportResult[] = [];
    
    try {
      for (let i = 0; i < previewData.length; i++) {
        try {
          await onUpload([previewData[i]]);
          newResults.push({ success: true, row: i + 1, message: 'Imported successfully' });
        } catch (error) {
          newResults.push({ success: false, row: i + 1, message: 'Failed to import' });
        }
      }
    } catch (error) {
      newResults.push({ success: false, row: 0, message: 'Import failed' });
    }
    
    setResults(newResults);
    setImporting(false);
    setUploading(false);
  };

  const handleExport = () => {
    const data = onExport();
    if (data.length === 0) {
      setResults([{ success: false, row: 0, message: 'No data to export' }]);
      return;
    }

    const headers = fields.join(',');
    const rows = data.map((item: any) => 
      fields.map(field => {
        const value = item[field] || '';
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    );
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${objectType}-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    setResults([{ success: true, row: 0, message: `Exported ${data.length} records` }]);
  };

  const handleTemplateDownload = () => {
    const headers = fields.join(',');
    const csv = headers;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${objectType}-template.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) {
    return (
      <div className="flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 bg-primary/10 text-primary text-xs font-bold rounded-l-lg flex items-center gap-2 hover:bg-primary/20 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Import
        </button>
        <button
          onClick={handleExport}
          className="px-3 py-2 bg-surface-container-high text-slate-300 text-xs font-bold rounded-none flex items-center gap-2 hover:bg-surface-container-high/80 transition-colors -ml-[1px]"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 bg-primary text-on-primary text-xs font-bold rounded-r-lg flex items-center gap-2 hover:bg-primary/90 transition-colors -ml-[1px]"
        >
          <Plus className="w-4 h-4" />
          New
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-2xl max-h-[80vh] bg-surface-container rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-white">Bulk {objectType} - Import/Export</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-container-low rounded-xl border border-white/5">
              <h4 className="text-sm font-medium text-white mb-3">Import from CSV</h4>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xls,.xlsx"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Processing...' : 'Select File'}
              </button>
              <button
                onClick={handleTemplateDownload}
                className="w-full mt-2 py-2 text-xs text-slate-400 hover:text-slate-300"
              >
                Download Template
              </button>
            </div>

            <div className="p-4 bg-surface-container-low rounded-xl border border-white/5">
              <h4 className="text-sm font-medium text-white mb-3">Export to CSV</h4>
              <button
                onClick={handleExport}
                className="w-full py-3 bg-tertiary/10 hover:bg-tertiary/20 text-tertiary rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
          </div>

          {importing && previewData.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">Preview ({previewData.length} rows)</h4>
              <div className="overflow-x-auto border border-white/10 rounded-lg">
                <table className="w-full text-xs">
                  <thead className="bg-surface-container-high">
                    <tr>
                      {Object.keys(previewData[0] || {}).map(key => (
                        <th key={key} className="px-3 py-2 text-left text-slate-400 font-medium">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, idx) => (
                      <tr key={idx} className="border-t border-white/5">
                        {Object.values(row).map((val: any, i) => (
                          <td key={i} className="px-3 py-2 text-slate-300">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleImport}
                disabled={uploading}
                className="w-full py-3 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {uploading ? 'Importing...' : `Import ${previewData.length} Records`}
              </button>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white">Results</h4>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                      result.success
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {result.success ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {result.row > 0 ? `Row ${result.row}: ` : ''}{result.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
