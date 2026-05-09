import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DFY Digital Services & BrandBox',
  description: 'Done-For-You digital solutions. We build your entire online presence, from website design to social media setup and brand identity.',
  openGraph: {
    title: 'BrandBox™ Done-For-You Services | Webhouse',
    description: 'High-performance digital infrastructure designed to command respect and scale revenue. We build it all for you.',
    url: '/dfy-services',
  },
  alternates: {
    canonical: '/dfy-services',
  }
};

export default function DfyServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
