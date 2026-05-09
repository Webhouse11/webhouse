import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Case Studies & Portfolio',
  description: 'See how we have helped entrepreneurs and businesses stand out and grow online with our past projects and success stories.',
  openGraph: {
    title: 'Success Stories | Webhouse Portfolio',
    description: 'We build things that work. See our recent global projects and documented impact on business growth.',
    url: '/portfolio',
  },
  alternates: {
    canonical: '/portfolio',
  }
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
