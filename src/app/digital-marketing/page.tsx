'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Megaphone, Target, BarChart, Zap, ArrowRight, MessageCircle, DollarSign } from 'lucide-react';
import Link from 'next/link';

import { useCurrency } from '@/src/hooks/useCurrency';

export default function DigitalMarketingPage() {
  const { formatPrice } = useCurrency();
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-24 border-b border-black/5 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]">
              High-Converting <span className="text-emerald-600">Sales Funnels</span> & Ads.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-10">
              We build intelligent digital sales funnels and automated marketing systems that transform total strangers into loyal, paying customers 24/7.
            </p>
            <div className="flex flex-wrap gap-4">
               <a href="https://wa.me/2348152469749?text=Hello,%20I'm%20interested%20in%20Digital%20Sales%20Funnels%20and%20Automated%20Marketing." className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all flex items-center gap-3">
                  <MessageCircle size={24} /> Get a Funnel Strategy
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Marketing Systems That Deliver.</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto italic">We don't just "run ads". We build end-to-end sales infrastructures for sustainable business growth.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-lg group hover:-translate-y-2 transition-all">
                 <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-8 shadow-md">
                    <Target size={32} />
                 </div>
                 <h3 className="text-2xl font-black mb-4">Traffic Acquisition</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Precision targeting on Google, Meta, and TikTok to attract the people who are ready to buy.</p>
              </div>
              <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-lg group hover:-translate-y-2 transition-all">
                 <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8 shadow-md">
                    <Zap size={32} />
                 </div>
                 <h3 className="text-2xl font-black mb-4">Lead Capture</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">High-converting landing pages designed to capture contact info and qualify your prospects.</p>
              </div>
              <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-lg group hover:-translate-y-2 transition-all">
                 <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-8 shadow-md">
                    <Megaphone size={32} />
                 </div>
                 <h3 className="text-2xl font-black mb-4">Automated Follow-up</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Intelligent email and WhatsApp workflows that nurture leads until they are ready to purchase.</p>
              </div>
              <div className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-lg group hover:-translate-y-2 transition-all">
                 <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-8 shadow-md">
                    <DollarSign size={32} />
                 </div>
                 <h3 className="text-2xl font-black mb-4">Sales Conversion</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Seamless checkout and scheduling systems that ensure the high conversion rates for your brand.</p>
              </div>
           </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 bg-slate-900 text-white rounded-[5rem] mx-4 mb-24 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bbbda50d879e?auto=format&fit=crop&q=80&w=1200" 
                    alt="Growth Data" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-emerald-950/40"></div>
               </div>
               <div>
                  <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Spending {formatPrice("₦1,000")} to Make {formatPrice("₦10,000")}.</h2>
                  <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                    That is the goal of digital marketing. We focus on ROI (Return on Investment). If your ads aren't bringing in more money than they cost, we fix them. Simple.
                  </p>
                  <div className="space-y-6">
                    {[
                      "Daily lead generation",
                      "Monthly growth reports",
                      "Full transparency",
                      "Scalable budgets starting from small"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-xl font-bold">
                         <CheckCircle className="text-emerald-500" /> {item}
                      </div>
                    ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to boost your sales?</h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
              Don't waste money on ads that don't work. Let our experts handle your marketing and watch your business grow.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
               <a href="https://wa.me/2348152469749" target="_blank" className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all flex items-center gap-3">
                  <MessageCircle size={24} /> Get a Marketing Plan
               </a>
            </div>
         </div>
      </section>
    </div>
  )
}

function CheckCircle({ className }: { className?: string }) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}
