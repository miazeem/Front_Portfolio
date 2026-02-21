import React from 'react';
import { motion } from 'framer-motion';
import { Database, Layout, Server, Settings2, ShieldCheck, TerminalSquare } from 'lucide-react';

const skillCategories = [
    {
        title: "Frontend Architecture",
        icon: <Layout className="w-6 h-6" />,
        skills: ["React 19", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
        color: "bg-orange-100 text-orange-800 border-orange-200"
    },
    {
        title: "Backend Services",
        icon: <Server className="w-6 h-6" />,
        skills: ["Laravel API", "Node.js", "Express", "REST/GraphQL", "WebSockets"],
        color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
        title: "Data & Storage",
        icon: <Database className="w-6 h-6" />,
        skills: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "AWS S3"],
        color: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
        title: "DevOps & Cloud",
        icon: <TerminalSquare className="w-6 h-6" />,
        skills: ["Docker", "GitHub Actions", "AWS EC2", "Vercel", "Linux"],
        color: "bg-purple-100 text-purple-800 border-purple-200"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function Skills() {
    return (
        <section id="skills" className="py-24 px-6 relative bg-grid-pattern">
            <div className="max-w-7xl mx-auto relative z-10">

                <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-brand-200 pb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-900 flex items-center gap-4">
                        <Settings2 className="w-10 h-10 text-brand-500 animate-spin-slow" style={{ animationDuration: '10s' }} />
                        System Blueprint
                    </h2>
                    <p className="text-xl text-brand-800/60 font-light mt-4 md:mt-0">The tools I use to architect digital products.</p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className={`p-6 rounded-[2rem] border glass-panel transition-transform hover:-translate-y-2 ${category.color.replace('text-', 'hover:border-').split(' ')[2]}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${category.color}`}>
                                {category.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-brand-900">{category.title}</h3>
                            <ul className="space-y-3">
                                {category.skills.map((skill, sIdx) => (
                                    <li key={sIdx} className="flex items-center gap-2 text-brand-800/80 font-medium">
                                        <ShieldCheck className="w-4 h-4 text-brand-500 opacity-70" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
