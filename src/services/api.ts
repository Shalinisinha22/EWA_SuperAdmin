import { apiClient } from '../utils/apiClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  status: string;
  storeName: string;
  storeId: string | null;
  role: string;
  permissions: string[];
  token: string;
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AdminUser> => {
    return apiClient.post('/admin/login', credentials);
  },

  getProfile: async (token: string): Promise<AdminUser> => {
    return apiClient.get('/admin/profile', token);
  },
};
