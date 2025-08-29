import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import GlobalOverview from './components/GlobalOverview';
import StoreManagement from './components/StoreManagement';
import StoreAnalytics from './components/StoreAnalytics';
import { Store } from './types/store';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const renderActiveSection = () => {
    if (selectedStore) {
      return (
        <StoreAnalytics 
          store={selectedStore} 
          onBack={() => setSelectedStore(null)} 
        />
      );
    }

    switch (activeSection) {
      case 'overview':
        return <GlobalOverview />;
      case 'stores':
        return <StoreManagement onViewStore={setSelectedStore} />;
      default:
        return <GlobalOverview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        selectedStore={selectedStore}
        onBackToStores={() => setSelectedStore(null)}
      />
      <main className="flex-1 p-6 ml-64">
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;