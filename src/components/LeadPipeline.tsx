import React from 'react';
import { LayoutGrid, Table, Filter, X, MoreHorizontal, ExternalLink, Bolt, Clock, Mail, CheckCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const columns = [
  { id: 'discovery', label: 'Discovery', count: 12 },
  { id: 'qualified', label: 'Qualified', count: 8 },
  { id: 'proposal', label: 'Proposal', count: 5 },
  { id: 'won_lost', label: 'Won/Lost', count: 22 },
];

export default function LeadPipeline() {
  return (
    <section className="p-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-white tracking-tight">Lead Pipeline</h2>
          <p className="text-slate-400 mt-1">Managing <span className="text-indigo-400 font-bold">142</span> opportunities via Nexus Intelligence</p>
        </div>
        <div className="flex items-center gap-4 bg-surface-container-low p-1 rounded-2xl">
          <button className="flex items-center gap-2 px-6 py-2 bg-surface-container-highest text-white rounded-xl shadow-lg shadow-black/20 transition-all">
            <LayoutGrid className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Kanban</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2 text-slate-500 hover:text-slate-300 transition-all">
            <Table className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Table View</span>
          </button>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-xl text-xs font-medium text-slate-300 border border-white/5 cursor-pointer hover:bg-surface-container transition-colors">
          <Filter className="w-4 h-4" />
          Filters
          <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-md">2</span>
        </div>
        <div className="h-6 w-[1px] bg-white/10" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300 font-bold uppercase tracking-wider">
          Source: LinkedIn
          <X className="w-3 h-3 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-tertiary/10 border border-tertiary/20 text-[11px] text-tertiary font-bold uppercase tracking-wider">
          Score: &gt;80
          <X className="w-3 h-3 cursor-pointer" />
        </div>
        <button className="ml-auto flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors">
          <Filter className="w-4 h-4" />
          Sort: Priority
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-headline font-bold uppercase tracking-widest text-slate-400">{col.label}</h3>
                <span className="w-5 h-5 rounded-md bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-indigo-400">{col.count}</span>
              </div>
              <button className="text-slate-600 hover:text-slate-400"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
            
            <div className="flex flex-col gap-4 no-scrollbar overflow-y-auto max-h-[calc(100vh-320px)] pr-2">
              {col.id === 'discovery' && (
                <>
                  <LeadCard 
                    name="Sarah Jenkins"
                    role="CMO @ CloudScale"
                    img="https://picsum.photos/seed/sarah/64/64"
                    priority="High"
                    score={98}
                    time="2h ago"
                    avatars={['AJ', 'MK']}
                  />
                  <LeadCard 
                    name="Marcus Thorne"
                    role="Head of Growth, Zenith"
                    img={null}
                    priority="Medium"
                    score={84}
                    footer={<span className="text-[10px] text-slate-500 font-medium italic flex items-center gap-1"><Mail className="w-3 h-3" /> Follow-up required</span>}
                  />
                </>
              )}
              {col.id === 'qualified' && (
                <LeadCard 
                  name="Elena Rodriguez"
                  role="Founder @ VibeAI"
                  img="https://picsum.photos/seed/elena/64/64"
                  priority="High"
                  score={92}
                  acv="$42,500 ACV"
                  stageTime="5 days in stage"
                />
              )}
              {col.id === 'proposal' && (
                <LeadCard 
                  name="TechNova Solutions"
                  role="Enterprise Suite Draft"
                  icon={<Bolt className="w-5 h-5 text-tertiary" />}
                  priority="High"
                  isProposal
                  dealValue="$125k Deal"
                  prob="75% Close Prob."
                  progress={75}
                />
              )}
              {col.id === 'won_lost' && (
                <div className="glass-panel p-5 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-300 group cursor-pointer relative overflow-hidden border-white/5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">Global Logistics Co</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Won • Oct 24, 2023</p>
                    </div>
                  </div>
                  <div className="text-[11px] font-headline font-bold text-emerald-400">+$88,000 /yr</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI Intelligence Floating Chip */}
      <div className="fixed bottom-10 right-10 flex items-center gap-4 bg-tertiary-container text-on-tertiary-container px-6 py-4 rounded-full shadow-[0_0_50px_rgba(160,120,255,0.3)] border border-tertiary/20 z-50 group hover:scale-105 transition-transform cursor-pointer">
        <div className="relative">
          <Bolt className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold leading-none">Nexus AI Analyst</span>
          <span className="text-[10px] opacity-80 font-medium">3 new high-score leads identified</span>
        </div>
        <ArrowRight className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
    </section>
  );
}

function ArrowRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

function LeadCard({ 
  name, 
  role, 
  img, 
  priority, 
  score, 
  time, 
  avatars, 
  footer, 
  acv, 
  stageTime, 
  icon, 
  isProposal, 
  dealValue, 
  prob, 
  progress 
}: any) {
  return (
    <div className={cn(
      "glass-panel p-5 rounded-2xl hover:bg-surface-container-highest transition-all duration-300 group cursor-pointer relative overflow-hidden",
      isProposal && "border-l-4 border-l-tertiary"
    )}>
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="w-4 h-4 text-slate-500" />
      </div>
      <div className="flex items-start gap-4 mb-4">
        {img ? (
          <img src={img} className="w-10 h-10 rounded-xl object-cover border border-white/5" referrerPolicy="no-referrer" />
        ) : icon ? (
          <div className="w-10 h-10 rounded-xl bg-tertiary/20 flex items-center justify-center border border-tertiary/10">
            {icon}
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center border border-white/5">
            <LayoutGrid className="w-5 h-5 text-slate-400" />
          </div>
        )}
        <div>
          <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{name}</h4>
          <p className="text-[10px] text-slate-500 font-medium">{role}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className={cn(
          "px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-tighter flex items-center gap-1",
          priority === 'High' ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
        )}>
          {priority === 'High' ? <Bolt className="w-3 h-3 fill-current" /> : <Clock className="w-3 h-3" />}
          {priority} Priority
        </div>
        <div className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-[9px] font-bold uppercase tracking-tighter">
          {isProposal ? "Proposal Sent" : `${score}/100`}
        </div>
      </div>

      {isProposal && (
        <div className="w-full bg-surface-container-lowest h-1 rounded-full mb-3 overflow-hidden">
          <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        {avatars ? (
          <div className="flex -space-x-2">
            {avatars.map((a: string, i: number) => (
              <div key={i} className={cn(
                "w-6 h-6 rounded-full border-2 border-surface flex items-center justify-center text-[8px] font-bold",
                i === 0 ? "bg-surface-container" : "bg-indigo-600"
              )}>{a}</div>
            ))}
          </div>
        ) : acv ? (
          <span className="text-[10px] text-slate-300 font-bold">{acv}</span>
        ) : dealValue ? (
          <span className="text-[10px] text-slate-300 font-bold">{dealValue}</span>
        ) : null}
        
        {time ? (
          <span className="text-[10px] text-slate-500 font-medium">Updated {time}</span>
        ) : stageTime ? (
          <span className="text-[10px] text-slate-500 font-medium">{stageTime}</span>
        ) : prob ? (
          <span className="text-[10px] text-primary font-bold">{prob}</span>
        ) : footer ? (
          footer
        ) : null}
      </div>
    </div>
  );
}
