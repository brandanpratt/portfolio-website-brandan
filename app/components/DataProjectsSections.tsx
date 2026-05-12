'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const dataProjects = [
    {
        title: 'Retail Data Migration Platform',
        type: 'Data Engineering',
        description: 'Enterprise data platform orchestrating incremental migration of retail transactional data from legacy Microsoft SQL Server into Snowflake cloud warehouse, with Python ETL pipelines, Apache Airflow orchestration, and dbt-powered analytics transformations.',
        githubUrl: 'https://github.com/brandanpratt/retail-data-migration',
        liveUrl: undefined,
        context: 'Independent Project',
        role: 'Solo Developer',
        technologies: ['Python', 'Pandas', 'SQLAlchemy', 'Apache Airflow', 'dbt', 'Snowflake', 'SQL Server', 'Docker', 'PostgreSQL'],
        features: [
            'Incremental data loading with metadata watermark tracking',
            'Modular Python ETL pipelines with reusable components',
            'Snowflake warehouse architecture (RAW, STAGING, MARTS layers)',
            'dbt transformations with star schema modeling',
            'Automated data quality testing (unique, not-null, referential integrity)',
            'Apache Airflow DAG orchestration with task dependencies',
            'Pipeline audit logging and observability',
            'SMTP-based failure alerting',
            'Deduplication logic with ROW_NUMBER windowing',
            'Environment-driven security configuration'
        ],
        images: [
            '/projects/data-projects/retail-migration-1.jpg',
            '/projects/data-projects/retail-migration-2.jpg',
            '/projects/data-projects/retail-migration-3.jpg'
        ],
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'Bahamas Election Analytics Platform 2026',
        type: 'Real-Time Analytics Application',
        description: 'Live election analytics platform ingesting real-time constituency data from election APIs, warehoused in Snowflake, with interactive Streamlit dashboard featuring geospatial mapping, seat tracking, and party-level analytics.',
        githubUrl: 'https://github.com/brandanpratt/bahamas-election-analytics',
        liveUrl: 'https://bahamas-election-analytics.streamlit.app/',
        context: 'Independent Project',
        role: 'Solo Developer',
        technologies: ['Python', 'Pandas', 'SQLAlchemy', 'Snowflake', 'Streamlit', 'Plotly', 'GeoJSON', 'REST APIs'],
        features: [
            'Real-time API ingestion pipelines',
            'Live constituency tracking and updates',
            'Snowflake data warehouse for analytics MARTS',
            'Interactive Streamlit dashboard',
            'Plotly visualizations with live data',
            'GeoJSON-based geospatial election mapping',
            'Auto-refreshing seat count monitoring',
            'Party-level performance analytics',
            'Constituency boundary mapping',
            'Deployed on Streamlit Community Cloud'
        ],
        images: [
            '/projects/data-projects/bahamas-election-1.jpg',
            '/projects/data-projects/bahamas-election-2.jpg',
            '/projects/data-projects/bahamas-election-3.jpg'
        ],
        gradient: 'from-orange-500 to-red-500'
    }
];

export default function DataProjectsSection() {
    const [activeImageIndex, setActiveImageIndex] = useState<{ [key: number]: number }>({});

    const handleImageClick = (projectIndex: number, imageIndex: number) => {
        setActiveImageIndex({ ...activeImageIndex, [projectIndex]: imageIndex });
    };

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-gray-950 to-black">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Data Engineering</span> Projects
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        Production-grade data platforms demonstrating end-to-end data engineering workflows from API ingestion through cloud warehousing to interactive analytics.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    {dataProjects.map((project, projectIndex) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: projectIndex * 0.1 }}
                            className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300"
                        >
                            <div className="p-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Project Info */}
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                                <span className={`px-3 py-1 text-xs font-semibold bg-gradient-to-r ${project.gradient} rounded-full text-white`}>
                                                    {project.type}
                                                </span>
                                                <span className="px-3 py-1 text-xs font-medium bg-gray-800 text-gray-300 rounded-full">
                                                    {project.context}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                            <p className="text-gray-400 mb-4">{project.description}</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span className="font-medium text-gray-400">Role:</span>
                                                <span>{project.role}</span>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-blue-400 mb-3">Key Features</h4>
                                            <ul className="space-y-2">
                                                {project.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start text-sm text-gray-400">
                                                        <svg className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Technologies */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-purple-400 mb-3">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-md border border-gray-700"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-3 flex-wrap">
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                            >
                                                View on GitHub
                                                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.545 2.914 1.209.092-.937.35-1.546.636-1.903-2.22-.253-4.555-1.113-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.81c.85.004 1.705.114 2.504.336 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.191 20 14.435 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
                                                >
                                                    Live App
                                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Screenshots Gallery */}
                                    <div className="space-y-4">
                                        {/* Main Image */}
                                        <div className="relative bg-black/30 rounded-xl overflow-hidden border border-gray-800 group">
                                            <div className="relative aspect-video">
                                                <Image
                                                    src={project.images[activeImageIndex[projectIndex] || 0]}
                                                    alt={`${project.title} screenshot ${(activeImageIndex[projectIndex] || 0) + 1}`}
                                                    fill
                                                    className="object-cover object-top"
                                                    priority={projectIndex === 0}
                                                />
                                                {/* Overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>

                                        {/* Thumbnail Navigation */}
                                        {project.images.length > 1 && (
                                            <div className="grid grid-cols-3 gap-2">
                                                {project.images.map((image, imageIndex) => (
                                                    <button
                                                        key={imageIndex}
                                                        onClick={() => handleImageClick(projectIndex, imageIndex)}
                                                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                                                            (activeImageIndex[projectIndex] || 0) === imageIndex
                                                                ? 'border-blue-500 ring-2 ring-blue-500/20'
                                                                : 'border-gray-700 hover:border-gray-600'
                                                        }`}
                                                    >
                                                        <Image
                                                            src={image}
                                                            alt={`${project.title} thumbnail ${imageIndex + 1}`}
                                                            fill
                                                            className="object-cover object-top"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}