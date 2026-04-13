import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { useData } from '@/src/context/DataContext';
import { cn } from '@/src/lib/utils';
import { 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Plus,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

const statusColors: Record<string, string> = {
  'Draft': 'bg-slate-500/20 text-slate-400',
  'In Approval': 'bg-amber-500/20 text-amber-400',
  'Activated': 'bg-emerald-500/20 text-emerald-400',
  'Expired': 'bg-red-500/20 text-red-400',
};

const statusIcons: Record<string, React.ReactNode> = {
  'Draft': <Clock className="w-4 h-4" />,
  'In Approval': <AlertCircle className="w-4 h-4" />,
  'Activated': <CheckCircle2 className="w-4 h-4" />,
  'Expired': <AlertCircle className="w-4 h-4" />,
};

export default function ContractPipeline() {
  const { config } = useConfig();
  const { data, getAccountName } = useData();
  const [filter, setFilter] = useState('all');

  const contracts = Object.values(data.contracts);

  const filteredContracts = filter === 'all' 
    ? contracts 
    : contracts.filter(c => (c.status || '').toLowerCase() === filter.toLowerCase() || (filter === 'Active' && c.status === 'Activated'));

  const totalValue = contracts.reduce((sum, c) => sum + (c.totalContractValue || 0), 0);
  const activeContracts = contracts.filter(c => c.status === 'Activated').length;
  const expiringSoon = contracts.filter(c => c.endDate && new Date(c.endDate) < new Date('2026-07-01')).length;

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Contracts</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Contract lifecycle management and renewals.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Contract
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
            <FileText className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeContracts}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">In Approval</span>
          </div>
          <p className="text-2xl font-bold text-white">{contracts.filter(c => c.status === 'In Approval').length}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Expiring Soon</span>
          </div>
          <p className="text-2xl font-bold text-amber-400">{expiringSoon}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'Draft', 'In Approval', 'Activated', 'Expired'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status === 'Active' ? 'Activated' : status)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors",
              filter === (status === 'Active' ? 'Activated' : status)
                ? "bg-primary text-on-primary" 
                : "bg-surface-container-low text-slate-400 hover:text-white"
            )}
          >
            {status === 'all' ? 'All Contracts' : status}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Contract</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Account</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Value</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Start Date</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">End Date</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Renewal Date</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="font-semibold text-white">{contract.contractNumber}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white">{getAccountName(contract.accountId)}</td>
                  <td className="p-4 text-slate-400">{contract.contractType}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 w-fit", statusColors[contract.status])}>
                      {statusIcons[contract.status]}
                      {contract.status}
                    </span>
                  </td>
                  <td className="p-4 text-white">${(contract.totalContractValue || 0).toLocaleString()}</td>
                  <td className="p-4 text-slate-400">{contract.startDate || '-'}</td>
                  <td className="p-4 text-slate-400">{contract.endDate || '-'}</td>
                  <td className="p-4 text-amber-400">{contract.endDate ? new Date(new Date(contract.endDate).setMonth(new Date(contract.endDate).getMonth() - 1)).toISOString().split('T')[0] : '-'}</td>
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