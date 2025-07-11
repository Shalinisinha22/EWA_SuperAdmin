import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  ShoppingCart, 
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Filter,
  UserCheck
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedAdmin, setSelectedAdmin] = useState('all');

  const admins = [
    { id: 'all', name: 'All Admins' },
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
    { id: '3', name: 'Emily Davis' },
    { id: '4', name: 'David Wilson' }
  ];

  const getStatsForAdmin = (adminId: string) => {
    // Mock data - in real app, this would filter by admin
    const allStats = {
      revenue: '$124,532',
      revenueChange: '+12.5%',
      admins: '24',
      adminsChange: '+2',
      orders: '1,429',
      ordersChange: '+8.2%',
      views: '89,432',
      viewsChange: '-2.1%'
    };

    const individualStats = {
      '1': { revenue: '$45,230', revenueChange: '+15.2%', orders: '523', ordersChange: '+12.1%', views: '32,145', viewsChange: '+5.3%' },
      '2': { revenue: '$32,890', revenueChange: '+8.7%', orders: '398', ordersChange: '+6.8%', views: '24,567', viewsChange: '+2.1%' },
      '3': { revenue: '$28,456', revenueChange: '+11.3%', orders: '342', ordersChange: '+9.4%', views: '19,876', viewsChange: '+3.7%' },
      '4': { revenue: '$17,956', revenueChange: '+4.2%', orders: '166', ordersChange: '+2.1%', views: '12,844', viewsChange: '-1.2%' }
    };

    return adminId === 'all' ? allStats : individualStats[adminId] || allStats;
  };

  const stats = getStatsForAdmin(selectedAdmin);

  const statsConfig = [
    {
      title: 'Total Revenue',
      value: stats.revenue,
      change: stats.revenueChange,
      trend: stats.revenueChange.startsWith('+') ? 'up' : 'down',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      title: selectedAdmin === 'all' ? 'Active Admins' : 'Orders Handled',
      value: selectedAdmin === 'all' ? stats.admins : stats.orders,
      change: selectedAdmin === 'all' ? stats.adminsChange : stats.ordersChange,
      trend: (selectedAdmin === 'all' ? stats.adminsChange : stats.ordersChange).startsWith('+') ? 'up' : 'down',
      icon: selectedAdmin === 'all' ? Users : ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      change: stats.ordersChange,
      trend: stats.ordersChange.startsWith('+') ? 'up' : 'down',
      icon: ShoppingCart,
      color: 'bg-purple-500'
    },
    {
      title: 'Page Views',
      value: stats.views,
      change: stats.viewsChange,
      trend: stats.viewsChange.startsWith('+') ? 'up' : 'down',
      icon: Eye,
      color: 'bg-amber-500'
    }
  ];

  const getRecentActivityForAdmin = (adminId: string) => {
    const allActivity = [
      { admin: 'Sarah Johnson', action: 'Created new product', time: '2 hours ago', type: 'create' },
      { admin: 'Mike Chen', action: 'Updated order status', time: '4 hours ago', type: 'update' },
      { admin: 'Emily Davis', action: 'Processed refund', time: '6 hours ago', type: 'process' },
      { admin: 'David Wilson', action: 'Added new admin user', time: '1 day ago', type: 'create' },
      { admin: 'Lisa Anderson', action: 'Generated sales report', time: '1 day ago', type: 'report' }
    ];

    if (adminId === 'all') return allActivity;
    
    const selectedAdminName = admins.find(a => a.id === adminId)?.name;
    return allActivity.filter(activity => activity.admin === selectedAdminName);
  };

  const recentActivity = getRecentActivityForAdmin(selectedAdmin);

  const getTopPerformersForAdmin = (adminId: string) => {
    const allPerformers = [
      { name: 'Sarah Johnson', orders: 147, revenue: '$23,450' },
      { name: 'Mike Chen', orders: 132, revenue: '$19,890' },
      { name: 'Emily Davis', orders: 98, revenue: '$15,670' },
      { name: 'David Wilson', orders: 87, revenue: '$12,340' }
    ];

    if (adminId === 'all') return allPerformers;
    
    const selectedAdminName = admins.find(a => a.id === adminId)?.name;
    return allPerformers.filter(performer => performer.name === selectedAdminName);
  };

  const topPerformers = getTopPerformersForAdmin(selectedAdmin);

  return (
    <div className="space-y-6">
      {/* Header with Admin Filter */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Monitor business performance and admin activities</p>
        </div>
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedAdmin}
            onChange={(e) => setSelectedAdmin(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {admins.map(admin => (
              <option key={admin.id} value={admin.id}>{admin.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Admin Info */}
      {selectedAdmin !== 'all' && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Viewing data for: {admins.find(a => a.id === selectedAdmin)?.name}
              </h3>
              <p className="text-gray-600">Performance metrics and activity for this administrator</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
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
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedAdmin === 'all' ? 'Recent Activity' : `${admins.find(a => a.id === selectedAdmin)?.name}'s Activity`}
              </h2>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'create' ? 'bg-emerald-500' :
                    activity.type === 'update' ? 'bg-blue-500' :
                    activity.type === 'process' ? 'bg-amber-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.admin}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No recent activity for this admin</p>
              )}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedAdmin === 'all' ? 'Top Performing Admins' : 'Performance Details'}
              </h2>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topPerformers.length > 0 ? topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {performer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                      <p className="text-xs text-gray-500">{performer.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{performer.revenue}</p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No performance data available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Add New Admin</span>
          </button>
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-gray-900">View Sales Report</span>
          </button>
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <ShoppingCart className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">Manage Orders</span>
          </button>
          <button className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors">
            <Activity className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium text-gray-900">System Status</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;