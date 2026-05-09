'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const cases = [
  {
    title: "Modern Website for a Private School",
    category: "Website Design",
    results: "200% New Enrollments",
    desc: "We built a professional, easy-to-use website for a growing private school, allowing parents to apply online and see school updates easily.",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Social Media Growth for a Fashion Brand",
    category: "Social Media",
    results: "50k+ Target Reach",
    desc: "Complete management of Instagram and Facebook for a local fashion house, resulting in daily orders and a vibrant online community.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Branding for a Fast-Food Restaurant",
    category: "Branding",
    results: "Strong Local Identity",
    desc: "Creation of a professional logo, menus, and signage for a new restaurant, making them stand out in a competitive marketplace.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "AI Chatbot for a Real Estate Agency",
    category: "AI Solutions",
    results: "24/7 Lead Collection",
    desc: "Integration of an automated WhatsApp chatbot that answers property questions and books inspections for agents while they sleep.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function CaseStudies() {
  return (
    <div className="bg-[#f8fafc]">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8">
              Success Stories & Portfolio
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 lowercase">
              we build things that <span className="text-emerald-600">work</span>. see our recent global projects.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We help brands command respect and scale revenue through high-performance digital infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-black mb-1">500+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Brands</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black mb-1">1,200+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campaigns</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black mb-1">95%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Retention</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black mb-1">10M+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Reach</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {cases.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center group"
              >
                {/* Image Side */}
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                   <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.1)] group-hover:scale-[1.02] transition-transform duration-700">
                      <img 
                        src={c.image} 
                        alt={c.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-6 left-6">
                         <span className="px-5 py-2 bg-white/90 backdrop-blur-md text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-2xl">
                            {c.category}
                         </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                   </div>
                </div>

                {/* Content Side */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                   <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest mb-6">
                      <Target size={16} /> Key Case Study {i+1}
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight group-hover:text-emerald-600 transition-colors italic">
                      {c.title}
                   </h2>
                   <p className="text-lg text-slate-500 leading-relaxed mb-8 font-medium">
                      {c.desc}
                   </p>
                   
                   {/* Results Tool */}
                   <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-slate-100 mb-10 flex items-center justify-between group-hover:border-emerald-200 transition-colors">
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Documented Impact</p>
                         <p className="text-3xl font-black text-emerald-600 tracking-tighter italic">{c.results}</p>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                         <TrendingUp size={28} />
                      </div>
                   </div>

                   <a 
                    href={`https://wa.me/2348060180077?text=I'm%20interested%20in%20a%20project%20similar%20to%20the%20${encodeURIComponent(c.title)}.`}
                    className="inline-flex items-center gap-4 text-sm font-black text-slate-900 hover:gap-6 transition-all uppercase tracking-widest border-b-2 border-slate-900 pb-2"
                   >
                      Get Similar Results <ArrowRight size={18} />
                   </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="py-24 bg-slate-900 mx-4 md:mx-8 mb-20 rounded-[4rem] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-12 inline-flex items-center gap-2 bg-white/10 px-6 py-2 rounded-full border border-white/20">
             {[1,2,3,4,5].map(s => <Zap key={s} size={14} className="fill-emerald-400 text-emerald-400" />)}
             <span className="text-xs font-black uppercase tracking-widest ml-2">Verified Testimonial</span>
          </div>
          
          <h3 className="text-3xl md:text-6xl font-black mb-12 italic leading-[1.1] max-w-4xl mx-auto">
            "Webhouse helped us get our first <span className="text-emerald-400">100 customers</span> online in just 2 months. They are simply the best."
          </h3>
          
          <div className="flex flex-col items-center gap-12">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-emerald-500/30 flex items-center justify-center font-black text-2xl italic text-emerald-500">AD</div>
               <div className="text-left">
                  <p className="font-black text-2xl italic">Adebayo D.</p>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Founder, Lagos Logistics Plus</p>
               </div>
            </div>

            <a 
              href="https://wa.me/2348060180077?text=I'm%20ready%20to%20start%20my%20success%20story%20with%20Webhouse." 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-16 py-8 rounded-full font-black text-2xl shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all flex items-center gap-4"
            >
              START YOUR STORY <ArrowRight size={28} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
