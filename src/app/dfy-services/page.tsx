'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  Palette, 
  Share2, 
  Layout, 
  Users, 
  Mail, 
  Youtube, 
  MessageCircle, 
  Search, 
  Zap,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const brandBoxMenu = [
  { 
    title: "Complete Business Website", 
    icon: Globe, 
    oldPrice: "NGN 325,000",
    currentPrice: "NGN 250,500",
    tagline: "A digital storefront that works while you sleep. Professionally built for conversion.",
    features: ["Custom UI/UX Design", "Responsive Layout", "SEO Foundation", "Contact Forms", "E-commerce Ready", "Speed Optimization"],
    perfectFor: "BUSINESSES LOOKING TO ESTABLISH A PROFESSIONAL AND TRUSTWORTHY ONLINE HUB."
  },
  { 
    title: "Google Business Profile", 
    icon: MapPin, 
    oldPrice: "NGN 75,000",
    currentPrice: "NGN 55,250",
    tagline: "Dominate local maps. Be the first thing customers see when they search nearby.",
    features: ["Profile Setup & Optimization", "Review Strategy", "Local Keyword Mapping", "GMB Posting Schedule", "Photo/Video Optimization", "Insights Analysis"],
    perfectFor: "LOCAL SERVICE PROVIDERS AND RETAIL STORES RELYING ON FOOT TRAFFIC."
  },
  { 
    title: "Complete Brand Identity", 
    icon: Palette, 
    oldPrice: "NGN 195,000",
    currentPrice: "NGN 155,000",
    tagline: "Your visual story, told through premium design elements that command attention.",
    features: ["Premium Logo Suite", "Color Palette", "Typography System", "Social Media Kits", "Brand Guidelines", "Stationery Designs"],
    perfectFor: "ENTREPRENEURS STARTING FRESH OR REBRANDING FOR A MORE ELITE MARKET POSITION."
  },
  { 
    title: "Social Media Profile Setup", 
    icon: Share2, 
    oldPrice: "NGN 115,000",
    currentPrice: "NGN 85,000",
    tagline: "Consistent, professional branding across all your social touchpoints.",
    features: ["All-Platform Setup", "Branded Profile Images", "Optimized Bio/Intro", "Highlights Strategy", "Content Pillar Guide", "Cross-Platform Linking"],
    perfectFor: "BRANDS THAT NEED TO LOOK PROFESSIONAL ACROSS ALL SOCIAL CHANNELS."
  },
  { 
    title: "Landing Page", 
    icon: Layout, 
    oldPrice: "NGN 165,000",
    currentPrice: "NGN 125,000",
    tagline: "One page, one goal. High-converting sales pages for specific campaigns.",
    features: ["Copywriting Focus", "A/B Test Design", "Conversion Blocks", "Fast Load Speed", "CRM Integration", "Mobile Optimization"],
    perfectFor: "MARKETERS RUNNING ADS OR PRODUCT LAUNCHES NEEDING HIGH CONVERSION."
  },
  { 
    title: "Lead Capture System", 
    icon: Users, 
    oldPrice: "NGN 95,000",
    currentPrice: "NGN 75,000",
    tagline: "Turn strangers into prospects with an automated lead generation engine.",
    features: ["Lead Magnets Setup", "Capture Forms", "CRM Connectivity", "Auto-Responder Email", "Segmentation Rules", "Performance Tracking"],
    perfectFor: "CONSULTANTS AND B2B COMPANIES LOOKING TO BUILD AN EMAIL LIST."
  },
  { 
    title: "Email Marketing System", 
    icon: Mail, 
    oldPrice: "NGN 125,000",
    currentPrice: "NGN 95,000",
    tagline: "Stay top-of-mind. Automated sequences that nurture your audience 24/7.",
    features: ["Software Setup", "Template Design", "Welcome Sequences", "Campaign Workflow", "List Cleanup Tools", "ROI Analytics"],
    perfectFor: "BUSINESSES WANTING TO DEEPEN RELATIONSHIPS AND DRIVE REPEAT SALES."
  },
  { 
    title: "YouTube Channel Setup & Branding", 
    icon: Youtube, 
    oldPrice: "NGN 129,247",
    currentPrice: "NGN 102,037",
    tagline: "Start your YouTube journey with a channel that looks ready for 100k subscribers.",
    features: ["Premium Channel Banner & Icon", "SEO-Optimized \"About\" Section", "Keyword-Rich Channel Tags", "Playlist Structure & Organization", "5 Custom Thumbnail Templates", "Upload Defaults Configuration"],
    perfectFor: "KNOWLEDGE-GIVERS AND EXPERTS LOOKING TO BUILD AUTHORITY VIA VIDEO."
  },
  { 
    title: "WhatsApp Business Automation Setup", 
    icon: MessageCircle, 
    oldPrice: "NGN 91,153",
    currentPrice: "NGN 76,188",
    tagline: "Handle customer inquiries 24/7. Never lose a lead again.",
    features: ["Advanced Business Profile Setup", "Automated Greeting & Away Messages", "Product/Service Catalog Mapping", "Organized Quick Reply Templates", "Basic Chatbot Flow Design", "Lead Labeling & Sorting System"],
    perfectFor: "BUSY BUSINESS OWNERS WHO GET TOO MANY WHATSAPP MESSAGES TO HANDLE MANUALLY."
  },
  { 
    title: "Local SEO Package", 
    icon: Search, 
    oldPrice: "NGN 155,097",
    currentPrice: "NGN 127,887",
    tagline: "Be the #1 choice when people in your city search for your service.",
    features: ["Monthly Keyword Optimization", "Weekly Google Profile Internal Posts", "Local Citation & Directory Building", "Monthly Ranking & Traffic Report", "GMB Review Management Aid", "Localized Content Strategy"],
    perfectFor: "ESTABLISHMENTS LIKE CLINICS, SALONS, OR STORES THAT DEPEND ON CITY-BASED CUSTOMERS."
  },
  { 
    title: "AI-Powered Content System Setup", 
    icon: Zap, 
    oldPrice: "NGN 187,749",
    currentPrice: "NGN 153,736",
    tagline: "Post high-quality content daily without spending hours on it.",
    features: ["Custom AI Tools & API Setup", "Weekly Batch Content Workflow", "SEO Blog/Article Templates", "AI Social Caption Generator System", "Email Newsletter Templates", "ChatGPT Training & SOPs"],
    perfectFor: "SOLOPRENEURS WHO FIND CONTENT CREATION OVERWHELMING AND TIME-CONSUMING."
  }
];

