import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ChevronLeft, 
  ChevronRight,
  ChevronUp,
  ChevronDown,
  X,
  Edit2,
  Check,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onSave?: (id: string, data: any) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  searchFields?: string[];
  filterOptions?: { key: string; label: string; options: string[] }[];
  pageSize?: number;
}

export default function DataTable({ 
  data, 
  columns, 
  onSave,
  searchFields = [],
  filterOptions = [],
  pageSize = 10
}: DataTableProps) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [page, setPage] = useState(1);
  const [editingCell, setEditingCell] = useState<{ id: string; key: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  const filteredData = useMemo(() => {
    let result = [...data];
    
    if (search && searchFields.length > 0) {
      const lower = search.toLowerCase();
      result = result.filter(row => 
        searchFields.some(field => 
          String(row[field] || '').toLowerCase().includes(lower)
        )
      );
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        result = result.filter(row => {
          const val = row[key];
          return val === value || (val && String(val).toLowerCase() === value.toLowerCase());
        });
      }
    });

    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey] ?? '';
        const bVal = b[sortKey] ?? '';
        const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [data, search, searchFields, filters, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleEdit = (id: string, key: string, value: any) => {
    setEditingCell({ id, key });
    setEditValue(String(value ?? ''));
  };

  const handleSaveEdit = async (row: any) => {
    if (!onSave) return;
    setSaving(true);
    try {
      await onSave(row.id, { ...row, [editingCell!.key]: editValue });
      setEditingCell(null);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const clearFilters = () => {
    setFilters({});
    setSearch('');
    setPage(1);
  };

  const hasFilters = search || Object.values(filters).some(v => v && v !== 'all');

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50"
          />
        </div>

        {filterOptions.map(opt => (
          <select
            key={opt.key}
            value={filters[opt.key] || 'all'}
            onChange={(e) => handleFilterChange(opt.key, e.target.value)}
            className="px-3 py-2 bg-surface-container-lowest border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-primary/50"
          >
            <option value="all">{opt.label}</option>
            {opt.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ))}

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="p-2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              "p-2",
              viewMode === 'table' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            )}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2",
              viewMode === 'grid' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full">
            <thead className="bg-surface-container-high">
              <tr>
                {columns.map(col => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider",
                      col.sortable && "cursor-pointer hover:text-white"
                    )}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && sortKey === col.key && (
                        sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-400">
                    No records found
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-white/5">
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3 text-sm text-slate-300">
                        {editingCell?.id === row.id && editingCell?.key === col.key ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="px-2 py-1 bg-surface-container-lowest border border-white/10 rounded text-white text-sm"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveEdit(row)}
                              disabled={saving}
                              className="p-1 text-emerald-400 hover:text-emerald-300"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingCell(null)}
                              className="p-1 text-slate-400 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : col.render ? (
                          col.render(row[col.key], row)
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>{row[col.key] ?? '-'}</span>
                            {col.editable && onSave && (
                              <button
                                onClick={() => handleEdit(row.id, col.key, row[col.key])}
                                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-primary"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedData.map((row, idx) => (
            <div key={row.id || idx} className="bg-surface-container-low p-4 rounded-xl border border-white/5 hover:border-white/10">
              {columns.slice(0, 4).map(col => (
                <div key={col.key} className="mb-2">
                  <p className="text-xs text-slate-500">{col.label}</p>
                  <p className="text-sm text-white truncate">
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '-')}
                  </p>
                </div>
              ))}
            </div>
          ))}
          {paginatedData.length === 0 && (
            <div className="col-span-full py-8 text-center text-slate-400">
              No records found
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredData.length)} of {filteredData.length} records
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-sm font-medium",
                    page === pageNum ? "bg-primary text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
