'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Megaphone, 
  Video, 
  Cpu, 
  Tv, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: "Website Design & Dev",
    desc: "We build high-converting websites and complex web applications designed to scale with your business growth. Fast, secure, and SEO optimized.",
    icon: Globe,
    href: "/website-design",
    color: "from-emerald-500/10 to-teal-500/5 hover:from-emerald-500/20 hover:to-teal-500/10",
    iconBg: "bg-emerald-50 text-emerald-600",
    features: ["Mobile Friendly", "WhatsApp Integration", "Fast Loading"]
  },
  {
    title: "PostPilot™ Social Ads",
    desc: "Professional social media marketing and growth systems that transform your digital presence into a highly active customer community.",
    icon: Smartphone,
    href: "/social-media",
    color: "from-blue-500/10 to-cyan-500/5 hover:from-blue-500/20 hover:to-cyan-500/10",
    iconBg: "bg-blue-50 text-blue-600",
    features: ["Targeted Ads", "Daily Content Posting", "Analytics Tracking"]
  },
  {
    title: "BrandBox™ Branding",
    desc: "A complete professional brand identity system (logos, flyers, kits, social guidelines) delivered in one powerful box.",
    icon: Palette,
    href: "/dfy-services",
    color: "from-orange-500/10 to-amber-500/5 hover:from-orange-500/20 hover:to-amber-500/10",
    iconBg: "bg-orange-50 text-orange-600",
    features: ["Original Logos", "Business Cards", "Brand Guidelines"]
  },
  {
    title: "AI Video Production",
    desc: "Cinematic, high-impact AI-generated video content and high-converting ads designed to grab attention on TikTok, Reels & YouTube.",
    icon: Video,
    href: "/ai-video-content",
    color: "from-pink-500/10 to-rose-500/5 hover:from-pink-500/20 hover:to-rose-500/10",
    iconBg: "bg-pink-50 text-pink-600",
    features: ["Viral Short-form", "AI Product Ads", "Professional Voiceover"]
  },
  {
    title: "Bulk Video Creation",
    desc: "Scale your authority with batch-created videos. Up to 100 high-quality, completely managed videos recorded, edited, and uploaded for you.",
    icon: Tv,
    href: "/bulk-video-creation",
    color: "from-violet-500/10 to-purple-500/5 hover:from-violet-500/20 hover:to-purple-500/10",
    iconBg: "bg-purple-50 text-purple-600",
    features: ["Batch Production", "Channel Uploading", "Scripting & Captions"]
  },
  {
    title: "Digital Sales Funnels",
    desc: "Automated high-converting funnel systems and marketing flows that capture prospects and turn them into long-term clients automatically.",
    icon: Megaphone,
    href: "/digital-marketing",
    color: "from-indigo-500/10 to-blue-500/5 hover:from-indigo-500/20 hover:to-blue-500/10",
    iconBg: "bg-indigo-50 text-indigo-600",
    features: ["Lead Generation", "Email Automation", "Conversion Tuning"]
  },
  {
    title: "Custom SaaS & AI Workflows",
    desc: "Intelligent workflows, AI automation integrations, and custom database-backed software systems that cut operational costs down.",
    icon: Cpu,
    href: "/services",
    color: "from-teal-500/10 to-emerald-500/5 hover:from-teal-500/20 hover:to-emerald-500/10",
    iconBg: "bg-teal-50 text-teal-600",
    features: ["Custom Software", "SaaS Dashboards", "AI Agent Automations"]
  }
];

export const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive logic to handle visible slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = services.length - visibleItems;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden" id="services-slider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/60 text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-6 shadow-sm">
              <Sparkles size={12} className="text-emerald-500 animate-pulse" />
              <span>Explore Our Interactive Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 leading-none lowercase italic mb-6">
              our digital <span className="text-emerald-600">solutions.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
              Swipe or use the controls below to navigate through our complete suite of high-performance digital systems built to grow your brand.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={prevSlide}
              aria-label="Previous services"
              className="w-14 h-14 rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-emerald-500/20 flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next services"
              className="w-14 h-14 rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-emerald-500/20 flex items-center justify-center text-slate-600 hover:text-emerald-600 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Slider Window */}
        <div className="relative overflow-visible" ref={containerRef}>
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6 md:gap-8"
              animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              style={{
                width: `${(services.length / visibleItems) * 100}%`
              }}
            >
              {services.map((s, i) => (
                <div 
                  key={i} 
                  style={{ width: `${100 / services.length}%` }}
                  className="px-1"
                >
                  <div className="block h-full">
                    <motion.div
                      className={`h-full group p-8 md:p-10 rounded-[2.5rem] border border-slate-100/80 bg-gradient-to-br ${s.color} hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all flex flex-col justify-between`}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner ${s.iconBg} group-hover:scale-105 transition-transform`}>
                          <s.icon size={28} />
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase tracking-tight italic text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-slate-500 leading-relaxed mb-8 font-medium text-sm">
                          {s.desc}
                        </p>

                        {/* Bullet Features */}
                        <div className="space-y-3 mb-8">
                          {s.features.map((feat, j) => (
                            <div key={j} className="flex items-center gap-2.5 text-xs font-black text-slate-700 tracking-tight">
                              <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Indicators and Interactive Dots */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide group ${i + 1}`}
              className={`h-2 transition-all duration-300 rounded-full ${
                currentIndex === i 
                  ? "w-8 bg-emerald-600 shadow-sm" 
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
