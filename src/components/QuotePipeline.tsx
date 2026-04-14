import React, { useState } from 'react';
import { formatCurrency } from '@/src/lib/currency';
import { useConfig } from '@/src/context/ConfigContext';
import { useData } from '@/src/context/DataContext';
import { cn } from '@/src/lib/utils';
import { 
  FileCheck, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
  Send
} from 'lucide-react';
import BulkUpload from './BulkUpload';

const statusColors: Record<string, string> = {
  'Draft': 'bg-slate-500/20 text-slate-400',
  'Sent': 'bg-blue-500/20 text-blue-400',
  'Accepted': 'bg-emerald-500/20 text-emerald-400',
  'Rejected': 'bg-red-500/20 text-red-400',
  'Closed': 'bg-purple-500/20 text-purple-400',
};

const statusIcons: Record<string, React.ReactNode> = {
  'Draft': <Clock className="w-4 h-4" />,
  'Sent': <Send className="w-4 h-4" />,
  'Accepted': <CheckCircle2 className="w-4 h-4" />,
  'Rejected': <XCircle className="w-4 h-4" />,
  'Closed': <CheckCircle2 className="w-4 h-4" />,
};

export default function QuotePipeline() {
  const { config } = useConfig();
  const { data, saveRecord } = useData();
  const [filter, setFilter] = useState('all');

  const quotes = Object.values(data.quotes);

  const filteredQuotes = filter === 'all' 
    ? quotes 
    : quotes.filter(q => q.status === filter);

  const totalValue = quotes.reduce((sum, q) => sum + (q.grandTotal || 0), 0);
  const acceptedValue = quotes.filter(q => q.status === 'Accepted').reduce((sum, q) => sum + (q.grandTotal || 0), 0);
  const winRate = quotes.length > 0 ? (quotes.filter(q => q.status === 'Accepted').length / quotes.length * 100).toFixed(0) : '0';

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Quotes</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Quote management and pricing proposals.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-end gap-0">
          <BulkUpload
            objectType="Quote"
            onUpload={async (data) => {
              for (const item of data) {
                await saveRecord('quotes', { ...item, ownerId: 'user_001' });
              }
            }}
            onExport={() => Object.values(data.quotes)}
            fields={['quoteNumber', 'accountId', 'opportunityId', 'total', 'status', 'validUntil']}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatCurrency(totalValue, config.localization.currency)}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Won Value</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{formatCurrency(acceptedValue, config.localization.currency)}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Win Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">{winRate}%</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <FileCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Quotes</span>
          </div>
          <p className="text-2xl font-bold text-white">{quotes.length}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'Draft', 'Sent', 'Accepted', 'Rejected'].map((status) => (
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
            {status === 'all' ? 'All Quotes' : status}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Quote</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Opportunity</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Account</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Net Total</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Grand Total</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Expires</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <FileCheck className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="font-semibold text-white">{quote.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white">{quote.opportunityId ? quote.name : '-'}</td>
                  <td className="p-4 text-white">{quote.accountId || '-'}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 w-fit", statusColors[quote.status])}>
                      {statusIcons[quote.status]}
                      {quote.status}
                    </span>
                  </td>
                  <td className="p-4 text-white">{formatCurrency(quote.totalPrice || 0, config.localization.currency)}</td>
                  <td className="p-4 text-white font-bold">{formatCurrency(quote.grandTotal || 0, config.localization.currency)}</td>
                  <td className="p-4 text-slate-400">{quote.expirationDate || '-'}</td>
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