import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function Home() {
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
                         {new Date().getFullYear()} DevFolio  Engineered with Precision
                    </span>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                        <a href="#skills" className="hover:text-white transition-colors">Skills</a>
                        <a href="#projects" className="hover:text-white transition-colors">Work</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
