import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Interceptor to attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  }
};

export const studentService = {
  async getStudentProfile() {
    const response = await api.get('/student/stats');
    return response.data;
  },

  async getBatchLeaderboard(platform = 'leetcode') {
    const response = await api.get(`/leaderboard/${platform}`);
    return response.data;
  },

  async getAnalytics() {
    const response = await api.get('/student/analytics');
    return response.data;
  },

  async getStudentSuggestions() {
    const response = await api.get('/student/suggestions');
    return response.data;
  },

  async syncData() {
    const response = await api.post('/student/sync');
    return response.data;
  },

  async updatePlatforms(platforms) {
    const response = await api.put('/student/platforms', platforms);
    return response.data;
  },

  async verifyPlatform(platform, username) {
    const response = await api.post('/student/verify', { platform, username });
    return response.data;
  }
};

export const mentorService = {
  async createBatch(batchData) {
    const response = await api.post('/batches', batchData);
    return response.data;
  },

  async getBatches() {
    const response = await api.get('/batches');
    return response.data;
  },

  async getBatchDetails(batchId) {
    const response = await api.get(`/batches/${batchId}`);
    return response.data;
  },

  async addStudentToBatch(batchId, userId) {
    const response = await api.post('/batches/add-student', { batchId, userId });
    return response.data;
  },

  async removeStudentFromBatch(batchId, userId) {
    const response = await api.delete('/batches/remove-student', { data: { batchId, userId } });
    return response.data;
  },

  async getMentorDashboard() {
    const response = await api.get('/mentor/dashboard');
    return response.data;
  }
};
