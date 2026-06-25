'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

const slides = [
  {
    title: "Scale With Digital Systems & Infrastructure",
    subtitle: "We build professional websites, custom SaaS platforms, and AI systems designed for high-growth African enterprises.",
    cta: "Start Your Project",
    link: "/services",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=2400",
    accent: "bg-emerald-600"
  },
  {
    title: "PostPilot: Social Media Organic Growth",
    subtitle: "Let our experts handle your Facebook, Instagram, and LinkedIn to bring you real business results and loyal followers.",
    cta: "Learn About PostPilot",
    link: "/social-media",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=2400",
    accent: "bg-blue-600"
  },
  {
    title: "BrandBox: Your Done-For-You Brand Suite",
    subtitle: "Original logos, business cards, social media kits, and brand guidelines delivered in one complete, professional box.",
    cta: "Order Your BrandBox",
    link: "/dfy-services",
    image: "https://images.unsplash.com/photo-1572021335469-31716248e15c?auto=format&fit=crop&q=80&w=2400",
    accent: "bg-orange-600"
  },
  {
    title: "Viral AI Videos That Sell More",
    subtitle: "We create cinematic AI video ads and TikToks designed to capture attention and drive sales for your products.",
    cta: "Start Your Video",
    link: "/ai-video-content",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2400",
    accent: "bg-purple-600"
  },
  {
    title: "Authority Scaling with Bulk Video Creation",
    subtitle: "Scale your reach with batch-created videos. Up to 100 high-quality completely managed videos written, recorded, edited, and uploaded for you.",
    cta: "Explore Bulk Videos",
    link: "/bulk-video-creation",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=2400",
    accent: "bg-red-600"
  },
  {
    title: "Master High-Income Skills at DigitAcademy",
    subtitle: "Join 1,200+ students learning AI tools, marketing, and freelance skills to thrive in the digital economy.",
    cta: "Explore Courses",
    link: "/digitacademy",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2400",
    accent: "bg-emerald-500"
  }
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={slides[current].image} 
              alt={slides[current].title}
              className="h-full w-full object-cover opacity-50 transition-transform duration-[10s] scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-widest text-white mb-6")}>
                  <span className={cn("flex h-2 w-2 rounded-full animate-pulse", slides[current].accent)}></span>
                  Slide {current + 1} of {slides.length}
                </div>
                <h1 className="text-5xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9] lowercase italic">
                  {slides[current].title}
                </h1>
                <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl font-bold">
                  {slides[current].subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href={slides[current].link} 
                    className={cn("text-white px-10 py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 text-lg shadow-2xl", slides[current].accent, "hover:scale-105 shadow-emerald-500/20 active:scale-95")}
                  >
                    <span className="uppercase tracking-widest">{slides[current].cta}</span> <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-1.5 transition-all duration-500 rounded-full",
                current === i ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-4 lg:left-8 z-20 flex items-center">
        <button 
          onClick={prev}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 lg:right-8 z-20 flex items-center">
        <button 
          onClick={next}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};
