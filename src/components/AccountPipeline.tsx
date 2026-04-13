import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
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

const accountData = [
  { id: '1', name: 'Acme Corporation', type: 'Customer', industry: 'Technology', website: 'acme.com', phone: '+1 555-0100', annualRevenue: 50000000, numberOfEmployees: 500, city: 'San Francisco', state: 'CA', country: 'USA', rating: 'Hot' },
  { id: '2', name: 'TechStart Inc', type: 'Prospect', industry: 'Software', website: 'techstart.io', phone: '+1 555-0200', annualRevenue: 5000000, numberOfEmployees: 50, city: 'Austin', state: 'TX', country: 'USA', rating: 'Warm' },
  { id: '3', name: 'Global Systems Ltd', type: 'Customer', industry: 'Consulting', website: 'globalsystems.com', phone: '+44 20 7946 0958', annualRevenue: 25000000, numberOfEmployees: 250, city: 'London', state: '', country: 'UK', rating: 'Active' },
  { id: '4', name: 'InnovateTech', type: 'Prospect', industry: 'Fintech', website: 'innovatetech.com', phone: '+1 555-0300', annualRevenue: 10000000, numberOfEmployees: 100, city: 'New York', state: 'NY', country: 'USA', rating: 'Hot' },
  { id: '5', name: 'DataFlow Analytics', type: 'Customer', industry: 'Data Services', website: 'dataflow.io', phone: '+1 555-0400', annualRevenue: 15000000, numberOfEmployees: 150, city: 'Seattle', state: 'WA', country: 'USA', rating: 'Active' },
  { id: '6', name: 'CloudNine Systems', type: 'Partner', industry: 'Cloud Computing', website: 'cloudnine.cloud', phone: '+1 555-0500', annualRevenue: 75000000, numberOfEmployees: 750, city: 'Boston', state: 'MA', country: 'USA', rating: 'Hot' },
  { id: '7', name: 'Alpha Industries', type: 'Prospect', industry: 'Manufacturing', website: 'alphaind.com', phone: '+1 555-0600', annualRevenue: 100000000, numberOfEmployees: 1000, city: 'Chicago', state: 'IL', country: 'USA', rating: 'Warm' },
  { id: '8', name: 'Beta Ventures', type: 'Competitor', industry: 'Venture Capital', website: 'betaventures.vc', phone: '+1 555-0700', annualRevenue: 20000000, numberOfEmployees: 75, city: 'Palo Alto', state: 'CA', country: 'USA', rating: 'Active' },
];

const typeColors: Record<string, string> = {
  'Prospect': 'bg-amber-500/20 text-amber-400',
  'Customer': 'bg-emerald-500/20 text-emerald-400',
  'Partner': 'bg-blue-500/20 text-blue-400',
  'Competitor': 'bg-red-500/20 text-red-400',
  'Other': 'bg-slate-500/20 text-slate-400',
};

const ratingColors: Record<string, string> = {
  'Hot': 'bg-red-500/20 text-red-400',
  'Warm': 'bg-amber-500/20 text-amber-400',
  'Cold': 'bg-blue-500/20 text-blue-400',
  'Active': 'bg-emerald-500/20 text-emerald-400',
  'Inactive': 'bg-slate-500/20 text-slate-400',
};

export default function AccountPipeline() {
  const { config } = useConfig();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredAccounts = filter === 'all' 
    ? accountData 
    : accountData.filter(a => a.type === filter);

  const totalRevenue = accountData.reduce((sum, a) => sum + a.annualRevenue, 0);
  const totalEmployees = accountData.reduce((sum, a) => sum + a.numberOfEmployees, 0);
  const customers = accountData.filter(a => a.type === 'Customer').length;
  const prospects = accountData.filter(a => a.type === 'Prospect').length;

  const handleSave = (data: any) => {
    console.log('New Account:', data);
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
        <button 
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Account
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Annual Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalRevenue / 1000000).toFixed(1)}M</p>
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
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", ratingColors[account.rating] || ratingColors['Cold'])}>
                      {account.rating}
                    </span>
                  </td>
                  <td className="p-4 text-white">${(account.annualRevenue / 1000000).toFixed(1)}M</td>
                  <td className="p-4 text-white">{account.numberOfEmployees.toLocaleString()}</td>
                  <td className="p-4 text-slate-400">
                    {account.city}, {account.state} {account.country}
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