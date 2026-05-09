import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions governing the use of Webhouse Media services and digital platforms.',
  openGraph: {
    title: 'Terms of Service | Webhouse Media',
    description: 'Understanding the terms of our service and cooperation.',
    url: '/terms',
  },
  alternates: {
    canonical: '/terms',
  }
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