export default function BrandBoxPage() {
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
              BrandBox™ by Webhouse
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 lowercase">
              stop struggling with your <span className="text-emerald-600">online presence</span>. we build it all for you.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Our BrandBox Menu features high-performance digital infrastructure designed to command respect and scale revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Menu */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {brandBoxMenu.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 2) * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 relative group flex flex-col h-full"
              >
                {/* Header: Icon & Price */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 shadow-inner">
                    <item.icon size={32} />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-3 mb-1">
                      <span className="text-slate-400/60 line-through text-[10px] font-bold tracking-tight">{item.oldPrice}</span>
                      <span className="bg-amber-400 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-md">BEST PRICE</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-slate-900 leading-none tracking-tighter">
                      {item.currentPrice}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-2xl md:text-3xl font-black mb-4 group-hover:text-emerald-600 transition-colors tracking-tight italic">
                    {item.title}
                  </h3>
                  <div className="pl-4 border-l-4 border-amber-400 mb-8 bg-slate-50/50 py-2 pr-4 rounded-r-xl">
                    <p className="text-slate-700 font-bold italic text-sm md:text-base leading-[1.3]">
                      "{item.tagline}"
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-10">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-800 text-[11px] md:text-[12px] font-bold">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={12} className="text-emerald-500" />
                        </div>
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tip */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0 opacity-80">🎯</span>
                    <p className="text-[9px] md:text-[10px] font-extrabold text-slate-400 leading-normal uppercase tracking-[0.1em]">
                      PERFECT FOR: {item.perfectFor}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <a 
                  href={`https://wa.me/2348060180077?text=I'm%20ready%20to%20order%20the%20${encodeURIComponent(item.title)}.`}
                  className="w-full bg-[#0a0f1e] hover:bg-emerald-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] group-hover:shadow-2xl shadow-emerald-500/20"
                >
                  <span className="mb-0.5 uppercase tracking-widest">GET IT NOW!</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure CTA */}
      <section className="py-24 bg-slate-900 mx-4 md:mx-8 mb-20 rounded-[4rem] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 italic">Ready to Build a Brand That Commands <br className="hidden md:block" /> <span className="text-emerald-500 italic font-medium font-serif">Respect & Revenue?</span></h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            The Elite Digital Infrastructure Package (BrandBox Full) includes all services on the menu for a fixed one-time investment.
          </p>
          
          <div className="inline-flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/10 backdrop-blur-md px-12 py-8 rounded-[2.5rem] border border-white/20">
              <div className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2 text-left">THE INFRASTRUCTURE BOX</div>
              <div className="text-6xl font-black italic">₦1.25M</div>
            </div>
            <a 
              href="https://wa.me/2348060180077?text=I'm%20ready%20to%20order%20the%20Full%20Infrastructure%20Package." 
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-16 py-8 rounded-full font-black text-2xl shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all flex items-center gap-4"
            >
              ORDER NOW <ArrowRight size={28} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


