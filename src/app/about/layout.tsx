import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Team',
  description: 'Learn about Webhouse Media, our mission, and how we help African businesses scale through digital innovation and strategic infrastructures.',
  openGraph: {
    title: 'About Webhouse Media | Digital Growth Experts',
    description: 'The backbone of digital growth for African entrepreneurs. We build websites, SaaS, and AI systems built for scale.',
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
