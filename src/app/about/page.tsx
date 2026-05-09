'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, ShieldCheck, Zap, Globe, Users, Trophy, Rocket, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const stats = [
  { label: "Clients Served", val: "500+" },
  { label: "Years in Business", val: "6+" },
  { label: "Growth Milestones", val: "1.2K" },
  { label: "Countries Reached", val: "15+" }
];

const team = [
  {
    name: "OLURANTI CLEMENT",
    role: "CEO & Lead Growth Strategist",
    image: "https://res.cloudinary.com/dhzouslh1/image/upload/v1778308765/681239616_960194553518462_5873236656219850661_n_jaffx1.jpg",
    desc: "Architecting digital systems that drive millions in revenue."
  },
  {
    name: "Bolanle A.",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400",
    desc: "Mastermind behind visual authority and brand storytelling."
  },
  {
    name: "Chidi E.",
    role: "CTO / Head of Engineering",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400",
    desc: "Scaling SaaS and high-performance digital infrastructure."
  },
  {
    name: "Faith O.",
    role: "Client Success Manager",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=400",
    desc: "Bridging the gap between business goals and technical results."
  }
];

const differentiators = [
  {
    icon: ShieldCheck,
    title: "Infrastructure-First",
    desc: "We don't just build 'websites'. We build end-to-end digital sales systems that convert cold traffic into loyal brand advocates.",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: Globe,
    title: "Global Standards",
    desc: "Providing Silicon Valley-level technology and design aesthetics specifically tailored for high-growth African and European brands.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Zap,
    title: "Speed to Market",
    desc: "Our agile workflow ensures your complex systems are live and generating ROI months faster than traditional development agencies.",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: Trophy,
    title: "Documented ROI",
    desc: "Transparent reporting on every metric. If it doesn't move the needle for your business revenue, we don't build it.",
    color: "bg-orange-50 text-orange-600"
  }
];

const timeline = [
  { year: "2018", title: "The Foundation", desc: "Webhouse was born in a small room with one mission: to make high-end digital tools accessible to local entrepreneurs." },
  { year: "2020", title: "Strategic Pivot", desc: "Recognizing the need for more than just visuals, we pivoted to full-scale digital infrastructure and growth systems." },
  { year: "2022", title: "Global Expansion", desc: "Extended operations to serve clients in 15+ countries, documenting massive revenue growth for overseas brands." },
  { year: "2024", title: "Digital Authority", desc: "Today, we lead the charge in African digital innovation, combining AI automation with high-conversion marketing Logic." }
];

export default function AboutPage() {
  return (
    <div className="bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-8"
            >
              Legacy & Vision
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.85] lowercase italic">
              the backbone of <span className="text-emerald-600">digital growth</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
              We design websites, SaaS platforms, and AI automation systems that help businesses scale through intelligent technology and strategic infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="px-4">
                <p className="text-3xl md:text-5xl font-black mb-1 text-emerald-400 tracking-tighter">{s.val}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-[4/5] rounded-[3rem] bg-slate-200 overflow-hidden shadow-2xl relative z-10"
              >
                <img 
                  src="https://res.cloudinary.com/dhzouslh1/image/upload/v1778308765/681239616_960194553518462_5873236656219850661_n_jaffx1.jpg" 
                  alt="OLURANTI CLEMENT - Founder of Webhouse Media" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </motion.div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-60 -z-0" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="text-emerald-600 font-black uppercase tracking-widest text-xs mb-6 italic">The Founder's Narrative</div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 italic lowercase leading-none tracking-tighter">engineered for <span className="text-emerald-600">scale</span>.</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                <p>
                  "I started Webhouse because I saw too many businesses in Africa struggling with digital solutions that were either overpriced or under-delivered. Most agencies sold 'looks', but I wanted to sell 'results'."
                </p>
                <p>
                  My goal was to bridge the gap between high-level engineering and everyday business growth. We aren't just an agency; we are your strategic partner in building a digital infrastructure that works while you sleep.
                </p>
                <p>
                  Today, Webhouse is more than just me. It's a team of hungry creatives and engineers dedicated to one thing: making your brand the most respected in your industry.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-6">
                 <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-emerald-500/20 flex items-center justify-center font-black text-emerald-600 italic text-xl">OC</div>
                 <div>
                    <h4 className="font-black text-xl italic lowercase">OLURANTI CLEMENT</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Founder & CEO, Webhouse Media</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter lowercase italic">why <span className="text-emerald-600">webhouse</span>.</h2>
            <p className="text-lg text-slate-500 font-medium">What makes us the preferred choice for hundreds of high-growth brands.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:shadow-2xl transition-all group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner", d.color)}>
                  <d.icon size={28} />
                </div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tighter italic group-hover:text-emerald-600 transition-colors">{d.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black mb-6 lowercase italic tracking-tighter">The <span className="text-emerald-400">Evolution</span>.</h2>
            <p className="text-slate-400 font-medium italic">Our journey of building digital excellence since 2018.</p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Center Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
            
            <div className="space-y-20">
              {timeline.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative flex items-center gap-12 group",
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  )}
                >
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-slate-900 border-4 border-emerald-500 -translate-x-1/2 z-20 flex items-center justify-center font-black text-xs text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all duration-500">
                    {item.year.slice(2)}
                  </div>
                  
                  <div className="flex-1 ml-16 md:ml-0">
                    <div className={cn(
                      "p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm group-hover:bg-white/10 transition-all",
                      i % 2 === 0 ? "text-right" : "text-left"
                    )}>
                      <h3 className="text-2xl font-black mb-3 italic tracking-tight text-emerald-400">{item.title}</h3>
                      <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] mb-8">
              Human Infrastructure
            </div>
            <h2 className="text-4xl md:text-7xl font-black mb-6 italic tracking-tighter lowercase leading-none">meet the <span className="text-emerald-600">growth team</span>.</h2>
            <p className="text-lg text-slate-600 font-medium">The obsessive technical minds and creative masters behind our success.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="aspect-square rounded-[3rem] overflow-hidden mb-8 shadow-xl bg-slate-100 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <h3 className="text-2xl font-black italic lowercase mb-1 leading-none group-hover:text-emerald-600 transition-colors uppercase italic">{member.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">{member.role}</p>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Trust CTA */}
      <section className="py-24 bg-emerald-600 mx-4 md:mx-8 mb-20 rounded-[4rem] text-white text-center shadow-2xl shadow-emerald-600/20">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-6xl font-black mb-12 italic leading-none lowercase tracking-tighter">Ready to scale with the best team?</h2>
            <div className="flex flex-wrap justify-center gap-6">
               <a href="https://wa.me/2348060180077" target="_blank" className="bg-white text-emerald-600 px-12 py-6 rounded-full font-black text-2xl hover:scale-105 transition-all flex items-center gap-4">
                  START A PROJECT <ArrowRight size={28} />
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}

