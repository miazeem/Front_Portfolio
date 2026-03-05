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
        <div className="min-h-screen bg-navy-900 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative z-10 text-slate-100"
            >
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-ink/50 rounded-2xl flex items-center justify-center shadow-lg shadow-gold/20">
                        <Settings className="w-8 h-8 text-navy-900" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center mb-2">Studio Control</h1>
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
                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-gold transition-all placeholder:text-slate-100/20"
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
                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-gold transition-all placeholder:text-slate-100/20"
                                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-ink/50 text-navy-900 font-bold text-lg rounded-xl hover:bg-blue-500-light hover:shadow-lg hover:shadow-gold/20 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
                            ) : 'Authenticate'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}


