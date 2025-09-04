import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import GlobalOverview from './components/GlobalOverview';
import StoreManagement from './components/StoreManagement';
import StoreAnalytics from './components/StoreAnalytics';
import LoginPage from './components/LoginPage';
import { Store } from './types/store';
import { Loader2 } from 'lucide-react';

function App() {
  const { loading, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

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