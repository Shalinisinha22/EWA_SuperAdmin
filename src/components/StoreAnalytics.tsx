import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  RotateCcw,
  Power,
  AlertCircle,
  Edit
} from 'lucide-react';
import { Store as StoreType } from '../types/store';
import { storeAnalyticsAPI, StoreAnalytics as APIStoreAnalytics } from '../services/storeAnalyticsAPI';
import { storeAPI } from '../services/storeAPI';
import { useAuth } from '../context/AuthContext';

interface StoreAnalyticsProps {
  store: StoreType;
  onBack: () => void;
}

const StoreAnalytics: React.FC<StoreAnalyticsProps> = ({ store, onBack }) => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [analytics, setAnalytics] = useState<APIStoreAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStore, setEditingStore] = useState({
    name: store.name,
    subdomain: store.subdomain,
    adminName: store.adminName,
    adminEmail: store.adminEmail,
    commissionRate: analytics?.analytics.commission.rate || 8.0
  });

  // Load analytics data
  const loadAnalytics = async () => {
    if (!user?.token) return;
    
    try {
      setLoading(true);
      setError('');
      const data = await storeAnalyticsAPI.getStoreOverview(user.token, store.id, timeRange);
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  // Load analytics on component mount and when time range changes
  useEffect(() => {
    loadAnalytics();
  }, [user?.token, store.id, timeRange]);

  // Update editing store when analytics load
  useEffect(() => {
    if (analytics) {
      setEditingStore({
        name: store.name,
        subdomain: store.subdomain,
        adminName: store.adminName,
        adminEmail: store.adminEmail,
        commissionRate: analytics.analytics.commission.rate
      });
    }
  }, [analytics, store]);

  const handleEditStore = async () => {
    if (!user?.token) return;
    
    try {
      setLoading(true);
      await storeAPI.updateStore(user.token, store.id, {
        name: editingStore.name,
        slug: editingStore.subdomain,
        adminName: editingStore.adminName,
        adminEmail: editingStore.adminEmail,
        commissionRate: editingStore.commissionRate
      });
      
      setShowEditModal(false);
      // Reload analytics to get updated data
      await loadAnalytics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update store');
    } finally {
      setLoading(false);
    }
  };

  const statsConfig = analytics ? [
    {
      title: 'Total Revenue',
      value: `₹${analytics.analytics.revenue.total.toLocaleString()}`,
      change: analytics.analytics.revenue.growth,
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      title: 'Period Revenue',
      value: `₹${analytics.analytics.revenue.period.toLocaleString()}`,
      change: analytics.analytics.revenue.growth,
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: analytics.analytics.orders.total.toString(),
      change: analytics.analytics.orders.growth,
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Average Order Value',
      value: `₹${analytics.analytics.orders.averageValue.toFixed(2)}`,
      change: '+4.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-amber-500'
    }
  ] : [];

  const revenueData = [
    { month: 'Jan', revenue: 12400, commission: 1054 },
    { month: 'Feb', revenue: 15600, commission: 1326 },
    { month: 'Mar', revenue: 18200, commission: 1547 },
    { month: 'Apr', revenue: 16800, commission: 1428 },
    { month: 'May', revenue: 21200, commission: 1802 },
    { month: 'Jun', revenue: 19800, commission: 1683 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return CheckCircle;
      case 'product_update': return Activity;
      case 'order': return ShoppingCart;
      case 'suspicious': return AlertTriangle;
      default: return Activity;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading store analytics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Analytics</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadAnalytics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-gray-600 text-6xl mb-4">📊</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Analytics Data</h1>
          <p className="text-gray-600">Unable to load store analytics data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{store.name} Analytics</h1>
          <p className="text-gray-600 mt-2">Detailed performance metrics and activity monitoring</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Store Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {store.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{store.name}</h2>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{store.subdomain}.store.com</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{store.adminEmail}</span>
                </div>
              </div>
            </div>
          </div>
                     <div className="flex space-x-2">
             <button 
               onClick={() => setShowEditModal(true)}
               className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
               title="Edit Store"
             >
               <Edit className="w-4 h-4" />
             </button>
             <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
               <Power className="w-4 h-4 text-gray-600" />
             </button>
           </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="w-4 h-4 mr-1" />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue & Commission Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue & Commission Trend</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Commission</span>
            </div>
          </div>
        </div>
        <div className="h-64 flex items-end space-x-4">
          {revenueData.map((data, index) => {
            const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
            const maxCommission = Math.max(...revenueData.map(d => d.commission));
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '200px' }}>
                  <div 
                    className="bg-blue-500 rounded-t-lg absolute bottom-0 w-full"
                    style={{ height: `${(data.revenue / maxRevenue) * 180}px` }}
                  ></div>
                  <div 
                    className="bg-emerald-500 rounded-t-lg absolute bottom-0 w-1/3 right-0"
                    style={{ height: `${(data.commission / maxCommission) * 180}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Store Details</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Store Admin</p>
                <p className="font-medium text-gray-900">{store.adminName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{store.adminEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created Date</p>
                <p className="font-medium text-gray-900">{new Date(store.createdDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="font-medium text-gray-900">{store.lastLogin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Commission Rate</p>
                <p className="font-medium text-gray-900">{analytics.analytics.commission.rate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-900">{analytics.analytics.products.total}</p>
              </div>
            </div>
            
                         <div className="pt-4 border-t border-gray-200">
               <div className="bg-emerald-50 rounded-lg p-4">
                 <div className="flex justify-between items-center">
                   <span className="text-emerald-700 font-medium">Total Commission Earned</span>
                   <span className="text-2xl font-bold text-emerald-800">
                     ₹{analytics.analytics.commission.total.toLocaleString()}
                   </span>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Activity Logs</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {store.activityLogs.length > 0 ? store.activityLogs.map((log) => {
                const Icon = getActivityIcon(log.type);
                
                return (
                  <div key={log.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getSeverityColor(log.severity)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{log.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-gray-500">{log.timestamp}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <p className="text-gray-500 text-center py-8">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales Performance Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{analytics.analytics.orders.total}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{analytics.analytics.orders.averageValue.toFixed(0)}</p>
            <p className="text-sm text-gray-600">Average Order Value</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{analytics.analytics.commission.total.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Commission Earned</p>
          </div>
        </div>
      </div>

      {/* Customers Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Store Customers</h2>
          <div className="text-sm text-gray-600">
            Total: {analytics.analytics.customers.total} customers
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <p className="text-lg font-semibold text-blue-900">
            {analytics.analytics.customers.total} Customers
          </p>
          <p className="text-sm text-blue-600">
            Growth: {analytics.analytics.customers.growth}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Store Management Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Globe className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Visit Store</span>
          </button>
                     <button 
             onClick={() => setShowEditModal(true)}
             className="flex items-center space-x-3 p-4 rounded-lg border border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-colors"
           >
             <Edit className="w-5 h-5 text-blue-600" />
             <span className="text-sm font-medium text-gray-900">Edit Store</span>
           </button>
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <Power className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">Toggle Status</span>
          </button>
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-gray-900">Process Commission</span>
          </button>
        </div>
             </div>

       {/* Edit Store Modal */}
       {showEditModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-xl p-6 w-full max-w-md">
             <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Store</h2>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                 <input
                   type="text"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                   value={editingStore.name}
                   onChange={(e) => setEditingStore({ ...editingStore, name: e.target.value })}
                   placeholder="e.g., Ewa Luxe"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Subdomain</label>
                 <div className="flex">
                   <input
                     type="text"
                     className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500"
                     value={editingStore.subdomain}
                     onChange={(e) => setEditingStore({ ...editingStore, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
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
                   value={editingStore.adminName}
                   onChange={(e) => setEditingStore({ ...editingStore, adminName: e.target.value })}
                   placeholder="Ewa Admin"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                 <input
                   type="email"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                   value={editingStore.adminEmail}
                   onChange={(e) => setEditingStore({ ...editingStore, adminEmail: e.target.value })}
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
                   value={editingStore.commissionRate}
                   onChange={(e) => setEditingStore({ ...editingStore, commissionRate: parseFloat(e.target.value) })}
                 />
               </div>
             </div>
             <div className="flex space-x-3 mt-6">
               <button
                 onClick={() => setShowEditModal(false)}
                 className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
               >
                 Cancel
               </button>
               <button
                 onClick={handleEditStore}
                 className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
               >
                 Update Store
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'text-red-600 bg-red-50';
    case 'medium': return 'text-amber-600 bg-amber-50';
    default: return 'text-blue-600 bg-blue-50';
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'login': return CheckCircle;
    case 'product_update': return Activity;
    case 'order': return ShoppingCart;
    case 'suspicious': return AlertTriangle;
    default: return Activity;
  }
};

export default StoreAnalytics;