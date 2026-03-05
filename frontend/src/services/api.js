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
    delete: (id) => api.delete(`/admin/messages/${id}`).then(r => r.data),
};

export const settingsService = {
    getAll: () => api.get('/settings').then(r => r.data),
    update: (data) => api.put('/admin/settings', data).then(r => r.data),
    uploadProfileImage: (file) => {
        const form = new FormData();
        form.append('image', file);
        return api.post('/admin/upload-profile-image', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(r => r.data);
    },
};

export const uploadService = {
    image: (file, folder = 'uploads') => {
        const form = new FormData();
        form.append('image', file);
        form.append('folder', folder);
        return api.post('/admin/upload-image', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(r => r.data);
    },
};

export const skillService = {
    getAll: () => api.get('/skills').then(r => r.data),
};

export const adminSkillService = {
    getAll: () => api.get('/admin/skills').then(r => r.data),
    create: (data) => api.post('/admin/skills', data).then(r => r.data),
    update: (id, data) => api.put(`/admin/skills/${id}`, data).then(r => r.data),
    delete: (id) => api.delete(`/admin/skills/${id}`).then(r => r.data),
};

export default api;
