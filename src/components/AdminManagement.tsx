import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Shield, 
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  joinDate: string;
  permissions: string[];
}

const AdminManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2 hours ago',
      joinDate: '2023-01-15',
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 234-5678',
      role: 'Sales Manager',
      status: 'active',
      lastLogin: '1 day ago',
      joinDate: '2023-02-20',
      permissions: ['sales', 'orders']
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 345-6789',
      role: 'Order Manager',
      status: 'active',
      lastLogin: '3 hours ago',
      joinDate: '2023-03-10',
      permissions: ['orders', 'customers']
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      phone: '+1 (555) 456-7890',
      role: 'Content Admin',
      status: 'inactive',
      lastLogin: '1 week ago',
      joinDate: '2023-04-05',
      permissions: ['content']
    }
  ]);

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    permissions: [] as string[]
  });

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = () => {
    const id = (admins.length + 1).toString();
    const admin: Admin = {
      ...newAdmin,
      id,
      status: 'active',
      lastLogin: 'Never',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setAdmins([...admins, admin]);
    setNewAdmin({ name: '', email: '', phone: '', role: '', permissions: [] });
    setShowAddModal(false);
  };

  const handleDeleteAdmin = () => {
    if (selectedAdmin) {
      setAdmins(admins.filter(admin => admin.id !== selectedAdmin.id));
      setShowDeleteModal(false);
      setSelectedAdmin(null);
    }
  };

  const toggleAdminStatus = (id: string) => {
    setAdmins(admins.map(admin =>
      admin.id === id
        ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' }
        : admin
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-600 mt-2">Manage administrator accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search admins by name, email, or role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Admin Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAdmins.map((admin) => (
          <div key={admin.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {admin.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{admin.name}</h3>
                    <p className="text-sm text-gray-600">{admin.role}</p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-1 rounded-lg hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{admin.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{admin.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {admin.joinDate}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {admin.status === 'active' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    admin.status === 'active' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {admin.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Last login: {admin.lastLogin}</p>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => toggleAdminStatus(admin.id)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    admin.status === 'active'
                      ? 'bg-red-50 text-red-700 hover:bg-red-100'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  {admin.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    setSelectedAdmin(admin);
                    setShowDeleteModal(true);
                  }}
                  className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Admin</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newAdmin.phone}
                  onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                >
                  <option value="">Select Role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Order Manager">Order Manager</option>
                  <option value="Content Admin">Content Admin</option>
                </select>
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
                onClick={handleAddAdmin}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Delete Admin</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedAdmin.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAdmin}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagement;