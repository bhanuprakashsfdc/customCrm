import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Handshake, 
  Users, 
  ClipboardList, 
  MessageSquare, 
  Zap, 
  Settings as SettingsIcon,
  HelpCircle,
  Plus,
  Search,
  Bell,
  LayoutGrid,
  UserCircle,
  Menu,
  X,
  Headphones,
  ShoppingCart,
  LogOut
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import SettingsPanel from './Settings';
import { useConfig } from '@/src/context/ConfigContext';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  user?: { id: string; name: string; email: string; role: string };
  onLogout?: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'leads', label: 'Leads', icon: BarChart3 },
  { id: 'accounts', label: 'Accounts', icon: Users },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'deals', label: 'Opportunities', icon: Handshake },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'cases', label: 'Cases', icon: Headphones },
  { id: 'tasks', label: 'Tasks', icon: ClipboardList },
  { id: 'communications', label: 'Communications', icon: MessageSquare },
  { id: 'automations', label: 'Automations', icon: Zap },
  { id: 'users', label: 'Users', icon: UserCircle },
];

export default function Layout({ children, activeScreen, onScreenChange, user, onLogout }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { config, updateConfig } = useConfig();

  return (
    <div className="flex h-screen bg-background text-on-surface overflow-hidden">
      {/* Settings Panel */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop & Mobile */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface-container-low border-r border-white/10 flex flex-col transform transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-container rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-on-primary-container fill-current" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white font-headline">{config.branding.companyName}</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold hidden sm:block">{config.branding.tagline}</p>
              </div>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onScreenChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  activeScreen === item.id 
                    ? "text-white bg-indigo-500/10 font-semibold" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  activeScreen === item.id ? "text-indigo-400" : "text-slate-400 group-hover:text-indigo-400"
                )} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 lg:p-6 space-y-4">
          <button className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold rounded-full text-sm shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform">
            {config.branding.primaryButtonText}
          </button>
          <div className="pt-4 border-t border-white/5">
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopNav */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 h-16 bg-background/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-md group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search neural records..."
                className="w-full bg-surface-container-lowest border-none rounded-xl pl-11 pr-4 py-2 text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-slate-500 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
              <button 
                onClick={() => {}}
                className="p-2 text-slate-400 hover:text-indigo-300 transition-all"
                title="Support"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setSettingsOpen(true)}
                className="p-2 text-slate-400 hover:text-indigo-300 transition-all"
                title="Settings"
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 lg:gap-4 text-slate-400">
                <button className="hover:text-indigo-300 transition-all relative group">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                </button>
                <div className="relative">
                  <select 
                    value={config.localization.currency}
                    onChange={(e) => updateConfig({ localization: { ...config.localization, currency: e.target.value as any } })}
                    className="bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:border-primary/50 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="INR">₹ INR</option>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                  </select>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 hover:text-indigo-300 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-container rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </button>
                  {userMenuOpen && user && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container border border-white/10 rounded-xl shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-white/5">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                      <button 
                        onClick={() => {
                          onLogout?.();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
        
        {/* Dynamic Footer */}
        <footer className="border-t border-white/5 bg-surface-container-low px-6 py-4 text-xs text-slate-400 text-center lg:px-8">
          Designed and Developed by <a href="https://anuhyadigital.com/" className="text-primary hover:text-primary-container font-medium underline" target="_blank" rel="noopener">Anuhya Digital</a> © {new Date().getFullYear()}
        </footer>
      </main>

      {/* Global FAB */}
      <button className="fixed bottom-6 right-6 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-full shadow-2xl shadow-indigo-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[70] group">
        <Plus className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-90 transition-transform" />
      </button>

      {/* Background Polish */}
      <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[10%] left-[30%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}