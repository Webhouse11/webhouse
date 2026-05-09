import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our commitment to protecting your privacy and personal data at Webhouse Media.',
  openGraph: {
    title: 'Privacy Policy | Webhouse Media',
    description: 'Learn how we collect, use, and protect your information.',
    url: '/privacy',
  },
  alternates: {
    canonical: '/privacy',
  }
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
