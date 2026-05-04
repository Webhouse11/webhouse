'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Share2, Users, BarChart3, Target, CheckCircle2, ArrowRight,
  Facebook, Instagram, Linkedin, MessageCircle, Zap, Shield
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

const features = [
  {
    title: "Community Management",
    desc: "We don't just post; we engage. We build real relationships with your audience.",
    icon: Users
  },
  {
    title: "Viral Content Strategy",
    desc: "Data-driven content pillars designed to get shared and noticed across Africa.",
    icon: Zap
  },
  {
    title: "Social Growth Hacking",
    desc: "Accelerated follower growth using proven organic and paid techniques.",
    icon: Target
  },
  {
    title: "Reputation Protection",
    desc: "24/7 monitoring to ensure your brand's image remains pristine and professional.",
    icon: Shield
  }
];

const tiers = [
  {
    name: "Growth Starter",
    price: "$299",
    period: "/mo",
    desc: "Perfect for personal brands and small businesses starting their journey.",
    bullets: [
      "3 Platforms Managed",
      "12 Custom Posts Monthly",
      "Basic Engagement (1hr/day)",
      "Monthly Strategy Call",
      "Analytics Dashboard Access"
    ],
    cta: "Start Growing",
    accent: "border-black/5"
  },
  {
    name: "Brand Dominance",
    price: "$599",
    period: "/mo",
    desc: "The sweet spot for established businesses looking for consistent scaling.",
    bullets: [
      "5 Platforms Managed",
      "24 Custom Posts Monthly",
      "Video Reels & Shorts (4/mo)",
      "Full Community Engagement",
      "Influencer Outreach (2/mo)",
      "Advanced ROI Tracking"
    ],
    cta: "Scale Your Brand",
    accent: "border-emerald-500 shadow-xl shadow-emerald-500/10",
    popular: true
  },
  {
    name: "Enterprise Plus",
    price: "Custom",
    period: "",
    desc: "A fully dedicated social media department at your service.",
    bullets: [
      "Unlimited Platforms",
      "Daily Content Production",
      "Video Reels & Shorts (12/mo)",
      "Dedicated Account Manager",
      "Crisis Management Protocol",
      "Paid Ad Management Included"
    ],
    cta: "Get Enterprise Quote",
    accent: "border-black/5"
  }
];

export default function SocialPlusPage() {
  return (
    <div className="pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold mb-6">
              <Share2 className="w-4 h-4" /> SOCIAL PLUS+
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Dominating the <span className="text-emerald-600">African Digital</span> Landscape.
            </h1>
            <p className="text-xl text-black/60 leading-relaxed mb-10">
              Social Plus is our premium social media growth engine. We combine creative storytelling with aggressive data analytics to give your brand the authority it deserves.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact?service=Social%20Plus" className="px-10 py-5 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                Get Your Growth Plan
              </Link>
            </div>
          </motion.div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 p-12 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
                <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/10 border border-black/5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-black/5"></div>
                    <div className="space-y-2">
                      <div className="w-32 h-3 bg-black/10 rounded"></div>
                      <div className="w-20 h-2 bg-black/5 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="w-full h-8 bg-emerald-50 rounded"></div>
                    <div className="w-full h-8 bg-emerald-50 rounded"></div>
                    <div className="w-3/4 h-8 bg-emerald-50 rounded"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="w-full h-12 bg-black/5 rounded-xl"></div>
                    <div className="w-full h-12 bg-black/5 rounded-xl"></div>
                    <div className="w-full h-12 bg-black/5 rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white border border-black/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-black/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Transparent Growth Plans</h2>
          <p className="text-black/60 text-lg">Predictable pricing for exponential social growth.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "p-10 rounded-[3rem] border bg-white flex flex-col relative",
                t.accent
              )}
            >
              {t.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{t.name}</h3>
              <p className="text-black/40 text-sm mb-8">{t.desc}</p>
              
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-5xl font-black">{t.price}</span>
                <span className="text-black/40 font-medium">{t.period}</span>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                {t.bullets.map((b, j) => (
                  <div key={j} className="flex items-center gap-3 text-black/80 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    {b}
                  </div>
                ))}
              </div>

              <Link 
                href={`/contact?service=Social Plus - ${t.name}`}
                className={cn(
                  "w-full py-5 rounded-2xl font-bold text-lg text-center transition-all",
                  t.popular ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20" : "bg-black text-white hover:bg-black/90"
                )}
              >
                {t.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Platforms */}
        <div className="p-12 rounded-[3.5rem] bg-black text-white text-center">
            <h2 className="text-3xl font-bold mb-12">Platforms We Master</h2>
            <div className="flex flex-wrap justify-center gap-12 opacity-60">
                <div className="flex items-center gap-2"><Facebook className="w-8 h-8" /> <span className="font-bold">Facebook</span></div>
                <div className="flex items-center gap-2"><Instagram className="w-8 h-8" /> <span className="font-bold">Instagram</span></div>
                <div className="flex items-center gap-2"><Linkedin className="w-8 h-8" /> <span className="font-bold">LinkedIn</span></div>
                <div className="flex items-center gap-2"><MessageCircle className="w-8 h-8" /> <span className="font-bold">WhatsApp</span></div>
                <div className="flex items-center gap-2"><Zap className="w-8 h-8" /> <span className="font-bold">TikTok</span></div>
            </div>
        </div>
      </div>
    </div>
  );
}
