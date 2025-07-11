import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Calendar,
  UserCheck
} from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingMethod: string;
  paymentMethod: string;
  handledBy: string;
}

const OrdersManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [adminFilter, setAdminFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const admins = [
    { id: 'all', name: 'All Admins' },
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
    { id: '3', name: 'Emily Davis' },
    { id: '4', name: 'David Wilson' }
  ];

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      items: 3,
      total: 245.99,
      status: 'processing',
      date: '2024-01-15',
      shippingMethod: 'Express Delivery',
      paymentMethod: 'Credit Card',
      handledBy: 'Sarah Johnson'
    },
    {
      id: 'ORD-002',
      customerName: 'Emily Johnson',
      customerEmail: 'emily.johnson@email.com',
      items: 1,
      total: 89.99,
      status: 'shipped',
      date: '2024-01-14',
      shippingMethod: 'Standard Shipping',
      paymentMethod: 'PayPal',
      handledBy: 'Mike Chen'
    },
    {
      id: 'ORD-003',
      customerName: 'Michael Brown',
      customerEmail: 'michael.brown@email.com',
      items: 2,
      total: 156.50,
      status: 'delivered',
      date: '2024-01-13',
      shippingMethod: 'Express Delivery',
      paymentMethod: 'Credit Card',
      handledBy: 'Emily Davis'
    },
    {
      id: 'ORD-004',
      customerName: 'Sarah Davis',
      customerEmail: 'sarah.davis@email.com',
      items: 1,
      total: 45.00,
      status: 'pending',
      date: '2024-01-15',
      shippingMethod: 'Standard Shipping',
      paymentMethod: 'Bank Transfer',
      handledBy: 'David Wilson'
    },
    {
      id: 'ORD-005',
      customerName: 'David Wilson',
      customerEmail: 'david.wilson@email.com',
      items: 4,
      total: 389.99,
      status: 'cancelled',
      date: '2024-01-12',
      shippingMethod: 'Express Delivery',
      paymentMethod: 'Credit Card',
      handledBy: 'Sarah Johnson'
    },
    {
      id: 'ORD-006',
      customerName: 'Lisa Anderson',
      customerEmail: 'lisa.anderson@email.com',
      items: 2,
      total: 178.50,
      status: 'processing',
      date: '2024-01-14',
      shippingMethod: 'Express Delivery',
      paymentMethod: 'Credit Card',
      handledBy: 'Mike Chen'
    },
    {
      id: 'ORD-007',
      customerName: 'Robert Taylor',
      customerEmail: 'robert.taylor@email.com',
      items: 1,
      total: 67.99,
      status: 'shipped',
      date: '2024-01-13',
      shippingMethod: 'Standard Shipping',
      paymentMethod: 'PayPal',
      handledBy: 'Emily Davis'
    },
    {
      id: 'ORD-008',
      customerName: 'Jennifer White',
      customerEmail: 'jennifer.white@email.com',
      items: 3,
      total: 234.75,
      status: 'delivered',
      date: '2024-01-12',
      shippingMethod: 'Express Delivery',
      paymentMethod: 'Credit Card',
      handledBy: 'David Wilson'
    }
  ]);

  const statusConfig = {
    pending: { color: 'bg-amber-100 text-amber-800', icon: Clock },
    processing: { color: 'bg-blue-100 text-blue-800', icon: Package },
    shipped: { color: 'bg-purple-100 text-purple-800', icon: Truck },
    delivered: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
    cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesAdmin = adminFilter === 'all' || order.handledBy === admins.find(a => a.id === adminFilter)?.name;
    return matchesSearch && matchesStatus && matchesAdmin;
  });

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusStats = () => {
    const filteredByAdmin = adminFilter === 'all' ? orders : orders.filter(o => o.handledBy === admins.find(a => a.id === adminFilter)?.name);
    
    const stats = {
      total: filteredByAdmin.length,
      pending: filteredByAdmin.filter(o => o.status === 'pending').length,
      processing: filteredByAdmin.filter(o => o.status === 'processing').length,
      shipped: filteredByAdmin.filter(o => o.status === 'shipped').length,
      delivered: filteredByAdmin.filter(o => o.status === 'delivered').length,
      cancelled: filteredByAdmin.filter(o => o.status === 'cancelled').length
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders and fulfillment</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Admin Filter Info */}
      {adminFilter !== 'all' && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Orders handled by: {admins.find(a => a.id === adminFilter)?.name}
              </h3>
              <p className="text-gray-600">Viewing orders managed by this administrator</p>
            </div>
          </div>
        </div>
      )}

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
          <p className="text-sm text-gray-600">Processing</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
          <p className="text-sm text-gray-600">Shipped</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-2xl font-bold text-emerald-600">{stats.delivered}</p>
          <p className="text-sm text-gray-600">Delivered</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
          <p className="text-sm text-gray-600">Cancelled</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by customer name, email, or order ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={adminFilter}
            onChange={(e) => setAdminFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {admins.map(admin => (
              <option key={admin.id} value={admin.id}>{admin.name}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Items</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Total</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Handled By</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <span className="font-medium text-gray-900">{order.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-900">{order.items} items</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">${order.total}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">
                            {order.handledBy.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm text-gray-900">{order.handledBy}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderDetails(true);
                          }}
                          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Order Details - {selectedOrder.id}</h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedOrder.customerEmail}</p>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Order Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[selectedOrder.status].color}`}>
                      <span className="capitalize">{selectedOrder.status}</span>
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium">{selectedOrder.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Shipping Method</p>
                    <p className="font-medium">{selectedOrder.shippingMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Handled By</p>
                    <p className="font-medium">{selectedOrder.handledBy}</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{selectedOrder.items} items</span>
                  <span className="text-xl font-bold text-gray-900">${selectedOrder.total}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowOrderDetails(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;