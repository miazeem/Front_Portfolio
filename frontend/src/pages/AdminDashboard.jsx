import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, FolderOpen, MessageSquare, Star, ChevronRight,
    Loader2, Trash2, CheckSquare, Plus, LayoutDashboard,
    Pencil, X, Save, Quote, Settings, Mail, MapPin, Github, Linkedin
} from 'lucide-react';
import {
    authService,
    adminProjectService,
    adminTestimonialService,
    adminMessageService,
    settingsService
} from '../services/api';

/* â”€â”€â”€ Reusable Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Modal({ title, onClose, children }) {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative z-10 w-full max-w-xl bg-navy-900 border border-white/15 rounded-2xl shadow-2xl text-slate-100 overflow-hidden"
                >
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                        <h3 className="text-lg font-bold">{title}</h3>
                        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto max-h-[75vh]">{children}</div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

/* â”€â”€â”€ Form Field â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Field({ label, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-100/70 mb-1.5">{label}</label>
            {children}
        </div>
    );
}
const inputCls = "w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-gold transition-all placeholder:text-slate-100/20";

/* â”€â”€â”€ Project Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const emptyProject = { title: '', problem: '', solution: '', image_url: '', live_url: '', github_url: '', tags: '', order: 0, is_featured: true };

function ProjectForm({ initial = emptyProject, onSave, saving }) {
    const [form, setForm] = useState({ ...initial, tags: Array.isArray(initial.tags) ? initial.tags.join(', ') : initial.tags || '' });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Title *"><input className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} required placeholder="FinTech Dashboard" /></Field>
            <Field label="Problem *"><textarea className={inputCls} rows={2} value={form.problem} onChange={e => set('problem', e.target.value)} required placeholder="What problem did it solve?" /></Field>
            <Field label="Solution *"><textarea className={inputCls} rows={2} value={form.solution} onChange={e => set('solution', e.target.value)} required placeholder="How did you solve it?" /></Field>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Image URL"><input className={inputCls} value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://..." /></Field>
                <Field label="Live URL"><input className={inputCls} value={form.live_url} onChange={e => set('live_url', e.target.value)} placeholder="https://..." /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <Field label="GitHub URL"><input className={inputCls} value={form.github_url} onChange={e => set('github_url', e.target.value)} placeholder="https://github.com/..." /></Field>
                <Field label="Order"><input type="number" className={inputCls} value={form.order} onChange={e => set('order', Number(e.target.value))} /></Field>
            </div>
            <Field label="Tags (comma separated)"><input className={inputCls} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="React, Laravel, MySQL" /></Field>
            <label className="flex items-center gap-3 cursor-pointer select-none">
                <div onClick={() => set('is_featured', !form.is_featured)} className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${form.is_featured ? 'bg-ink/50' : 'bg-white/20'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_featured ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm text-slate-100/70">Featured on portfolio</span>
            </label>
            <button type="submit" disabled={saving} className="w-full mt-2 py-3 bg-ink/50 text-navy-900 font-bold rounded-xl hover:bg-blue-500-light transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Project</>}
            </button>
        </form>
    );
}

/* â”€â”€â”€ Testimonial Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const emptyTestimonial = { name: '', role: '', company: '', message: '', avatar_url: '', order: 0 };

function TestimonialForm({ initial = emptyTestimonial, onSave, saving }) {
    const [form, setForm] = useState({ ...initial });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <Field label="Name *"><input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} required placeholder="Sarah Chen" /></Field>
                <Field label="Role *"><input className={inputCls} value={form.role} onChange={e => set('role', e.target.value)} required placeholder="CTO" /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Company"><input className={inputCls} value={form.company} onChange={e => set('company', e.target.value)} placeholder="Startup Inc." /></Field>
                <Field label="Order"><input type="number" className={inputCls} value={form.order} onChange={e => set('order', Number(e.target.value))} /></Field>
            </div>
            <Field label="Message *"><textarea className={inputCls} rows={3} value={form.message} onChange={e => set('message', e.target.value)} required placeholder="Working together was amazing..." /></Field>
            <Field label="Avatar URL"><input className={inputCls} value={form.avatar_url} onChange={e => set('avatar_url', e.target.value)} placeholder="https://i.pravatar.cc/100?img=1" /></Field>
            <button type="submit" disabled={saving} className="w-full mt-2 py-3 bg-ink/50 text-navy-900 font-bold rounded-xl hover:bg-blue-500-light transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Testimonial</>}
            </button>
        </form>
    );
}

/* â”€â”€â”€ Stat Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function StatCard({ label, count, icon, color }) {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
            <div>
                <p className="text-slate-100/60 text-sm font-medium">{label}</p>
                <p className="text-4xl font-bold text-white">{count ?? 'â€”'}</p>
            </div>
        </div>
    );
}

/* â”€â”€â”€ Main Dashboard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function AdminDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Modal state: null | { type:'project'|'testimonial', data: object|null }
    const [modal, setModal] = useState(null);
    const [settings, setSettings] = useState({ contact_email: '', contact_location: '', github_url: '', linkedin_url: '' });
    const [settingsSaving, setSettingsSaving] = useState(false);
    const [settingsSaved, setSettingsSaved] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) { navigate('/admin'); return; }
        let cancelled = false;
        const load = async () => {
            try {
                const [me, projs, tms, msgs] = await Promise.all([
                    authService.me(),
                    adminProjectService.getAll(),
                    adminTestimonialService.getAll(),
                    adminMessageService.getAll(),
                ]);
                if (cancelled) return;
                setUser(me);
                setProjects(projs);
                setTestimonials(tms);
                setMessages(msgs);
                // Load settings separately — don't break dashboard if this fails
                settingsService.getAll()
                    .then(setts => { if (!cancelled) setSettings(s => ({ ...s, ...setts })); })
                    .catch(() => {});
            } catch (err) {
                if (cancelled) return;
                // Only log out on 401 Unauthorized — not for network/other errors
                if (err?.response?.status === 401) {
                    localStorage.removeItem('admin_token');
                    navigate('/admin');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, []);

    /* â”€â”€ Project CRUD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    const handleSaveProject = async (data) => {
        setSaving(true);
        try {
            if (modal.data?.id) {
                const updated = await adminProjectService.update(modal.data.id, data);
                setProjects(p => p.map(pr => pr.id === updated.id ? updated : pr));
            } else {
                const created = await adminProjectService.create(data);
                setProjects(p => [...p, created]);
            }
            setModal(null);
        } finally { setSaving(false); }
    };

    const handleDeleteProject = async (id) => {
        if (!confirm('Delete this project?')) return;
        await adminProjectService.delete(id);
        setProjects(p => p.filter(pr => pr.id !== id));
    };

    /* â”€â”€ Testimonial CRUD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    const handleSaveTestimonial = async (data) => {
        setSaving(true);
        try {
            if (modal.data?.id) {
                const updated = await adminTestimonialService.update(modal.data.id, data);
                setTestimonials(t => t.map(tm => tm.id === updated.id ? updated : tm));
            } else {
                const created = await adminTestimonialService.create(data);
                setTestimonials(t => [...t, created]);
            }
            setModal(null);
        } finally { setSaving(false); }
    };

    const handleDeleteTestimonial = async (id) => {
        if (!confirm('Delete this testimonial?')) return;
        await adminTestimonialService.delete(id);
        setTestimonials(t => t.filter(tm => tm.id !== id));
    };

    /* â”€â”€ Messages â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    const handleReadMessage = async (id) => {
        const updated = await adminMessageService.markRead(id);
        setMessages(m => m.map(msg => msg.id === id ? updated : msg));
    };

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setSettingsSaving(true);
        try {
            const updated = await settingsService.update(settings);
            setSettings(s => ({ ...s, ...updated }));
            setSettingsSaved(true);
            setTimeout(() => setSettingsSaved(false), 3000);
        } finally {
            setSettingsSaving(false);
        }
    };

    const handleLogout = async () => { await authService.logout(); navigate('/admin'); };

    if (loading) {
        return (
            <div className="min-h-screen bg-navy-900 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-400-light animate-spin" />
            </div>
        );
    }

    const unread = messages.filter(m => !m.is_read).length;

    return (
        <div className="min-h-screen bg-navy-900 text-slate-100 flex">

            {/* â”€â”€ Sidebar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <aside className="w-64 bg-black/30 border-r border-white/10 flex flex-col p-6 shrink-0">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-ink/50 rounded-xl flex items-center justify-center">
                        <LayoutDashboard className="w-5 h-5 text-navy-900" />
                    </div>
                    <span className="font-bold text-lg">Studio Admin</span>
                </div>
                <nav className="space-y-1 flex-1">
                    {[
                        { label: 'Projects', icon: <FolderOpen className="w-4 h-4" />, href: '#projects' },
                        { label: 'Testimonials', icon: <Quote className="w-4 h-4" />, href: '#testimonials' },
                        { label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, href: '#messages', badge: unread },
                        { label: 'Contact Info', icon: <Settings className="w-4 h-4" />, href: '#contact-info' },
                    ].map(item => (
                        <a key={item.label} href={item.href}
                            className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                            <span className="flex items-center gap-3 text-slate-100/70 group-hover:text-white transition-colors">
                                {item.icon}{item.label}
                            </span>
                            {item.badge > 0 && (
                                <span className="text-xs bg-ink/50 text-navy-900 font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>
                            )}
                        </a>
                    ))}
                </nav>
                <div className="border-t border-white/10 pt-6">
                    <p className="text-xs text-slate-100/40 mb-1 truncate">{user?.email}</p>
                    <p className="text-sm text-slate-100/80 font-medium mb-4 truncate">{user?.name}</p>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors text-sm font-medium">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* â”€â”€ Main â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <main className="flex-1 p-8 overflow-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                    <h1 className="text-3xl font-bold mb-8">Welcome back, <span className="text-blue-400-light">{user?.name?.split(' ')[0]}</span> ðŸ‘‹</h1>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
                        <StatCard label="Projects" count={projects.length} icon={<FolderOpen className="w-6 h-6 text-orange-400" />} color="bg-orange-400/10" />
                        <StatCard label="Testimonials" count={testimonials.length} icon={<Quote className="w-6 h-6 text-purple-400" />} color="bg-purple-400/10" />
                        <StatCard label="Messages" count={messages.length} icon={<MessageSquare className="w-6 h-6 text-blue-400" />} color="bg-blue-400/10" />
                        <StatCard label="Unread" count={unread} icon={<Star className="w-6 h-6 text-blue-400-light" />} color="bg-ink/50/10" />
                    </div>

                    {/* Projects */}
                    <section id="projects" className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2"><ChevronRight className="w-5 h-5 text-blue-400-light" />Projects</h2>
                            <button onClick={() => setModal({ type: 'project', data: null })}
                                className="flex items-center gap-2 px-4 py-2 bg-ink/50 text-navy-900 text-sm font-bold rounded-xl hover:bg-blue-500-light transition-all">
                                <Plus className="w-4 h-4" /> Add Project
                            </button>
                        </div>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10 text-slate-100/50 text-xs uppercase">
                                    <tr>
                                        <th className="text-left px-6 py-4">Title</th>
                                        <th className="text-left px-6 py-4 hidden md:table-cell">Tags</th>
                                        <th className="text-left px-6 py-4">Featured</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {projects.map(p => (
                                        <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4 font-semibold">{p.title}</td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <div className="flex flex-wrap gap-1">
                                                    {(p.tags || []).slice(0, 3).map(tag => (
                                                        <span key={tag} className="px-2 py-0.5 text-xs bg-ink/50/20 text-brand-300 rounded-full">{tag}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${p.is_featured ? 'bg-emerald-400/20 text-emerald-400' : 'bg-white/10 text-slate-100/40'}`}>
                                                    {p.is_featured ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => setModal({ type: 'project', data: p })} className="p-2 text-brand-300 hover:bg-ink/50/20 rounded-lg transition-all" title="Edit">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDeleteProject(p.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {projects.length === 0 && (
                                        <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-100/30">No projects yet. Add one above.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section id="testimonials" className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2"><ChevronRight className="w-5 h-5 text-blue-400-light" />Testimonials</h2>
                            <button onClick={() => setModal({ type: 'testimonial', data: null })}
                                className="flex items-center gap-2 px-4 py-2 bg-ink/50 text-navy-900 text-sm font-bold rounded-xl hover:bg-blue-500-light transition-all">
                                <Plus className="w-4 h-4" /> Add Testimonial
                            </button>
                        </div>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10 text-slate-100/50 text-xs uppercase">
                                    <tr>
                                        <th className="text-left px-6 py-4">Name</th>
                                        <th className="text-left px-6 py-4 hidden md:table-cell">Role / Company</th>
                                        <th className="text-left px-6 py-4 hidden lg:table-cell">Message</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {testimonials.map(t => (
                                        <tr key={t.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4 font-semibold">{t.name}</td>
                                            <td className="px-6 py-4 text-slate-100/60 hidden md:table-cell">{t.role}{t.company ? ` Â· ${t.company}` : ''}</td>
                                            <td className="px-6 py-4 text-slate-100/50 hidden lg:table-cell truncate max-w-[200px]">{t.message}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => setModal({ type: 'testimonial', data: t })} className="p-2 text-brand-300 hover:bg-ink/50/20 rounded-lg transition-all" title="Edit">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDeleteTestimonial(t.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {testimonials.length === 0 && (
                                        <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-100/30">No testimonials yet. Add one above.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Contact Info */}
                    <section id="contact-info" className="mb-12">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><ChevronRight className="w-5 h-5 text-blue-400-light" />Contact Info</h2>
                        <form onSubmit={handleSaveSettings} className="bg-white/5 rounded-2xl border border-white/10 p-8 max-w-xl space-y-5">
                            <Field label="Contact Email">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input type="email" className={`${inputCls} pl-10`} value={settings.contact_email || ''}
                                        onChange={e => setSettings(s => ({ ...s, contact_email: e.target.value }))}
                                        placeholder="hello@yourdomain.com" />
                                </div>
                            </Field>
                            <Field label="Location">
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input type="text" className={`${inputCls} pl-10`} value={settings.contact_location || ''}
                                        onChange={e => setSettings(s => ({ ...s, contact_location: e.target.value }))}
                                        placeholder="Available Worldwide · Remote" />
                                </div>
                            </Field>
                            <Field label="GitHub URL">
                                <div className="relative">
                                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input type="url" className={`${inputCls} pl-10`} value={settings.github_url || ''}
                                        onChange={e => setSettings(s => ({ ...s, github_url: e.target.value }))}
                                        placeholder="https://github.com/yourusername" />
                                </div>
                            </Field>
                            <Field label="LinkedIn URL">
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input type="url" className={`${inputCls} pl-10`} value={settings.linkedin_url || ''}
                                        onChange={e => setSettings(s => ({ ...s, linkedin_url: e.target.value }))}
                                        placeholder="https://linkedin.com/in/yourusername" />
                                </div>
                            </Field>
                            <div className="flex items-center gap-4">
                                <button type="submit" disabled={settingsSaving}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-60">
                                    {settingsSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
                                </button>
                                {settingsSaved && <span className="text-emerald-400 text-sm flex items-center gap-1.5"><CheckSquare className="w-4 h-4" /> Saved!</span>}
                            </div>
                        </form>
                    </section>

                    {/* Messages */}
                    <section id="messages">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><ChevronRight className="w-5 h-5 text-blue-400-light" />Contact Messages</h2>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10 text-slate-100/50 text-xs uppercase">
                                    <tr>
                                        <th className="text-left px-6 py-4">Name</th>
                                        <th className="text-left px-6 py-4 hidden md:table-cell">Email</th>
                                        <th className="text-left px-6 py-4">Message</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {messages.map(msg => (
                                        <tr key={msg.id} className={`transition-colors ${!msg.is_read ? 'bg-ink/50/5' : 'opacity-60'}`}>
                                            <td className="px-6 py-4 font-semibold">{msg.name}</td>
                                            <td className="px-6 py-4 text-slate-100/60 hidden md:table-cell">{msg.email}</td>
                                            <td className="px-6 py-4 text-slate-100/70 truncate max-w-[240px]">{msg.message}</td>
                                            <td className="px-6 py-4 text-center">
                                                {msg.is_read ? (
                                                    <span className="text-xs text-slate-100/30">Read</span>
                                                ) : (
                                                    <button onClick={() => handleReadMessage(msg.id)} className="p-1.5 text-blue-400-light hover:bg-ink/50/20 rounded-lg transition-all" title="Mark as read">
                                                        <CheckSquare className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {messages.length === 0 && (
                                        <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-100/30">No messages yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </motion.div>
            </main>

            {/* â”€â”€ Modals â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            {modal?.type === 'project' && (
                <Modal
                    title={modal.data ? 'Edit Project' : 'Add New Project'}
                    onClose={() => setModal(null)}
                >
                    <ProjectForm initial={modal.data || emptyProject} onSave={handleSaveProject} saving={saving} />
                </Modal>
            )}

            {modal?.type === 'testimonial' && (
                <Modal
                    title={modal.data ? 'Edit Testimonial' : 'Add New Testimonial'}
                    onClose={() => setModal(null)}
                >
                    <TestimonialForm initial={modal.data || emptyTestimonial} onSave={handleSaveTestimonial} saving={saving} />
                </Modal>
            )}
        </div>
    );
}


