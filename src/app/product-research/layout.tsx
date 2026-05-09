import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Product Research & Launch',
  description: 'Data-driven market research and strategic planning for launching successful digital products and high-growth services.',
  openGraph: {
    title: 'Market Intelligence & Digital Research | Webhouse',
    description: 'We help you identify profitable market gaps and build digital products that customers actually want to buy.',
    url: '/product-research',
  },
  alternates: {
    canonical: '/product-research',
  }
};

export default function ProductResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
