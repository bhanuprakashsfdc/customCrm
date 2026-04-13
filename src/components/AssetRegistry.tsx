import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { cn } from '@/src/lib/utils';
import { 
  Boxes, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Archive
} from 'lucide-react';

const assetData = [
  { id: '1', name: 'Enterprise Server License', accountName: 'Acme Corporation', productName: 'Enterprise Suite', serialNumber: 'ENT-2026-001', status: 'Installed', purchaseDate: '2026-01-15', installDate: '2026-01-20', quantity: 50, price: 125000 },
  { id: '2', name: 'Professional Licenses', accountName: 'TechStart Inc', productName: 'Professional Suite', serialNumber: 'PRO-2026-042', status: 'Registered', purchaseDate: '2026-03-01', installDate: '2026-03-05', quantity: 25, price: 30000 },
  { id: '3', name: 'API Module', accountName: 'Global Systems Ltd', productName: 'API Integration Module', serialNumber: 'API-2025-156', status: 'Installed', purchaseDate: '2025-11-10', installDate: '2025-11-15', quantity: 1, price: 799 },
  { id: '4', name: 'Analytics Add-On', accountName: 'InnovateTech', productName: 'Analytics Premium', serialNumber: 'ANA-2026-008', status: 'Obsolete', purchaseDate: '2025-06-20', installDate: '2025-06-25', quantity: 1, price: 599 },
  { id: '5', name: 'Gold Support Contract', accountName: 'DataFlow Analytics', productName: 'Support - Gold', serialNumber: 'SUP-GOLD-2026', status: 'Installed', purchaseDate: '2026-02-01', installDate: '2026-02-01', quantity: 1, price: 1500 },
  { id: '6', name: 'Starter Licenses', accountName: 'Acme Corporation', productName: 'Starter Suite', serialNumber: 'STA-2026-089', status: 'Sold', purchaseDate: '2026-04-01', installDate: null, quantity: 10, price: 4990 },
];

const statusColors: Record<string, string> = {
  'Sold': 'bg-blue-500/20 text-blue-400',
  'Installed': 'bg-emerald-500/20 text-emerald-400',
  'Registered': 'bg-amber-500/20 text-amber-400',
  'Obsolete': 'bg-slate-500/20 text-slate-400',
  'Damaged': 'bg-red-500/20 text-red-400',
};

const statusIcons: Record<string, React.ReactNode> = {
  'Sold': <Boxes className="w-4 h-4" />,
  'Installed': <CheckCircle2 className="w-4 h-4" />,
  'Registered': <CheckCircle2 className="w-4 h-4" />,
  'Obsolete': <Archive className="w-4 h-4" />,
  'Damaged': <AlertTriangle className="w-4 h-4" />,
};

export default function AssetRegistry() {
  const { config } = useConfig();
  const [filter, setFilter] = useState('all');

  const filteredAssets = filter === 'all' 
    ? assetData 
    : assetData.filter(a => a.status === filter);

  const totalValue = assetData.reduce((sum, a) => sum + (a.price * a.quantity), 0);
  const installedAssets = assetData.filter(a => a.status === 'Installed').length;
  const activeAssets = assetData.filter(a => a.status === 'Installed' || a.status === 'Registered').length;

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Assets</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Asset tracking and lifecycle management.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Asset
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalValue / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Boxes className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Assets</span>
          </div>
          <p className="text-2xl font-bold text-white">{assetData.length}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeAssets}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Wrench className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Installed</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{installedAssets}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'Sold', 'Installed', 'Registered', 'Obsolete'].map((status) => (
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
            {status === 'all' ? 'All Assets' : status}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Asset</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Product</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Account</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Serial #</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Qty</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Value</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Purchase Date</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <Boxes className="w-4 h-4 text-amber-400" />
                      </div>
                      <span className="font-semibold text-white">{asset.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400">{asset.productName}</td>
                  <td className="p-4 text-white">{asset.accountName}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 w-fit", statusColors[asset.status])}>
                      {statusIcons[asset.status]}
                      {asset.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 font-mono text-sm">{asset.serialNumber}</td>
                  <td className="p-4 text-white">{asset.quantity}</td>
                  <td className="p-4 text-white font-bold">${(asset.price * asset.quantity).toLocaleString()}</td>
                  <td className="p-4 text-slate-400">{asset.purchaseDate}</td>
                  <td className="p-4">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}