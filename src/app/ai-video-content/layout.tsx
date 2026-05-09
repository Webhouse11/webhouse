import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Video Content & Automation',
  description: 'Leverage AI to create high-converting short-form video content and automate your marketing workflows for maximum efficiency.',
  openGraph: {
    title: 'AI Content Generation & Automation | Webhouse Media',
    description: 'Transform your brand with AI-powered video systems and automation that drives engagement and sales.',
    url: '/ai-video-content',
  },
  alternates: {
    canonical: '/ai-video-content',
  }
};

export default function AiVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
