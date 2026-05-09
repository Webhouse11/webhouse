import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Our Strategy Team',
  description: 'Ready to scale your business? Get in touch with us for a free digital audit or strategy session.',
  openGraph: {
    title: 'Contact Webhouse | Let\'s Build Together',
    description: 'Connect with our team for high-performance digital solutions and growth marketing strategies.',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
