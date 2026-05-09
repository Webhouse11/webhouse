'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const cases = [
  {
    title: "Global FinTech Platform Transformation",
    category: "Digital Infrastructure",
    results: "+240% System Throughput",
    desc: "Architecting a high-frequency transactional core for an international payment provider, processing $12M+ monthly across 8 regions.",
    image: "https://images.unsplash.com/photo-1551288049-bbbda50d879e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "E-commerce AI growth System",
    category: "AI Automation",
    results: "64% Reduction in CAC",
    desc: "Deployment of custom-trained LLM content engines and predictive inventory systems for a multi-million dollar direct-to-consumer brand.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "SaaS Enterprise Scale-Up",
    category: "SaaS Development",
    results: "$4.2M Funding Secured",
    desc: "Engineering the MVP and initial infrastructure for a B2B SaaS platform that successfully scaled to 50k+ active users within 12 months.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function CaseStudies() {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-24 border-b border-black/5 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-none">
              Authority in <span className="text-emerald-600 underline decoration-2 underline-offset-8">Action</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-12">
              Explore how we architect digital systems that redefine operational limits and drive enterprise-scale growth.
            </p>
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group"
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                   <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
                      <img 
                        src={c.image} 
                        alt={c.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-emerald-900/20 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
                      <div className="absolute top-8 left-8">
                         <span className="px-6 py-2 bg-white/90 backdrop-blur text-black font-black text-xs uppercase tracking-widest rounded-full shadow-xl">
                            {c.category}
                         </span>
                      </div>
                   </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                   <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest mb-6">
                      <Zap className="w-4 h-4 fill-emerald-600" /> Case Study 00{i+1}
                   </div>
                   <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                      {c.title}
                   </h2>
                   <p className="text-xl text-slate-500 leading-relaxed mb-10">
                      {c.desc}
                   </p>
                   <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-between mb-10">
                      <div>
                         <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">Key Result</p>
                         <p className="text-3xl font-black text-emerald-600">{c.results}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                         <TrendingUp className="text-emerald-600" size={24} />
                      </div>
                   </div>
                   <Link href="/contact" className="inline-flex items-center gap-3 text-lg font-black text-slate-900 hover:gap-5 transition-all">
                      Discuss a Similar Project <ArrowRight className="text-emerald-600" size={24} />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 mb-8">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl md:text-4xl font-bold mb-12 text-white/80 italic">"Webhouse isn't just a team; they are the architects of our entire technical growth engine."</h3>
            <div className="flex items-center justify-center gap-4">
               <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-emerald-500 flex items-center justify-center font-black text-xl italic">SC</div>
               <div className="text-left">
                  <p className="font-bold">Stephen Collins</p>
                  <p className="text-slate-500 text-sm">CTO, GlobalPay Infrastructure</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}
