import React from 'react';
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
  Clock
} from 'lucide-react';
import { globalStats } from '../data/mockStores';

const GlobalOverview: React.FC = () => {
  const statsConfig = [
    {
      title: 'Total Revenue',
      value: `$${globalStats.totalRevenue.toLocaleString()}`,
      change: globalStats.revenueGrowth,
      trend: 'up',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      title: 'Commission Earned',
      value: `$${globalStats.totalCommission.toLocaleString()}`,
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

  const recentActivity = [
    { store: 'Ewa Luxe', action: 'New order received ($450)', time: '5 min ago', type: 'order' },
    { store: 'TechHub Pro', action: 'Admin updated inventory', time: '1 hour ago', type: 'update' },
    { store: 'Sports Galaxy', action: 'Commission payment processed', time: '2 hours ago', type: 'payment' },
    { store: 'Fashion Forward', action: 'Store setup completed', time: '3 hours ago', type: 'setup' },
    { store: 'Home Essentials', action: 'Store disabled due to policy violation', time: '1 day ago', type: 'warning' }
  ];

  const storeStatusBreakdown = [
    { status: 'Live', count: globalStats.activeStores, color: 'bg-emerald-500', icon: CheckCircle },
    { status: 'Pending', count: 1, color: 'bg-amber-500', icon: Clock },
    { status: 'Disabled', count: 1, color: 'bg-red-500', icon: XCircle }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Global Overview</h1>
        <p className="text-gray-600 mt-2">Monitor performance across all stores in your network</p>
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
              {recentActivity.map((activity, index) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Network Performance Summary</h2>
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
              {Math.round((globalStats.activeStores / globalStats.totalStores) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Store Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalOverview;