import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import { settingsService, skillService } from '../services/api';

const navLinks = ['About', 'Skills', 'Projects', 'Contact'];

const stats = [
    { value: '5+', label: 'Years' },
    { value: '30+', label: 'Projects' },
    { value: '100%', label: 'Satisfaction' },
];

export default function Hero() {
    const [settings, setSettings] = useState({ github_url: '', linkedin_url: '', cv_url: '', profile_image_url: '' });
    const [techStack, setTechStack] = useState([]);

    useEffect(() => {
        settingsService.getAll()
            .then(s => setSettings(prev => ({ ...prev, ...s })))
            .catch(() => {});
        skillService.getAll()
            .then(grouped => setTechStack(Object.values(grouped).flat()))
            .catch(() => {});
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #020817 0%, #070d2a 45%, #040916 100%)' }}>

            {/* Dot grid */}
            <div className="absolute inset-0 bg-dot-grid opacity-60" />

            {/* Diagonal gradient mesh overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 20%, rgba(59,130,246,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(6,182,212,0.10) 0%, transparent 70%)' }} />

            {/* Background glow orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/25 blur-[140px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 left-1/6 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 right-1/6 w-[350px] h-[350px] rounded-full bg-violet-600/15 blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
                <div className="absolute -top-20 left-1/3 w-[400px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            {/* Top gradient accent line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, #06b6d4 30%, #3b82f6 50%, #8b5cf6 70%, transparent 100%)' }} />

            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-navy-900/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-white font-display font-bold text-xl cursor-pointer">
                        Azeem <span className="text-gradient">Ahamed</span>
                    </a>
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`}
                                className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
                                {link}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <a href={settings.github_url || '#'} target="_blank" rel="noreferrer"
                            className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white transition-all">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="#contact"
                            className="px-5 py-2 btn-gradient text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/25">
                            Hire Me
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-6 pt-24 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

                    {/* Left */}
                    <div className="flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex w-fit rounded-full p-px"
                            style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)' }}
                        >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070d2a] text-xs font-semibold text-cyan-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                            </span>
                            Available for innovative roles
                        </div>
                        </motion.div>

                        <div>
                            {['Build Fast,', 'Ship'].map((word, i) => (
                                <div key={i} className="overflow-hidden">
                                    <motion.h1
                                        initial={{ y: 80, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.95] tracking-tight text-white"
                                    >
                                        {word}
                                    </motion.h1>
                                </div>
                            ))}
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.95] tracking-tight text-gradient"
                                >
                                    Confidently.
                                </motion.h1>
                            </div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="text-slate-400 text-lg leading-relaxed max-w-lg"
                        >
                            Full-stack developer partnering with startups to build products that are
                            beautiful, scalable, and production-ready.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <a href="#projects"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 btn-gradient text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow whitespace-nowrap">
                                View My Work
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <div className="rounded-full p-px" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.6), rgba(59,130,246,0.6), rgba(139,92,246,0.6))' }}>
                                <a href="#contact"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#070d2a] hover:bg-white/5 text-white font-semibold transition-all whitespace-nowrap">
                                    <Mail className="w-4 h-4 text-cyan-400" />
                                    Get In Touch
                                </a>
                            </div>
                            {settings.cv_url && (
                                <a href={settings.cv_url} download target="_blank" rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-cyan-500/40 text-cyan-400 font-semibold rounded-full hover:bg-cyan-500/10 transition-all whitespace-nowrap">
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </a>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex items-center gap-5 pt-2"
                        >
                            <a href={settings.github_url || '#'} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href={settings.linkedin_url || '#'} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right — Profile photo */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:flex flex-col items-center gap-6"
                    >
                        {/* Photo frame */}
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-violet-600/30 blur-2xl" />

                            {/* Rotating dashed border */}
                            <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-tr from-blue-500 via-cyan-400 to-violet-500 p-[2px]">
                                <div className="w-full h-full rounded-3xl bg-navy-900" />
                            </div>

                            {/* Corner accents */}
                            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
                            <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
                            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
                            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />

                            {/* Photo */}
                            <div className="relative w-[320px] h-[380px] rounded-3xl overflow-hidden">
                                <img
                                    src={settings.profile_image_url || '/profile.jpg'}
                                    alt="Azeem Ahamed"
                                    className="w-full h-full object-cover object-top"
                                />
                                {/* Subtle bottom gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                            </div>

                            {/* Floating available badge */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-cyan-500/30 shadow-lg shadow-cyan-500/10 whitespace-nowrap">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span className="text-xs font-semibold text-slate-300">Open to work</span>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-3 w-full mt-4">
                            {stats.map((s, i) => (
                                <div key={i} className="relative rounded-xl p-px overflow-hidden group" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(59,130,246,0.25), rgba(139,92,246,0.15))' }}>
                                    <div className="rounded-xl p-4 text-center h-full" style={{ background: 'rgba(7,13,42,0.95)' }}>
                                        <div className="text-2xl font-display font-bold text-gradient">{s.value}</div>
                                        <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Tech marquee */}
            <div className="relative z-10 py-3 overflow-hidden" style={{ background: 'linear-gradient(90deg, #020817, #070d2a, #020817)', borderTop: '1px solid rgba(59,130,246,0.15)' }}>
                {/* Left fade mask */}
                <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #020817, transparent)' }} />
                {/* Right fade mask */}
                <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(270deg, #020817, transparent)' }} />
                <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
                    {[...techStack, ...techStack].map((t, i) => (
                        <span key={i} className="font-mono text-[11px] tracking-widest uppercase px-8" style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: 0.45 }}>
                            {t} <span style={{ WebkitTextFillColor: 'rgba(59,130,246,0.5)' }}>&middot;</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
