import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

    return (
        <section id="about" ref={containerRef} className="py-32 px-6 relative overflow-hidden bg-brand-900 text-brand-50">

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div style={{ opacity }} className="max-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-brand-200">
                        More than just writing code. It's about solving the right problems.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg md:text-xl font-light text-brand-50/80 leading-relaxed">
                        <p>
                            I bridge the gap between complex system architecture and seamless user experiences. Startups hire me when they need technical foundations that won't crumble under pressure, wrapped in interfaces users actually love.
                        </p>
                        <p>
                            My approach blends rigorous engineering principles with creative frontend execution. Whether it's optimizing database queries or tweaking micro-interactions, I sweat the details so you don't have to.
                        </p>
                    </div>
                </motion.div>

                {/* Abstract Architectural Shapes */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute right-0 top-1/4 w-64 h-64 md:w-96 md:h-96 border border-brand-500/30 rounded-full flex items-center justify-center opacity-50 mix-blend-screen"
                >
                    <div className="w-1/2 h-1/2 border border-brand-400/30 rounded-full" />
                </motion.div>

                <motion.div
                    style={{ y: y2 }}
                    className="absolute right-1/4 bottom-0 w-32 h-32 md:w-64 md:h-64 bg-brand-600/10 blur-xl rounded-full mix-blend-screen"
                />

            </div>
        </section>
    );
}
