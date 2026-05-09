import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Solutions & Services',
  description: 'Explore our full range of digital growth services including website design, social media marketing, branding, and strategic infrastructure.',
  openGraph: {
    title: 'Webhouse Services | Growth Solutions for Your Business',
    description: 'We provide everything you need to build your brand and find more customers online. Simple, affordable, and high-performance.',
    url: '/services',
  },
  alternates: {
    canonical: '/services',
  }
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
