'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Zap, Target, TrendingUp, Filter, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const categories = ["All", "Website Design", "Social Media", "Branding", "AI Solutions"];

const cases = [
  {
    title: "Global E-learning Infrastructure",
    industry: "Education / Tech",
    category: "Website Design",
    results: "350% Increase in Global Enrollments",
    problem: "Outdated LMS that couldn't handle high traffic and lacked mobile responsiveness, hindering global expansion.",
    solution: "A bespoke, scalable digital ecosystem with integrated payment gateways and lightning-fast mobile optimization.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200",
    tags: ["LMS", "Next.js", "Payment Integration"]
  },
  {
    title: "Luxury Fashion Identity Revamp",
    industry: "E-commerce / Lifestyle",
    category: "Branding",
    results: "90% Higher Brand Perception Score",
    problem: "Inconsistent visual assets that failed to command premium pricing despite high-quality products.",
    solution: "A minimalist, high-authority visual identity system and premium brand guidelines for global consistency.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    tags: ["Visual Identity", "Brand Guide", "Packaging"]
  },
  {
    title: "Strategic Advisory Ad Campaign",
    industry: "Corporate / Finance",
    category: "Social Media",
    results: "1.2M+ Reach within 60 Days",
    problem: "High-level consulting services struggling to find qualified B2B leads through traditional social channels.",
    solution: "Data-driven PostPilot™ strategy focusing on high-intent LinkedIn and Twitter audience segmentation.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
    tags: ["B2B Lead Gen", "Paid Ads", "Content Strategy"]
  },
  {
    title: "Automated Real Estate Concierge",
    industry: "Real Estate",
    category: "AI Solutions",
    results: "65% Reduction in Human Response Time",
    problem: "Losing high-value leads during off-hours due to slow response times on property inquiries.",
    solution: "Custom AI-trained WhatsApp concierge that handles property filtering and direct viewing bookings 24/7.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
    tags: ["AI Chatbot", "Automation", "CRM Sync"]
  },
  {
    title: "Eco-Tech Enterprise Portal",
    industry: "Sustainability / IT",
    category: "Website Design",
    results: "40% Higher Conversion on B2B Quotes",
    problem: "Complex product catalog that left potential enterprise partners confused and stalled the sales cycle.",
    solution: "A streamlined technical portal with interactive product explorers and automated quote generation.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    tags: ["B2B UI/UX", "Enterprise Tech", "Custom Engine"]
  }
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredCases = activeFilter === "All" 
    ? cases 
    : cases.filter(c => c.category === activeFilter);

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
              Documented ROI & Impact
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 lowercase">
              we build things that <span className="text-emerald-600">work</span>. see our recent global projects.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              We help brands command respect and scale revenue through high-performance digital infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar justify-start md:justify-center">
            <div className="flex items-center gap-2 text-slate-400 mr-4 font-black uppercase text-[10px] tracking-widest whitespace-nowrap">
              <Filter size={14} /> Filter Work:
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  activeFilter === cat 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-32">
            <AnimatePresence mode='wait'>
              {filteredCases.map((c, i) => (
                <motion.div
                  key={c.title}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch group"
                >
                  {/* Image Side */}
                  <div className={`lg:col-span-6 h-full ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                     <div className="relative h-full aspect-[4/5] lg:aspect-auto rounded-[3rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.1)] group-hover:scale-[1.01] transition-transform duration-700">
                        <img 
                          src={c.image} 
                          alt={c.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-8 left-8">
                           <span className="px-6 py-2 bg-white/90 backdrop-blur-md text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl">
                              {c.category}
                           </span>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8">
                           <div className="flex flex-wrap gap-2">
                             {c.tags.map(tag => (
                               <span key={tag} className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-white font-bold text-[8px] uppercase tracking-widest rounded-lg">
                                 #{tag}
                               </span>
                             ))}
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                     </div>
                  </div>

                  {/* Content Side */}
                  <div className={`lg:col-span-6 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                     <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest mb-6 italic">
                        <Target size={16} /> {c.industry} Focus
                     </div>
                     <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1] tracking-tighter italic lowercase group-hover:text-emerald-600 transition-colors">
                        {c.title}
                     </h2>

                     {/* Case Details */}
                     <div className="space-y-8 mb-12">
                        <div className="flex gap-4">
                           <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 shadow-inner">
                              <AlertCircle size={20} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">The Problem</p>
                              <p className="text-slate-600 font-medium leading-relaxed">{c.problem}</p>
                           </div>
                        </div>

                        <div className="flex gap-4">
                           <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-inner">
                              <Lightbulb size={20} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Our Strategic Solution</p>
                              <p className="text-slate-600 font-medium leading-relaxed">{c.solution}</p>
                           </div>
                        </div>
                     </div>
                     
                     {/* Results Metrics */}
                     <div className="bg-white rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 mb-12 group-hover:border-emerald-200 transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                           <TrendingUp size={80} className="text-emerald-600" />
                        </div>
                        <div className="relative z-10">
                           <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <CheckCircle2 size={14} /> Documented Growth Metric
                           </p>
                           <p className="text-3xl md:text-5xl font-black text-emerald-600 tracking-tighter italic leading-none">{c.results}</p>
                        </div>
                     </div>

                     <a 
                      href={`https://wa.me/2348152469749?text=I'm%20interested%20in%20a%20project%20similar%20to%20the%20${encodeURIComponent(c.title)}.`}
                      className="inline-flex items-center gap-6 text-sm font-black text-slate-900 group-hover:gap-10 transition-all uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-3 w-fit"
                     >
                        Secure Similar ROI <ArrowRight size={20} />
                     </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="py-32 bg-slate-900 mx-4 md:mx-8 mb-20 rounded-[4rem] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-12 inline-flex items-center gap-2 bg-white/10 px-6 py-2 rounded-full border border-white/20">
             {[1,2,3,4,5].map(s => <Zap key={s} size={14} className="fill-emerald-400 text-emerald-400" />)}
             <span className="text-xs font-black uppercase tracking-widest ml-2">Global Satisfaction Rate</span>
          </div>
          
          <h3 className="text-3xl md:text-7xl font-black mb-12 italic leading-[1] max-w-5xl mx-auto lowercase tracking-tighter">
            "Webhouse helped us get our first <span className="text-emerald-400 font-black">100 customers</span> online in just 2 months. They are engineered for scale."
          </h3>
          
          <div className="flex flex-col items-center gap-12 mt-16">
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-emerald-500/30 flex items-center justify-center font-black text-3xl italic text-emerald-500 shadow-2xl">AD</div>
               <div className="text-left">
                  <p className="font-black text-3xl italic lowercase">adebayo d.</p>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Founder, Lagos Logistics Plus</p>
               </div>
            </div>

            <a 
              href="https://wa.me/2348152469749?text=I'm%20ready%20to%20start%20my%20success%20story%20with%20Webhouse." 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-20 py-8 rounded-full font-black text-2xl shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all flex items-center gap-4 group"
            >
              ENGINEER YOUR GROWTH <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
