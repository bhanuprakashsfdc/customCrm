import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { cn } from '@/src/lib/utils';
import { 
  Megaphone, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Calendar,
  Filter,
  Plus,
  MoreHorizontal,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';

const campaignData = [
  { id: '1', name: 'Q2 Product Launch', type: 'Conference', status: 'In Progress', budget: 45000, leads: 1250, contacts: 450, converted: 89, revenue: 285000, startDate: '2026-04-01', endDate: '2026-06-30' },
  { id: '2', name: 'Enterprise Webinar Series', type: 'Webinar', status: 'Completed', budget: 12000, leads: 3400, contacts: 1800, converted: 234, revenue: 520000, startDate: '2026-01-15', endDate: '2026-03-31' },
  { id: '3', name: 'Partner Email Campaign', type: 'Email', status: 'In Progress', budget: 8500, leads: 0, contacts: 8500, converted: 425, revenue: 178000, startDate: '2026-04-10', endDate: '2026-05-15' },
  { id: '4', name: 'Trade Show - Tech Summit', type: 'Conference', status: 'Planned', budget: 75000, leads: 0, contacts: 0, converted: 0, revenue: 0, startDate: '2026-08-20', endDate: '2026-08-22' },
  { id: '5', name: 'LinkedIn Lead Gen', type: 'Other', status: 'Completed', budget: 15000, leads: 2100, contacts: 0, converted: 156, revenue: 312000, startDate: '2026-02-01', endDate: '2026-03-31' },
];

const statusColors: Record<string, string> = {
  'Planned': 'bg-slate-500/20 text-slate-400',
  'In Progress': 'bg-amber-500/20 text-amber-400',
  'Completed': 'bg-emerald-500/20 text-emerald-400',
  'Aborted': 'bg-red-500/20 text-red-400',
};

export default function CampaignPipeline() {
  const { config } = useConfig();
  const [filter, setFilter] = useState('all');

  const filteredCampaigns = filter === 'all' 
    ? campaignData 
    : campaignData.filter(c => c.status.toLowerCase() === filter);

  const totalBudget = campaignData.reduce((sum, c) => sum + c.budget, 0);
  const totalLeads = campaignData.reduce((sum, c) => sum + c.leads, 0);
  const totalContacts = campaignData.reduce((sum, c) => sum + c.contacts, 0);
  const totalRevenue = campaignData.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Campaigns</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Marketing campaigns and campaign analytics.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Budget</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalBudget / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Leads</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalLeads.toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Contacts</span>
          </div>
          <p className="text-2xl font-bold text-white">{totalContacts.toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-low p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Revenue</span>
          </div>
          <p className="text-2xl font-bold text-white">${(totalRevenue / 1000000).toFixed(2)}M</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'Planned', 'In Progress', 'Completed'].map((status) => (
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
            {status === 'all' ? 'All Campaigns' : status}
          </button>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Campaign</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Budget</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Leads</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Contacts</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Converted</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue</th>
                <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Dates</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <Megaphone className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="font-semibold text-white">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400">{campaign.type}</td>
                  <td className="p-4">
                    <span className={cn("px-3 py-1 text-xs font-bold rounded-full", statusColors[campaign.status])}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="p-4 text-white">${campaign.budget.toLocaleString()}</td>
                  <td className="p-4 text-white">{campaign.leads.toLocaleString()}</td>
                  <td className="p-4 text-white">{campaign.contacts.toLocaleString()}</td>
                  <td className="p-4 text-emerald-400">{campaign.converted}</td>
                  <td className="p-4 text-white">${(campaign.revenue / 1000).toFixed(0)}K</td>
                  <td className="p-4 text-slate-400 text-sm">
                    {campaign.startDate} - {campaign.endDate}
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