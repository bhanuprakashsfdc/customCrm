import React from 'react';
import { 
  Verified, 
  Mail, 
  MapPin, 
  Clock, 
  Edit3, 
  Bolt, 
  Brain, 
  ArrowRight, 
  Plus, 
  Phone, 
  FileText, 
  Copy, 
  Send,
  Activity,
  Layers
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function ContactDetail() {
  return (
    <div className="p-8 min-h-screen">
      {/* Header Profile Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <img 
                src="https://picsum.photos/seed/sarah_large/256/256" 
                alt="Sarah Jenkins" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-surface-container-highest p-2 rounded-xl border border-white/10 shadow-lg">
              <Verified className="w-5 h-5 text-primary fill-current" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-headline font-extrabold tracking-tight text-white">Sarah Jenkins</h2>
              <span className="px-2 py-0.5 rounded bg-tertiary/10 text-tertiary text-[10px] font-bold tracking-widest uppercase">Lead</span>
            </div>
            <p className="text-xl text-slate-400 font-medium mt-1">CEO at <span className="text-primary border-b border-primary/20 cursor-pointer">TechFlow Systems</span></p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Mail className="w-4 h-4" />
                s.jenkins@techflow.io
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-4 h-4" />
                Palo Alto, CA
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-4 h-4" />
                9:42 AM Local
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-surface-container-highest text-white font-medium rounded-full border border-white/5 hover:bg-surface-bright transition-all flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 flex items-center gap-2">
            <Bolt className="w-4 h-4 fill-current" />
            Quick Action
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* AI Conversation Summary Widget */}
        <div className="col-span-12 lg:col-span-8 glass-panel border border-primary/10 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Brain className="w-32 h-32 text-primary" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-tertiary-container animate-pulse fill-current" />
            <h3 className="text-sm font-headline font-bold uppercase tracking-[0.15em] text-tertiary">AI Intelligence Summary</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="col-span-2 space-y-4">
              <p className="text-slate-200 text-lg leading-relaxed">
                Sarah is currently evaluating enterprise infrastructure upgrades. Latest sentiment is <span className="text-emerald-400 font-semibold">Highly Positive</span>. She specifically mentioned interest in our Q4 roadmap for AI orchestration.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Ready to Close</span>
                <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-xs font-medium">Interest: Cloud Native</span>
                <span className="px-3 py-1 bg-white/5 text-slate-400 rounded-full text-xs font-medium">Competitor: Datadog</span>
              </div>
            </div>
            <div className="space-y-4 border-l border-white/5 pl-8">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Suggested Action</p>
                <p className="text-sm text-slate-300 mt-1 font-medium">Send "Infrastructure Scaling" whitepaper prior to Wednesday's meeting.</p>
              </div>
              <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                View detail sources <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Relationship Map */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-3xl p-6 border border-white/5">
          <h3 className="text-sm font-headline font-bold uppercase tracking-[0.15em] text-slate-400 mb-6">Relationship Map</h3>
          <div className="space-y-6 relative">
            <div className="absolute left-[1.375rem] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/40 via-surface-container-highest to-primary/40" />
            
            <RelationItem 
              name="Sarah Jenkins"
              role="Decision Maker"
              img="https://picsum.photos/seed/sarah/64/64"
              isMain
            />
            <RelationItem 
              name="Marcus Thorne"
              role="CTO (Reports to Sarah)"
              img="https://picsum.photos/seed/marcus/64/64"
              indent
            />
            <RelationItem 
              name="Linda Duarte"
              role="Head of Procurement"
              img="https://picsum.photos/seed/linda/64/64"
              indent
            />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-primary font-medium cursor-pointer hover:underline">Add Connection</p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-3xl overflow-hidden border border-white/5 flex flex-col">
          <div className="flex border-b border-white/5 px-6">
            <button className="px-6 py-4 text-sm font-bold text-primary border-b-2 border-primary">Timeline</button>
            <button className="px-6 py-4 text-sm font-medium text-slate-400 hover:text-slate-200 transition-all">Tasks (4)</button>
            <button className="px-6 py-4 text-sm font-medium text-slate-400 hover:text-slate-200 transition-all">Deals (2)</button>
            <button className="px-6 py-4 text-sm font-medium text-slate-400 hover:text-slate-200 transition-all">Internal Notes</button>
          </div>
          <div className="p-8 space-y-10 flex-1">
            <TimelineItem 
              icon={<Mail className="w-5 h-5 text-primary" />}
              title="Email: Next-gen Architecture Inquiry"
              time="2 Hours Ago"
              content='"Hi Alex, following up on our call yesterday. Could you send over the updated spec sheets for the..."'
              isItalic
            />
            <TimelineItem 
              icon={<Phone className="w-5 h-5 text-indigo-400" />}
              title="Outbound Call"
              time="Yesterday, 4:15 PM"
              content="Duration: 12m 4s. Discussed budget constraints for FY25. Sarah seems flexible but needs approval from the board."
            />
            <TimelineItem 
              icon={<FileText className="w-5 h-5 text-tertiary" />}
              title="Internal Note: Strategy Adjustment"
              time="Nov 12, 10:00 AM"
              content="Focusing on the scalability aspect of the platform. She's worried about the 10x growth projected for next year."
              isLast
            />
          </div>
        </div>

        {/* Smart Follow-up Composer */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-highest/40 backdrop-blur-md rounded-3xl p-6 border border-primary/20">
            <div className="flex items-center gap-2 mb-6">
              <Bolt className="w-5 h-5 text-primary fill-current" />
              <h3 className="text-sm font-headline font-bold uppercase tracking-[0.15em] text-white">Smart Follow-up</h3>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1 block">Context</label>
                <select className="w-full bg-surface-container-lowest border border-white/10 rounded-xl py-2 px-3 text-xs text-slate-300 focus:ring-primary focus:border-primary appearance-none">
                  <option>Post-Meeting Follow-up</option>
                  <option>Resource Sharing</option>
                  <option>Meeting Invitation</option>
                </select>
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">AI Draft Preview</p>
                  <Copy className="w-3 h-3 text-slate-600 cursor-pointer hover:text-primary" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  "Subject: Technical Specs: Infrastructure Scaling... Hi Sarah, great connecting yesterday. As promised, I've attached the architecture diagrams showing how we handle 10x spikes..."
                </p>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/10">
                <Send className="w-4 h-4" />
                Edit & Send Draft
              </button>
              <p className="text-[10px] text-center text-slate-500">Regenerate using <span className="text-primary font-semibold">Casual Tone</span></p>
            </div>
          </div>

          {/* Engagement Score Card */}
          <div className="bg-surface-container-low rounded-3xl p-6 border border-white/5">
            <h3 className="text-sm font-headline font-bold uppercase tracking-[0.15em] text-slate-400 mb-6">Engagement Score</h3>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-4xl font-headline font-extrabold text-white">82</span>
              <span className="text-slate-500 font-bold mb-1">/100</span>
            </div>
            <div className="w-full h-2 bg-surface-container-lowest rounded-full overflow-hidden mb-6">
              <div className="h-full bg-gradient-to-r from-primary to-tertiary w-[82%]" />
            </div>
            <div className="space-y-4">
              <StatRow label="Email Open Rate" value="94%" color="text-emerald-400" />
              <StatRow label="Response Speed" value="2.4 hrs" color="text-slate-200" />
              <StatRow label="Meeting Attendance" value="100%" color="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Recent Deals Section */}
        <div className="col-span-12 bg-surface-container-low rounded-3xl p-8 border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-headline font-bold uppercase tracking-[0.15em] text-slate-400">Active Deals</h3>
            <button className="text-xs text-primary font-bold hover:underline">Manage All Deals</button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <DealCard 
              icon={<Activity className="w-6 h-6" />}
              title="Enterprise Core Expansion"
              stage="Negotiation"
              prob="75%"
              value="$142,000"
              expected="Q1 2024"
              color="emerald"
            />
            <DealCard 
              icon={<Layers className="w-6 h-6" />}
              title="Consulting SOW - Alpha Phase"
              stage="Proposal Sent"
              prob="40%"
              value="$18,500"
              expected="Q1 2024"
              color="slate"
              dimmed
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RelationItem({ name, role, img, isMain, indent }: any) {
  return (
    <div className={cn("flex items-center gap-4 relative z-10", indent && "ml-8")}>
      <div className={cn(
        "rounded-full bg-surface-container-highest p-0.5",
        isMain ? "w-11 h-11 border-2 border-primary" : "w-9 h-9 border border-white/20"
      )}>
        <img src={img} className="rounded-full w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div>
        <p className={cn("text-sm font-bold", isMain ? "text-white" : "text-slate-200")}>{name}</p>
        <p className="text-[10px] text-slate-500 uppercase font-semibold">{role}</p>
      </div>
    </div>
  );
}

function TimelineItem({ icon, title, time, content, isItalic, isLast }: any) {
  return (
    <div className="flex gap-6 group">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center border border-white/10 group-hover:border-primary/40 transition-all">
          {icon}
        </div>
        {!isLast && <div className="flex-1 w-px bg-white/5 my-2" />}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-sm font-bold text-white">{title}</h4>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{time}</span>
        </div>
        <div className={cn(
          "p-4 bg-surface-container-lowest rounded-2xl border border-white/5 text-slate-400 text-sm",
          isItalic && "italic"
        )}>
          {content}
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value, color }: any) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-slate-500">{label}</span>
      <span className={cn("font-bold", color)}>{value}</span>
    </div>
  );
}

function DealCard({ icon, title, stage, prob, value, expected, color, dimmed }: any) {
  return (
    <div className={cn(
      "group bg-surface-container-lowest p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all flex justify-between items-center",
      dimmed && "opacity-60"
    )}>
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          color === 'emerald' ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-500/10 text-slate-400"
        )}>
          {icon}
        </div>
        <div>
          <h4 className="text-white font-bold">{title}</h4>
          <p className="text-xs text-slate-500">Stage: <span className="text-indigo-400 font-medium">{stage}</span> • Prob: <span className="text-slate-300 font-bold">{prob}</span></p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-headline font-extrabold text-white">{value}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase">Expected: {expected}</p>
      </div>
    </div>
  );
}
