import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import GlobalOverview from './components/GlobalOverview';
import StoreManagement from './components/StoreManagement';
import StoreAnalytics from './components/StoreAnalytics';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Store } from './types/store';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, loading } = useAuth();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
}

export default App;