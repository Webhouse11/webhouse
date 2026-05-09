import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans & Packages',
  description: 'Affordable digital growth for every business size. Explore our website design and social media marketing packages.',
  openGraph: {
    title: 'Simple Pricing. Clear Impact. | Webhouse Plans',
    description: 'High-performance digital growth for every business stage. No hidden fees, just clear value.',
    url: '/pricing',
  },
  alternates: {
    canonical: '/pricing',
  }
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
