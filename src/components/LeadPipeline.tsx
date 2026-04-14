import React, { useState } from 'react';
import { formatCurrency } from '@/src/lib/currency';
import { useConfig } from '@/src/context/ConfigContext';
import { useData } from '@/src/context/DataContext';
import { cn } from '@/src/lib/utils';
import { 
  UserPlus, 
  TrendingUp, 
  DollarSign, 
  Users,
  Calendar,
  MoreHorizontal,
  CheckCircle2,
  Plus
} from 'lucide-react';
import RecordModal from './RecordModal';
import BulkUpload from './BulkUpload';

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
  'Phone': 'bg-cyan-500/20 text-cyan-400',
  'Other': 'bg-slate-500/20 text-slate-400',
};

export default function LeadPipeline() {
  const { config } = useConfig();
  const { leads, saveRecord } = useData();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(l => l.status === filter);

  const totalRevenue = leads.reduce((sum, l) => sum + (l.annualRevenue || 0), 0);
  const qualifiedLeads = leads.filter(l => l.status === 'Qualified').length;
  const hotLeads = leads.filter(l => l.rating === 'Hot').length;
  const newLeads = leads.filter(l => l.status === 'New').length;

  const handleSave = async (data: any) => {
    const record = {
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      title: data.title,
      email: data.email,
      phone: data.phone,
      status: data.status,
      rating: data.rating,
      source: data.source,
      ownerId: 'user_001',
    };
    await saveRecord('leads', record);
    setModalOpen(false);
  };

  return (
    <div className='p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar'>
      <RecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        objectType='lead'
        onSave={handleSave}
      />
      <div className='flex flex-col sm:flex-row justify-between items-end gap-4'>
        <div>
          <h2 className='text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white'>Leads</h2>
          <p className='text-on-surface-variant mt-1 text-sm'>Lead management and conversion tracking.</p>
        </div>
        <div className='flex flex-col sm:flex-row items-end gap-2'>
          <button 
            onClick={() => setModalOpen(true)}
            className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold rounded-full text-sm shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-transform'
          >
            <Plus className='w-4 h-4' />
            Add Lead
          </button>
<BulkUpload
            objectType='Lead'
            onUpload={async (data) => {
              for (const item of data) {
                await saveRecord('leads', { ...item, ownerId: 'user_001' });
              }
            }}
            onExport={() => leads}
            fields={['firstName', 'lastName', 'company', 'title', 'email', 'phone', 'status', 'rating', 'source']}
          />
        </div>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-surface-container-low p-4 rounded-2xl border border-white/5'>
          <div className='flex items-center gap-2 text-slate-500 mb-2'>
            <DollarSign className='w-4 h-4' />
            <span className='text-xs font-bold uppercase tracking-widest'>Pipeline Value</span>
          </div>
          <p className='text-2xl font-bold text-white'>{formatCurrency(totalRevenue, config.localization.currency, config.localization.showAllCurrencies)}</p>
        </div>
        <div className='bg-surface-container-low p-4 rounded-2xl border border-white/5'>
          <div className='flex items-center gap-2 text-slate-500 mb-2'>
            <UserPlus className='w-4 h-4' />
            <span className='text-xs font-bold uppercase tracking-widest'>Total Leads</span>
          </div>
          <p className='text-2xl font-bold text-white'>{leads.length}</p>
        </div>
        <div className='bg-surface-container-low p-4 rounded-2xl border border-white/5'>
          <div className='flex items-center gap-2 text-slate-500 mb-2'>
            <CheckCircle2 className='w-4 h-4' />
            <span className='text-xs font-bold uppercase tracking-widest'>Qualified</span>
          </div>
          <p className='text-2xl font-bold text-white'>{qualifiedLeads}</p>
        </div>
        <div className='bg-surface-container-low p-4 rounded-2xl border border-white/5'>
          <div className='flex items-center gap-2 text-slate-500 mb-2'>
            <TrendingUp className='w-4 h-4' />
            <span className='text-xs font-bold uppercase tracking-widest'>Hot Leads</span>
          </div>
          <p className='text-2xl font-bold text-white'>{hotLeads}</p>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
        <div className='flex gap-2'>
          {['all', 'New', 'Open', 'Contacted', 'Qualified', 'Unqualified'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                filter === f 
                  ? 'bg-primary text-on-primary' 
                  : 'bg-surface-container-low text-slate-400 hover:bg-white/10'
              )}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      <div className='bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-white/5'>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>Name</th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>Company</th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>Status</th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>Rating</th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>Source</th>
                <th className='text-left px-6 py-4 text-sm font-semibold text-slate-400'>Revenue</th>
                <th className='text-right px-6 py-4 text-sm font-semibold text-slate-400'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className='px-6 py-12 text-center text-slate-400'>
                    No leads found. Click 'Add Lead' to create one.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead: any) => (
                  <tr key={lead.id} className='border-b border-white/5 hover:bg-white/5 transition-colors'>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='font-medium text-white'>{lead.firstName} {lead.lastName}</p>
                        <p className='text-sm text-slate-400'>{lead.title}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-slate-300'>{lead.company || '-'}</td>
                    <td className='px-6 py-4'>
                      <span className={cn('px-3 py-1 rounded-full text-xs font-medium', statusColors[lead.status] || statusColors['New'])}>
                        {lead.status || 'New'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={cn('px-3 py-1 rounded-full text-xs font-medium', ratingColors[lead.rating] || ratingColors['Cold'])}>
                        {lead.rating || 'Cold'}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={cn('px-3 py-1 rounded-full text-xs font-medium', sourceColors[lead.source] || sourceColors['Other'])}>
                        {lead.source || 'Other'}
                      </span>
                    </td>
                    <td className='p-4 text-white'>{formatCurrency(lead.annualRevenue, config.localization.currency, config.localization.showAllCurrencies)}</td>
                    <td className='px-6 py-4 text-right'>
                      <button className='p-2 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-lg transition-colors'>
                        <MoreHorizontal className='w-4 h-4' />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}