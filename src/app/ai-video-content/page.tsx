'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Video, Sparkles, Play, DollarSign, ArrowRight, MessageCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AIVideoPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-24 border-b border-black/5 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]">
              High-Converting <span className="text-emerald-600">AI Video</span> Content for Your Brand.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-10">
              We create world-class video ads and content using advanced AI, designed specifically to help African brands win attention and sell more products instantly.
            </p>
            <div className="flex flex-wrap gap-4">
               <a href="https://wa.me/2348152469749" className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all flex items-center gap-3">
                  <MessageCircle size={24} /> Get a Video Quote
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Video */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-4xl md:text-6xl font-black mb-8 italic">Video That Sells.</h2>
                 <p className="text-lg text-slate-500 mb-12 leading-relaxed">
                   In today's market, if you aren't using video, you are invisible. Our AI video production gives you high-end visuals at a fraction of the cost of traditional film crews.
                 </p>
                 
                 <div className="space-y-8">
                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm flex gap-6">
                       <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-500/20 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <TrendingUp size={28} />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold mb-2">Engaging Reels & TikToks</h3>
                          <p className="text-slate-500 text-sm">Short, punchy videos that stop the scroll and get people interested in your offerings.</p>
                       </div>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm flex gap-6">
                       <div className="w-14 h-14 rounded-2xl bg-white border border-blue-500/20 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Sparkles size={28} />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold mb-2">AI Product Showcases</h3>
                          <p className="text-slate-500 text-sm">Professional cinematic views of your products generated using state-of-the-art AI technology.</p>
                       </div>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm flex gap-6">
                       <div className="w-14 h-14 rounded-2xl bg-white border border-purple-500/20 text-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <DollarSign size={28} />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold mb-2">High-Conversion Ads</h3>
                          <p className="text-slate-500 text-sm">Direct-response video ads designed to drive clicks and sales for your online campaigns.</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="relative">
                 <div className="aspect-[9/16] max-w-[400px] mx-auto rounded-[3rem] bg-slate-900 border-8 border-slate-800 shadow-2xl relative overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800" 
                      alt="AI Video Content"
                      className="w-full h-full object-cover opacity-60 transition-transform group-hover:scale-110 duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-20 h-20 rounded-full bg-emerald-600/90 text-white flex items-center justify-center animate-pulse">
                          <Play size={40} className="ml-2" />
                       </div>
                    </div>
                    <div className="absolute bottom-10 left-10 right-10">
                       <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                          <p className="text-white font-black text-lg mb-2">AI-Generated Sales Video</p>
                          <p className="text-white/60 text-sm">Scale your brand with 100+ videos monthly.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-slate-50 rounded-[4rem] mx-4 mb-20 text-center">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Video is the Language of Sales.</h2>
            <p className="text-xl text-slate-500 mb-12">
               Our AI video systems allow you to create high-quality content faster than ever before. We help you dominate your market by being the most visible brand in your niche.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
               <a href="https://wa.me/2348152469749" target="_blank" className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all flex items-center justify-center gap-3 inline-flex shadow-xl">
                  <MessageCircle size={24} /> Start Your Video Project
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
