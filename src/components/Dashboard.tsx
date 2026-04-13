import React from 'react';
import { TrendingUp, Bolt, Mail, UserPlus, ArrowUpRight, ExternalLink, ArrowRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const growthData = [
  { name: 'Jan', value: 160 },
  { name: 'Mar', value: 140 },
  { name: 'May', value: 150 },
  { name: 'Jul', value: 100 },
  { name: 'Sep', value: 60 },
  { name: 'Nov', value: 20 },
];

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 max-w-7xl mx-auto overflow-y-auto no-scrollbar">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-2xl lg:text-4xl font-extrabold font-headline tracking-tight text-white">Executive Oversight</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Global performance metrics for Nexus AI Intelligence.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container-high text-white text-xs font-bold rounded-lg hover:bg-surface-bright transition-colors">DAILY</button>
          <button className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg">WEEKLY</button>
        </div>
      </div>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Card */}
        <div className="bg-surface-container-low p-6 rounded-[1.5rem] relative overflow-hidden group border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue</p>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              +12.4% <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white">$1.24M</h3>
          <div className="mt-4 h-16 w-full opacity-50 group-hover:opacity-100 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <Area type="monotone" dataKey="value" stroke="#c0c1ff" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Leads Card */}
        <div className="bg-surface-container-low p-6 rounded-[1.5rem] relative overflow-hidden group border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Leads</p>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              +8.2% <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white">3,842</h3>
          <div className="mt-4 flex gap-1 h-12 items-end">
            {[40, 60, 50, 80, 100, 70].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-primary/20 rounded-t-sm transition-all group-hover:bg-primary" 
                style={{ height: `${h}%` }} 
              />
            ))}
          </div>
        </div>

        {/* Conversion Card */}
        <div className="bg-surface-container-low p-6 rounded-[1.5rem] relative overflow-hidden border border-white/5">
          <div className="flex justify-between items-start mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Conversion Rate</p>
            <span className="text-primary text-xs font-bold">Stable</span>
          </div>
          <h3 className="text-3xl font-bold text-white">24.8%</h3>
          <div className="mt-6 flex items-center gap-2">
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-tertiary w-[24.8%]" />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 italic">Target: 26.0%</p>
        </div>
      </div>

      {/* Growth Outlook Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 bg-surface-container p-4 lg:p-8 rounded-[1.5rem] border border-white/5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-12">
            <h4 className="text-lg lg:text-xl font-bold font-headline text-white">Growth Outlook</h4>
            <div className="flex gap-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary" /> Predicted</span>
              <span className="flex items-center gap-2 hidden sm:inline"><span className="w-3 h-3 rounded-full bg-slate-600" /> Actual</span>
            </div>
          </div>
          <div className="h-48 lg:h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c0c1ff" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#c0c1ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#c0c1ff" 
                  fill="url(#chartGradient)" 
                  strokeWidth={3} 
                />
              </AreaChart>
            </ResponsiveContainer>
            {/* Floating Data Point */}
            <div className="absolute top-[60px] left-[75%] group cursor-pointer">
              <div className="w-4 h-4 bg-primary border-4 border-surface-container rounded-full shadow-lg shadow-primary/50" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface-container-highest border border-white/10 px-3 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Q3 Proj: +22%
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
        </div>

        {/* Recent Intelligence Timeline */}
        <div className="bg-surface-container-low p-4 lg:p-8 rounded-[1.5rem] border border-white/5">
          <h4 className="text-lg lg:text-xl font-bold font-headline text-white mb-4 lg:mb-6">Recent Intelligence</h4>
          <div className="space-y-6">
            <IntelligenceItem 
              icon={<Bolt className="w-4 h-4 text-tertiary" />}
              title="Deal Acceleration"
              description={<>AI detected high intent from <span className="text-primary">Acme Corp</span>. Increased win probability to 85%.</>}
              time="2m ago"
              color="tertiary"
            />
            <IntelligenceItem 
              icon={<Mail className="w-4 h-4 text-primary" />}
              title="Outreach Sequenced"
              description="Autonomous follow-up sent to 48 stagnant leads in the North Sector."
              time="1h ago"
              color="primary"
            />
            <IntelligenceItem 
              icon={<UserPlus className="w-4 h-4 text-slate-400" />}
              title="New Record Ingested"
              description={<>LinkedIn sync completed. 12 contacts updated for <span className="text-primary">Global Dynamics</span>.</>}
              time="4h ago"
              color="slate"
            />
          </div>
          <button className="w-full mt-8 py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors border-t border-white/5 pt-6">VIEW ALL ACTIVITY</button>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="lg:col-span-1 glass-panel p-4 lg:p-8 rounded-[1.5rem] border border-white/10 shadow-[0_0_50px_-12px_rgba(192,193,255,0.1)]">
          <div className="flex items-center gap-3 mb-4 lg:mb-6">
            <Bolt className="w-5 h-5 text-tertiary fill-current" />
            <h4 className="text-lg font-bold font-headline text-white">Next Best Actions</h4>
          </div>
          <div className="space-y-4">
            <ActionCard 
              tag="PRIORITY"
              tagColor="tertiary"
              title="Call Sarah Jenkins"
              description="Contract renewal risk detected based on usage drop."
              icon={<ExternalLink className="w-3 h-3" />}
            />
            <ActionCard 
              tag="UPSELL"
              tagColor="primary"
              title="Send Expansion Deck"
              description="LogiTech reached capacity limits on current tier."
            />
          </div>
        </div>

        {/* Top Deals Grid */}
        <div className="lg:col-span-3 bg-surface-container-low p-4 lg:p-8 rounded-[1.5rem] border border-white/5">
          <div className="flex justify-between items-center mb-4 lg:mb-8">
            <h4 className="text-lg lg:text-xl font-bold font-headline text-white">Top Deals in Flight</h4>
            <button className="text-sm text-primary font-semibold flex items-center gap-1">Open Pipeline <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5">
                <tr>
                  <th className="pb-4 px-4">Account</th>
                  <th className="pb-4 px-4">Value</th>
                  <th className="pb-4 px-4">Stage</th>
                  <th className="pb-4 px-4">Health</th>
                  <th className="pb-4 px-4 text-right">Owner</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <DealRow 
                  account="Stellar Systems"
                  value="$450,000"
                  stage="Negotiation"
                  health={92}
                  ownerImg="https://picsum.photos/seed/user1/64/64"
                />
                <DealRow 
                  account="Quantum Leap Ltd"
                  value="$285,000"
                  stage="Proposal Sent"
                  health={64}
                  ownerImg="https://picsum.photos/seed/user2/64/64"
                />
                <DealRow 
                  account="HyperScale AI"
                  value="$1.1M"
                  stage="Discovery"
                  health={88}
                  ownerImg="https://picsum.photos/seed/user3/64/64"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IntelligenceItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  time: string;
  color: 'tertiary' | 'primary' | 'slate';
}

