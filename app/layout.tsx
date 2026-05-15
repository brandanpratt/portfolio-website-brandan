import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
};

export const metadata: Metadata = {
	title: 'Brandan Pratt - Full-Stack Developer | Portfolio',
	description:
		'Welcome to my portfolio! I am a passionate full-stack developer who bridges the gap between frontend and backend development. Specializing in creating complete web solutions, from beautiful user interfaces to robust server architectures.',
	keywords: [
		'Full-Stack Developer',
		'Software Engineer',
		'Frontend Development',
		'Backend Development',
		'React',
		'Next.js',
		'Node.js',
		'TypeScript',
		'Database Design',
		'API Development',
		'Cloud Solutions',
		'DevOps',
		'System Architecture',
		'Web Development',
		'Brandan Pratt',
		'Web Developer',
		'Software Developer',
		'Developer for hire',
	],
	authors: [{ name: 'Brandan Pratt', url: 'https://portfolio-website-brandan.vercel.app' }],
	creator: 'Brandan Pratt',
	metadataBase: new URL('https://portfolio-website-brandan.vercel.app'),
	alternates: {
		canonical: 'https://portfolio-website-brandan.vercel.app',
	},
	openGraph: {
		title: 'Brandan Pratt - Full-Stack Developer Portfolio',
		description:
			'Passionate full-stack developer creating complete web solutions. Explore my projects and technical expertise across the entire development stack.',
		url: 'https://portfolio-website-brandan.vercel.app',
		siteName: 'Brandan Pratt - Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Brandan Pratt - Full-Stack Developer Portfolio',
				type: 'image/jpeg',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Brandan Pratt - Full-Stack Developer',
		description:
			'Passionate full-stack developer creating complete web solutions. Explore my projects and technical expertise across the entire development stack.',
		creator: '@brxn94',
		images: ['/og-image.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		'max-image-preview': 'large',
		'max-snippet': -1,
		'max-video-preview': -1,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: '', // Add your Google Search Console verification code here
	},
	category: 'Technology',
	other: {
		'og:type': 'website',
		'og:locale': 'en_US',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': 'https://portfolio-website-brandan.vercel.app/#person',
		name: 'Brandan Pratt',
		url: 'https://portfolio-website-brandan.vercel.app',
		description: 'Full-Stack Developer and Software Engineer',
		jobTitle: 'Full-Stack Developer',
		sameAs: [
			'https://twitter.com/brxn94',
			'https://github.com/brxn94',
			'https://www.linkedin.com/in/brandan-pratt',
		],
		knowsAbout: [
			'React',
			'Next.js',
			'Node.js',
			'TypeScript',
			'Full-Stack Development',
			'Web Development',
			'Backend Development',
			'Frontend Development',
		],
	};

	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
