import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { cn } from '@/src/lib/utils';
import { 
  HeadphonesIcon, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Send
} from 'lucide-react';
import RecordModal from './RecordModal';

const caseData = [
  { id: '1', caseNumber: 'CS-2026-001', subject: 'Login issues with SSO integration', accountName: 'Acme Corporation', contactName: 'John Smith', status: 'New', priority: 'High', type: 'Technical', origin: 'Email', createdDate: '2026-04-13', closedDate: null },
  { id: '2', caseNumber: 'CS-2026-002', subject: 'Billing discrepancy for March invoice', accountName: 'TechStart Inc', contactName: 'Jane Doe', status: 'Working', priority: 'Medium', type: 'Billing', origin: 'Web', createdDate: '2026-04-12', closedDate: null },
  { id: '3', caseNumber: 'CS-2026-003', subject: 'Feature request: API rate limit increase', accountName: 'Global Systems Ltd', contactName: 'Mike Wilson', status: 'Escalated', priority: 'Low', type: 'Feature Request', origin: 'Phone', createdDate: '2026-04-10', closedDate: null },
  { id: '4', caseNumber: 'CS-2026-004', subject: 'Data export not working', accountName: 'InnovateTech', contactName: 'Sarah Johnson', status: 'Closed', priority: 'High', type: 'Bug', origin: 'Email', createdDate: '2026-04-08', closedDate: '2026-04-11' },
  { id: '5', caseNumber: 'CS-2026-005', subject: 'Need training for new users', accountName: 'DataFlow Analytics', contactName: 'Tom Brown', status: 'New', priority: 'Low', type: 'Training', origin: 'Web', createdDate: '2026-04-13', closedDate: null },
  { id: '6', caseNumber: 'CS-2026-006', subject: 'Integration timeout errors', accountName: 'CloudNine Systems', contactName: 'Lisa Chen', status: 'Working', priority: 'High', type: 'Technical', origin: 'Email', createdDate: '2026-04-11', closedDate: null },
  { id: '7', caseNumber: 'CS-2026-007', subject: 'Password reset not sending email', accountName: 'Alpha Industries', contactName: 'David Lee', status: 'Closed', priority: 'Medium', type: 'Bug', origin: 'Phone', createdDate: '2026-04-05', closedDate: '2026-04-06' },
  { id: '8', caseNumber: 'CS-2026-008', subject: 'Custom report not loading', accountName: 'Beta Ventures', contactName: 'Emma Davis', status: 'Escalated', priority: 'Medium', type: 'Bug', origin: 'Web', createdDate: '2026-04-09', closedDate: null },
];

const statusColors: Record<string, string> = {
  'New': 'bg-blue-500/20 text-blue-400',
  'Working': 'bg-amber-500/20 text-amber-400',
  'Escalated': 'bg-red-500/20 text-red-400',
  'Closed': 'bg-emerald-500/20 text-emerald-400',
};

const statusIcons: Record<string, React.ReactNode> = {
  'New': <AlertCircle className="w-4 h-4" />,
  'Working': <RefreshCw className="w-4 h-4" />,
  'Escalated': <AlertCircle className="w-4 h-4" />,
  'Closed': <CheckCircle2 className="w-4 h-4" />,
};

const priorityColors: Record<string, string> = {
  'High': 'bg-red-500/20 text-red-400',
  'Medium': 'bg-amber-500/20 text-amber-400',
  'Low': 'bg-slate-500/20 text-slate-400',
};

const typeColors: Record<string, string> = {
  'Technical': 'bg-indigo-500/20 text-indigo-400',
  'Billing': 'bg-emerald-500/20 text-emerald-400',
  'Feature Request': 'bg-purple-500/20 text-purple-400',
  'Bug': 'bg-red-500/20 text-red-400',
  'Training': 'bg-cyan-500/20 text-cyan-400',
};

export default function CasePipeline() {
  const { config } = useConfig();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredCases = filter === 'all' 
    ? caseData 
    : caseData.filter(c => c.status === filter);

  const newCases = caseData.filter(c => c.status === 'New').length;
  const workingCases = caseData.filter(c => c.status === 'Working').length;
  const closedCases = caseData.filter(c => c.status === 'Closed').length;
  const openCases = caseData.filter(c => c.status !== 'Closed').length;

  const handleSave = (data: any) => {
    console.log('New Case:', data);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <RecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        objectType="case"
        onSave={handleSave}
      />
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Cases</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Customer support case management.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Case
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <HeadphonesIcon className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Open Cases</span>
          </div>
          <p className="text-2xl font-bold text-white">{openCases}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">New</span>
          </div>
          <p className="text-2xl font-bold text-blue-400">{newCases}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <RefreshCw className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Working</span>
          </div>
          <p className="text-2xl font-bold text-amber-400">{workingCases}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Closed</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{closedCases}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'New', 'Working', 'Escalated', 'Closed'].map((status) => (
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
            {status === 'all' ? 'All Cases' : status}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Case</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Account</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Contact</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Origin</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Created</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <HeadphonesIcon className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <span className="font-semibold text-white block">{caseItem.caseNumber}</span>
                        <span className="text-xs text-slate-500 block max-w-[200px] truncate">{caseItem.subject}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white">{caseItem.accountName}</td>
                  <td className="p-4 text-slate-400">{caseItem.contactName}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 w-fit", statusColors[caseItem.status])}>
                      {statusIcons[caseItem.status]}
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", priorityColors[caseItem.priority])}>
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", typeColors[caseItem.type])}>
                      {caseItem.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{caseItem.origin}</td>
                  <td className="p-4 text-slate-400">{caseItem.createdDate}</td>
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