interface ActionCardProps {
  tag: string;
  tagColor: 'tertiary' | 'primary';
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface DealRowProps {
  account: string;
  value: string;
  stage: string;
  health: number;
  ownerImg: string;
}

function IntelligenceItem({ icon, title, description, time, color }: IntelligenceItemProps) {
  return (
    <div className="flex gap-4 relative">
      <div className="absolute left-[15px] top-10 bottom-0 w-[1px] bg-white/5" />
      <div className={cn(
        "z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0",
        color === 'tertiary' ? "bg-tertiary/20" : color === 'primary' ? "bg-primary/20" : "bg-slate-700"
      )}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
        <p className="text-[10px] text-slate-600 mt-2 font-bold uppercase">{time}</p>
      </div>
    </div>
  );
}

function ActionCard({ tag, tagColor, title, description, icon }: ActionCardProps) {
  return (
    <div className="p-4 rounded-xl bg-surface-container-highest/40 border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
      <div className="flex items-center justify-between mb-2">
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded",
          tagColor === 'tertiary' ? "text-tertiary bg-tertiary/10" : "text-primary bg-primary/10"
        )}>{tag}</span>
        {icon && <span className="text-slate-500 group-hover:text-primary transition-colors">{icon}</span>}
      </div>
      <p className="text-sm font-bold text-white">{title}</p>
      <p className="text-xs text-slate-400 mt-1">{description}</p>
    </div>
  );
}

function DealRow({ account, value, stage, health, ownerImg }: DealRowProps) {
  return (
    <tr className="hover:bg-white/5 transition-colors group">
      <td className="py-5 px-4 font-bold text-white">{account}</td>
      <td className="py-5 px-4 text-slate-300 font-mono">{value}</td>
      <td className="py-5 px-4">
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-bold",
          stage === 'Negotiation' ? "bg-primary/10 text-primary" : 
          stage === 'Proposal Sent' ? "bg-tertiary/10 text-tertiary" : 
          "bg-indigo-500/10 text-indigo-400"
        )}>{stage}</span>
      </td>
      <td className="py-5 px-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full", 
                health > 80 ? "bg-emerald-400" : health > 60 ? "bg-yellow-400" : "bg-red-400"
              )} 
              style={{ width: `${health}%` }} 
            />
          </div>
          <span className={cn(
            "text-[10px] font-bold",
            health > 80 ? "text-emerald-400" : health > 60 ? "text-yellow-400" : "text-red-400"
          )}>{health}%</span>
        </div>
      </td>
      <td className="py-5 px-4 text-right">
        <img 
          src={ownerImg} 
          className="w-8 h-8 rounded-full inline-block border-2 border-white/10" 
          referrerPolicy="no-referrer"
        />
      </td>
    </tr>
  );
}
