'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Palette, PenTool, Layout, Image as ImageIcon, ArrowRight, MessageCircle, Star } from 'lucide-react';
import Link from 'next/link';

export default function BrandingPage() {
  return (
    <div className="bg-[#f8fafc]">
      {/* Hero */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-8">
              Visual Authority
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 lowercase italic leading-[0.85]">
              build a brand that <span className="text-emerald-600">commands trust</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-10 font-medium">
              Good branding makes you look professional and established. We create logos, brand guides, and flyers that your customers will love.
            </p>
            <div className="flex flex-wrap gap-4">
               <a href="https://wa.me/2348152469749" className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all flex items-center gap-3 shadow-xl">
                  <MessageCircle size={24} /> Let's Brand Your Business
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills / Focus */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-4xl md:text-6xl font-black mb-8 italic">More Than Just a Logo.</h2>
                 <p className="text-lg text-slate-500 mb-12 leading-relaxed">
                   A logo is just the beginning. We create a complete visual language for your business, ensuring you look consistent everywhere—from your store to your WhatsApp status.
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-4">
                       <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                          <PenTool size={24} />
                       </div>
                       <h3 className="font-bold text-xl">Custom Logo Design</h3>
                       <p className="text-slate-500 text-sm">Unique icons that represent your company values perfectly.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                       <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                          <Palette size={24} />
                       </div>
                       <h3 className="font-bold text-xl">Brand Guidelines</h3>
                       <p className="text-slate-500 text-sm">Consistent colors and fonts for all your marketing material.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                       <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                          <Layout size={24} />
                       </div>
                       <h3 className="font-bold text-xl">Marketing Assets</h3>
                       <p className="text-slate-500 text-sm">Professional flyers, business cards, and social media banners.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                       <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                          <Star size={24} />
                       </div>
                       <h3 className="font-bold text-xl">Brand Strategy</h3>
                       <p className="text-slate-500 text-sm">Defining how you speak to your customers and stand out from rivals.</p>
                    </div>
                 </div>
              </div>
              <div className="relative p-12 bg-slate-950 rounded-[4rem] text-white flex flex-col justify-center gap-12 overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Palette size={120} />
                 </div>
                 <div className="space-y-6 relative z-10">
                    <h3 className="text-3xl font-black mb-8 italic">"Webhouse transformed our local shop into a luxury brand that people now travel the city to visit."</h3>
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-full bg-emerald-600 border-2 border-white/20"></div>
                       <div>
                          <p className="font-bold">Chiamaka E.</p>
                          <p className="text-slate-500 text-sm">CEO, Lush & Co Glamour</p>
                       </div>
                    </div>
                 </div>
                 <div className="pt-12 border-t border-white/10 relative z-10">
                    <p className="text-slate-400 mb-8 uppercase tracking-widest font-bold text-xs">Trusted By Brands In:</p>
                    <div className="flex flex-wrap gap-x-8 gap-y-4 font-black opacity-50 italic">
                       <span>LAGOS</span>
                       <span>ABUJA</span>
                       <span>ACCRA</span>
                       <span>NAIROBI</span>
                       <span>LONDON</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-24 bg-slate-50 rounded-[5rem] mx-4 mb-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Look Professional?</h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">Our branding packages are designed to give you that "Big Company" feel without the "Big Company" price tag.</p>
            <a href="https://wa.me/2348152469749" target="_blank" className="bg-slate-900 text-white px-10 py-5 rounded-full font-black text-xl hover:bg-black transition-all flex items-center justify-center gap-3 inline-flex">
               <MessageCircle size={24} /> Get a Custom Branding Quote
            </a>
         </div>
      </section>
    </div>
  )
}
