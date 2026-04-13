import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { cn } from '@/src/lib/utils';
import { 
  Handshake, 
  TrendingUp, 
  DollarSign, 
  Users,
  Calendar,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  Target
} from 'lucide-react';
import RecordModal from './RecordModal';

const opportunityData = [
  { id: '1', name: 'Acme Enterprise Deal', accountName: 'Acme Corporation', type: 'New Business', stage: 'Proposal', amount: 250000, probability: 85, closeDate: '2026-04-30', isClosed: false, isWon: false, owner: 'John Doe' },
  { id: '2', name: 'TechStart Expansion', accountName: 'TechStart Inc', type: 'Upsell', stage: 'Negotiation', amount: 125000, probability: 90, closeDate: '2026-04-25', isClosed: false, isWon: false, owner: 'Sarah Johnson' },
  { id: '3', name: 'Global Systems Renewal', accountName: 'Global Systems Ltd', type: 'Renewal', stage: 'Closed Won', amount: 175000, probability: 100, closeDate: '2026-03-31', isClosed: true, isWon: true, owner: 'Mike Wilson' },
  { id: '4', name: 'InnovateTech Implementation', accountName: 'InnovateTech', type: 'New Business', stage: 'Qualification', amount: 85000, probability: 25, closeDate: '2026-05-15', isClosed: false, isWon: false, owner: 'Lisa Chen' },
  { id: '5', name: 'DataFlow Analytics Platform', accountName: 'DataFlow Analytics', type: 'New Business', stage: 'Needs Analysis', amount: 320000, probability: 50, closeDate: '2026-05-30', isClosed: false, isWon: false, owner: 'David Lee' },
  { id: '6', name: 'CloudNine Partnership', accountName: 'CloudNine Systems', type: 'Existing Business', stage: 'Closed Lost', amount: 95000, probability: 0, closeDate: '2026-03-15', isClosed: true, isWon: false, owner: 'Emma Davis' },
  { id: '7', name: 'Alpha Industries Pilot', accountName: 'Alpha Industries', type: 'New Business', stage: 'Prospecting', amount: 45000, probability: 10, closeDate: '2026-06-15', isClosed: false, isWon: false, owner: 'Tom Brown' },
  { id: '8', name: 'Beta Ventures Platform', accountName: 'Beta Ventures', type: 'New Business', stage: 'Decision Makers', amount: 180000, probability: 75, closeDate: '2026-04-20', isClosed: false, isWon: false, owner: 'Anna Martinez' },
];

const stageColors: Record<string, string> = {
  'Prospecting': 'bg-slate-500/20 text-slate-400',
  'Qualification': 'bg-blue-500/20 text-blue-400',
  'Needs Analysis': 'bg-indigo-500/20 text-indigo-400',
  'Proposal': 'bg-purple-500/20 text-purple-400',
  'Negotiation': 'bg-amber-500/20 text-amber-400',
  'Decision Makers': 'bg-cyan-500/20 text-cyan-400',
  'Closed Won': 'bg-emerald-500/20 text-emerald-400',
  'Closed Lost': 'bg-red-500/20 text-red-400',
};

const typeColors: Record<string, string> = {
  'New Business': 'bg-indigo-500/20 text-indigo-400',
  'Existing Business': 'bg-blue-500/20 text-blue-400',
  'Renewal': 'bg-emerald-500/20 text-emerald-400',
  'Upsell': 'bg-purple-500/20 text-purple-400',
};

export default function DealPipeline() {
  const { config } = useConfig();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredOpportunities = filter === 'all' 
    ? opportunityData 
    : filter === 'Active'
      ? opportunityData.filter(o => !o.isClosed)
      : filter === 'Closed'
        ? opportunityData.filter(o => o.isClosed)
        : opportunityData.filter(o => o.stage === filter);

  const totalAmount = opportunityData.reduce((sum, o) => sum + o.amount, 0);
  const openAmount = opportunityData.filter(o => !o.isClosed).reduce((sum, o) => sum + o.amount, 0);
  const wonAmount = opportunityData.filter(o => o.isWon).reduce((sum, o) => sum + o.amount, 0);
  const winRate = (opportunityData.filter(o => o.isClosed && o.isWon).length / opportunityData.filter(o => o.isClosed).length * 100).toFixed(0);

  const handleSave = (data: any) => {
    console.log('New Opportunity:', data);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <RecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        objectType="opportunity"
        onSave={handleSave}
      />
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Opportunities</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Deal pipeline and sales tracking.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Opportunity
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Pipeline Value</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalAmount / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Handshake className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Open Deals</span>
          </div>
          <p className="text-2xl font-bold text-white">{opportunityData.filter(o => !o.isClosed).length}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Won Value</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">${(wonAmount / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Win Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">{winRate}%</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'Active', 'Prospecting', 'Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Decision Makers', 'Closed Won', 'Closed Lost'].map((stage) => (
          <button
            key={stage}
            onClick={() => setFilter(stage)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors",
              filter === stage
                ? "bg-primary text-on-primary" 
                : "bg-surface-container-low text-slate-400 hover:text-white"
            )}
          >
            {stage === 'all' ? 'All Deals' : stage === 'Active' ? 'Open Deals' : stage}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Opportunity Name</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Account</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Stage</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Probability</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Close Date</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Owner</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.map((opp) => (
                <tr key={opp.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <Handshake className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="font-semibold text-white">{opp.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white">{opp.accountName}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", typeColors[opp.type])}>
                      {opp.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", stageColors[opp.stage])}>
                      {opp.stage}
                    </span>
                  </td>
                  <td className="p-4 text-white font-bold">${opp.amount.toLocaleString()}</td>
                  <td className="p-4 text-white">{opp.probability}%</td>
                  <td className="p-4 text-slate-400">{opp.closeDate}</td>
                  <td className="p-4 text-slate-400">{opp.owner}</td>
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