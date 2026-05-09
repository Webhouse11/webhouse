import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Design & Development',
  description: 'High-converting websites and SaaS platforms built for scale. We design digital infrastructures that turn visitors into loyal customers.',
  openGraph: {
    title: 'Modern Web Development | Webhouse Digital Systems',
    description: 'High-converting digital systems and apps for serious business scale and growth.',
    url: '/website-design',
  },
  alternates: {
    canonical: '/website-design',
  }
};

export default function WebsiteDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
