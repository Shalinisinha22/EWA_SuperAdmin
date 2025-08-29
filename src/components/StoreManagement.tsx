import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Store,
  Mail,
  Globe,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Eye,
  Power
} from 'lucide-react';
import { Store as StoreType } from '../types/store';
import { mockStores } from '../data/mockStores';

interface StoreManagementProps {
  onViewStore: (store: StoreType) => void;
}

const StoreManagement: React.FC<StoreManagementProps> = ({ onViewStore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [stores, setStores] = useState<StoreType[]>(mockStores);

  const [newStore, setNewStore] = useState({
    name: '',
    subdomain: '',
    adminName: '',
    adminEmail: '',
    commissionRate: 8.0
  });

  const statusConfig = {
    live: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
    pending: { color: 'bg-amber-100 text-amber-800', icon: Clock },
    disabled: { color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.subdomain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddStore = () => {
    const id = (stores.length + 1).toString();
    const store: StoreType = {
      id,
      name: newStore.name,
      subdomain: newStore.subdomain,
      adminName: newStore.adminName,
      adminEmail: newStore.adminEmail,
      status: 'pending',
      revenue: { total: 0, monthly: 0, weekly: 0 },
      salesVolume: { orders: 0, aov: 0, products: 0 },
      commission: { rate: newStore.commissionRate, earned: 0 },
      createdDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      activityLogs: []
    };
    setStores([...stores, store]);
    setNewStore({ name: '', subdomain: '', adminName: '', adminEmail: '', commissionRate: 8.0 });
    setShowAddModal(false);
  };

  const handleDeleteStore = () => {
    if (selectedStore) {
      setStores(stores.filter(store => store.id !== selectedStore.id));
      setShowDeleteModal(false);
      setSelectedStore(null);
    }
  };

  const toggleStoreStatus = (id: string) => {
    setStores(stores.map(store => {
      if (store.id === id) {
        let newStatus: StoreType['status'];
        if (store.status === 'live') newStatus = 'disabled';
        else if (store.status === 'disabled') newStatus = 'pending';
        else newStatus = 'live';
        return { ...store, status: newStatus };
      }
      return store;
    }));
  };

  const resetStoreAdmin = (id: string) => {
    // In real app, this would trigger password reset email
    alert('Password reset email sent to store admin');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Store Management</h1>
          <p className="text-gray-600 mt-2">Manage all stores in your network</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Store</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search stores by name, admin, or subdomain..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="live">Live</option>
            <option value="pending">Pending</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      {/* Store Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStores.map((store) => {
          const StatusIcon = statusConfig[store.status].icon;
          
          return (
            <div key={store.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Store className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{store.name}</h3>
                      <p className="text-sm text-gray-600">{store.subdomain}.store.com</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[store.status].color}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="capitalize">{store.status}</span>
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{store.adminEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>Admin: {store.adminName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Created {new Date(store.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">Revenue</p>
                    <p className="font-semibold text-gray-900">${store.revenue.total.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">Commission</p>
                    <p className="font-semibold text-gray-900">${store.commission.earned.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last login: {store.lastLogin}</span>
                  <span className="text-gray-600">{store.salesVolume.orders} orders</span>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => onViewStore(store)}
                    className="flex-1 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Analytics</span>
                  </button>
                  <button
                    onClick={() => toggleStoreStatus(store.id)}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <Power className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => resetStoreAdmin(store.id)}
                    className="p-2 rounded-lg border border-amber-200 text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStore(store);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Store Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Store</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                  placeholder="e.g., Ewa Luxe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subdomain</label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500"
                    value={newStore.subdomain}
                    onChange={(e) => setNewStore({ ...newStore, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
                    placeholder="ewaluxe"
                  />
                  <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-600">
                    .store.com
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newStore.adminName}
                  onChange={(e) => setNewStore({ ...newStore, adminName: e.target.value })}
                  placeholder="Ewa Admin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newStore.adminEmail}
                  onChange={(e) => setNewStore({ ...newStore, adminEmail: e.target.value })}
                  placeholder="ewa@admin.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newStore.commissionRate}
                  onChange={(e) => setNewStore({ ...newStore, commissionRate: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStore}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Store
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedStore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Delete Store</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedStore.name}</strong>? This action cannot be undone and will permanently remove all store data.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStore}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Store
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreManagement;