import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Attach Sanctum token from localStorage to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* ─── Public Services ───────────────────── */

export const projectService = {
    getProjects: () => api.get('/projects').then(r => r.data),
};

export const testimonialService = {
    getTestimonials: () => api.get('/testimonials').then(r => r.data),
};

export const contactService = {
    sendMessage: (data) => api.post('/contact', data).then(r => r.data),
};

/* ─── Auth Services ─────────────────────── */

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        const { token, user } = response.data;
        localStorage.setItem('admin_token', token);
        return { token, user };
    },
    logout: async () => {
        await api.post('/logout');
        localStorage.removeItem('admin_token');
    },
    me: () => api.get('/me').then(r => r.data),
};

/* ─── Admin Services ────────────────────── */

export const adminProjectService = {
    getAll: () => api.get('/admin/projects').then(r => r.data),
    create: (data) => api.post('/admin/projects', data).then(r => r.data),
    update: (id, data) => api.put(`/admin/projects/${id}`, data).then(r => r.data),
    delete: (id) => api.delete(`/admin/projects/${id}`).then(r => r.data),
};

export const adminTestimonialService = {
    getAll: () => api.get('/admin/testimonials').then(r => r.data),
    create: (data) => api.post('/admin/testimonials', data).then(r => r.data),
    update: (id, data) => api.put(`/admin/testimonials/${id}`, data).then(r => r.data),
    delete: (id) => api.delete(`/admin/testimonials/${id}`).then(r => r.data),
};

export const adminMessageService = {
    getAll: () => api.get('/admin/messages').then(r => r.data),
    markRead: (id) => api.patch(`/admin/messages/${id}/read`).then(r => r.data),
};

export default api;
