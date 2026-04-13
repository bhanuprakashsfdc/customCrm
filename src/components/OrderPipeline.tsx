import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { useData } from '@/src/context/DataContext';
import { cn } from '@/src/lib/utils';
import { 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Package,
  Calendar,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import RecordModal from './RecordModal';

const statusColors: Record<string, string> = {
  'Draft': 'bg-slate-500/20 text-slate-400',
  'Activated': 'bg-blue-500/20 text-blue-400',
  'In Progress': 'bg-amber-500/20 text-amber-400',
  'Completed': 'bg-emerald-500/20 text-emerald-400',
  'Cancelled': 'bg-red-500/20 text-red-400',
};

const statusIcons: Record<string, React.ReactNode> = {
  'Draft': <Clock className="w-4 h-4" />,
  'Activated': <CheckCircle2 className="w-4 h-4" />,
  'In Progress': <AlertCircle className="w-4 h-4" />,
  'Completed': <CheckCircle2 className="w-4 h-4" />,
  'Cancelled': <AlertCircle className="w-4 h-4" />,
};

export default function OrderPipeline() {
  const { config } = useConfig();
  const { data, saveRecord, getAccountName } = useData();
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const orders = Object.values(data.orders);

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => (o.status || '').toLowerCase() === filter.toLowerCase());

  const totalRevenue = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const activeOrders = orders.filter(o => o.status === 'Activated' || o.status === 'In Progress').length;

  const handleSave = (data: any) => {
    const record = {
      accountId: data.accountId,
      type: data.type,
      status: data.status,
      effectiveDate: data.effectiveDate,
      ownerId: 'user_001',
    };
    saveRecord('orders', record);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <RecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        objectType="order"
        onSave={handleSave}
      />
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Orders</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Order processing and fulfillment.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Order
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalRevenue / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Orders</span>
          </div>
          <p className="text-2xl font-bold text-white">{orders.length}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Completed</span>
          </div>
          <p className="text-2xl font-bold text-white">{completedOrders}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Active</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeOrders}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'Draft', 'Activated', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
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
            {status === 'all' ? 'All Orders' : status}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Order</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Account</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Items</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Total</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Effective Date</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Created</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="font-semibold text-white">{order.orderNumber}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white">{getAccountName(order.accountId)}</td>
                  <td className="p-4 text-slate-400">{order.type}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 w-fit", statusColors[order.status])}>
                      {statusIcons[order.status]}
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-white">-</td>
                  <td className="p-4 text-white">${(order.totalAmount || 0).toLocaleString()}</td>
                  <td className="p-4 text-slate-400">{order.effectiveDate || '-'}</td>
                  <td className="p-4 text-slate-400">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</td>
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