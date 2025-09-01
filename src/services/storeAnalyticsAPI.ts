import { apiClient } from '../utils/apiClient';

export interface StoreAnalytics {
  store: {
    _id: string;
    name: string;
    slug: string;
    status: string;
    settings: {
      commissionRate: number;
    };
  };
  analytics: {
    revenue: {
      total: number;
      period: number;
      growth: string;
    };
    orders: {
      total: number;
      period: number;
      growth: string;
      averageValue: number;
    };
    customers: {
      total: number;
      growth: string;
    };
    products: {
      total: number;
    };
    commission: {
      rate: number;
      total: number;
      period: number;
    };
  };
  timeRange: {
    start: string;
    end: string;
    period: string;
  };
}

export interface StoreCustomer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  createdAt: string;
  lastLogin?: string;
}

export interface StoreOrder {
  _id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  customerId: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface RevenueTrend {
  date: string;
  revenue: number;
  commission: number;
}

export interface RevenueTrendsResponse {
  trends: RevenueTrend[];
  interval: string;
  timeRange: {
    start: string;
    end: string;
    period: string;
  };
}

export interface ActivityLog {
  id: string;
  type: 'login' | 'product_update' | 'order' | 'suspicious' | 'settings';
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  orderAmount?: number;
  customerEmail?: string;
}

export interface ActivityLogsResponse {
  logs: ActivityLog[];
  page: number;
  pages: number;
  total: number;
}

export const storeAnalyticsAPI = {
  // Get store analytics overview
  getStoreOverview: async (
    token: string,
    storeId: string,
    timeRange: string = '30d'
  ): Promise<StoreAnalytics> => {
    return apiClient.get(`/store-analytics/${storeId}/overview?timeRange=${timeRange}`, token);
  },

  // Get store customers
  getStoreCustomers: async (
    token: string,
    storeId: string,
    page: number = 1,
    limit: number = 20,
    search: string = ''
  ): Promise<{
    customers: StoreCustomer[];
    page: number;
    pages: number;
    total: number;
  }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append('search', search);

    return apiClient.get(`/store-analytics/${storeId}/customers?${params.toString()}`, token);
  },

  // Get store orders
  getStoreOrders: async (
    token: string,
    storeId: string,
    page: number = 1,
    limit: number = 20,
    status: string = '',
    timeRange: string = '30d'
  ): Promise<{
    orders: StoreOrder[];
    page: number;
    pages: number;
    total: number;
  }> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      timeRange,
    });

    if (status && status !== 'all') params.append('status', status);

    return apiClient.get(`/store-analytics/${storeId}/orders?${params.toString()}`, token);
  },

  // Get store revenue trends
  getStoreRevenueTrends: async (
    token: string,
    storeId: string,
    timeRange: string = '30d'
  ): Promise<RevenueTrendsResponse> => {
    return apiClient.get(`/store-analytics/${storeId}/revenue-trends?timeRange=${timeRange}`, token);
  },

  // Get store activity logs
  getStoreActivityLogs: async (
    token: string,
    storeId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<ActivityLogsResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    return apiClient.get(`/store-analytics/${storeId}/activity-logs?${params.toString()}`, token);
  },
};
