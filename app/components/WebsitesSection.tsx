'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const websites = [
	{
		title: 'Employee ID Management System',
		type: 'Web Application',
		description: 'A centralized employee ID management system for the Ministry of Health and Wellness and the Department of Public Health, enabling employee registration, photo submission, and automated ID card generation with dynamic printing capabilities.',
		url: '#',
		context: 'Digital Transformation Unit - Ministry of Economic Affairs',
		role: 'Full-Stack Developer',
		technologies: ['PHP', 'JavaScript', 'MariaDB', 'Dynamic PDF Generation', 'Dashboard UI', 'Role-based Access'],
		features: [
			'Employee registration and verification',
			'Photo submission system',
			'Dynamic ID card generation',
			'Automated card printing with templates',
			'Centralized employee data management',
			'Administrative back office',
			'Employee information updates',
			'Category and position management',
			'Advanced search and filtering',
			'Analytics dashboard'
		],
		images: [
			'/projects/idmanagement-hero.png',
			'/projects/idmanagement-dashboard.png',
			'/projects/idmanagement-employees.png',
			'/projects/idmanagement-categories.png',
			'/projects/idmanagement-search.png',
			'/projects/idmanagement-positions.png'
		],
		gradient: 'from-teal-500 to-cyan-500'
	},
	{
		title: 'Jubilee International Ministries',
		type: 'Website',
		description: 'A comprehensive church website featuring ministry information, leadership profiles, event management, and visitor engagement tools.',
		url: 'https://jubileepittintl.com/',
		context: 'Independent Project',
		role: 'Full-Stack Developer',
		technologies: ['PHP', 'WordPress', 'HTML/CSS', 'Responsive Design'],
		features: [
			'Ministry showcase and information',
			'Leadership team profiles',
			'Visitor welcome system',
			'Event management',
			'Mobile-responsive design',
			'Content management system'
		],
		images: [
			'/projects/jubilee-hero.png',
			'/projects/jubilee-welcome.png',
			'/projects/jubilee-ministries.png',
			'/projects/jubilee-leadership.png'
		],
		gradient: 'from-purple-500 to-blue-500'
	},
	{
		title: 'Our News (GO242)',
		type: 'Website',
		description: 'A dynamic news and community platform featuring local news, weather forecasts, celebrations, and community engagement for The Bahamas.',
		url: 'https://ournews.bs/',
		context: 'Plato Alpha',
		role: 'Full-Stack Developer',
		technologies: ['WordPress', 'Dropbox API', 'PHP', 'JavaScript', 'MySQL', 'Responsive Design'],
		features: [
			'Real-time news feed',
			'Weather forecast integration',
			'Community celebrations platform',
			'Social media integration',
			'Multi-section content layout',
			'Mobile-first responsive design'
		],
		images: [
			'/projects/ournews-hero.png',
			'/projects/ournews-celebrations.png'
		],
		gradient: 'from-red-500 to-orange-500'
	},
	{
		title: 'TriblockHR',
		type: 'Web Application',
		description: 'A comprehensive HR management system with timesheet tracking, document management, payroll processing, and employee management capabilities.',
		url: 'https://triblockhr.net/',
		context: 'Plato Alpha',
		role: 'Full-Stack Developer',
		technologies: ['Laravel', 'React', 'MySQL', 'RESTful API', 'Dashboard UI'],
		features: [
			'Employee timesheet management',
			'Company document storage',
			'Pay period tracking',
			'Role-based access control',
			'Payroll management',
			'Dashboard analytics',
			'Form submissions tracking'
		],
		images: [
			'/projects/triblock-dashboard.png',
			'/projects/triblock-timesheets.png',
			'/projects/triblock-documents.png',
			'/projects/triblock-performancereview.png',
			'/projects/triblock-performance-review-test.png'
		],
		gradient: 'from-indigo-500 to-purple-500'
	}
];

export default function WebsitesSection() {
	const [activeImageIndex, setActiveImageIndex] = useState<{ [key: number]: number }>({});

	const handleImageClick = (projectIndex: number, imageIndex: number) => {
		setActiveImageIndex({ ...activeImageIndex, [projectIndex]: imageIndex });
	};

	return (
		<section className="py-20 px-4 bg-gradient-to-b from-black to-gray-950">
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl font-bold mb-4">
						Portfolio <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Websites & Web Apps</span>
					</h2>
					<p className="text-gray-400 text-lg max-w-3xl mx-auto">
						Real-world projects showcasing full-stack development capabilities across various industries,
						from church websites to HR management systems and news platforms.
					</p>
				</motion.div>

				<div className="space-y-16">
					{websites.map((project, projectIndex) => (
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
											<div className="flex items-center gap-3 mb-3">
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

										{/* Link */}
										{project.url !== '#' && (
											<div>
												<a
													href={project.url}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
												>
													Visit Website
													<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
													</svg>
												</a>
											</div>
										)}
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
												/>
												{/* Overlay on hover */}
												<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										</div>

										{/* Thumbnail Navigation */}
										{project.images.length > 1 && (
											<div className="grid grid-cols-4 gap-2">
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

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mt-16"
				>
					<div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-8">
						<h3 className="text-2xl font-semibold mb-4">Want to see more of my work?</h3>
						<p className="text-gray-400 mb-6 max-w-2xl mx-auto">
							These are just a few examples of the projects I&apos;ve worked on. Let&apos;s discuss how I can help bring your vision to life.
						</p>
						<a
							href="#contact"
							className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
						>
							Get in Touch
							<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
