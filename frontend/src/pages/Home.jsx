import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Testimonials />
                <Contact />
            </main>

            <footer className="py-8 text-center text-sm font-medium text-brand-800/40 bg-brand-50">
                <p>© {new Date().getFullYear()} Portfolio Studio. Engineered with precision.</p>
            </footer>
        </div>
    );
}
