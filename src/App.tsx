import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Training } from './pages/Training';
import { Resources } from './pages/Resources';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-500 selection:text-white">
      <Helmet>
        <title>Webhouse Media – Digital Systems for Business Growth</title>
      </Helmet>
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/training" element={<Training />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Add other routes as needed */}
          <Route path="*" element={<div className="pt-40 text-center">Page under construction</div>} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
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
