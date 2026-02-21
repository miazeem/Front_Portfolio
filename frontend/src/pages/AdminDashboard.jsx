import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, FolderOpen, MessageSquare, Star, ChevronRight,
    Loader2, Trash2, CheckSquare, Plus, LayoutDashboard,
    Pencil, X, Save, Quote
} from 'lucide-react';
import {
    authService,
    adminProjectService,
    adminTestimonialService,
    adminMessageService
} from '../services/api';

/* ─── Reusable Modal ──────────────────────────── */
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
                    className="relative z-10 w-full max-w-xl bg-brand-900 border border-white/15 rounded-2xl shadow-2xl text-brand-50 overflow-hidden"
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

/* ─── Form Field ─────────────────────────────── */
function Field({ label, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-brand-50/70 mb-1.5">{label}</label>
            {children}
        </div>
    );
}
const inputCls = "w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-brand-50/20";

/* ─── Project Form ────────────────────────────── */
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
                <div onClick={() => set('is_featured', !form.is_featured)} className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${form.is_featured ? 'bg-brand-500' : 'bg-white/20'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_featured ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm text-brand-50/70">Featured on portfolio</span>
            </label>
            <button type="submit" disabled={saving} className="w-full mt-2 py-3 bg-brand-500 text-brand-900 font-bold rounded-xl hover:bg-brand-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Project</>}
            </button>
        </form>
    );
}

/* ─── Testimonial Form ────────────────────────── */
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
            <button type="submit" disabled={saving} className="w-full mt-2 py-3 bg-brand-500 text-brand-900 font-bold rounded-xl hover:bg-brand-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Testimonial</>}
            </button>
        </form>
    );
}

/* ─── Stat Card ──────────────────────────────── */
function StatCard({ label, count, icon, color }) {
    return (
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
            <div>
                <p className="text-brand-50/60 text-sm font-medium">{label}</p>
                <p className="text-4xl font-bold text-white">{count ?? '—'}</p>
            </div>
        </div>
    );
}

