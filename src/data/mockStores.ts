import { Store, GlobalStats } from '../types/store';

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Ewa Luxe',
    subdomain: 'ewaluxe',
    adminName: 'Ewa Admin',
    adminEmail: 'ewa@admin.com',
    status: 'live',
    revenue: {
      total: 125430,
      monthly: 45230,
      weekly: 12450
    },
    salesVolume: {
      orders: 342,
      aov: 367.25,
      products: 89
    },
    commission: {
      rate: 8.5,
      earned: 10661.55
    },
    createdDate: '2023-08-15',
    lastLogin: '2 hours ago',
    activityLogs: [
      {
        id: '1',
        type: 'login',
        description: 'Admin logged in from new device',
        timestamp: '2 hours ago',
        severity: 'low'
      },
      {
        id: '2',
        type: 'product_update',
        description: 'Updated 5 product prices',
        timestamp: '4 hours ago',
        severity: 'low'
      },
      {
        id: '3',
        type: 'order',
        description: 'Processed large order ($2,450)',
        timestamp: '6 hours ago',
        severity: 'medium'
      }
    ]
  },
  {
    id: '2',
    name: 'TechHub Pro',
    subdomain: 'techhubpro',
    adminName: 'Alex Chen',
    adminEmail: 'alex@techhub.com',
    status: 'live',
    revenue: {
      total: 89650,
      monthly: 32100,
      weekly: 8900
    },
    salesVolume: {
      orders: 256,
      aov: 350.20,
      products: 67
    },
    commission: {
      rate: 7.5,
      earned: 6723.75
    },
    createdDate: '2023-09-22',
    lastLogin: '1 day ago',
    activityLogs: [
      {
        id: '4',
        type: 'settings',
        description: 'Updated store theme settings',
        timestamp: '1 day ago',
        severity: 'low'
      },
      {
        id: '5',
        type: 'product_update',
        description: 'Added 3 new products',
        timestamp: '2 days ago',
        severity: 'low'
      }
    ]
  },
  {
    id: '3',
    name: 'Fashion Forward',
    subdomain: 'fashionforward',
    adminName: 'Maria Rodriguez',
    adminEmail: 'maria@fashion.com',
    status: 'pending',
    revenue: {
      total: 0,
      monthly: 0,
      weekly: 0
    },
    salesVolume: {
      orders: 0,
      aov: 0,
      products: 12
    },
    commission: {
      rate: 8.0,
      earned: 0
    },
    createdDate: '2024-01-10',
    lastLogin: 'Never',
    activityLogs: [
      {
        id: '6',
        type: 'product_update',
        description: 'Initial product setup',
        timestamp: '3 days ago',
        severity: 'low'
      }
    ]
  },
  {
    id: '4',
    name: 'Home Essentials',
    subdomain: 'homeessentials',
    adminName: 'David Kim',
    adminEmail: 'david@home.com',
    status: 'disabled',
    revenue: {
      total: 45230,
      monthly: 0,
      weekly: 0
    },
    salesVolume: {
      orders: 123,
      aov: 367.72,
      products: 45
    },
    commission: {
      rate: 7.0,
      earned: 3166.10
    },
    createdDate: '2023-11-05',
    lastLogin: '2 weeks ago',
    activityLogs: [
      {
        id: '7',
        type: 'suspicious',
        description: 'Multiple failed login attempts',
        timestamp: '2 weeks ago',
        severity: 'high'
      }
    ]
  },
  {
    id: '5',
    name: 'Sports Galaxy',
    subdomain: 'sportsgalaxy',
    adminName: 'Jennifer Lopez',
    adminEmail: 'jen@sports.com',
    status: 'live',
    revenue: {
      total: 78900,
      monthly: 28450,
      weekly: 7200
    },
    salesVolume: {
      orders: 198,
      aov: 398.48,
      products: 156
    },
    commission: {
      rate: 8.0,
      earned: 6312.00
    },
    createdDate: '2023-10-12',
    lastLogin: '5 hours ago',
    activityLogs: [
      {
        id: '8',
        type: 'order',
        description: 'Processed 15 orders today',
        timestamp: '5 hours ago',
        severity: 'low'
      }
    ]
  }
];

export const globalStats: GlobalStats = {
  totalStores: 5,
  activeStores: 3,
  inactiveStores: 2,
  totalRevenue: 339210,
  totalCommission: 26863.40,
  totalOrders: 919,
  revenueGrowth: '+15.2%',
  storeGrowth: '+25.0%'
};