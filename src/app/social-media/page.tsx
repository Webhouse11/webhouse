'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  MessageCircle, 
  Youtube, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Smartphone,
  Star,
  Quote,
  Globe,
  Layout,
  PlayCircle
} from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/src/hooks/useCurrency';

const stats = [
  { label: "Brands Managed", value: "500+" },
  { label: "Reach Generated", value: "10M+" },
  { label: "Client Satisfaction", value: "95%" },
  { label: "Campaigns Completed", value: "1200+" }
];

const platforms = [
  { name: "Facebook Management", desc: "Strategic content and community building to dominate the world's largest social network.", icon: Facebook, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Instagram Management", desc: "Visual storytelling and aesthetic curation that turns scrollers into loyal brand advocates.", icon: Instagram, color: "text-pink-600", bg: "bg-pink-50" },
  { name: "LinkedIn Management", desc: "Positioning your brand as an industry leader with professional, high-authority content.", icon: Linkedin, color: "text-blue-700", bg: "bg-blue-50" },
  { name: "WhatsApp Marketing", desc: "Direct commerce systems using the most intimate and high-conversion channel available.", icon: MessageCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "TikTok Growth", desc: "Viral-optimized short-form video strategies that capture the attention of millions.", icon: Smartphone, color: "text-slate-900", bg: "bg-slate-100" },
  { name: "YouTube Management", desc: "Building long-term video assets that generate passive leads and massive authority.", icon: Youtube, color: "text-red-600", bg: "bg-red-50" }
];

const reasons = [
  { title: "Creative Content", icon: Zap, desc: "Bespoke content that resonates with your brand voice." },
  { title: "Fast Delivery", icon: TrendingUp, desc: "Quick turnaround without compromising on quality." },
  { title: "International Standards", icon: Globe, desc: "Global-level strategy tailored for your local market." },
  { title: "Growth Strategy", icon: Users, desc: "Data-driven plans built for long-term scalability." },
  { title: "Audience Engagement", icon: MessageCircle, desc: "Building real connections with your community." },
  { title: "Conversion Focused", icon: CheckCircle2, desc: "Every post is a step towards a measurable goal." }
];

const plans = [
  {
    name: "Starter Package",
    price: "₦85,000",
    period: "/mo",
    desc: "Perfect for small businesses starting their digital journey.",
    features: [
      "2 Management Platforms",
      "3 Posts Per Week",
      "Basic Graphic Design",
      "Content Planning",
      "Community Management",
      "Monthly Growth Report"
    ],
    cta: "Start Growing",
    highlight: false
  },
  {
    name: "Growth Package",
    price: "₦155,000",
    period: "/mo",
    desc: "Designed for scaling brands that need more impact.",
    features: [
      "3 Management Platforms",
      "5 Posts Per Week",
      "Premium Reels & Graphics",
      "Full Community Management",
      "Influencer Strategy",
      "Actionable Insights"
    ],
    cta: "Scale Now",
    highlight: true
  },
  {
    name: "Premium Package",
    price: "₦250,500",
    period: "/mo",
    desc: "The ultimate solution for established brands.",
    features: [
      "All Platforms Management",
      "Daily Strategic Posting",
      "Cinematic Short Videos",
      "WhatsApp Storefront Aid",
      "Dedicated Growth Lead",
      "Weekly Performance Audits"
    ],
    cta: "Go Elite",
    highlight: false
  }
];

const testimonials = [
  { name: "Sarah Johnson", role: "CEO", text: "Webhouse Media completely transformed our online presence and customer engagement." },
  { name: "Michael Adams", role: "Founder, TechLaunch", text: "Our sales increased within weeks after working with Webhouse Media." },
  { name: "Amanda Lee", role: "Marketing Director", text: "Professional, creative, and very reliable social media team." },
  { name: "David Chen", role: "E-commerce Director", text: "The strategic approach Webhouse Media took for our campaign was world-class." }
];

export default function SocialMediaPage() {
  const { formatPrice } = useCurrency();
  return (
    <div className="bg-[#f8fafc]">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8">
              PostPilot™ Social Management
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 lowercase">
              we manage your <span className="text-indigo-600">social media</span> while you grow.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Professional social media management for modern brands, businesses, creators, and companies worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <a 
                href="https://wa.me/2348152469749?text=Hello,%20I'm%20ready%20to%20grow%20my%20brand%20with%20PostPilot." 
                className="bg-indigo-600 text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3"
              >
                Grow My Brand Now <ArrowRight size={20} />
              </a>
              <div className="flex -space-x-3">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                     <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" className="w-full h-full object-cover" />
                   </div>
                 ))}
                 <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                   500+
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-slate-100 pt-10">
               <div>
                  <div className="text-2xl font-black text-indigo-600">+142%</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engagement</div>
               </div>
               <div>
                  <div className="text-2xl font-black text-emerald-500">+89%</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversions</div>
               </div>
               <div>
                  <div className="text-2xl font-black text-pink-500">24/7</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Management</div>
               </div>
               <div>
                  <div className="text-2xl font-black text-amber-500">10M+</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Reach</div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Quick View */}
      <section className="py-12 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-black mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-indigo-200 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms We Master */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Platforms We <span className="text-indigo-600 font-serif italic font-medium">Master</span></h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We don't just post content; we build ecosystems that thrive on the platforms where your audience lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all group">
                <div className={`w-14 h-14 rounded-2xl ${platform.bg} ${platform.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <platform.icon size={28} />
                </div>
                <h3 className="text-xl font-black mb-3">{platform.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PostPilot */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 mb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-10 leading-[1.1]">Why Brands Choose <br /><span className="text-indigo-400 italic">PostPilot.</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {reasons.map((reason, i) => (
                  <div key={i}>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-4">
                      <reason.icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{reason.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] bg-indigo-600/20 border border-indigo-500/30 backdrop-blur-3xl p-8 flex flex-col justify-center items-center text-center overflow-hidden">
                 <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500 blur-3xl opacity-20 rounded-full" />
                 <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500 blur-3xl opacity-20 rounded-full" />
                 
                 <PlayCircle size={80} className="text-white mb-6 animate-pulse" />
                 <div className="text-4xl font-black mb-4 italic">24/7</div>
                 <div className="text-sm font-black uppercase tracking-widest text-indigo-300">Management & Support</div>
                 <p className="mt-8 text-slate-400 text-sm max-w-xs">Our team works around the clock to ensure your brand never stops engaging and growing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-24 bg-white" id="plans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Our <span className="text-indigo-600">PostPilot™</span> Plan</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Choose the package that aligns with your growth stage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-[3rem] border transition-all ${
                  plan.highlight 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xl shadow-indigo-500/30 scale-105 relative z-10' 
                  : 'bg-white border-slate-100 hover:border-indigo-200 shadow-xl'
                }`}
              >
                <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black tracking-tighter italic">{formatPrice(plan.price)}</span>
                  <span className={`text-sm font-bold ${plan.highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-bold">
                      <CheckCircle2 size={18} className={plan.highlight ? 'text-indigo-300' : 'text-emerald-500'} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href={`https://wa.me/2348152469749?text=I'm%20ready%20to%20order%20the%20${encodeURIComponent(plan.name)}.`}
                  className={`w-full py-5 rounded-2xl font-black text-center block transition-all ${
                    plan.highlight 
                    ? 'bg-white text-indigo-600 hover:bg-slate-50' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Global <span className="text-indigo-600 font-serif italic font-medium">Success</span> Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {testimonials.map((t, i) => (
               <div key={i} className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 relative group">
                  <Quote size={40} className="text-indigo-100 absolute top-6 right-6 group-hover:text-indigo-200 transition-colors" />
                  <div className="flex gap-1 mb-4">
                     {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-600 text-sm italic font-medium leading-relaxed mb-6 relative z-10">
                    "{t.text}"
                  </p>
                  <div>
                    <div className="font-black text-slate-900">{t.name}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.role}</div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-[120px] -z-10" />
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tight">Ready To Grow Your <br /> <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Brand Online?</span></h2>
            <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Stop stressing about what to post. Partner with the experts and watch your engagement soar.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
               <a href="tel:+2348152469749" className="bg-indigo-600 text-white px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-all flex items-center gap-4 shadow-2xl shadow-indigo-500/40">
                  Call Now <ArrowRight size={24} />
               </a>
               <a href="mailto:webhousemediastudio@gmail.com?subject=Strategic%20Social%20Media%20Growth%20Inquiry&body=Hi%20Webhouse%20Media%20Team%2C%0A%0AI'm%20interested%20in%20the%20PostPilot%20packages%20and%20would%20like%20to%20discuss%20growing%20my%20brand%20online." className="bg-slate-900 text-white px-12 py-6 rounded-full font-black text-xl hover:bg-black transition-all">
                  Send Email
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}

