import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactService, settingsService } from '../services/api';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [info, setInfo] = useState({
        contact_email: 'hello@portfolio.studio',
        contact_location: 'Available Worldwide · Remote',
        github_url: 'https://github.com',
    });

    useEffect(() => {
        settingsService.getAll().then(s => setInfo(prev => ({ ...prev, ...s }))).catch(() => {});
    }, []);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            await contactService.sendMessage(form);
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            const msg = err?.response?.data?.message
                || Object.values(err?.response?.data?.errors || {})?.[0]?.[0]
                || 'Something went wrong. Please try again.';
            setErrorMsg(msg);
            setStatus('error');
        }
    };

    const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-white text-sm outline-none transition-all placeholder:text-slate-600";

    return (
        <section id="contact" className="relative py-28 px-6 md:px-10 bg-navy-800 overflow-hidden">

            <div className="absolute inset-0 bg-dot-grid opacity-50" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/[0.08] blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 right-1/6 w-[300px] h-[300px] rounded-full bg-violet-600/[0.08] blur-[80px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-blue-500" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400">Contact</span>
                        <div className="h-px w-8 bg-gradient-to-l from-blue-500 to-cyan-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Get In <span className="text-gradient">Touch</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Ready to build something great? Let's talk about your project.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}
                    >
                        <h3 className="text-2xl font-display font-bold text-white mb-4">
                            Let's build something{' '}
                            <span className="text-gradient">remarkable</span>
                        </h3>
                        <p className="text-slate-400 leading-relaxed mb-8">
                            Whether you need a full-stack overhaul or a specific feature architected,
                            I'm ready to dive in and make it happen.
                        </p>

                        <div className="space-y-4">
                            <a href={`mailto:${info.contact_email}`}
                                className="flex items-center gap-4 p-4 glass-card glass-card-hover rounded-xl transition-all group">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Email</p>
                                    <p className="text-white text-sm font-medium">{info.contact_email}</p>
                                </div>
                            </a>
                            <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Location</p>
                                    <p className="text-white text-sm font-medium">{info.contact_location}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}
                        className="glass-card rounded-2xl p-8 space-y-5"
                    >
                        {status === 'success' && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                Message sent! I'll get back to you soon.
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {errorMsg}
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Name</label>
                                <input type="text" required value={form.name}
                                    onChange={e => set('name', e.target.value)} disabled={status === 'loading'}
                                    placeholder="John Doe" className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Email</label>
                                <input type="email" required value={form.email}
                                    onChange={e => set('email', e.target.value)} disabled={status === 'loading'}
                                    placeholder="john@company.com" className={inputCls} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs text-slate-400 uppercase tracking-wide mb-2">Message</label>
                            <textarea rows="5" required value={form.message}
                                onChange={e => set('message', e.target.value)} disabled={status === 'loading'}
                                placeholder="Tell me about your project..."
                                className={inputCls + " resize-none"} />
                        </div>

                        <button type="submit" disabled={status === 'loading'}
                            className="w-full py-3.5 btn-gradient text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {status === 'loading' ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                            ) : (
                                <><Send className="w-4 h-4" /> Send Message</>
                            )}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
