import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AdminManagement from './components/AdminManagement';
import SalesOverview from './components/SalesOverview';
import OrdersManagement from './components/OrdersManagement';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'admins':
        return <AdminManagement />;
      case 'sales':
        return <SalesOverview />;
      case 'orders':
        return <OrdersManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-6 ml-64">
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;