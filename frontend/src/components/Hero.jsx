import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-12">
            {/* Background Ornaments */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-200/40 rounded-organic-1 blur-3xl animate-morph hidden md:block" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-500/20 rounded-organic-2 blur-3xl animate-morph hidden md:block" style={{ animationDelay: '-4s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-grid-pattern opacity-50 max-w-7xl mx-auto" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-200 bg-white/50 backdrop-blur-md mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                    <span className="text-sm font-medium tracking-wide uppercase text-brand-800">Available for innovative roles</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold text-balance leading-[0.9] mb-8"
                >
                    Engineering <br className="hidden md:block" /><span className="text-brand-600 italic font-medium">Digital</span> Realities
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl md:text-2xl text-brand-800/80 max-w-2xl text-balance mb-12 font-light"
                >
                    I'm a full-stack developer partnering with startups to build products that look beautiful and scale flawlessly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center gap-6"
                >
                    <a href="#projects" className="group relative px-8 py-4 bg-brand-900 text-white rounded-full overflow-hidden flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                        <span className="relative z-10 font-semibold tracking-wide">Explore Work</span>
                        <ArrowDownRight className="relative z-10 w-5 h-5 group-hover:rotate-[-45deg] transition-transform" />
                        <div className="absolute inset-0 bg-brand-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
