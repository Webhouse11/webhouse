import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import { Navbar, Footer } from './components/Layout';
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
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Webhouse Media – Digital Systems for Business Growth';
    if (path === '/about') return 'About Us – Webhouse Media';
    if (path === '/services') return 'Our Services – Digital Systems & AI Automation';
    if (path === '/training') return 'Tech Training – Master Digital Systems';
    if (path === '/resources') return 'Digital Resources – Ebooks & Toolkits';
    if (path === '/blog') return 'Blog & Insights – Webhouse Media';
    if (path === '/contact') return 'Contact Us – Start Your Project';
    return 'Webhouse Media';
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-500 selection:text-white">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Webhouse Media and Marketing Solution provides full-service digital systems, SaaS development, and AI automation for businesses looking to scale." />
        <link rel="canonical" href={`https://webhouse.media${location.pathname}`} />
      </Helmet>
      {!isAdminPath && !isLoginPath && <Navbar />}
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
