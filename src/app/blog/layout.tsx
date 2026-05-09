import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Media Insights',
  description: 'Stay updated with the latest digital marketing trends, growth hacks, and business growth strategies from Webhouse Media.',
  openGraph: {
    title: 'Webhouse Media Blog | Digital Growth Insights',
    description: 'Expert advice and actionable strategies to help your business scale in the digital age.',
    url: '/blog',
  },
  alternates: {
    canonical: '/blog',
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