/* ─── Main Dashboard ─────────────────────────── */
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

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) { navigate('/admin'); return; }
        const load = async () => {
            try {
                const [me, projs, tms, msgs] = await Promise.all([
                    authService.me(),
                    adminProjectService.getAll(),
                    adminTestimonialService.getAll(),
                    adminMessageService.getAll(),
                ]);
                setUser(me);
                setProjects(projs);
                setTestimonials(tms);
                setMessages(msgs);
            } catch {
                localStorage.removeItem('admin_token');
                navigate('/admin');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [navigate]);

    /* ── Project CRUD ──────────────────────────── */
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

    /* ── Testimonial CRUD ──────────────────────── */
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

    /* ── Messages ──────────────────────────────── */
    const handleReadMessage = async (id) => {
        const updated = await adminMessageService.markRead(id);
        setMessages(m => m.map(msg => msg.id === id ? updated : msg));
    };

    const handleLogout = async () => { await authService.logout(); navigate('/admin'); };

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-900 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-brand-400 animate-spin" />
            </div>
        );
    }

    const unread = messages.filter(m => !m.is_read).length;

    return (
        <div className="min-h-screen bg-brand-900 text-brand-50 flex">

            {/* ── Sidebar ──────────────────────── */}
            <aside className="w-64 bg-black/30 border-r border-white/10 flex flex-col p-6 shrink-0">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                        <LayoutDashboard className="w-5 h-5 text-brand-900" />
                    </div>
                    <span className="font-bold text-lg">Studio Admin</span>
                </div>
                <nav className="space-y-1 flex-1">
                    {[
                        { label: 'Projects', icon: <FolderOpen className="w-4 h-4" />, href: '#projects' },
                        { label: 'Testimonials', icon: <Quote className="w-4 h-4" />, href: '#testimonials' },
                        { label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, href: '#messages', badge: unread },
                    ].map(item => (
                        <a key={item.label} href={item.href}
                            className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                            <span className="flex items-center gap-3 text-brand-50/70 group-hover:text-white transition-colors">
                                {item.icon}{item.label}
                            </span>
                            {item.badge > 0 && (
                                <span className="text-xs bg-brand-500 text-brand-900 font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>
                            )}
                        </a>
                    ))}
                </nav>
                <div className="border-t border-white/10 pt-6">
                    <p className="text-xs text-brand-50/40 mb-1 truncate">{user?.email}</p>
                    <p className="text-sm text-brand-50/80 font-medium mb-4 truncate">{user?.name}</p>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors text-sm font-medium">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* ── Main ─────────────────────────── */}
            <main className="flex-1 p-8 overflow-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                    <h1 className="text-3xl font-bold mb-8">Welcome back, <span className="text-brand-400">{user?.name?.split(' ')[0]}</span> 👋</h1>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
                        <StatCard label="Projects" count={projects.length} icon={<FolderOpen className="w-6 h-6 text-orange-400" />} color="bg-orange-400/10" />
                        <StatCard label="Testimonials" count={testimonials.length} icon={<Quote className="w-6 h-6 text-purple-400" />} color="bg-purple-400/10" />
                        <StatCard label="Messages" count={messages.length} icon={<MessageSquare className="w-6 h-6 text-blue-400" />} color="bg-blue-400/10" />
                        <StatCard label="Unread" count={unread} icon={<Star className="w-6 h-6 text-brand-400" />} color="bg-brand-500/10" />
                    </div>

                    {/* Projects */}
                    <section id="projects" className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2"><ChevronRight className="w-5 h-5 text-brand-400" />Projects</h2>
                            <button onClick={() => setModal({ type: 'project', data: null })}
                                className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-brand-900 text-sm font-bold rounded-xl hover:bg-brand-400 transition-all">
                                <Plus className="w-4 h-4" /> Add Project
                            </button>
                        </div>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10 text-brand-50/50 text-xs uppercase">
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
                                                        <span key={tag} className="px-2 py-0.5 text-xs bg-brand-500/20 text-brand-300 rounded-full">{tag}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${p.is_featured ? 'bg-emerald-400/20 text-emerald-400' : 'bg-white/10 text-brand-50/40'}`}>
                                                    {p.is_featured ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => setModal({ type: 'project', data: p })} className="p-2 text-brand-300 hover:bg-brand-500/20 rounded-lg transition-all" title="Edit">
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
                                        <tr><td colSpan="4" className="px-6 py-12 text-center text-brand-50/30">No projects yet. Add one above.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section id="testimonials" className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2"><ChevronRight className="w-5 h-5 text-brand-400" />Testimonials</h2>
                            <button onClick={() => setModal({ type: 'testimonial', data: null })}
                                className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-brand-900 text-sm font-bold rounded-xl hover:bg-brand-400 transition-all">
                                <Plus className="w-4 h-4" /> Add Testimonial
                            </button>
                        </div>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10 text-brand-50/50 text-xs uppercase">
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
                                            <td className="px-6 py-4 text-brand-50/60 hidden md:table-cell">{t.role}{t.company ? ` · ${t.company}` : ''}</td>
                                            <td className="px-6 py-4 text-brand-50/50 hidden lg:table-cell truncate max-w-[200px]">{t.message}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => setModal({ type: 'testimonial', data: t })} className="p-2 text-brand-300 hover:bg-brand-500/20 rounded-lg transition-all" title="Edit">
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
                                        <tr><td colSpan="4" className="px-6 py-12 text-center text-brand-50/30">No testimonials yet. Add one above.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Messages */}
                    <section id="messages">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><ChevronRight className="w-5 h-5 text-brand-400" />Contact Messages</h2>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10 text-brand-50/50 text-xs uppercase">
                                    <tr>
                                        <th className="text-left px-6 py-4">Name</th>
                                        <th className="text-left px-6 py-4 hidden md:table-cell">Email</th>
                                        <th className="text-left px-6 py-4">Message</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {messages.map(msg => (
                                        <tr key={msg.id} className={`transition-colors ${!msg.is_read ? 'bg-brand-500/5' : 'opacity-60'}`}>
                                            <td className="px-6 py-4 font-semibold">{msg.name}</td>
                                            <td className="px-6 py-4 text-brand-50/60 hidden md:table-cell">{msg.email}</td>
                                            <td className="px-6 py-4 text-brand-50/70 truncate max-w-[240px]">{msg.message}</td>
                                            <td className="px-6 py-4 text-center">
                                                {msg.is_read ? (
                                                    <span className="text-xs text-brand-50/30">Read</span>
                                                ) : (
                                                    <button onClick={() => handleReadMessage(msg.id)} className="p-1.5 text-brand-400 hover:bg-brand-500/20 rounded-lg transition-all" title="Mark as read">
                                                        <CheckSquare className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {messages.length === 0 && (
                                        <tr><td colSpan="4" className="px-6 py-12 text-center text-brand-50/30">No messages yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </motion.div>
            </main>

            {/* ── Modals ───────────────────────── */}
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
