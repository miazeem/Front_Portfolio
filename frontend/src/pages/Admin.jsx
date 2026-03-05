import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Settings, User, AlertCircle, Loader2 } from 'lucide-react';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.login(formData);
            navigate('/admin/dashboard');
        } catch (err) {
            const msg = err?.response?.data?.message
                || err?.response?.data?.errors?.email?.[0]
                || 'Login failed. Check your credentials.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #020817 0%, #070d2a 45%, #040916 100%)' }}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px z-20" style={{ background: 'linear-gradient(90deg, transparent 0%, #06b6d4 30%, #3b82f6 50%, #8b5cf6 70%, transparent 100%)' }} />

            {/* Dot grid */}
            <div className="absolute inset-0 bg-dot-grid opacity-60" />

            {/* Radial mesh */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 20%, rgba(59,130,246,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(6,182,212,0.10) 0%, transparent 70%)' }} />

            {/* Glow orbs */}
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/25 blur-[140px] animate-pulse-slow" />
            <div className="absolute bottom-1/4 left-1/6 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 right-1/6 w-[350px] h-[350px] rounded-full bg-violet-600/15 blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
            <div className="absolute -top-20 left-1/3 w-[400px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

            {/* Card with gradient border */}
            <div className="relative z-10 w-full max-w-md rounded-3xl p-px" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.35), rgba(59,130,246,0.35), rgba(139,92,246,0.25))' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl text-slate-100"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)' }}>
                        <Settings className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center mb-2">Potfolio - Azeem</h1>
                <p className="text-center text-slate-100/60 font-light mb-8">Secure access to project &amp; content management.</p>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm"
                    >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-100/80 mb-2">Email Address</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-100/40" />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-100/20"
                                placeholder="admin@portfolio.com"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-100/80 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-100/40" />
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-100/20"
                                placeholder="••••••••"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 font-bold text-lg rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01]"
                            style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)' }}
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
                            ) : 'Authenticate'}
                        </button>
                    </div>
                </form>
            </motion.div>
            </div>
        </div>
    );
}


