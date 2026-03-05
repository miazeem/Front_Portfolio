import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Zap, Users } from 'lucide-react';

const highlights = [
    { icon: <Code2 className="w-5 h-5" />, title: 'Clean Code', desc: 'Well-structured, maintainable codebases built to last.' },
    { icon: <Layers className="w-5 h-5" />, title: 'Full-Stack', desc: 'From REST APIs to pixel-perfect React interfaces.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Performance', desc: 'Optimized for speed, scalability, and reliability.' },
    { icon: <Users className="w-5 h-5" />, title: 'Collaboration', desc: 'Clear communication, transparent process, on-time delivery.' },
];

const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '30+', label: 'Projects Completed' },
    { value: '100%', label: 'Client Satisfaction' },
    { value: '15+', label: 'Technologies' },
];

export default function About() {
    return (
        <section id="about" className="relative py-28 px-6 md:px-10 bg-navy-800 overflow-hidden">

            <div className="absolute inset-0 bg-dot-grid opacity-60" />

            <div className="relative z-10 max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-14"
                >
                    <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-blue-500" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400">About Me</span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                            Turning complex ideas into{' '}
                            <span className="text-gradient">elegant solutions</span>
                        </h2>
                        <p className="text-slate-400 text-base leading-relaxed mb-5">
                            I bridge the gap between complex system architecture and seamless user experiences.
                            Startups hire me when they need technical foundations that won't crumble under pressure,
                            wrapped in interfaces users actually love.
                        </p>
                        <p className="text-slate-400 text-base leading-relaxed mb-10">
                            Whether it's optimizing database queries or tweaking micro-interactions,
                            I sweat the details so you don't have to.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((s, i) => (
                                <div key={i} className="glass-card rounded-xl p-4">
                                    <div className="text-3xl font-display font-bold text-gradient">{s.value}</div>
                                    <div className="text-sm text-slate-400 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="glass-card glass-card-hover rounded-2xl p-6 transition-all group"
                            >
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                                    {h.icon}
                                </div>
                                <h3 className="text-white font-display font-semibold mb-2">{h.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{h.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
