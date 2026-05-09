import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PostPilot Social Media Management',
  description: 'Professional social media management. We manage your social media platforms while you focus on growing your business.',
  openGraph: {
    title: 'PostPilot™ Social Management | Webhouse Media',
    description: 'Bespoke social media content and growth strategy for modern brands and creators world-wide.',
    url: '/social-media',
  },
  alternates: {
    canonical: '/social-media',
  }
};

export default function SocialMediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
