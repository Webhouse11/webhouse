import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/src/index.css';
import { Navbar, Footer } from '@/src/components/LayoutNext'; // I will create LayoutNext
import { WhatsAppButton } from '@/src/components/WhatsAppButton';
import { AppProvider } from '@/src/context/AppContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Webhouse Media – Best Digital Marketing & AI Marketing Agency in Nigeria',
    template: '%s | Webhouse Media'
  },
  description: 'Webhouse Media is the top digital marketing agency in Nigeria, specializing in AI marketing tools, social media growth, and SaaS development across Africa.',
  keywords: ['digital marketing agency in Nigeria', 'social media marketing Lagos', 'best digital marketer Nigeria', 'AI marketing tools small business', 'Facebook ads expert Nigeria', 'Instagram growth Africa', 'website development Nigeria', 'SaaS development Africa'],
  openGraph: {
    title: 'Webhouse Media – Best Digital Marketing & AI Marketing Agency in Nigeria',
    description: 'Scale your business with the best digital marketing, AI automation, and SaaS development services in Nigeria and Africa.',
    url: 'https://webhousemedia.vercel.app',
    siteName: 'Webhouse Media',
    images: [
      {
        url: 'https://res.cloudinary.com/dhzouslh1/image/upload/v1773161041/591626377_1368804921611344_6068326484691096664_n_c1x0d4.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webhouse Media – Best Digital Marketing & AI Marketing Agency in Nigeria',
    description: 'Scale your business with the best digital marketing, AI automation, and SaaS development services in Nigeria and Africa.',
  },
  verification: {
    google: 'google780f93d2db1e5fc1',
  },
  alternates: {
    canonical: 'https://webhousemedia.vercel.app',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-white font-sans selection:bg-emerald-500 selection:text-white antialiased">
        <AppProvider>
          <Navbar />
          <WhatsAppButton />
          <main>{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
