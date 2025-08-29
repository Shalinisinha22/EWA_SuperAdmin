import React from 'react';
import { 
  BarChart3, 
  Store, 
  TrendingUp, 
  ArrowLeft,
  Settings, 
  Shield,
  LogOut 
} from 'lucide-react';
import { Store as StoreType } from '../types/store';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  selectedStore: StoreType | null;
  onBackToStores: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  selectedStore, 
  onBackToStores 
}) => {
  const menuItems = [
    { id: 'overview', label: 'Global Overview', icon: BarChart3 },
    { id: 'stores', label: 'Store Management', icon: Store },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        {selectedStore ? (
          <div>
            <button
              onClick={onBackToStores}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Stores</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{selectedStore.name}</h1>
                <p className="text-sm text-gray-500">Store Analytics</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Super Admin</h1>
              <p className="text-sm text-gray-500">Store Network</p>
            </div>
          </div>
        )}
      </div>

      {!selectedStore && (
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <button className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors mt-3">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;