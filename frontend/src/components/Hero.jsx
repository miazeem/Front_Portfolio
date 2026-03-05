import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const navLinks = ['About', 'Skills', 'Projects', 'Contact'];

const stats = [
    { value: '5+', label: 'Years' },
    { value: '30+', label: 'Projects' },
    { value: '100%', label: 'Satisfaction' },
];

const techStack = [
    'React 19', 'Laravel', 'TypeScript', 'Node.js', 'PostgreSQL',
    'Docker', 'AWS', 'Next.js', 'Tailwind CSS', 'Framer Motion',
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col bg-navy-900 overflow-hidden">

            {/* Dot grid */}
            <div className="absolute inset-0 bg-dot-grid" />

            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[130px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 right-1/6 w-[300px] h-[300px] rounded-full bg-violet-600/10 blur-[80px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
            </div>

            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-navy-900/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="text-white font-display font-bold text-xl cursor-pointer">
                        Dev<span className="text-gradient">Folio</span>
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
                        <a href="https://github.com" target="_blank" rel="noreferrer"
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
                            className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full glass-card border-cyan-500/20 text-xs font-semibold text-cyan-400"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                            </span>
                            Available for innovative roles
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
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a href="#projects"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 btn-gradient text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow">
                                View My Work
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="#contact"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 glass-card text-white font-semibold rounded-full hover:bg-white/10 transition-all">
                                <Mail className="w-4 h-4" />
                                Get In Touch
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex items-center gap-5 pt-2"
                        >
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right  Code card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:flex flex-col gap-4"
                    >
                        <div className="glass-card rounded-2xl p-6 glow-blue">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                <span className="ml-3 text-xs text-slate-500 font-mono">portfolio.js</span>
                            </div>
                            <div className="space-y-2 font-mono text-sm">
                                <p><span className="text-violet-400">const</span>{' '}<span className="text-cyan-400">developer</span>{' '}<span className="text-white">=</span>{' {'}</p>
                                <p className="pl-4"><span className="text-blue-400">name</span><span className="text-white">:</span>{' '}<span className="text-emerald-400">&apos;John Doe&apos;</span><span className="text-slate-500">,</span></p>
                                <p className="pl-4"><span className="text-blue-400">skills</span><span className="text-white">:</span>{' '}<span className="text-emerald-400">[&apos;React&apos;, &apos;Laravel&apos;, &apos;Node&apos;]</span><span className="text-slate-500">,</span></p>
                                <p className="pl-4"><span className="text-blue-400">available</span><span className="text-white">:</span>{' '}<span className="text-orange-400">true</span><span className="text-slate-500">,</span></p>
                                <p className="pl-4"><span className="text-blue-400">coffee</span><span className="text-white">:</span>{' '}<span className="text-orange-400">&apos;required&apos;</span></p>
                                <p><span className="text-white">{'}'}</span><span className="text-slate-500">;</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {stats.map((s, i) => (
                                <div key={i} className="glass-card rounded-xl p-4 text-center hover:border-blue-500/30 transition-colors">
                                    <div className="text-2xl font-display font-bold text-gradient">{s.value}</div>
                                    <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Tech marquee */}
            <div className="relative z-10 border-t border-white/[0.05] py-3 overflow-hidden bg-navy-950/50">
                <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
                    {[...techStack, ...techStack].map((t, i) => (
                        <span key={i} className="font-mono text-[11px] tracking-widest uppercase text-slate-600 px-8">
                            {t} <span className="text-blue-500/40">&middot;</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
