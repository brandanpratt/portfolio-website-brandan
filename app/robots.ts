import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/api/', '/.next/', '/public/'],
		},
		sitemap: 'https://portfolio-website-brandan.vercel.app/sitemap.xml',
	};
}
