import React, { useState } from 'react';
import { ConfigProvider } from './context/ConfigContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LeadPipeline from './components/LeadPipeline';
import AccountPipeline from './components/AccountPipeline';
import ContactDetail from './components/ContactDetail';
import DealPipeline from './components/DealPipeline';
import OrderPipeline from './components/OrderPipeline';
import CasePipeline from './components/CasePipeline';

export default function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}

function AppContent() {
  const [activeScreen, setActiveScreen] = useState('dashboard');

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
    <Layout activeScreen={activeScreen} onScreenChange={setActiveScreen}>
      {renderScreen()}
    </Layout>
  );
}
