import React, { useState } from 'react';
import { formatCurrency } from '@/src/lib/currency';
import { useConfig } from '@/src/context/ConfigContext';
import { useData } from '@/src/context/DataContext';
import { cn } from '@/src/lib/utils';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Users,
  Calendar,
  Plus,
  MoreHorizontal,
  Globe,
  Phone,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import RecordModal from './RecordModal';
import BulkUpload from './BulkUpload';

const typeColors: Record<string, string> = {
  'Prospect': 'bg-amber-500/20 text-amber-400',
  'Customer': 'bg-emerald-500/20 text-emerald-400',
  'Partner': 'bg-blue-500/20 text-blue-400',
  'Competitor': 'bg-red-500/20 text-red-400',
  'Other': 'bg-slate-500/20 text-slate-400',
};

const ratingColors: Record<string, string> = {
  'Acquired': 'bg-red-500/20 text-red-400',
  'Active': 'bg-emerald-500/20 text-emerald-400',
  'Market': 'bg-amber-500/20 text-amber-400',
  'Inactive': 'bg-slate-500/20 text-slate-400',
};

export default function AccountPipeline() {
  const { config } = useConfig();
  const { accounts, saveRecord } = useData();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredAccounts = filter === 'all' 
    ? accounts 
    : accounts.filter(a => a.type === filter);

  const totalRevenue = accounts.reduce((sum, a) => sum + (a.annualRevenue || 0), 0);
  const totalEmployees = accounts.reduce((sum, a) => sum + (a.numberOfEmployees || 0), 0);
  const customers = accounts.filter(a => a.type === 'Customer').length;
  const prospects = accounts.filter(a => a.type === 'Prospect').length;

  const handleSave = (data: any) => {
    const record = {
      name: data.name,
      type: data.type,
      industry: data.industry,
      website: data.website,
      phone: data.phone,
      rating: data.rating,
      ownerId: 'user_001',
    };
    saveRecord('accounts', record);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <RecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        objectType="account"
        onSave={handleSave}
      />
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Accounts</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Customer and prospect account management.</p>
        </div>
        <BulkUpload
          objectType="Account"
          onUpload={async (data) => {
            for (const item of data) {
              await saveRecord('accounts', { ...item, ownerId: 'user_001' });
            }
          }}
          onExport={() => accounts}
          fields={['name', 'type', 'industry', 'website', 'phone', 'rating', 'billingAddress', 'shippingAddress']}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Annual Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalRevenue, config.localization.currency)}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Employees</span>
          </div>
          <p className="text-2xl font-bold text-white">{(totalEmployees / 1000).toFixed(1)}K</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Customers</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{customers}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Prospects</span>
          </div>
          <p className="text-2xl font-bold text-amber-400">{prospects}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'Prospect', 'Customer', 'Partner', 'Competitor'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors",
              filter === type
                ? "bg-primary text-on-primary" 
                : "bg-surface-container-low text-slate-400 hover:text-white"
            )}
          >
            {type === 'all' ? 'All Accounts' : type}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Account Name</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Industry</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Rating</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Employees</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Location</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{account.name}</span>
                        <span className="text-xs text-slate-500">{account.website}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", typeColors[account.type])}>
                      {account.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{account.industry}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", ratingColors[account.rating] || ratingColors['Inactive'])}>
                      {account.rating || 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-white">{formatCurrency(account.annualRevenue || 0, config.localization.currency)}</td>
                  <td className="p-4 text-white">{(account.numberOfEmployees || 0).toLocaleString()}</td>
                  <td className="p-4 text-slate-400">
                    {account.billingCity}, {account.billingState} {account.billingCountry}
                  </td>
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