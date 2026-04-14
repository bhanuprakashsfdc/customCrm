import React, { useState, useEffect } from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LeadPipeline from './components/LeadPipeline';
import AccountPipeline from './components/AccountPipeline';
import ContactDetail from './components/ContactDetail';
import DealPipeline from './components/DealPipeline';
import OrderPipeline from './components/OrderPipeline';
import CasePipeline from './components/CasePipeline';
import UserPipeline from './components/UserPipeline';
import LoginPage from './components/LoginPage';

const AUTH_KEY = 'crm_auth';

export default function App() {
  return (
    <ConfigProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </ConfigProvider>
  );
}

function AppContent() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleLogin = (userData: { id: string; name: string; email: string; role: string }) => {
    setUser(userData);
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadPipeline />;
      case 'accounts':
        return <AccountPipeline />;
      case 'contacts':
        return <ContactDetail />;
      case 'deals':
        return <DealPipeline />;
      case 'orders':
        return <OrderPipeline />;
      case 'cases':
        return <CasePipeline />;
      case 'users':
        return <UserPipeline />;
      default:
        return (
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Screen: {activeScreen}</h2>
              <p className="text-slate-400">This module is currently under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout activeScreen={activeScreen} onScreenChange={setActiveScreen} user={user} onLogout={handleLogout}>
      {renderScreen()}
    </Layout>
  );
}
