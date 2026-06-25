import type { Metadata } from 'next';
import BulkVideoClient from './BulkVideoClient';

export const metadata: Metadata = {
  title: 'Bulk Video Creation Services | Webhouse Media & Marketing Solutions',
  description: 'Professional bulk video creation services for businesses, ministries, coaches, personal brands, and organizations. Order 10, 20, 50, or 100 videos with optional uploading and content management support.',
  alternates: {
    canonical: '/bulk-video-creation',
  },
  openGraph: {
    title: 'Bulk Video Creation Services | Webhouse Media & Marketing Solutions',
    description: 'Professional bulk video creation services for businesses, ministries, coaches, personal brands, and organizations. Order 10, 20, 50, or 100 videos with optional uploading and content management support.',
    url: '/bulk-video-creation',
  }
};

export default function BulkVideoPage() {
  return <BulkVideoClient />;
}
