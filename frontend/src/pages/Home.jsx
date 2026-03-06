import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function Home() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-navy-900">
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Testimonials />
                <Contact />
            </main>

            <footer className="py-8 px-6 md:px-10 bg-navy-950 border-t border-white/[0.05]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-slate-500 text-sm">
                         {new Date().getFullYear()} Azeem Tech - Engineered with Precision
                    </span>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                        <a href="#skills" className="hover:text-white transition-colors">Skills</a>
                        <a href="#projects" className="hover:text-white transition-colors">Work</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>

            {/* Scroll to top */}
            {showTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all hover:scale-110 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)' }}
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5 text-white" />
                </button>
            )}
        </div>
    );
}
