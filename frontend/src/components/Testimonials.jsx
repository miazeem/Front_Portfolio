import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Loader2 } from 'lucide-react';
import { testimonialService } from '../services/api';

function TestimonialCard({ testimonial, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4 border border-white/[0.07] transition-all duration-300"
        >
            <div className="flex items-center justify-between">
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                </div>
                <Quote className="w-6 h-6 text-blue-500/25" />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.message}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                {testimonial.avatar_url ? (
                    <img src={testimonial.avatar_url} alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/30 flex items-center justify-center text-blue-300 font-bold text-sm font-display">
                        {testimonial.name.charAt(0)}
                    </div>
                )}
                <div>
                    <p className="text-white text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-cyan-400 text-xs">
                        {testimonial.role}{testimonial.company ? `  ${testimonial.company}` : ''}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        testimonialService.getTestimonials()
            .then(data => setTestimonials(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (!loading && testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="relative py-28 px-6 md:px-10 bg-navy-900 overflow-hidden">

            <div className="absolute inset-0 bg-dot-grid" />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/[0.08] blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-gradient-to-r from-cyan-400 to-blue-500" />
                        <span className="text-xs font-semibold tracking-widest uppercase text-cyan-400">Testimonials</span>
                        <div className="h-px w-8 bg-gradient-to-l from-blue-500 to-cyan-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        What Clients <span className="text-gradient">Say</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Results matter more than promises. Here's what people say after we've shipped together.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={t.id} testimonial={t} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
