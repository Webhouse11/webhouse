'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const webPackages = [
  {
    name: "Starter Site",
    price: "From ₦150,000",
    desc: "Perfect for single entrepreneurs and small shops.",
    features: [
      "5 Professional Pages",
      "Mobile Friendly Design",
      "WhatsApp Integration",
      "Basic SEO Setup",
      "1 Month Free Support"
    ],
    highlight: false
  },
  {
    name: "Business Choice",
    price: "From ₦350,000",
    desc: "Best for growing schools, churches, and brands.",
    features: [
      "Up to 15 Pages",
      "Custom Brand Design",
      "Contact Forms & Booking",
      "Fast Loading Speed",
      "3 Months Support",
      "Email Setup"
    ],
    highlight: true
  },
  {
    name: "Custom Build",
    price: "Speak to Us",
    desc: "For complex projects and online stores.",
    features: [
      "Online Payment Integration",
      "Inventory Management",
      "Advanced Security",
      "Premium Design",
      "Dedicated Project Manager"
    ],
    highlight: false
  }
];

const socialPackages = [
  {
    name: "Social Starter",
    desc: "Keeping your pages active and professional.",
    features: ["3 Posts per week", "Basic Graphics", "Comment Responses", "Caption Writing"]
  },
  {
    name: "Growth Master",
    desc: "Driving real sales and followers to your page.",
    features: ["Daily Posting", "High-End Video/Reels", "Ad Campaign Management", "Monthly Reports", "Influencer Strategy"]
  }
];

export default function PricingPage() {
  return (
    <div className="bg-[#f8fafc]">
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-8">
              Investment & Growth
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.85] lowercase italic">
              simple <span className="text-emerald-600">pricing</span>. clear impact.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              High-performance digital growth for every business stage. No hidden fees, just documented ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Website Pricing */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter lowercase italic leading-none">website design packages</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">One-time Strategic investment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-end">
            {webPackages.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={p.highlight 
                  ? "relative group p-10 rounded-[3.5rem] border-2 border-emerald-500 shadow-[0_40px_80px_rgba(16,185,129,0.15)] bg-white lg:scale-105 z-10" 
                  : "p-10 rounded-[3.5rem] border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all"
                }
              >
                {p.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-black mb-4 uppercase tracking-tighter italic">{p.name}</h3>
                <div className="text-4xl font-black text-slate-900 mb-6 tracking-tighter italic">{p.price}</div>
                <p className="text-slate-500 mb-10 text-sm leading-relaxed font-medium h-12">{p.desc}</p>
                
                <ul className="space-y-5 mb-12">
                   {p.features.map((f, j) => (
                     <li key={j} className="flex items-start gap-3 text-sm font-black text-slate-800 tracking-tight">
                        <div className="w-5 h-5 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5 shadow-inner">
                           <Check size={12} strokeWidth={4} />
                        </div>
                        {f}
                     </li>
                   ))}
                </ul>

                <a 
                  href={`https://wa.me/2348060180077?text=Hello,%20I'm%20interested%20in%20the%20${p.name}%20package.`}
                  target="_blank"
                  className={p.highlight 
                    ? "w-full flex items-center justify-center gap-4 bg-emerald-600 text-white py-6 rounded-2xl font-black shadow-2xl shadow-emerald-500/40 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs"
                    : "w-full flex items-center justify-center gap-4 bg-slate-900 text-white py-6 rounded-2xl font-black hover:bg-black hover:scale-[1.02] transition-all uppercase tracking-widest text-xs"
                  }
                >
                  Choose {p.name} <ArrowRight size={20} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media & Others */}
      <section className="py-24 bg-slate-900 rounded-[4rem] mx-4 md:mx-8 mb-24 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-7xl font-black mb-4 lowercase italic tracking-tighter leading-none">monthly growth suits</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Scaling your brand recurringly</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {socialPackages.map((p, i) => (
                <div key={i} className="p-12 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all">
                   <h3 className="text-3xl font-black mb-6 italic tracking-tight">{p.name}</h3>
                   <p className="text-slate-400 mb-10 font-medium text-lg italic">{p.desc}</p>
                   <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm font-black text-slate-100 tracking-tight">
                           <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-900 flex items-center justify-center flex-shrink-0 shadow-lg">
                              <Check size={14} strokeWidth={4} />
                           </div>
                           {f}
                        </li>
                      ))}
                   </ul>
                   <a 
                    href="https://wa.me/2348060180077"
                    target="_blank"
                    className="inline-flex items-center gap-4 text-emerald-400 font-black text-sm uppercase tracking-[0.2em] hover:gap-6 transition-all border-b-2 border-emerald-400/0 hover:border-emerald-400 pb-2"
                   >
                     Custom Quote via WhatsApp <ArrowRight size={20} />
                   </a>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="py-24 text-center">
         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-6xl font-black mb-8 italic tracking-tighter lowercase leading-[0.9]">need a custom technical solution?</h2>
            <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
              Every enterprise is unique. We engineer bespoke packages that align with your specific objectives and capital allocation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
               <a href="https://wa.me/2348060180077" target="_blank" className="bg-emerald-600 text-white px-12 py-6 rounded-full font-black text-2xl hover:scale-105 transition-all flex items-center gap-4 shadow-2xl shadow-emerald-500/40">
                  <MessageCircle size={28} /> Build My Custom Suite
               </a>
               <Link href="/contact" className="bg-slate-900 text-white px-12 py-6 rounded-full font-black text-2xl hover:bg-black transition-all">
                 Request Strategy Call
               </Link>
            </div>
         </div>
      </section>
    </div>

  )
}
