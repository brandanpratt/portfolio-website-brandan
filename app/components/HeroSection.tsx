'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HeroSection() {
    const [selectedStack, setSelectedStack] = useState<'frontend' | 'backend' | 'data' | null>(null);

    return (
        <section className="min-h-screen relative overflow-hidden py-24 md:py-0">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-8 md:pt-0">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-12">
                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                        <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500">
                            Brandan Pratt
                        </h1>
                        <h2 className="text-2xl md:text-4xl font-bold text-white">Full-Stack & Data Engineer</h2>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            Building scalable applications and production-grade data platforms that drive real business impact.
                        </p>
                        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
                            Specializing in modern web development with{' '}
                            <span className="text-cyan-400">React</span> &
                            <span className="text-purple-400"> Next.js</span>, backend systems with
                            <span className="text-red-400"> Laravel</span> &
                            <span className="text-yellow-400"> Python</span>, and data engineering with
                            <span className="text-blue-400"> Snowflake</span> &
                            <span className="text-indigo-400"> Apache Airflow</span>.	
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
                        <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-500/10 rounded-full text-blue-400 text-xs md:text-sm">React & Next.js</span>
                        <span className="px-3 md:px-4 py-1.5 md:py-2 bg-purple-500/10 rounded-full text-purple-400 text-xs md:text-sm">TypeScript</span>
                        <span className="px-3 md:px-4 py-1.5 md:py-2 bg-red-500/10 rounded-full text-red-400 text-xs md:text-sm">Laravel</span>
                        <span className="px-3 md:px-4 py-1.5 md:py-2 bg-yellow-500/10 rounded-full text-yellow-400 text-xs md:text-sm">Python</span>
                        <span className="px-3 md:px-4 py-1.5 md:py-2 bg-blue-500/10 rounded-full text-blue-400 text-xs md:text-sm">Snowflake</span>
                        <span className="px-3 md:px-4 py-1.5 md:py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-xs md:text-sm">Apache Airflow</span>
                    </div>
                </motion.div>

                {/* Interactive System Architecture */}
                <div className="w-full max-w-5xl mx-auto relative px-2 md:px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 md:p-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                            {/* Frontend Layer */}
                            <div
                                className={`p-4 md:p-6 rounded-lg transition-colors border-2 ${
                                    selectedStack === 'frontend' ? 'bg-blue-500/20 border-blue-500/50' : 'bg-gray-800/50 hover:bg-gray-800/80 border-transparent'
                                }`}
                                onMouseEnter={() => setSelectedStack('frontend')}
                                onMouseLeave={() => setSelectedStack(null)}
                            >
                                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-400">Frontend Development</h3>
                                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        React & Next.js Applications
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        TypeScript & Responsive Design
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                        Performance & Interactive UIs
                                    </li>
                                </ul>
                            </div>

                            {/* Backend Layer */}
                            <div
                                className={`p-4 md:p-6 rounded-lg transition-colors border-2 ${
                                    selectedStack === 'backend' ? 'bg-purple-500/20 border-purple-500/50' : 'bg-gray-800/50 hover:bg-gray-800/80 border-transparent'
                                }`}
                                onMouseEnter={() => setSelectedStack('backend')}
                                onMouseLeave={() => setSelectedStack(null)}
                            >
                                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-purple-400">Backend Systems</h3>
                                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                        Laravel & Python APIs
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                        Database Design & Optimization
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                        Scalable Architecture & DevOps
                                    </li>
                                </ul>
                            </div>

                            {/* Data Engineering Layer */}
                            <div
                                className={`p-4 md:p-6 rounded-lg transition-colors border-2 ${
                                    selectedStack === 'data' ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-gray-800/50 hover:bg-gray-800/80 border-transparent'
                                }`}
                                onMouseEnter={() => setSelectedStack('data')}
                                onMouseLeave={() => setSelectedStack(null)}
                            >
                                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-cyan-400">Data Engineering</h3>
                                <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-gray-400">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                        ETL Pipelines & Data Warehousing
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                        Snowflake & Apache Airflow
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                                        dbt & Real-Time Analytics
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}