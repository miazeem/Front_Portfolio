import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LogOut, FolderOpen, MessageSquare, Star, ChevronRight,
    Loader2, Trash2, CheckSquare, Plus, LayoutDashboard,
    Pencil, X, Save, Quote, Settings, Mail, MapPin, Github, Linkedin, FileDown, Code2
} from 'lucide-react';
import {
    authService,
    adminProjectService,
    adminTestimonialService,
    adminMessageService,
    settingsService,
    adminSkillService,
    uploadService,
} from '../services/api';

/* --- Reusable Modal ---------------------------- */
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

/* --- Form Field ------------------------------- */
function Field({ label, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-100/70 mb-1.5">{label}</label>
            {children}
        </div>
    );
}
const inputCls = "w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-gold transition-all placeholder:text-slate-100/20";

/* --- Image Upload Field ----------------------- */
function ImageUploadField({ label, value, onChange, folder }) {
    const [uploading, setUploading] = useState(false);
    const handleFile = async (file) => {
        if (!file) return;
        setUploading(true);
        try {
            const { url } = await uploadService.image(file, folder);
            onChange(url);
        } catch (err) {
            console.error('Upload failed', err);
        } finally {
            setUploading(false);
        }
    };
    return (
        <Field label={label}>
            <input className={inputCls} value={value} onChange={e => onChange(e.target.value)} placeholder="https://... or upload below" />
            <label className={`mt-1.5 flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl border border-dashed border-white/20 hover:border-blue-500/60 bg-white/5 hover:bg-white/10 transition-all text-xs text-slate-400 ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                <input type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
                {uploading ? <><Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" /> Uploading...</> : <><span className="text-blue-400">+ Upload image</span><span className="ml-auto text-slate-600">JPEG / PNG / WebP &middot; max 4 MB</span></>}
            </label>
            {value && <img src={value} alt="preview" className="mt-2 h-20 rounded-lg object-cover border border-white/10" />}
        </Field>
    );
}

/* --- Project Form ------------------------------ */
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
                <ImageUploadField label="Image" value={form.image_url} onChange={v => set('image_url', v)} folder="projects" />
                <Field label="Live URL"><input className={inputCls} value={form.live_url} onChange={e => set('live_url', e.target.value)} placeholder="https://..." /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <Field label="GitHub URL"><input className={inputCls} value={form.github_url} onChange={e => set('github_url', e.target.value)} placeholder="https://github.com/..." /></Field>
                <Field label="Order"><input type="number" className={inputCls} value={form.order} onChange={e => set('order', Number(e.target.value))} /></Field>
            </div>
            <Field label="Tags (comma separated)"><input className={inputCls} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="React, Laravel, MySQL" /></Field>
            <label className="flex items-center gap-3 cursor-pointer select-none">
                <div onClick={() => set('is_featured', !form.is_featured)} className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${form.is_featured ? 'bg-blue-600' : 'bg-white/20'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_featured ? 'translate-x-4' : ''}`} />
                </div>
                <span className="text-sm text-slate-100/70">Featured on portfolio</span>
            </label>
            <button type="submit" disabled={saving} className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Project</>}
            </button>
        </form>
    );
}

/* --- Testimonial Form -------------------------- */
const emptyTestimonial = { name: '', role: '', company: '', message: '', avatar_url: '', rating: 5, order: 0 };

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
            <ImageUploadField label="Avatar" value={form.avatar_url} onChange={v => set('avatar_url', v)} folder="avatars" />
            <Field label="Rating">
                <div className="flex gap-2 pt-1">
                    {[1,2,3,4,5].map(n => (
                        <button key={n} type="button" onClick={() => set('rating', n)}
                            className="p-0.5 transition-transform hover:scale-110">
                            <Star className={`w-6 h-6 ${ n <= (form.rating ?? 5) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600' }`} />
                        </button>
                    ))}
                    <span className="ml-2 text-sm text-slate-400 self-center">{form.rating ?? 5} / 5</span>
                </div>
            </Field>
            <button type="submit" disabled={saving} className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Testimonial</>}
            </button>
        </form>
    );
}

/* --- Stat Card -------------------------------- */
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

