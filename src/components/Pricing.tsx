import React from 'react';
import { Check, Zap, Users, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

const pricingTiers = [
  {
    name: 'Starter',
    price: '₹999',
    description: 'Perfect for solo entrepreneurs',
    features: [
      '100 Leads',
      'Basic Pipelines',
      'Email Reports',
      'Mobile App'
    ],
    buttonText: 'Get Started',
    popular: false
  },
  {
    name: 'Growth',
    price: '₹2,999',
    description: 'Best for small teams (2-10 users)',
    features: [
      'Unlimited Leads',
      'WhatsApp Integration',
      'Team Collaboration',
      'Advanced Analytics'
    ],
    buttonText: 'Most Popular',
    popular: true
  },
  {
    name: 'Pro',
    price: '₹4,999',
    description: 'Enterprise-grade CRM power',
    features: [
      'AI Lead Scoring',
      'Custom Workflows',
      'API Access',
      'Priority Support',
      'On-premise option'
    ],
    buttonText: 'Start Free Trial',
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">Choose the perfect plan for your business. Cancel anytime.</p>
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full text-sm font-semibold text-primary">
            14-day free trial on all plans
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className={`
              relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group shadow-xl
              ${tier.popular ? 'ring-2 ring-primary/30 translate-y-[-10px] md:row-span-2 scale-105' : ''}
            `}>
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-indigo-500 px-6 py-2 rounded-full text-white font-semibold text-sm shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl shadow-lg">
                  {tier.name === 'Starter' && <Users className="w-10 h-10 text-blue-400" />}
                  {tier.name === 'Growth' && <Zap className="w-10 h-10 text-yellow-400" />}
                  {tier.name === 'Pro' && <Crown className="w-10 h-10 text-purple-400" />}
                </div>
                <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
                <p className="text-slate-400 mb-4">{tier.description}</p>
                <div className="text-4xl font-bold text-white mb-8">
                  {tier.price}<span className="text-2xl font-normal text-slate-400">/mo</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 mb-8">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className={cn(
                "w-full py-4 rounded-xl font-semibold transition-all shadow-lg",
                tier.popular 
                  ? "bg-gradient-to-r from-primary to-indigo-500 text-white hover:shadow-primary/50 hover:scale-[1.02]" 
                  : "bg-white/10 border border-white/30 text-white hover:bg-white/20 hover:border-white/50"
              )}>
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
          <h3 className="text-2xl font-bold mb-4">Not sure which plan is right for you?</h3>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Start with Starter and upgrade anytime. No lock-in contracts.</p>
          <button className="bg-gradient-to-r from-primary to-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-primary/50 hover:scale-[1.02] transition-all">
            Talk to Sales
          </button>
        </div>
      </div>
    </div>
  );
}

