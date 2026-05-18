'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/2348060180077" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[60] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group flex items-center gap-2"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap px-0 group-hover:px-2">
        Chat with us
      </span>
      <MessageCircle size={32} />
    </a>
  );
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'BrandBox', path: '/dfy-services' },
    { name: 'PostPilot', path: '/social-media' },
    { name: 'Our Work', path: '/portfolio' },
    { name: 'Academy', path: '/digitacademy' },
    { name: 'Blog', path: 'https://webhousemedia.blogspot.com/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5 top-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dhzouslh1/image/upload/v1779114037/logo_cevoae.jpg" 
                alt="Webhouse Media Logo" 
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
              Webhouse Media
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.path.startsWith('http') ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors hover:text-emerald-600 text-black/60 py-2"
                  >
                    {item.name}
                  </a>
                ) : (
                  <div className="flex items-center gap-1 group">
                    <Link
                      href={item.path}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-emerald-600 py-2 flex items-center gap-1",
                        pathname === item.path ? "text-emerald-600" : "text-black/60"
                      )}
                    >
                      {item.name}
                    </Link>
                  </div>
                )}
              </div>
            ))}
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
            <div key={item.name} className="space-y-4">
               {item.path.startsWith('http') ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-lg font-medium text-black/60 hover:text-black font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
               ) : (
                  <div className="space-y-2">
                    <Link
                      href={item.path}
                      className="block text-lg font-medium text-black/60 hover:text-black font-bold"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
               )}
            </div>
          ))}
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
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden p-0">
                <Image 
                    src="https://res.cloudinary.com/dhzouslh1/image/upload/v1779114037/logo_cevoae.jpg" 
                    alt="Webhouse Media Logo" 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-2xl tracking-tight">Webhouse</span>
            </Link>

            <p className="text-white/60 max-w-md mb-8">
              We help African businesses grow online with simple digital solutions. From website design to social media management, we make digital growth easy and affordable for every entrepreneur.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/webhouselab/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-all text-white/60 hover:text-white" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/webhousemedia/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-all text-white/60 hover:text-white" title="Instagram">
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
            <h4 className="font-black mb-6 uppercase tracking-widest text-[10px] text-emerald-500 italic">Our Services</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/website-design" className="hover:text-emerald-400 transition-colors font-medium">Website Design</Link></li>
              <li><Link href="/social-media" className="hover:text-emerald-400 transition-colors font-medium">PostPilot (Social Ads)</Link></li>
              <li><Link href="/dfy-services" className="hover:text-emerald-400 transition-colors font-medium">BrandBox (Branding)</Link></li>
              <li><Link href="/ai-video-content" className="hover:text-emerald-400 transition-colors font-medium">AI Video Production</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-[10px] text-emerald-500 italic">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors font-medium">About Webhouse</Link></li>
              <li><Link href="/portfolio" className="hover:text-emerald-400 transition-colors font-medium">Our Work</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors font-medium">Price List</Link></li>
              <li><Link href="/digitacademy" className="hover:text-emerald-400 transition-colors font-medium">DigitAcademy</Link></li>
              <li><a href="https://webhousemedia.blogspot.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors font-medium">Business Tips Blog</a></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors font-medium">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-[10px] text-emerald-500 italic">Contact</h4>
            <ul className="space-y-4 text-white/60">
              <li className="font-medium">
                <a href="mailto:webhousemediastudio@gmail.com?subject=Strategic%20Digital%20Growth%20Inquiry&body=Hi%20Webhouse%20Media%20Team%2C%0A%0AI'm%20interested%20in%20scaling%20my%20business%20digital%20infrastructure%20and%20would%20like%20to%20learn%20more%20about%20your%20services." className="hover:text-emerald-400 transition-colors">
                  webhousemediastudio@gmail.com
                </a>
              </li>
              <li className="font-medium">+234 806 018 0077</li>
              <li className="font-medium">15 Ring Road, Ibadan, Oyo State, Nigeria</li>
            </ul>
          </div>
        </div>

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
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Webhouse Media and Marketing Solution. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white font-medium">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white font-medium">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white font-medium">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