/* --- Main Dashboard --------------------------- */
export default function AdminDashboard() {
    const navigate = useNavigate();
    const mainRef = useRef(null);
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Modal state: null | { type:'project'|'testimonial', data: object|null }
    const [modal, setModal] = useState(null);
    const [settings, setSettings] = useState({ contact_email: '', contact_location: '', github_url: '', linkedin_url: '', cv_url: '', profile_image_url: '' });
    const [settingsSaving, setSettingsSaving] = useState(false);
    const [settingsSaved, setSettingsSaved] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [skillModal, setSkillModal] = useState(null); // null | { data: skill|null }

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
                adminSkillService.getAll()
                    .then(sk => { if (!cancelled) setSkills(sk); })
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

    /* -- Project CRUD ---------------------------- */
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

    /* -- Testimonial CRUD ------------------------ */
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

    /* -- Messages -------------------------------- */
    const handleReadMessage = async (id) => {
        const updated = await adminMessageService.markRead(id);
        setMessages(m => m.map(msg => msg.id === id ? updated : msg));
    };

    const handleDeleteMessage = async (id) => {
        if (!confirm('Delete this message?')) return;
        await adminMessageService.delete(id);
        setMessages(m => m.filter(msg => msg.id !== id));
    };

    const handleProfileImageUpload = async (file) => {
        if (!file) return;
        setImageUploading(true);
        try {
            const { url } = await settingsService.uploadProfileImage(file);
            setSettings(s => ({ ...s, profile_image_url: url }));
        } catch (err) {
            console.error('Image upload failed', err);
        } finally {
            setImageUploading(false);
        }
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

    /* -- Skills CRUD ---------------------------------------- */
    const handleSaveSkill = async (data) => {
        setSaving(true);
        try {
            if (skillModal.data?.id) {
                const updated = await adminSkillService.update(skillModal.data.id, data);
                setSkills(s => s.map(sk => sk.id === updated.id ? updated : sk));
            } else {
                const created = await adminSkillService.create(data);
                setSkills(s => [...s, created]);
            }
            setSkillModal(null);
        } finally { setSaving(false); }
    };

    const handleDeleteSkill = async (id) => {
        if (!confirm('Delete this skill?')) return;
        await adminSkillService.delete(id);
        setSkills(s => s.filter(sk => sk.id !== id));
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
        <div className="h-screen bg-navy-900 text-slate-100 flex overflow-hidden">

            {/* -- Sidebar ------------------------ */}
            <aside className="w-64 bg-black/30 border-r border-white/10 flex flex-col p-6 shrink-0 overflow-y-auto">
                <div className="flex items-center gap-3 mb-10">
                    <button
                        onClick={() => mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg">Admin</span>
                    </button>
                </div>
                <nav className="space-y-1 flex-1">
                    {[
                        { label: 'Projects', icon: <FolderOpen className="w-4 h-4" />, href: '#projects' },
                        { label: 'Testimonials', icon: <Quote className="w-4 h-4" />, href: '#testimonials' },
                        { label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, href: '#messages', badge: unread },
                        { label: 'Contact Info', icon: <Settings className="w-4 h-4" />, href: '#contact-info' },
                        { label: 'Skills', icon: <Code2 className="w-4 h-4" />, href: '#skills' },
                    ].map(item => (
                        <a key={item.label} href={item.href}
                            className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
                        >
                            <span className="flex items-center gap-3 text-slate-100/70 group-hover:text-white transition-colors">
                                {item.icon}{item.label}
                            </span>
                            {item.badge > 0 && (
                                <span className="text-xs bg-blue-600 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>
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

            {/* -- Main --------------------------- */}
            <main ref={mainRef} className="flex-1 p-8 overflow-y-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                    <h1 className="text-3xl font-bold mb-8">Welcome back, <span className="text-cyan-400">{user?.name?.split(' ')[0]}</span> !</h1>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
                        <StatCard label="Projects" count={projects.length} icon={<FolderOpen className="w-6 h-6 text-orange-400" />} color="bg-orange-400/10" />
                        <StatCard label="Testimonials" count={testimonials.length} icon={<Quote className="w-6 h-6 text-purple-400" />} color="bg-purple-400/10" />
                        <StatCard label="Messages" count={messages.length} icon={<MessageSquare className="w-6 h-6 text-blue-400" />} color="bg-blue-400/10" />
                        <StatCard label="Unread" count={unread} icon={<Star className="w-6 h-6 text-cyan-400" />} color="bg-cyan-400/10" />
                    </div>

                    {/* Projects */}
                    <section id="projects" className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2"><ChevronRight className="w-5 h-5 text-cyan-400" />Projects</h2>
                            <button onClick={() => setModal({ type: 'project', data: null })}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all">
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
                                                        <span key={tag} className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-300 rounded-full">{tag}</span>
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
                                                    <button onClick={() => setModal({ type: 'project', data: p })} className="p-2 text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all" title="Edit">
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
                            <h2 className="text-xl font-bold flex items-center gap-2"><ChevronRight className="w-5 h-5 text-cyan-400" />Testimonials</h2>
                            <button onClick={() => setModal({ type: 'testimonial', data: null })}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all">
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
                                                    <button onClick={() => setModal({ type: 'testimonial', data: t })} className="p-2 text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all" title="Edit">
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
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><ChevronRight className="w-5 h-5 text-cyan-400" />Contact Info</h2>
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
                            <Field label="CV / Resume URL">
                                <div className="relative">
                                    <FileDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input type="url" className={`${inputCls} pl-10`} value={settings.cv_url || ''}
                                        onChange={e => setSettings(s => ({ ...s, cv_url: e.target.value }))}
                                        placeholder="https://drive.google.com/... or direct PDF link" />
                                </div>
                            </Field>
                            <Field label="Profile Photo">
                                <label className={`flex items-center gap-3 cursor-pointer px-4 py-2.5 rounded-xl border border-dashed border-white/20 hover:border-blue-500/60 bg-white/5 hover:bg-white/10 transition-all ${ imageUploading ? 'opacity-60 pointer-events-none' : '' }`}>
                                    <input type="file" accept="image/*" className="hidden"
                                        onChange={e => handleProfileImageUpload(e.target.files[0])} />
                                    {imageUploading
                                        ? <><Loader2 className="w-4 h-4 animate-spin text-blue-400" /><span className="text-sm text-slate-300">Uploading...</span></>
                                        : <><span className="text-sm text-slate-300">Choose image file</span><span className="ml-auto text-xs text-slate-500">JPEG / PNG / WebP · max 4 MB</span></>}
                                </label>
                                {settings.profile_image_url && (
                                    <div className="mt-2 flex items-center gap-3">
                                        <img src={settings.profile_image_url} alt="Profile preview" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                                        <span className="text-xs text-slate-500 break-all">{settings.profile_image_url}</span>
                                    </div>
                                )}
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

                    {/* Skills */}
                    <section id="skills" className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2"><ChevronRight className="w-5 h-5 text-cyan-400" />Technical Skills</h2>
                            <button onClick={() => setSkillModal({ data: null })}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all">
                                <Plus className="w-4 h-4" /> Add Skill
                            </button>
                        </div>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10 text-slate-100/50 text-xs uppercase">
                                    <tr>
                                        <th className="text-left px-6 py-4">Category</th>
                                        <th className="text-left px-6 py-4">Skill Name</th>
                                        <th className="text-left px-6 py-4 hidden md:table-cell">Order</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {skills.map(sk => (
                                        <tr key={sk.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-0.5 text-xs bg-cyan-400/20 text-cyan-300 rounded-full font-medium">{sk.category}</span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold">{sk.name}</td>
                                            <td className="px-6 py-4 text-slate-100/50 hidden md:table-cell">{sk.order}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => setSkillModal({ data: sk })} className="p-2 text-blue-300 hover:bg-blue-500/20 rounded-lg transition-all" title="Edit">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDeleteSkill(sk.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-all" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {skills.length === 0 && (
                                        <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-100/30">No skills yet. Add one above.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Messages */}
                    <section id="messages">
                        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><ChevronRight className="w-5 h-5 text-cyan-400" />Contact Messages</h2>
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-sm">
                                <thead className="border-b border-white/10 text-slate-100/50 text-xs uppercase">
                                    <tr>
                                        <th className="text-left px-6 py-4">Name</th>
                                        <th className="text-left px-6 py-4 hidden md:table-cell">Email</th>
                                        <th className="text-left px-6 py-4">Message</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {messages.map(msg => (
                                        <tr key={msg.id} className={`transition-colors group ${!msg.is_read ? 'bg-blue-500/5' : 'opacity-60'}`}>
                                            <td className="px-6 py-4 font-semibold">{msg.name}</td>
                                            <td className="px-6 py-4 text-slate-100/60 hidden md:table-cell">{msg.email}</td>
                                            <td className="px-6 py-4 text-slate-100/70 truncate max-w-[240px]">{msg.message}</td>
                                            <td className="px-6 py-4 text-center">
                                                {msg.is_read ? (
                                                    <span className="text-xs text-slate-100/30">Read</span>
                                                ) : (
                                                    <button onClick={() => handleReadMessage(msg.id)} className="p-1.5 text-cyan-400 hover:bg-blue-500/20 rounded-lg transition-all" title="Mark as read">
                                                        <CheckSquare className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDeleteMessage(msg.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-all opacity-0 group-hover:opacity-100" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {messages.length === 0 && (
                                        <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-100/30">No messages yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </motion.div>
            </main>

            {/* -- Modals ------------------------- */}
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

            {skillModal && (
                <Modal
                    title={skillModal.data ? 'Edit Skill' : 'Add New Skill'}
                    onClose={() => setSkillModal(null)}
                >
                    <SkillForm initial={skillModal.data || { category: '', name: '', order: 0 }} onSave={handleSaveSkill} saving={saving} />
                </Modal>
            )}
        </div>
    );
}

/* --- Skill Form ---------------------------------------- */
const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Data & Storage', 'DevOps & Cloud', 'Mobile', 'Tools', 'Other'];

function SkillForm({ initial, onSave, saving }) {
    const [form, setForm] = useState({ ...initial });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    return (
        <div className="space-y-4">
            <Field label="Category">
                <select className={inputCls} value={form.category}
                    onChange={e => set('category', e.target.value)}>
                    <option value="">-- select category --</option>
                    {SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </Field>
            <Field label="Skill Name">
                <input type="text" className={inputCls} value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="e.g. React 19" />
            </Field>
            <Field label="Order (lower = first)">
                <input type="number" className={inputCls} value={form.order}
                    onChange={e => set('order', parseInt(e.target.value) || 0)}
                    min="0" />
            </Field>
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" disabled={saving || !form.name || !form.category}
                    onClick={() => onSave(form)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-60">
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Skill</>}
                </button>
            </div>
        </div>
    );
}


