import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import { Navbar, Footer } from './components/Layout';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Training } from './pages/Training';
import { Resources } from './pages/Resources';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPath = location.pathname === '/login';

  // Dynamic SEO based on path
  const getSEO = () => {
    const path = location.pathname;
    if (path === '/') return {
      title: 'Webhouse Media – Best Digital Marketing & AI Marketing Agency in Nigeria',
      description: 'Webhouse Media is the top digital marketing agency in Nigeria. We offer AI marketing tools, social media marketing in Lagos, and SaaS development across Africa.'
    };
    if (path === '/about') return {
      title: 'About Us – Webhouse Media | Leading Tech Agency in Africa',
      description: 'Learn about Webhouse Media, the best digital marketer in Nigeria providing business growth strategies for startups in Africa.'
    };
    if (path === '/services') return {
      title: 'Our Services – Digital Systems, AI Automation & Web Development',
      description: 'Explore our services: from logo design and brand identity in Nigeria to custom software development and Facebook ads expertise.'
    };
    if (path === '/training') return {
      title: 'Tech Training – Master Digital Systems & AI Marketing',
      description: 'Join our tech training programs in Nigeria. Master digital marketing, AI tools, and website development to scale your career or business.'
    };
    if (path === '/resources') return {
      title: 'Digital Resources – Ebooks, Toolkits & Marketing Guides',
      description: 'Download affordable website design guides, brand identity toolkits, and WhatsApp marketing strategies for businesses in Nigeria.'
    };
    if (path === '/blog') return {
      title: 'Blog & Insights – Digital Marketing Trends in Africa',
      description: 'Stay updated with the latest in AI marketing, social media trends, and business growth strategies from Webhouse Media.'
    };
    if (path === '/contact') return {
      title: 'Contact Us – Start Your Project with Webhouse Media',
      description: 'Contact the best digital marketing agency in Nigeria today. Let\'s discuss your web development, branding, or AI automation project.'
    };
    return {
      title: 'Webhouse Media',
      description: 'Digital Systems for Business Growth'
    };
  };

  const seo = getSEO();

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-500 selection:text-white">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={`https://webhouse.media${location.pathname}`} />
      </Helmet>
      {!isAdminPath && !isLoginPath && <Navbar />}
      <WhatsAppButton />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/training" element={<Training />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<div className="pt-40 text-center">Page under construction</div>} />
        </Routes>
      </main>
      {!isAdminPath && !isLoginPath && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </HelmetProvider>
  );
}
