import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, TerminalSquare, CheckCircle } from 'lucide-react';

const skillCategories = [
    {
        num: '01', icon: <Layout className="w-5 h-5" />, title: 'Frontend',
        color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/20',
        hoverBorder: 'hover:border-cyan-500/40', iconColor: 'text-cyan-400',
        skills: ['React 19', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    },
    {
        num: '02', icon: <Server className="w-5 h-5" />, title: 'Backend',
        color: 'from-blue-500/20 to-violet-500/20', border: 'border-blue-500/20',
        hoverBorder: 'hover:border-blue-500/40', iconColor: 'text-blue-400',
        skills: ['Laravel API', 'Node.js', 'Express', 'REST/GraphQL', 'WebSockets'],
    },
    {
        num: '03', icon: <Database className="w-5 h-5" />, title: 'Data & Storage',
        color: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/20',
        hoverBorder: 'hover:border-violet-500/40', iconColor: 'text-violet-400',
        skills: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'AWS S3'],
    },
    {
        num: '04', icon: <TerminalSquare className="w-5 h-5" />, title: 'DevOps & Cloud',
        color: 'from-emerald-500/20 to-cyan-500/20', border: 'border-emerald-500/20',
        hoverBorder: 'hover:border-emerald-500/40', iconColor: 'text-emerald-400',
        skills: ['Docker', 'GitHub Actions', 'AWS EC2', 'Vercel', 'Linux'],
    },
];

export default function Skills() {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {skillCategories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`group glass-card rounded-2xl p-6 border transition-all duration-300 ${cat.border} ${cat.hoverBorder}`}
                        >
                            <div className="flex items-start justify-between mb-5">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} border ${cat.border} flex items-center justify-center ${cat.iconColor}`}>
                                    {cat.icon}
                                </div>
                                <span className="font-mono text-4xl font-bold text-white/[0.04]">{cat.num}</span>
                            </div>
                            <h3 className="text-white font-display font-bold text-lg mb-4">{cat.title}</h3>
                            <ul className="space-y-2.5">
                                {cat.skills.map((skill, j) => (
                                    <li key={j} className="flex items-center gap-2.5 text-slate-400 text-sm">
                                        <CheckCircle className={`w-3.5 h-3.5 ${cat.iconColor} opacity-60 shrink-0`} />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
