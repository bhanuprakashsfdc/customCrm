import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { useData } from '@/src/context/DataContext';
import { cn } from '@/src/lib/utils';
import { 
  Users, 
  TrendingUp, 
  Building2, 
  Mail,
  Phone,
  Calendar,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  UserCheck,
  Briefcase
} from 'lucide-react';
import RecordModal from './RecordModal';
import BulkUpload from './BulkUpload';

const roleColors: Record<string, string> = {
  'Decision Maker': 'bg-purple-500/20 text-purple-400',
  'Technical': 'bg-indigo-500/20 text-indigo-400',
  'Influencer': 'bg-amber-500/20 text-amber-400',
  'Champion': 'bg-emerald-500/20 text-emerald-400',
  'Buyer': 'bg-blue-500/20 text-blue-400',
  'Economical': 'bg-cyan-500/20 text-cyan-400',
};

const departmentColors: Record<string, string> = {
  'Executive': 'bg-purple-500/20 text-purple-400',
  'Sales': 'bg-blue-500/20 text-blue-400',
  'Engineering': 'bg-indigo-500/20 text-indigo-400',
  'Finance': 'bg-emerald-500/20 text-emerald-400',
  'Operations': 'bg-amber-500/20 text-amber-400',
  'Marketing': 'bg-pink-500/20 text-pink-400',
  'Investment': 'bg-cyan-500/20 text-cyan-400',
};

export default function ContactPipeline() {
  const { config } = useConfig();
  const { contacts, saveRecord, getAccountName } = useData();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(c => c.department === filter || c.contactRole === filter);

  const totalContacts = contacts.length;
  const primaryContacts = contacts.filter(c => c.isPrimary).length;
  const decisionMakers = contacts.filter(c => c.contactRole === 'Decision Maker').length;
  const uniqueAccounts = [...new Set(contacts.map(c => c.accountId).filter(Boolean))].length;

const handleSave = async (data: any) => {
    const record = {
      firstName: data.firstName,
      lastName: data.lastName,
      accountId: data.accountId,
      title: data.title,
      email: data.email,
      phone: data.phone,
      department: data.department,
      contactRole: data.role,
      isPrimary: false,
      ownerId: 'user_001',
    };
    await saveRecord('contacts', record);
    setModalOpen(false);
  };

  return (
    <div className='p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar'>
      <RecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        objectType='contact'
        onSave={handleSave}
      />
      <div className='flex flex-col sm:flex-row justify-between items-end gap-4'>
        <div>
          <h2 className='text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white'>Contacts</h2>
          <p className='text-on-surface-variant mt-1 text-sm'>Contact relationship management.</p>
        </div>
        <div className='flex flex-col sm:flex-row items-end gap-2'>
          <button 
            onClick={() => setModalOpen(true)}
            className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold rounded-full text-sm shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-transform'
          >
            <Plus className='w-4 h-4' />
            Add Contact
          </button>
          <BulkUpload
            objectType="Contact"
            onUpload={async (data) => {
              for (const item of data) {
                await saveRecord('contacts', { ...item, ownerId: 'user_001' });
              }
            }}
            onExport={() => contacts}
            fields={['firstName', 'lastName', 'email', 'phone', 'accountId', 'title', 'department', 'contactRole']}
          />

        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Contacts</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalContacts}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Building2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Accounts</span>
          </div>
          <p className="text-2xl font-bold text-white">{uniqueAccounts}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Primary</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{primaryContacts}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <UserCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Decision Makers</span>
          </div>
          <p className="text-2xl font-bold text-purple-400">{decisionMakers}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'Executive', 'Sales', 'Engineering', 'Finance', 'Operations', 'Decision Maker', 'Technical'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors",
              filter === filterOption
                ? "bg-primary text-on-primary" 
                : "bg-surface-container-low text-slate-400 hover:text-white"
            )}
          >
            {filterOption === 'all' ? 'All Contacts' : filterOption}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Name</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Account</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Title</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Department</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Primary</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Email</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Created</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{contact.firstName} {contact.lastName}</span>
                        <span className="text-xs text-slate-500">{contact.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white">{getAccountName(contact.accountId)}</td>
                  <td className="p-4 text-slate-400">{contact.title}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", departmentColors[contact.department])}>
                      {contact.department}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", roleColors[contact.contactRole])}>
                      {contact.contactRole}
                    </span>
                  </td>
                  <td className="p-4">
                    {contact.isPrimary ? (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400">
                        Yes
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-500/20 text-slate-400">
                        No
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-400">{contact.email}</td>
                  <td className="p-4 text-slate-400">{contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : '-'}</td>
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