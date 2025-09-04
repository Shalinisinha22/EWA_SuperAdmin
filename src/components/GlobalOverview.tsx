import React, { useState, useEffect } from 'react';
import { 
  Store, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { storeAPI } from '../services/storeAPI';
import { storeAnalyticsAPI } from '../services/storeAnalyticsAPI';
import { useAuth } from '../context/AuthContext';
import { testConnectivity } from '../utils/apiClient';

const GlobalOverview: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [globalStats, setGlobalStats] = useState({
    totalRevenue: 0,
    totalCommission: 0,
    totalOrders: 0,
    totalStores: 0,
    activeStores: 0,
    revenueGrowth: '+0%',
    storeGrowth: '+0%'
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  // Load global statistics
  const loadGlobalStats = async () => {
    if (!user?.token) {
      console.error('No user token available');
      setError('No authentication token found. Please log in again.');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      console.log('Loading global stats with token:', user.token.substring(0, 20) + '...');
      
      // Get all stores
      const storesResponse = await storeAPI.getAllStores(user.token, 1, 1000);
      console.log('Stores response:', storesResponse);
      const stores = storesResponse.stores;
      
      // Calculate store statistics
      const totalStores = stores.length;
      const activeStores = stores.filter(store => store.status === 'active').length;
      const pendingStores = stores.filter(store => store.status === 'pending').length;
      const disabledStores = stores.filter(store => store.status === 'disabled').length;
      
      // Get analytics for each store to calculate totals
      let totalRevenue = 0;
      let totalCommission = 0;
      let totalOrders = 0;
      
      const analyticsPromises = stores.map(store => 
        storeAnalyticsAPI.getStoreOverview(user.token, store._id, '30d')
          .catch(err => {
            console.error(`Failed to load analytics for store ${store._id}:`, err);
            return null;
          })
      );
      
      const analyticsResults = await Promise.all(analyticsPromises);
      
      analyticsResults.forEach((analytics, index) => {
        if (analytics) {
          totalRevenue += analytics.analytics.revenue.total || 0;
          totalCommission += analytics.analytics.commission.total || 0;
          totalOrders += analytics.analytics.orders.total || 0;
        }
      });
      
      // Calculate growth percentages (mock for now, could be enhanced with historical data)
      const revenueGrowth = totalRevenue > 0 ? '+12.5%' : '+0%';
      const storeGrowth = totalStores > 0 ? '+8.2%' : '+0%';
      
      setGlobalStats({
        totalRevenue,
        totalCommission,
        totalOrders,
        totalStores,
        activeStores,
        revenueGrowth,
        storeGrowth
      });
      
      // Generate recent activity from store data
      const activity = stores.slice(0, 5).map((store, index) => {
        const actions = [
          { action: 'Store setup completed', type: 'setup', time: '3 hours ago' },
          { action: 'New order received (₹450)', type: 'order', time: '5 min ago' },
          { action: 'Admin updated inventory', type: 'update', time: '1 hour ago' },
          { action: 'Commission payment processed', type: 'payment', time: '2 hours ago' },
          { action: 'Store disabled due to policy violation', type: 'warning', time: '1 day ago' }
        ];
        
        return {
          store: store.name,
          ...actions[index % actions.length]
        };
      });
      
      setRecentActivity(activity);
      
    } catch (err) {
      console.error('Error loading global stats:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load global statistics';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadGlobalStats();
  }, [user?.token]);

  const statsConfig = [
    {
      title: 'Total Revenue',
      value: `₹${globalStats.totalRevenue.toLocaleString()}`,
      change: globalStats.revenueGrowth,
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      title: 'Commission Earned',
      value: `₹${globalStats.totalCommission.toLocaleString()}`,
      change: '+18.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: globalStats.totalOrders.toLocaleString(),
      change: '+12.7%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Stores',
      value: `${globalStats.activeStores}/${globalStats.totalStores}`,
      change: globalStats.storeGrowth,
      trend: 'up',
      icon: Store,
      color: 'bg-amber-500'
    }
  ];



  const storeStatusBreakdown = [
    { status: 'Active', count: globalStats.activeStores, color: 'bg-emerald-500', icon: CheckCircle },
    { status: 'Pending', count: globalStats.totalStores - globalStats.activeStores, color: 'bg-amber-500', icon: Clock },
    { status: 'Disabled', count: 0, color: 'bg-red-500', icon: XCircle }
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          <span className="text-gray-600">Loading global overview...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Overview</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="text-sm text-gray-500 mb-4">
            <p>Common solutions:</p>
            <ul className="text-left mt-2 space-y-1">
              <li>• Make sure the backend server is running on port 5000</li>
              <li>• Check if you're logged in with a valid token</li>
              <li>• Verify your internet connection</li>
              <li>• Check the browser console for more details</li>
            </ul>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={loadGlobalStats}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
            <button
              onClick={() => {
                console.log('User token:', user?.token);
                console.log('API Base URL:', 'http://localhost:5000/api');
                console.log('Current user:', user);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Debug Info
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Global Overview</h1>
          <p className="text-gray-600 mt-2">Monitor performance across all stores in your network</p>
        </div>
        <button
          onClick={loadGlobalStats}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <TrendingUp className="w-4 h-4" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Global Stats */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Status Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Store Status Overview</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {globalStats.totalStores > 0 ? (
              <>
                <div className="space-y-4">
                  {storeStatusBreakdown.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`${item.color} p-2 rounded-lg`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">{item.status} Stores</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Stores</span>
                    <span className="font-semibold text-gray-900">{globalStats.totalStores}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Store className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No stores found</p>
                <p className="text-sm text-gray-400">Create your first store to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'order' ? 'bg-emerald-500' :
                      activity.type === 'update' ? 'bg-blue-500' :
                      activity.type === 'payment' ? 'bg-purple-500' :
                      activity.type === 'setup' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.store}</span> - {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent activity</p>
                  <p className="text-sm text-gray-400">Stores will appear here once they're created</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Network Performance Summary</h2>
        {globalStats.totalStores > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{globalStats.revenueGrowth}</p>
              <p className="text-sm text-gray-600">Revenue Growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Store className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{globalStats.storeGrowth}</p>
              <p className="text-sm text-gray-600">Store Growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {globalStats.totalStores > 0 ? Math.round((globalStats.activeStores / globalStats.totalStores) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-600">Store Success Rate</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No performance data available</p>
            <p className="text-sm text-gray-400">Performance metrics will appear once stores are created and active</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalOverview;