import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, TerminalSquare, CheckCircle, Loader2, Code2 } from 'lucide-react';
import { skillService } from '../services/api';

const CATEGORY_STYLES = [
    { color: 'from-cyan-500/20 to-blue-500/20',    border: 'border-cyan-500/20',   hoverBorder: 'hover:border-cyan-500/40',   iconColor: 'text-cyan-400',   icon: <Layout className="w-5 h-5" /> },
    { color: 'from-blue-500/20 to-violet-500/20',  border: 'border-blue-500/20',   hoverBorder: 'hover:border-blue-500/40',   iconColor: 'text-blue-400',   icon: <Server className="w-5 h-5" /> },
    { color: 'from-violet-500/20 to-purple-500/20',border: 'border-violet-500/20', hoverBorder: 'hover:border-violet-500/40', iconColor: 'text-violet-400', icon: <Database className="w-5 h-5" /> },
    { color: 'from-emerald-500/20 to-cyan-500/20', border: 'border-emerald-500/20',hoverBorder: 'hover:border-emerald-500/40',iconColor: 'text-emerald-400',icon: <TerminalSquare className="w-5 h-5" /> },
    { color: 'from-orange-500/20 to-rose-500/20',  border: 'border-orange-500/20', hoverBorder: 'hover:border-orange-500/40', iconColor: 'text-orange-400', icon: <Code2 className="w-5 h-5" /> },
];

export default function Skills() {
    const [grouped, setGrouped] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        skillService.getAll()
            .then(data => setGrouped(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const categories = Object.entries(grouped);
    return (
        <section id="skills" className="relative py-28 px-6 md:px-10 bg-navy-900 overflow-hidden">

            <div className="absolute inset-0 bg-dot-grid" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-600/[0.07] blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-blue-500" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400">Expertise</span>
                        <div className="h-px w-8 bg-gradient-to-l from-blue-500 to-cyan-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        My <span className="text-gradient">Technical Stack</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base">
                        Technologies and tools I use to build reliable, scalable digital products.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {categories.map(([title, skills], i) => {
                            const style = CATEGORY_STYLES[i % CATEGORY_STYLES.length];
                            const num = String(i + 1).padStart(2, '0');
                            return (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className={`group glass-card rounded-2xl p-6 border transition-all duration-300 ${style.border} ${style.hoverBorder}`}
                                >
                                    <div className="flex items-start justify-between mb-5">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} border ${style.border} flex items-center justify-center ${style.iconColor}`}>
                                            {style.icon}
                                        </div>
                                        <span className="font-mono text-4xl font-bold text-white/[0.04]">{num}</span>
                                    </div>
                                    <h3 className="text-white font-display font-bold text-lg mb-4">{title}</h3>
                                    <ul className="space-y-2.5">
                                        {(skills || []).map((skill, j) => (
                                            <li key={j} className="flex items-center gap-2.5 text-slate-400 text-sm">
                                                <CheckCircle className={`w-3.5 h-3.5 ${style.iconColor} opacity-60 shrink-0`} />
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
