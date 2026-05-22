'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Search, Lightbulb, TrendingUp, BarChart3, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ProductResearchPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-24 border-b border-black/5 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]">
              Launch Your Next Idea <span className="text-emerald-600">With Confidence</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-10">
              Don't waste money on a business idea without checking the market first. We help you find "Market Gaps" and understand exactly what your future customers want.
            </p>
            <div className="flex flex-wrap gap-4">
               <a href="https://wa.me/2348152469749" className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all flex items-center gap-3">
                  <MessageCircle size={24} /> Discuss Your Idea
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process Card */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                   <Search size={100} />
                 </div>
                 <h3 className="text-2xl font-black mb-6">Competitor Analysis</h3>
                 <p className="text-slate-500 leading-relaxed">We check what your rivals are doing well and where they are failing, so you can do it better.</p>
              </div>
              <div className="p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                   <Lightbulb size={100} />
                 </div>
                 <h3 className="text-2xl font-black mb-6">Market Gap Search</h3>
                 <p className="text-slate-500 leading-relaxed">We find the products and services that people in Africa are searching for but cannot find easily.</p>
              </div>
              <div className="p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                   <TrendingUp size={100} />
                 </div>
                 <h3 className="text-2xl font-black mb-6">Growth Roadmaps</h3>
                 <p className="text-slate-500 leading-relaxed">A clear 6-month plan on how to launch and acquire your first 500 customers organically.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-24 bg-slate-50 rounded-[4rem] mx-4 mb-20 text-center">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-10">
               <ShieldCheck size={40} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Your idea is safe with us.</h2>
            <p className="text-xl text-slate-500 mb-12">
               We pride ourselves on 100% confidentiality. We help you build YOUR dream, not ours. Let's research, validate, and launch your next success story.
            </p>
            <a href="https://wa.me/2348152469749" target="_blank" className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all flex items-center justify-center gap-3 inline-flex shadow-xl">
               <MessageCircle size={24} /> Book a Strategy Session
            </a>
         </div>
      </section>
    </div>
  )
}
