import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const slides = [
  {
    title: "Building Digital Systems That Power Growth",
    subtitle: "Webhouse Media and Marketing Solution designs websites, SaaS platforms, and AI automation systems that help businesses scale digitally.",
    cta: "Start Your Project",
    link: "/contact",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
    accent: "bg-emerald-500"
  },
  {
    title: "Custom SaaS Development & Architecture",
    subtitle: "End-to-end software products built with robust, scalable infrastructure for modern enterprises.",
    cta: "Explore SaaS Solutions",
    link: "/services",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2340",
    accent: "bg-blue-500"
  },
  {
    title: "Intelligent AI Automation Systems",
    subtitle: "Eliminate repetitive tasks and reduce costs with our custom-engineered AI workflow solutions.",
    cta: "Automate Your Business",
    link: "/services",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2232",
    accent: "bg-purple-500"
  },
  {
    title: "High-Converting Web Applications",
    subtitle: "Performance-driven websites that turn visitors into loyal customers through strategic UI/UX.",
    cta: "View Web Services",
    link: "/services",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=2264",
    accent: "bg-orange-500"
  },
  {
    title: "Digital Sales & Marketing Funnels",
    subtitle: "Automated marketing infrastructures designed to maximize conversion rates and ROI.",
    cta: "Boost Your Sales",
    link: "/services",
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=2340",
    accent: "bg-indigo-500"
  },
  {
    title: "Professional Tech Training Programs",
    subtitle: "Master the skills needed to build modern digital systems with our intensive training courses.",
    cta: "Enroll Today",
    link: "/services",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2340",
    accent: "bg-rose-500"
  },
  {
    title: "Brand Identity & Graphic Systems",
    subtitle: "Position your company as a market leader with comprehensive visual identity and branding.",
    cta: "Build Your Brand",
    link: "/services",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2264",
    accent: "bg-amber-500"
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
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                  {slides[current].title}
                </h1>
                <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">
                  {slides[current].subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to={slides[current].link} 
                    className={cn("text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2", slides[current].accent, "hover:brightness-110")}
                  >
                    {slides[current].cta} <ArrowRight className="w-4 h-4" />
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
