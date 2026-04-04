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
      localStorage.setItem('role', response.data.role || 'student');
    }
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
    }
    return response.data;
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
};

export const studentService = {
  async getStudentProfile(studentId = null) {
    const url = studentId ? `/student/stats/${studentId}` : '/student/stats';
    const response = await api.get(url);
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

  async getGithubCalendar() {
    const response = await api.get('/student/github-calendar');
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

export const batchService = {
  async getBatches() {
    const response = await api.get('/batches');
    return response.data;
  },

  async getBatchStudents(branch, year) {
    const response = await api.get(`/batches/${branch}/${year}`);
    return response.data;
  }
};

export const leaderboardService = {
  async getLeaderboard(platform, branch = '', year = '') {
    const params = {};
    if (branch) params.branch = branch;
    if (year) params.year = year;

    // Check if overall or platform specific
    const endpoint = platform === 'overall' ? '/leaderboard/overall' : `/leaderboard/${platform}`;
    const response = await api.get(endpoint, { params });
    return response.data;
  }
};

export const mentorService = {
  async getMentorDashboard() {
    const response = await api.get('/mentor/dashboard');
    return response.data;
  }
};

