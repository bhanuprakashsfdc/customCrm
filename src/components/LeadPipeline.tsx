import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { cn } from '@/src/lib/utils';
import { 
  UserPlus, 
  TrendingUp, 
  DollarSign, 
  Users,
  Calendar,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';
import RecordModal from './RecordModal';

const leadData = [
  { id: '1', firstName: 'John', lastName: 'Smith', company: 'Acme Corporation', title: 'CEO', email: 'john@acme.com', phone: '+1 555-0100', status: 'Qualified', rating: 'Hot', source: 'LinkedIn', annualRevenue: 50000000, createdDate: '2026-03-15' },
  { id: '2', firstName: 'Sarah', lastName: 'Johnson', company: 'TechStart Inc', title: 'CTO', email: 'sarah@techstart.io', phone: '+1 555-0200', status: 'Open', rating: 'Warm', source: 'Web', annualRevenue: 5000000, createdDate: '2026-04-01' },
  { id: '3', firstName: 'Mike', lastName: 'Wilson', company: 'Global Systems Ltd', title: 'VP Sales', email: 'mike@globalsystems.com', phone: '+44 20 7946 0958', status: 'Contacted', rating: 'Hot', source: 'Referral', annualRevenue: 25000000, createdDate: '2026-03-20' },
  { id: '4', firstName: 'Lisa', lastName: 'Chen', company: 'InnovateTech', title: 'Director', email: 'lisa@innovatetech.com', phone: '+1 555-0300', status: 'New', rating: 'Cold', source: 'Email', annualRevenue: 10000000, createdDate: '2026-04-10' },
  { id: '5', firstName: 'David', lastName: 'Lee', company: 'DataFlow Analytics', title: 'CFO', email: 'david@dataflow.io', phone: '+1 555-0400', status: 'Qualified', rating: 'Warm', source: 'LinkedIn', annualRevenue: 15000000, createdDate: '2026-03-25' },
  { id: '6', firstName: 'Emma', lastName: 'Davis', company: 'CloudNine Systems', title: 'CEO', email: 'emma@cloudnine.cloud', phone: '+1 555-0500', status: 'Open', rating: 'Hot', source: 'Trade Show', annualRevenue: 75000000, createdDate: '2026-04-05' },
  { id: '7', firstName: 'Tom', lastName: 'Brown', company: 'Alpha Industries', title: 'VP Operations', email: 'tom@alphaind.com', phone: '+1 555-0600', status: 'Unqualified', rating: 'Cold', source: 'Web', annualRevenue: 100000000, createdDate: '2026-02-28' },
  { id: '8', firstName: 'Anna', lastName: 'Martinez', company: 'Beta Ventures', title: 'Partner', email: 'anna@betaventures.vc', phone: '+1 555-0700', status: 'New', rating: 'Warm', source: 'Referral', annualRevenue: 20000000, createdDate: '2026-04-12' },
];

const statusColors: Record<string, string> = {
  'New': 'bg-blue-500/20 text-blue-400',
  'Open': 'bg-amber-500/20 text-amber-400',
  'Contacted': 'bg-purple-500/20 text-purple-400',
  'Qualified': 'bg-emerald-500/20 text-emerald-400',
  'Unqualified': 'bg-slate-500/20 text-slate-400',
};

const ratingColors: Record<string, string> = {
  'Hot': 'bg-red-500/20 text-red-400',
  'Warm': 'bg-amber-500/20 text-amber-400',
  'Cold': 'bg-blue-500/20 text-blue-400',
};

const sourceColors: Record<string, string> = {
  'LinkedIn': 'bg-blue-500/20 text-blue-400',
  'Web': 'bg-emerald-500/20 text-emerald-400',
  'Referral': 'bg-purple-500/20 text-purple-400',
  'Email': 'bg-amber-500/20 text-amber-400',
  'Trade Show': 'bg-indigo-500/20 text-indigo-400',
};

export default function LeadPipeline() {
  const { config } = useConfig();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredLeads = filter === 'all' 
    ? leadData 
    : leadData.filter(l => l.status === filter);

  const totalRevenue = leadData.reduce((sum, l) => sum + l.annualRevenue, 0);
  const qualifiedLeads = leadData.filter(l => l.status === 'Qualified').length;
  const hotLeads = leadData.filter(l => l.rating === 'Hot').length;
  const newLeads = leadData.filter(l => l.status === 'New').length;

  const handleSave = (data: any) => {
    console.log('New Lead:', data);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <RecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        objectType="lead"
        onSave={handleSave}
      />
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Leads</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Lead management and conversion tracking.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Lead
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Pipeline Value</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalRevenue / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <UserPlus className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Leads</span>
          </div>
          <p className="text-2xl font-bold text-white">{leadData.length}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Qualified</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{qualifiedLeads}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Hot Leads</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{hotLeads}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'New', 'Open', 'Contacted', 'Qualified', 'Unqualified'].map((status) => (
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
            {status === 'all' ? 'All Leads' : status}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Lead Name</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Company</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Title</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Rating</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Source</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Created</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <UserPlus className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{lead.firstName} {lead.lastName}</span>
                        <span className="text-xs text-slate-500">{lead.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white">{lead.company}</td>
                  <td className="p-4 text-slate-400">{lead.title}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", statusColors[lead.status])}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", ratingColors[lead.rating])}>
                      {lead.rating}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", sourceColors[lead.source])}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="p-4 text-white">${(lead.annualRevenue / 1000000).toFixed(1)}M</td>
                  <td className="p-4 text-slate-400">{lead.createdDate}</td>
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