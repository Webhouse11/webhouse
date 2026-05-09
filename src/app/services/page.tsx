'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Globe, Smartphone, Palette, Megaphone, Video, Search, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: "Website Design",
    desc: "We build professional websites that help you get noticed. From simple business pages to complete online schools and shops.",
    icon: Globe,
    features: ["Mobile Friendly", "Fast Loading", "WhatsApp Buttons", "Easy to Manage"],
    href: "/website-design"
  },
  {
    title: "Custom SaaS & App Development",
    desc: "End-to-end development of high-performance software products and scalable mobile applications.",
    icon: Smartphone,
    features: ["Next.js Architecture", "App Development", "User Dashboards", "Database Design"],
    href: "/contact"
  },
  {
    title: "PostPilot (Social Media)",
    desc: "Let us handle your regular posts, comments, and followers. We work on FB, IG, and TikTok to grow your organic reach.",
    icon: Megaphone,
    features: ["Daily Posting", "Growth Strategy", "Customer Chats", "Video/Reels Content"],
    href: "/social-media"
  },
  {
    title: "BrandBox (DFY Branding)",
    desc: "The ultimate 'Done For You' package. Get your logo, flyers, and brand guidelines delivered in one complete box.",
    icon: Palette,
    features: ["Logo Design", "Brand Identity", "Marketing Flyers", "Office Signage"],
    href: "/dfy-services"
  },
  {
    title: "Digital Sales Funnels",
    desc: "Automated systems designed to capture leads and turn visitors into loyal paying customers specifically for your brand.",
    icon: Search,
    features: ["Lead Capturing", "Email Automation", "Landing Pages", "Retargeting Ads"],
    href: "/digital-marketing"
  },
  {
    title: "AI Video Production",
    desc: "We create high-end video ads and content using advanced AI, designed specifically to help your brand stand out and sell more.",
    icon: Video,
    features: ["Viral Reels/TikToks", "AI Product Ads", "Automated Editing", "Sales Video Scripts"],
    href: "/ai-video-content"
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-2 rounded-full font-black uppercase tracking-widest text-[10px] mb-8"
          >
            Digital Growth Ecosystem
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 lowercase italic leading-[0.9]">how we help you <span className="text-emerald-600 underline-offset-8">grow</span>.</h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl font-medium">
            We provide everything you need to build your brand and find more customers online. Simple, affordable, and high-performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3.5rem] border border-slate-100 bg-white hover:border-emerald-500/20 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all group flex flex-col h-full"
            >
              <div className="w-20 h-20 rounded-3xl bg-slate-50 text-emerald-600 flex items-center justify-center mb-12 group-hover:scale-110 transition-transform shadow-inner border border-slate-100">
                <s.icon className="w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter lowercase italic leading-none group-hover:text-emerald-600 transition-colors uppercase italic">{s.title}</h2>
              <p className="text-slate-500 mb-10 leading-relaxed text-lg font-medium flex-grow">{s.desc}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {s.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm font-black text-slate-800 tracking-tight">
                    <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <CheckCircle size={14} />
                    </div>
                    {f}
                  </div>
                ))}
              </div>

              <Link 
                href={s.href} 
                className="inline-flex items-center gap-4 font-black text-slate-900 group-hover:gap-6 transition-all uppercase tracking-[0.2em] text-[10px] border-b-2 border-slate-100 hover:border-emerald-600 pb-2 w-fit"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

