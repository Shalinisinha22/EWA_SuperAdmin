import { apiClient } from '../utils/apiClient';

export interface Store {
  _id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'pending' | 'disabled';
  settings: {
    currency: string;
    timezone: string;
    language: string;
    commissionRate: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface StoreAdmin {
  _id: string;
  name: string;
  email: string;
  status: string;
  role: string;
}

export interface CreateStoreData {
  name: string;
  subdomain: string;
  adminName: string;
  adminEmail: string;
  adminPassword?: string;
  commissionRate?: number;
}

export interface UpdateStoreData {
  name?: string;
  slug?: string;
  adminName?: string;
  adminEmail?: string;
  commissionRate?: number;
}

export interface StoreListResponse {
  stores: Store[];
  page: number;
  pages: number;
  total: number;
}

export interface StoreDetailResponse {
  store: Store;
  admin: StoreAdmin;
}

export const storeAPI = {
  // Get all stores with pagination and filters
  getAllStores: async (
    token: string,
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string
  ): Promise<StoreListResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append('search', search);
    if (status && status !== 'all') params.append('status', status);

    return apiClient.get(`/stores?${params.toString()}`, token);
  },

  // Get store by ID
  getStoreById: async (token: string, storeId: string): Promise<StoreDetailResponse> => {
    return apiClient.get(`/stores/${storeId}`, token);
  },

  // Create new store with admin
  createStore: async (token: string, storeData: CreateStoreData): Promise<{
    message: string;
    store: Store;
    admin: StoreAdmin;
  }> => {
    return apiClient.post('/stores', storeData, token);
  },

  // Update store details
  updateStore: async (
    token: string,
    storeId: string,
    storeData: UpdateStoreData
  ): Promise<{
    message: string;
    store: Store;
  }> => {
    return apiClient.put(`/stores/${storeId}`, storeData, token);
  },

  // Update store status
  updateStoreStatus: async (
    token: string,
    storeId: string,
    status: 'active' | 'pending' | 'disabled'
  ): Promise<{
    message: string;
    store: Store;
  }> => {
    return apiClient.put(`/stores/${storeId}/status`, { status }, token);
  },

  // Delete store
  deleteStore: async (token: string, storeId: string): Promise<{ message: string }> => {
    return apiClient.delete(`/stores/${storeId}`, token);
  },

  // Reset admin password
  resetAdminPassword: async (
    token: string,
    storeId: string,
    adminEmail: string
  ): Promise<{
    message: string;
    newPassword: string;
    admin: StoreAdmin;
  }> => {
    return apiClient.post(`/stores/${storeId}/reset-password`, { adminEmail }, token);
  },
};

