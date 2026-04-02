import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronRight, Globe, Cpu, BarChart3, ShieldCheck, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Training', path: '/training' },
    { name: 'Resources', path: '/resources' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dhzouslh1/image/upload/v1773161041/591626377_1368804921611344_6068326484691096664_n_c1x0d4.jpg" 
                alt="Webhouse Media Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-black hidden sm:block">
              Webhouse Media
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-emerald-600",
                    isActive ? "text-emerald-600" : "text-black/60"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-600 transition-all"
            >
              Start Project
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-black/5 px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-lg font-medium text-black/60 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block w-full bg-black text-white text-center py-3 rounded-xl font-medium"
            onClick={() => setIsOpen(false)}
          >
            Start Project
          </Link>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dhzouslh1/image/upload/v1773161041/591626377_1368804921611344_6068326484691096664_n_c1x0d4.jpg" 
                  alt="Webhouse Media Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-2xl tracking-tight">Webhouse Media</span>
            </Link>
            <p className="text-white/60 max-w-md mb-8">
              Webhouse Media and Marketing Solution provides full-service digital systems and marketing infrastructures for businesses looking to scale.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/webhouselab/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-all text-white/60 hover:text-white" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/p/DV5FZ69DtLW/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-all text-white/60 hover:text-white" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://ng.linkedin.com/in/oluranti-clement-7116b078" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-all text-white/60 hover:text-white" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://m.youtube.com/@webhouselabtv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-all text-white/60 hover:text-white" title="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-emerald-400 transition-colors">Services</Link></li>
              <li><Link to="/resources" className="hover:text-emerald-400 transition-colors">Digital Resources</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-400 transition-colors">Blog & Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-white/60">
              <li>webhousemediastudio@gmail.com</li>
              <li>+234 806 018 0077</li>
              <li>15 Ring Road, Ibadan, Oyo State, Nigeria</li>
            </ul>
          </div>
        </div>

        {/* SEO Keywords Section - Hidden from public view but available for SEO */}
        <div className="sr-only">
          <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-8">Relevant Keywords for Digital Marketing and Related Services in Nigeria and Africa</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] text-white/30 uppercase tracking-wider">
            <span>Digital marketing agency Nigeria</span>
            <span>Social media marketing services Lagos</span>
            <span>Best digital marketer Nigeria</span>
            <span>AI marketing tools for small business</span>
            <span>Facebook ads expert Nigeria</span>
            <span>Instagram growth services Africa</span>
            <span>WhatsApp marketing for business Nigeria</span>
            <span>Brand design and creative services</span>
            <span>Logo design company Nigeria</span>
            <span>Brand identity design services Africa</span>
            <span>Affordable graphic designer Lagos</span>
            <span>Branding agency for startups Nigeria</span>
            <span>Website development company Nigeria</span>
            <span>Affordable website design Lagos</span>
            <span>SaaS development company Africa</span>
            <span>Custom software development Nigeria</span>
            <span>Ghostwriting services Nigeria</span>
            <span>Content writing services for business Africa</span>
            <span>Personal brand storytelling writer</span>
            <span>Marketing consultant Nigeria</span>
            <span>Business growth strategy for startups Africa</span>
            <span>Local SEO Nigeria Lagos</span>
            <span>AI and marketing automation</span>
            <span>WhatsApp and social commerce Africa</span>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Webhouse Media and Marketing Solution. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-white/40">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
