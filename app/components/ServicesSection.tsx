'use client';

import { motion } from 'framer-motion';

const services = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        ),
        title: 'Custom Web Applications',
        description: 'Full-stack web applications built with modern technologies. From concept to deployment, I create scalable, high-performance solutions tailored to your business needs.',
        features: [
            'React & Next.js frontends',
            'Laravel & Python backends',
            'Database design & optimization',
            'API development & integration',
            'Cloud deployment (AWS, Vercel)',
            'Performance optimization'
        ],
        technologies: ['React', 'Next.js', 'Laravel', 'TypeScript', 'PostgreSQL', 'AWS']
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
            </svg>
        ),
        title: 'Data Engineering & Analytics',
        description: 'End-to-end data platforms for modern enterprises. ETL pipelines, cloud warehousing, real-time analytics, and automated data workflows that turn raw data into actionable insights.',
        features: [
            'ETL pipeline development',
            'Cloud data warehousing (Snowflake)',
            'dbt transformations & modeling',
            'Apache Airflow orchestration',
            'Real-time data ingestion',
            'Analytics dashboards & reporting'
        ],
        technologies: ['Snowflake', 'Apache Airflow', 'dbt', 'Python', 'Pandas', 'SQL']
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
            </svg>
        ),
        title: 'Mobile-Responsive Design',
        description: 'Beautiful, responsive designs that work seamlessly across all devices. Using modern CSS frameworks and mobile-first approaches to ensure your application looks great everywhere.',
        features: [
            'Mobile-first responsive design',
            'Cross-browser compatibility',
            'Progressive Web Apps (PWA)',
            'Touch-optimized interfaces',
            'Performance optimization',
            'Accessibility compliance'
        ],
        technologies: ['Tailwind CSS', 'Framer Motion', 'PWA', 'Responsive Design', 'CSS Grid', 'Flexbox']
    }
];

export default function ServicesSection() {
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
                        Services I <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Provide</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        Comprehensive development services to transform your ideas into powerful, scalable solutions.
                        From full-stack web applications to data platforms, I deliver end-to-end technical excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <div className="text-white">{service.icon}</div>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-400 transition-colors">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                            {/* Features */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-300 mb-3">Key Features:</h4>
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-400">
                                            <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-300 mb-3">Technologies:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {service.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md border border-gray-700"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}