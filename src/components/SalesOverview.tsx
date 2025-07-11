import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck
} from 'lucide-react';

const SalesOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedAdmin, setSelectedAdmin] = useState('all');

  const admins = [
    { id: 'all', name: 'All Admins' },
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
    { id: '3', name: 'Emily Davis' },
    { id: '4', name: 'David Wilson' }
  ];

  const getSalesStatsForAdmin = (adminId: string) => {
    const allStats = {
      revenue: '$124,532',
      revenueChange: '+12.5%',
      orders: '1,429',
      ordersChange: '+8.2%',
      avgOrder: '$87.12',
      avgOrderChange: '+4.3%',
      customers: '342',
      customersChange: '-2.1%'
    };

    const individualStats = {
      '1': { 
        revenue: '$45,230', revenueChange: '+15.2%', 
        orders: '523', ordersChange: '+12.1%', 
        avgOrder: '$86.50', avgOrderChange: '+6.8%',
        customers: '156', customersChange: '+8.3%'
      },
      '2': { 
        revenue: '$32,890', revenueChange: '+8.7%', 
        orders: '398', ordersChange: '+6.8%', 
        avgOrder: '$82.65', avgOrderChange: '+2.1%',
        customers: '124', customersChange: '+4.2%'
      },
      '3': { 
        revenue: '$28,456', revenueChange: '+11.3%', 
        orders: '342', ordersChange: '+9.4%', 
        avgOrder: '$83.18', avgOrderChange: '+1.9%',
        customers: '98', customersChange: '+6.1%'
      },
      '4': { 
        revenue: '$17,956', revenueChange: '+4.2%', 
        orders: '166', ordersChange: '+2.1%', 
        avgOrder: '$108.17', avgOrderChange: '+2.1%',
        customers: '64', customersChange: '-1.5%'
      }
    };

    return adminId === 'all' ? allStats : individualStats[adminId] || allStats;
  };

  const stats = getSalesStatsForAdmin(selectedAdmin);

  const salesStats = [
    {
      title: 'Total Revenue',
      value: stats.revenue,
      change: stats.revenueChange,
      trend: stats.revenueChange.startsWith('+') ? 'up' : 'down',
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      change: stats.ordersChange,
      trend: stats.ordersChange.startsWith('+') ? 'up' : 'down',
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: 'Average Order Value',
      value: stats.avgOrder,
      change: stats.avgOrderChange,
      trend: stats.avgOrderChange.startsWith('+') ? 'up' : 'down',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'New Customers',
      value: stats.customers,
      change: stats.customersChange,
      trend: stats.customersChange.startsWith('+') ? 'up' : 'down',
      icon: Users,
      color: 'bg-amber-500'
    }
  ];

  const getSalesDataForAdmin = (adminId: string) => {
    const allData = [
      { date: '2024-01-01', revenue: 12400, orders: 85 },
      { date: '2024-01-02', revenue: 15600, orders: 92 },
      { date: '2024-01-03', revenue: 18200, orders: 108 },
      { date: '2024-01-04', revenue: 16800, orders: 95 },
      { date: '2024-01-05', revenue: 21200, orders: 125 },
      { date: '2024-01-06', revenue: 19800, orders: 118 },
      { date: '2024-01-07', revenue: 23400, orders: 135 }
    ];

    if (adminId === 'all') return allData;

    // Scale data based on admin performance
    const scaleFactor = adminId === '1' ? 0.4 : adminId === '2' ? 0.3 : adminId === '3' ? 0.25 : 0.15;
    return allData.map(data => ({
      ...data,
      revenue: Math.round(data.revenue * scaleFactor),
      orders: Math.round(data.orders * scaleFactor)
    }));
  };

  const salesData = getSalesDataForAdmin(selectedAdmin);

  const getTopProductsForAdmin = (adminId: string) => {
    const allProducts = [
      { name: 'Premium Headphones', sales: 245, revenue: '$24,500', growth: '+15%' },
      { name: 'Wireless Mouse', sales: 189, revenue: '$18,900', growth: '+8%' },
      { name: 'Mechanical Keyboard', sales: 167, revenue: '$16,700', growth: '+12%' },
      { name: 'USB-C Hub', sales: 143, revenue: '$14,300', growth: '+5%' },
      { name: 'Monitor Stand', sales: 98, revenue: '$9,800', growth: '-3%' }
    ];

    if (adminId === 'all') return allProducts;

    // Filter and scale products based on admin
    const scaleFactor = adminId === '1' ? 0.4 : adminId === '2' ? 0.3 : adminId === '3' ? 0.25 : 0.15;
    return allProducts.slice(0, 3).map(product => ({
      ...product,
      sales: Math.round(product.sales * scaleFactor),
      revenue: `$${Math.round(parseFloat(product.revenue.replace('$', '').replace(',', '')) * scaleFactor).toLocaleString()}`
    }));
  };

  const topProducts = getTopProductsForAdmin(selectedAdmin);

  const salesByRegion = [
    { region: 'North America', revenue: '$45,234', percentage: 36.3, color: 'bg-blue-500' },
    { region: 'Europe', revenue: '$32,456', percentage: 26.1, color: 'bg-emerald-500' },
    { region: 'Asia Pacific', revenue: '$28,789', percentage: 23.1, color: 'bg-purple-500' },
    { region: 'South America', revenue: '$12,345', percentage: 9.9, color: 'bg-amber-500' },
    { region: 'Others', revenue: '$5,708', percentage: 4.6, color: 'bg-gray-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Overview</h1>
          <p className="text-gray-600 mt-2">Track sales performance and revenue analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedAdmin}
            onChange={(e) => setSelectedAdmin(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {admins.map(admin => (
              <option key={admin.id} value={admin.id}>{admin.name}</option>
            ))}
          </select>
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Selected Admin Info */}
      {selectedAdmin !== 'all' && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Sales data for: {admins.find(a => a.id === selectedAdmin)?.name}
              </h3>
              <p className="text-gray-600">Revenue and performance metrics for this administrator</p>
            </div>
          </div>
        </div>
      )}

      {/* Sales Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesStats.map((stat) => {
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

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Revenue Trend {selectedAdmin !== 'all' ? `- ${admins.find(a => a.id === selectedAdmin)?.name}` : ''}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Orders</span>
            </div>
          </div>
        </div>
        <div className="h-64 flex items-end space-x-2">
          {salesData.map((data, index) => {
            const maxRevenue = Math.max(...salesData.map(d => d.revenue));
            const maxOrders = Math.max(...salesData.map(d => d.orders));
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '200px' }}>
                  <div 
                    className="bg-blue-500 rounded-t-lg absolute bottom-0 w-full"
                    style={{ height: `${(data.revenue / maxRevenue) * 180}px` }}
                  ></div>
                  <div 
                    className="bg-emerald-500 rounded-t-lg absolute bottom-0 w-1/2"
                    style={{ height: `${(data.orders / maxOrders) * 180}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Selling Products {selectedAdmin !== 'all' ? `- ${admins.find(a => a.id === selectedAdmin)?.name}` : ''}
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                    <p className={`text-xs ${
                      product.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {product.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Region */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Sales by Region</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {salesByRegion.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{region.region}</span>
                    <span className="text-sm font-semibold text-gray-900">{region.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${region.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{region.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Sales Performance Summary {selectedAdmin !== 'all' ? `- ${admins.find(a => a.id === selectedAdmin)?.name}` : ''}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats.revenueChange}
            </p>
            <p className="text-sm text-gray-600">Revenue Growth</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.customers}</p>
            <p className="text-sm text-gray-600">New Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;