import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { projectService } from '../services/api';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        projectService.getProjects()
            .then(data => setProjects(data))
            .catch(() => setError('Could not load projects.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section id="projects" className="py-32 px-6 bg-brand-50 relative">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                    <span className="text-brand-500 font-semibold tracking-wide uppercase text-sm">Selected Works</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-brand-900 mt-4">
                        Solving real problems.<br />
                        <span className="text-brand-400 italic font-medium">Not just writing logic.</span>
                    </h2>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-brand-500 animate-spin mb-4" />
                        <p className="text-brand-800/60 font-medium animate-pulse">Fetching projects from API...</p>
                    </div>
                ) : (
                    <div className="space-y-32">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
                            >
                                {/* Image Side */}
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="absolute inset-0 bg-brand-500/20 translate-x-4 translate-y-4 rounded-[2rem] -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                                    <div className="overflow-hidden rounded-[2rem] aspect-[4/3] border-4 border-white shadow-xl relative z-10">
                                        <img
                                            src={project.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-1/2 flex flex-col items-start gap-6">
                                    <h3 className="text-3xl md:text-4xl font-bold text-brand-900">{project.title}</h3>

                                    <div className="space-y-4 relative pl-6 border-l-2 border-brand-200">
                                        <div>
                                            <h4 className="text-sm font-bold text-red-500 uppercase tracking-wide mb-1">The Problem</h4>
                                            <p className="text-brand-800/80 text-lg leading-relaxed">{project.problem}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-wide mb-1">The Solution</h4>
                                            <p className="text-brand-800/80 text-lg leading-relaxed">{project.solution}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {(project.tags || []).map(tag => (
                                            <span key={tag} className="px-4 py-1.5 bg-brand-100 text-brand-800 text-sm font-medium rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-4">
                                        {project.live_url && (
                                            <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-brand-900 text-white rounded-full hover:bg-brand-800 transition-colors font-medium">
                                                View Live <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-brand-200 bg-white text-brand-900 rounded-full hover:bg-brand-50 transition-colors font-medium">
                                                Code <Github className="w-4 h-4" />
                                            </a>
                                        )}
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
