'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Zap, ShieldCheck, ArrowRight, MessageCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/src/hooks/useCurrency';

export default function WebsiteDesignPage() {
  const { formatPrice } = useCurrency();
  return (
    <div className="bg-[#f8fafc]">
      {/* Hero */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-8">
              Digital Infrastructure
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 lowercase italic leading-[0.85]">
              high-converting <span className="text-emerald-600">digital systems</span> & apps.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-10 font-medium">
              We design high-converting websites, complex SaaS platforms, and digital infrastructures built for serious scale and business growth.
            </p>
            <div className="flex flex-wrap gap-4">
               <a href="https://wa.me/2348152469749?text=Hello,%20I'm%20interested%20in%20Web%20Development%20and%20SaaS%20solutions." className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all flex items-center gap-3 shadow-xl">
                  <MessageCircle size={24} /> Get a Technical Quote
               </a>
               <Link href="/portfolio" className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-full font-black text-xl hover:bg-slate-50 transition-all">
                 See Our Work
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 italic">Engineered for Scale.</h2>
              <p className="text-lg text-slate-500 mb-12 leading-relaxed">
                We don't just build pages; we build digital systems that serve as the backbone of your business growth. Every line of code is optimized for performance and sales.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Modern Architecture</h3>
                    <p className="text-slate-500 text-sm">Built using Next.js and high-performance frameworks for blazing-fast speed and SEO dominance.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Conversion Focused</h3>
                    <p className="text-slate-500 text-sm">Every element is placed strategically to guide users toward your primary business goal.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Corporate Grade Security</h3>
                    <p className="text-slate-500 text-sm">Robust protection systems and SSL certificates to keep your data and users safe online.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[4rem] bg-slate-900 overflow-hidden shadow-2xl relative">
                 <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Website Design" 
                  className="w-full h-full object-cover opacity-80"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50 rounded-[5rem] mx-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Websites We Build.</h2>
              <p className="text-lg text-slate-500">We specialize in various types of digital homes.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Business Websites", desc: "For schools, churches, NGOs, and consultancy firms." },
                { title: "E-commerce Shops", desc: "Sell your products online with easy payment options." },
                { title: "Personal Portfolios", desc: "Perfect for speakers, authors, and luxury brands." },
                { title: "Landing Pages", desc: "Simple one-page sites focused on one clear goal." },
                { title: "Real Estate Portals", desc: "Showcase your properties with professional listings." },
                { title: "Restaurant Sites", desc: "Make people hungry with beautiful menus and booking." }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-200">
                   <CheckCircle className="text-emerald-500 mb-6" size={32} />
                   <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                   <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-emerald-600 rounded-[4rem] p-12 md:p-20 text-white text-center">
            <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight">Ready to build your digital home?</h2>
            <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-2xl mx-auto">
              Our packages start from {formatPrice("₦150,000")}. Let's create something beautiful for your brand today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
               <Link href="/pricing" className="bg-white text-emerald-600 px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all">
                  See Price List
               </Link>
               <a href="https://wa.me/2348152469749" target="_blank" className="bg-slate-900 text-white px-10 py-5 rounded-full font-black text-xl hover:bg-black transition-all flex items-center gap-3">
                  <MessageCircle size={24} /> Chat on WhatsApp
               </a>
            </div>
        </div>
      </section>
    </div>
  );
}
