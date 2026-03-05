import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2, ArrowUpRight } from 'lucide-react';
import { projectService } from '../services/api';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        projectService.getProjects()
            .then(data => setProjects(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="projects" className="relative py-28 px-6 md:px-10 bg-navy-800 overflow-hidden">

            <div className="absolute inset-0 bg-dot-grid opacity-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/[0.08] blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-blue-500" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400">Portfolio</span>
                        <div className="h-px w-8 bg-gradient-to-l from-blue-500 to-cyan-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Selected <span className="text-gradient">Works</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Solving real problems, not just writing logic. Here's what I've built.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group glass-card rounded-2xl overflow-hidden border border-white/[0.07] hover:border-blue-500/30 transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={project.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        {project.live_url && (
                                            <a href={project.live_url} target="_blank" rel="noreferrer"
                                                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-white hover:bg-blue-500/40 transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" rel="noreferrer"
                                                className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                                <Github className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-display font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        {project.live_url && (
                                            <a href={project.live_url} target="_blank" rel="noreferrer"
                                                className="ml-2 shrink-0 text-slate-600 group-hover:text-blue-400 transition-colors">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {project.solution || project.problem}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {(project.tags || []).map(tag => (
                                            <span key={tag} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
