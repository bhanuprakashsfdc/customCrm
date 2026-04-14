import React, { useState } from 'react';
import { formatCurrency } from '@/src/lib/currency';
import { useConfig } from '@/src/context/ConfigContext';
import { useData } from '@/src/context/DataContext';
import { cn } from '@/src/lib/utils';
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  Tag,
  Calendar,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Archive
} from 'lucide-react';

const familyColors: Record<string, string> = {
  'Software': 'bg-indigo-500/20 text-indigo-400',
  'Add-On': 'bg-amber-500/20 text-amber-400',
  'Service': 'bg-emerald-500/20 text-emerald-400',
};

export default function ProductCatalog() {
  const { config } = useConfig();
  const { data } = useData();
  const [filter, setFilter] = useState('all');

  const products = Object.values(data.products);

  const filteredProducts = filter === 'all' 
    ? products 
    : filter === 'active' 
      ? products.filter(p => p.isActive)
      : products.filter(p => !p.isActive);

  const activeProducts = products.filter(p => p.isActive).length;
  const totalValue = products.reduce((sum, p) => sum + (p.isActive ? p.unitPrice : 0), 0);
  const families = [...new Set(products.map(p => p.family).filter(Boolean))];

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Products</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Product catalog and price management.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Product
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Package className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Products</span>
          </div>
          <p className="text-2xl font-bold text-white">{products.length}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeProducts}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Tag className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Families</span>
          </div>
          <p className="text-2xl font-bold text-white">{families.length}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Avg Price</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalValue / activeProducts, config.localization.currency)}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'active', 'inactive'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors",
              filter === status
                ? "bg-primary text-on-primary" 
                : "bg-surface-container-low text-slate-400 hover:text-white"
            )}
          >
            {status === 'all' ? 'All Products' : status === 'active' ? 'Active' : 'Archived'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-surface-container-low p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-indigo-400" />
              </div>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-bold text-white mb-1">{product.name}</h3>
            <p className="text-xs text-slate-500 mb-3">{product.productCode}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("px-2 py-1 text-xs font-bold rounded-full", familyColors[product.family])}>
                {product.family}
              </span>
              {product.isActive ? (
                <span className="px-2 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Active
                </span>
              ) : (
                <span className="px-2 py-1 text-xs font-bold rounded-full bg-slate-500/20 text-slate-400 flex items-center gap-1">
                  <Archive className="w-3 h-3" />
                  Archived
                </span>
              )}
            </div>
            <p className="text-lg font-bold text-white">{formatCurrency(product.unitPrice, config.localization.currency)}</p>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}