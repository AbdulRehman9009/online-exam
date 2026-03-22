import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/faculty/', '/students/', '/api/'],
    },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
