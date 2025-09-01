export interface Store {
  id: string;
  name: string;
  subdomain: string;
  adminName: string;
  adminEmail: string;
  status: 'active' | 'pending' | 'disabled';
  revenue: {
    total: number;
    monthly: number;
    weekly: number;
  };
  salesVolume: {
    orders: number;
    aov: number;
    products: number;
  };
  commission: {
    rate: number;
    earned: number;
  };
  createdDate: string;
  lastLogin: string;
  activityLogs: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  type: 'login' | 'product_update' | 'order' | 'suspicious' | 'settings';
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export interface GlobalStats {
  totalStores: number;
  activeStores: number;
  inactiveStores: number;
  totalRevenue: number;
  totalCommission: number;
  totalOrders: number;
  revenueGrowth: string;
  storeGrowth: string;
}