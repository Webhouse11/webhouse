import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Design & Identity',
  description: 'Build a brand that commands trust. We create logos, brand guides, and visual identities that make your business stand out.',
  openGraph: {
    title: 'Visual Identity & Branding | Webhouse Lab',
    description: 'Bespoke branding solutions for established professionals and ambitious startups.',
    url: '/branding',
  },
  alternates: {
    canonical: '/branding',
  }
};

export default function BrandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
