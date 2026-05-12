'use client';

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import DataProjectsSection from './components/DataProjectsSections';
import WebsitesSection from './components/WebsitesSection';
import ContactSection from './components/ContactSection';

export default function FullStackPortfolio() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
			<HeroSection />
			<AboutSection />
			<ServicesSection />
			<ProjectsSection />
			<DataProjectsSection />
			<WebsitesSection />
			<ContactSection />
		</main>
	);
}
