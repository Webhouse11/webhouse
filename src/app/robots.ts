import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/wp-admin',
        '/administrator',
        '/.env',
        '/*.php',
      ],
    },
    sitemap: 'https://webhousemedia.vercel.app/sitemap.xml',
  };
}
