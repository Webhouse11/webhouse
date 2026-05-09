import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Marketing & Ads Strategy',
  description: 'Scale your revenue with high-performance digital marketing campaigns and data-driven ad strategies.',
  openGraph: {
    title: 'Performance Marketing | Webhouse Growth Agency',
    description: 'We help brands command respect and scale revenue through high-performance digital infrastructure.',
    url: '/digital-marketing',
  },
  alternates: {
    canonical: '/digital-marketing',
  }
};

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
