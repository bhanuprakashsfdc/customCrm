/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LeadPipeline from './components/LeadPipeline';
import DealPipeline from './components/DealPipeline';
import ContactDetail from './components/ContactDetail';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadPipeline />;
      case 'deals':
        return <DealPipeline />;
      case 'contacts':
        return <ContactDetail />;
      default:
        return (
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Screen: {activeScreen}</h2>
              <p className="text-slate-400">This module is currently under development by Nexus AI.</p>
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
