import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Loader2 } from 'lucide-react';
import { testimonialService } from '../services/api';

function TestimonialCard({ testimonial, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative bg-white rounded-[2rem] p-8 shadow-lg border border-brand-100 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            {/* Quote icon */}
            <div className="w-10 h-10 bg-brand-500/10 rounded-full flex items-center justify-center">
                <Quote className="w-5 h-5 text-brand-500" />
            </div>

            {/* Message */}
            <p className="text-brand-800/80 text-lg leading-relaxed flex-1">
                "{testimonial.message}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-4 border-t border-brand-100">
                {testimonial.avatar_url ? (
                    <img
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-200"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-700 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                    </div>
                )}
                <div>
                    <p className="font-bold text-brand-900">{testimonial.name}</p>
                    <p className="text-sm text-brand-500 font-medium">
                        {testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ''}
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
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    // Don't render the section if there are no testimonials
    if (!loading && testimonials.length === 0) return null;

    return (
        <section id="testimonials" className="py-32 px-6 bg-brand-50 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <span className="text-brand-500 font-semibold tracking-wide uppercase text-sm">Kind Words</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-brand-900 mt-4">
                        What clients <span className="text-brand-400 italic font-medium">say.</span>
                    </h2>
                    <p className="mt-6 text-xl text-brand-800/60 max-w-xl mx-auto font-light">
                        Results matter more than promises. Here's what people say after we've shipped together.
                    </p>
                </motion.div>

                {/* Cards */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={t.id} testimonial={t} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
