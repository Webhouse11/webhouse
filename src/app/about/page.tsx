'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, Zap, Globe, Users, Trophy, Rocket, Clock } from 'lucide-react';

const stats = [
  { label: "Happy Clients", val: "500+" },
  { label: "Success Stories", val: "150+" },
  { label: "African Markets", val: "12" },
  { label: "Years of Growth", val: "6+" }
];

const timeline = [
  { year: "2018", title: "Where It All Started", desc: "Webhouse was created to bridge the digital gap for African entrepreneurs with affordable web solutions." },
  { year: "2020", title: "Expansion to Systems", desc: "We pivoted to building complete digital sales infrastructures and marketing systems that drive real growth." },
  { year: "2022", title: "AI & Automation Hub", desc: "Launched our AI automation division to help businesses reduce costs and automate complex workflows." },
  { year: "2024", title: "Digital Innovation Hub", desc: "Today, we are the leading digital systems agency in Nigeria, powering high-growth brands across Africa." }
];

export default function AboutPage() {
  return (
    <div className="bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-8">
              Legacy & Vision
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.85] lowercase italic">
              the backbone of <span className="text-emerald-600">digital growth</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
              We design websites, SaaS platforms, and AI automation systems that help businesses scale through intelligent technology and strategic infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-8 italic">More than an Agency.</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Webhouse Media and Marketing Solution provides full-service digital systems and marketing infrastructures for businesses looking to scale beyond borders.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                We aren't just running a marketing agency. We are building a digital innovation hub where high-performance software meets strategic growth logic.
              </p>
              <div className="p-8 rounded-[2.5rem] bg-emerald-600 text-white relative overflow-hidden shadow-2xl">
                 <p className="font-bold text-xl mb-4 italic">"We build the systems that serve as the backbone of your business growth."</p>
                 <p className="text-white/80">— Oluranti O. | Founder, Webhouse Media</p>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] bg-black/5 overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
                  alt="Webhouse Team Spirit" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="text-4xl md:text-6xl font-black mb-2 text-emerald-500">{s.val}</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Our Journey.</h2>
            <p className="text-lg text-slate-500">Helping businesses since 2018.</p>
          </div>
          <div className="space-y-12 max-w-4xl mx-auto">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-black text-slate-900 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    {item.year.slice(2)}
                  </div>
                  {i !== timeline.length - 1 && <div className="w-1 flex-grow bg-slate-100 mt-2"></div>}
                </div>
                <div className="pb-12">
                  <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-12 rounded-[3.5rem] bg-white border border-slate-100 text-center">
               <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-8">
                 <ShieldCheck size={32} />
               </div>
               <h3 className="text-2xl font-black mb-4">Affordable</h3>
               <p className="text-slate-500 leading-relaxed text-sm">We provide world-class services at prices that make sense for African entrepreneurs.</p>
            </div>
            <div className="p-12 rounded-[3.5rem] bg-white border border-slate-100 text-center">
               <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-8">
                 <Zap size={32} />
               </div>
               <h3 className="text-2xl font-black mb-4">Fast & Reliable</h3>
               <p className="text-slate-500 leading-relaxed text-sm">We don't waste time. We deliver projects quickly and support you when you need us.</p>
            </div>
            <div className="p-12 rounded-[3.5rem] bg-white border border-slate-100 text-center">
               <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-8">
                 <Users size={32} />
               </div>
               <h3 className="text-2xl font-black mb-4">Trustworthy</h3>
               <p className="text-slate-500 leading-relaxed text-sm">We build long-term relationships. Your business growth is our primary goal.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
