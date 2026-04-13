import React from 'react';
import { Filter, Calendar, TrendingUp, Brain, MoreVertical, PlusCircle, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function DealPipeline() {
  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-8">
      {/* Forecast Engine Bento Section */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-headline text-3xl font-bold text-white tracking-tight">Deal Pipeline</h2>
            <p className="text-slate-400 text-sm mt-1">Managing 14 active deals across 5 stages</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl text-sm font-medium border border-white/5 hover:bg-surface-container-high transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-xl text-sm font-medium border border-white/5 hover:bg-surface-container-high transition-colors">
              <Calendar className="w-4 h-4" /> Q4 2024
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Forecast Hero Card */}
          <div className="col-span-8 glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between min-h-[280px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] mb-2">Quarterly Forecast Projection</p>
                <h3 className="text-5xl font-extrabold text-white tracking-tighter">$1.42M</h3>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-emerald-400 flex items-center text-sm font-semibold">
                    <TrendingUp className="w-4 h-4 mr-1" /> +12.4%
                  </span>
                  <span className="text-slate-500 text-sm">vs Last Quarter Target</span>
                </div>
              </div>
              <div className="w-48 h-24 relative overflow-hidden rounded-xl bg-surface-container-low/50">
                <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-between px-2 pb-1">
                  <div className="w-4 bg-indigo-500/20 rounded-t h-[40%]" />
                  <div className="w-4 bg-indigo-500/30 rounded-t h-[55%]" />
                  <div className="w-4 bg-indigo-500/40 rounded-t h-[35%]" />
                  <div className="w-4 bg-indigo-500/50 rounded-t h-[70%]" />
                  <div className="w-4 bg-primary rounded-t h-[90%] shadow-[0_0_15px_rgba(192,193,255,0.4)]" />
                  <div className="w-4 bg-indigo-500/30 rounded-t h-[60%]" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 mt-auto">
              <div className="space-y-1">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Pipeline Velocity</p>
                <p className="text-white font-bold text-lg">14.2 Days</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Win Rate Probability</p>
                <p className="text-white font-bold text-lg">68.4%</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Gap to Target</p>
                <p className="text-white font-bold text-lg">$240k</p>
              </div>
            </div>
          </div>

          {/* AI Intelligence Side Panel */}
          <div className="col-span-4 bg-tertiary-container/10 border border-tertiary-container/20 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 blur-[80px] -mr-16 -mt-16 group-hover:bg-tertiary/20 transition-all duration-700" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-tertiary fill-current" />
                <h4 className="text-white font-bold text-sm tracking-tight">AI Insights</h4>
              </div>
              <div className="space-y-4 flex-1">
                <div className="p-3 bg-surface-container-highest/40 rounded-2xl border border-white/5">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <span className="text-tertiary font-semibold">Priority Action:</span> Deal <span className="underline decoration-tertiary/50">"Stellar Tech"</span> has stalled in Negotiation for 8 days. Schedule a follow-up to increase win probability by 14%.
                  </p>
                </div>
                <div className="p-3 bg-surface-container-highest/40 rounded-2xl border border-white/5">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <span className="text-tertiary font-semibold">Trend Alert:</span> Overall pipeline value is up 22% compared to this time last year.
                  </p>
                </div>
              </div>
              <button className="mt-4 w-full py-2 bg-tertiary/20 hover:bg-tertiary/30 text-tertiary text-xs font-bold rounded-xl transition-all border border-tertiary/30">
                View Full Intelligence Report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Sales Funnel */}
      <section className="flex gap-6 overflow-x-auto pb-8 no-scrollbar -mx-8 px-8">
        <StageColumn 
          label="Discovery" 
          count={4} 
          color="bg-slate-400"
          deals={[
            { name: 'Quantum Leap SaaS', value: '$45,000', exp: 'Oct 12', prob: 20 },
            { name: 'Nova Logistics', value: '$120,500', exp: 'Nov 05', prob: 15 },
          ]}
        />
        <StageColumn 
          label="Qualification" 
          count={3} 
          color="bg-indigo-400"
          deals={[
            { name: 'Apex Global Ent.', value: '$210,000', exp: 'Oct 28', prob: 45, isHot: true },
          ]}
        />
        <StageColumn 
          label="Proposal" 
          count={2} 
          color="bg-primary"
          deals={[
            { name: 'Lumina Research', value: '$68,200', exp: 'Nov 15', prob: 60, tag: 'Proposal Sent (Oct 01)' },
          ]}
        />
        <StageColumn 
          label="Negotiation" 
          count={3} 
          color="bg-primary-container"
          deals={[
            { name: 'Stellar Tech Systems', value: '$430,000', exp: 'Oct 15', prob: 85, isActive: true },
          ]}
        />
        <div className="flex-shrink-0 w-80 space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(208,188,255,0.5)]" />
              <h5 className="text-slate-200 font-bold text-sm uppercase tracking-widest">Closing</h5>
            </div>
            <span className="text-xs font-medium text-slate-500 bg-surface-container px-2 py-0.5 rounded-full">2</span>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-5 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 hover:border-primary/20 transition-all min-h-[120px]">
              <PlusCircle className="w-8 h-8 mb-2" />
              <span className="text-xs font-bold uppercase tracking-widest">Drop here to close</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StageColumn({ label, count, color, deals }: any) {
  return (
    <div className="flex-shrink-0 w-80 space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", color)} />
          <h5 className="text-slate-200 font-bold text-sm uppercase tracking-widest">{label}</h5>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-surface-container px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="space-y-4">
        {deals.map((deal: any, i: number) => (
          <div 
            key={i} 
            className={cn(
              "glass-card p-5 rounded-2xl border border-white/5 cursor-grab active:cursor-grabbing hover:border-primary/40 transition-all group relative",
              deal.isActive && "border-primary-container/40 bg-primary-container/5"
            )}
          >
            {deal.isHot && (
              <div className="absolute -top-1 -right-1">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-tertiary" />
                </span>
              </div>
            )}
            <div className="flex justify-between items-start mb-3">
              <h6 className="text-white font-semibold text-sm group-hover:text-primary transition-colors">{deal.name}</h6>
              <button className="text-slate-600 hover:text-slate-300"><MoreVertical className="w-4 h-4" /></button>
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <p className="text-xl font-extrabold text-white">{deal.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Exp: {deal.exp}</p>
              </div>
              <div className="text-right">
                <div className={cn("text-[10px] font-bold mb-1", deal.isActive ? "text-primary-container" : "text-indigo-400")}>{deal.prob}% Prob.</div>
                <div className="w-16 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full", deal.isActive ? "bg-primary-container shadow-[0_0_5px_rgba(128,131,255,0.8)]" : "bg-indigo-500")} 
                    style={{ width: `${deal.prob}%` }} 
                  />
                </div>
              </div>
            </div>
            {deal.tag && (
              <div className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
                <Zap className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-primary font-bold">{deal.tag}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
