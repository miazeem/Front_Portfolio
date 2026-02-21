import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactService } from '../services/api';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

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

    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden bg-brand-800 text-white">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/20 rounded-organic-1 blur-3xl -translate-y-1/2 translate-x-1/3 animate-morph" />

            <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-16 items-center">

                {/* Left – copy */}
                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
                            Let's build something <span className="text-brand-400 italic">remarkable</span>.
                        </h2>
                        <p className="text-xl text-brand-100/80 mb-12 font-light max-w-md">
                            Whether you need a full-stack overhaul or a specific feature architected, I'm ready to dive in.
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:hello@portfolio.studio" className="group flex items-center gap-4 text-xl hover:text-brand-400 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-400/20 group-hover:scale-110 transition-all">
                                    <Mail className="w-5 h-5" />
                                </div>
                                hello@portfolio.studio
                            </a>
                            <div className="flex items-center gap-4 text-xl text-brand-100/60">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                Available Worldwide
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right – form */}
                <div className="w-full md:w-1/2">
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl space-y-6 relative"
                    >
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-brand-500 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />

                        {/* Success state */}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300"
                            >
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <span>Message sent! I'll get back to you soon.</span>
                            </motion.div>
                        )}

                        {/* Error state */}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300"
                            >
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <span>{errorMsg}</span>
                            </motion.div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-brand-100/80 mb-2">Name</label>
                            <input
                                type="text" id="name" required
                                value={form.name}
                                onChange={e => set('name', e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-white/20"
                                placeholder="John Doe"
                                disabled={status === 'loading'}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-brand-100/80 mb-2">Email</label>
                            <input
                                type="email" id="email" required
                                value={form.email}
                                onChange={e => set('email', e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all placeholder:text-white/20"
                                placeholder="john@startup.com"
                                disabled={status === 'loading'}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-brand-100/80 mb-2">Project Details</label>
                            <textarea
                                id="message" rows="4" required
                                value={form.message}
                                onChange={e => set('message', e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none placeholder:text-white/20"
                                placeholder="Tell me about your goals..."
                                disabled={status === 'loading'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-brand-500 text-brand-900 font-bold text-lg rounded-xl hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/20 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                            ) : 'Send Message'}
                        </button>
                    </motion.form>
                </div>

            </div>
        </section>
    );
}
