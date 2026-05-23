import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/src/index.css';
import { Navbar, Footer } from '@/src/components/LayoutNext'; // I will create LayoutNext
import { WhatsAppButton } from '@/src/components/WhatsAppButton';
import { TelegramButton } from '@/src/components/TelegramButton';
import { AppProvider } from '@/src/context/AppContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.webhousemedia.com.ng'),
  title: {
    default: 'Webhouse Media & Marketing Solution | Digital Growth & AI Solutions',
    template: '%s | Webhouse Media & Marketing Solution'
  },
  description: 'We help African businesses, schools, churches, and entrepreneurs grow online with affordable website design, social media management, and digital marketing.',
  icons: {
    icon: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1779114037/logo_cevoae.jpg',
    shortcut: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1779114037/logo_cevoae.jpg',
    apple: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1779114037/logo_cevoae.jpg',
  },
  keywords: ['digital marketing Nigeria', 'website design Lagos', 'affordable branding Africa', 'social media management for small business', 'AI tools for business Nigeria', 'business growth solutions'],
  openGraph: {
    title: 'Webhouse Media & Marketing Solution | Digital Growth & AI Solutions',
    description: 'Affordable digital solutions for entrepreneurs and small businesses in Africa. Website design, branding, and marketing made simple.',
    url: '/',
    siteName: 'Webhouse Media & Marketing Solutions',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Webhouse - Digital Solutions for Businesses',
      }
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webhouse Media & Marketing Solution | Digital Growth & AI Solutions',
    description: 'Helping African businesses grow with smart, affordable digital tools.',
    images: ['https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200&h=630'],
  },
  alternates: {
    canonical: '/',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Webhouse Lab",
    "description": "Grow your business online, simply",
    "url": "https://www.webhousemedia.com.ng",
    "logo": "https://res.cloudinary.com/dhzouslh1/image/upload/v1779114037/logo_cevoae.jpg",
    "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200",
    "telephone": "+234-815-246-9749",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "15 Ring Road",
      "addressLocality": "Ibadan",
      "addressRegion": "Oyo State",
      "addressCountry": "NG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-815-246-9749",
      "contactType": "Customer Support",
      "email": "webhousemediastudio@gmail.com",
      "areaServed": ["NG", "Africa"]
    },
    "sameAs": [
      "https://www.facebook.com/webhouselab/",
      "https://www.instagram.com/webhousemedia/",
      "https://www.linkedin.com/company/webhouse-media/"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans selection:bg-emerald-600 selection:text-white antialiased">
        <AppProvider>
          <Navbar />
          <WhatsAppButton />
          <TelegramButton />
          <main className="overflow-x-hidden pt-[112px]">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
