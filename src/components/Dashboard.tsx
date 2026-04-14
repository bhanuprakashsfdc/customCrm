import React, { useEffect, useState } from 'react';
import { TrendingUp, Bolt, Mail, UserPlus, ArrowUpRight, ExternalLink, ArrowRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useData } from '../context/DataContext';
import { useConfig } from '../context/ConfigContext';
import { formatCurrency } from '../lib/currency';

interface Opportunity {
  amount?: number;
  stageName?: string;
  accountName?: string;
  probability?: number;
}

const generateGrowthData = (opportunities: Opportunity[]) => {
  const monthly = new Map();
  opportunities.forEach(opp => {
    const month = new Date(opp.closeDate || Date.now()).toLocaleDateString('en-US', { month: 'short' });
    monthly.set(month, (monthly.get(month) || 0) + (opp.amount || 0));
  });
  return Array.from(monthly.entries()).map(([name, value], i) => ({ name, value })).slice(-6);
};

export default function Dashboard() {
  const { opportunities, leads, refreshData } = useData();
  const { config } = useConfig();
  const [pipelineValue, setPipelineValue] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [growthData, setGrowthData] = useState([{ name: 'Jan', value: 0 }]);

  const closedWon = opportunities.filter(opp => opp.isWon).length;
  const totalOpps = opportunities.length;
  const winRate = totalOpps > 0 ? (closedWon / totalOpps * 100).toFixed(1) : 0;

  useEffect(() => {
    const pipeValue = opportunities
      .filter(opp => !opp.isClosed)
      .reduce((sum, opp) => sum + (opp.amount || 0), 0);
    setPipelineValue(pipeValue);

    const recentLeads = leads.filter(lead => new Date(lead.createdAt || 0) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
    setNewLeads(recentLeads);

    setConversionRate(parseFloat(winRate));

    const chartData = generateGrowthData(opportunities);
    setGrowthData(chartData.length ? chartData : [{ name: 'No Data', value: 0 }]);
  }, [opportunities, leads]);

  const topDeals = opportunities
    .filter(opp => !opp.isClosed)
    .sort((a, b) => (b.amount || 0) - (a.amount || 0))
    .slice(0, 3);

  const recentBars = leads.slice(0, 6).map(l => Math.random() * 100); // simulate bar heights

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Executive Oversight</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Live metrics from your CRM data.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg">Refresh Data</button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-white/5 group">
          <div className="flex justify-between mb-4">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Pipeline Value</p>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-3xl font-bold text-white">{formatCurrency(pipelineValue)}</h3>
          <ResponsiveContainer width="100%" height={40}>
            <AreaChart data={growthData.slice(-3)}>
              <Area dataKey="value" stroke="#10b981" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-white/5 group">
          <div className="flex justify-between mb-4">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Recent Leads</p>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-3xl font-bold text-white">{newLeads}</h3>
          <div className="mt-3 flex gap-1 h-10 items-end">
            {recentBars.map((h, i) => (
              <div key={i} className="flex-1 bg-primary rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-white/5">
          <div className="flex justify-between mb-4">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">Win Rate</p>
            <span className="text-primary text-xs font-bold">Live</span>
          </div>
          <h3 className="text-3xl font-bold text-white">{winRate}%</h3>
          <div className="mt-4 h-3 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-emerald-500" style={{ width: `${winRate}%` }} />
          </div>
          <p className="text-xs text-slate-500 mt-2">Opps Won / Total: {closedWon}/{totalOpps}</p>
        </div>
      </div>

      {/* Pipeline Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container p-6 lg:p-8 rounded-[1.5rem] border border-white/5">
          <h4 className="text-xl font-bold mb-6">Pipeline Growth</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="pipelineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#c0c1ff" stopOpacity={0.3} />
                  <stop offset="1" stopColor="#c0c1ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#c0c1ff" fill="url(#pipelineGrad)" strokeWidth={3} />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-container-low p-6 rounded-[1.5rem] border border-white/5">
          <h4 className="text-lg font-bold mb-4">Recent Activity</h4>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2 p-2 rounded-lg hover:bg-white/5">
              <Bolt className="w-4 h-4 mt-1 text-primary" />
              <div>
                <p>New lead <strong>John Doe</strong> qualified</p>
                <p className="text-xs text-slate-400">2h ago</p>
              </div>
            </div>
            {/* More mock or real */}
          </div>
        </div>
      </div>

      {/* Top Deals */}
      <div className="bg-surface-container-low p-6 lg:p-8 rounded-[1.5rem] border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold">Top Opportunities</h4>
          <ArrowRight className="w-5 h-5 text-primary" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-xs uppercase text-slate-500 font-bold">
              <tr>
                <th className="pb-4 text-left">Account</th>
                <th className="pb-4">Value</th>
                <th className="pb-4">Stage</th>
                <th className="text-right pb-4">Probability</th>
              </tr>
            </thead>
            <tbody>
              {topDeals.map((opp, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="py-3 font-medium">{opp.accountName || 'N/A'}</td>
                  <td className="py-3">{formatCurrency(opp.amount || 0, config.localization.currency)}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                      {opp.stageName || 'N/A'}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-emerald-400 font-bold">
                      {(opp.probability || 0).toFixed(0)}%
                    </span>
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

