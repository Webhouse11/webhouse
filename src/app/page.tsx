'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Cpu, BarChart3, Layers, Zap, Target, Users, Smartphone, Palette, Megaphone, Video, Search, MessageCircle, HelpCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';
import { HeroSlider } from '@/src/components/HeroSlider';
import { TestimonialSlider } from '@/src/components/TestimonialSlider';
import { LeadMagnet } from '@/src/components/LeadMagnet';
import EnrollmentNotification from '@/src/components/EnrollmentNotification';
import CourseTicker from '@/src/components/CourseTicker';

const services = [
  {
    title: "Website Development",
    desc: "We build high-converting websites and complex web applications designed to scale with your business growth.",
    icon: Globe,
    href: "/website-design",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "PostPilot™ Social Growth",
    desc: "Professional social media systems that transform your digital presence into a loyal customer community.",
    icon: Smartphone,
    href: "/social-media",
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "BrandBox™ DFY Suite",
    desc: "A complete professional brand identity system delivered in one powerful, conversion-focused box.",
    icon: Palette,
    href: "/dfy-services",
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Digital Sales Funnels",
    desc: "Automated marketing systems and high-converting funnels that turn visitors into long-term clients.",
    icon: Megaphone,
    href: "/digital-marketing",
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "AI Video Production",
    desc: "Cinematic AI-generated video content and high-impact ads that capture attention and drive sales instantly.",
    icon: Video,
    href: "/ai-video-content",
    color: "bg-pink-50 text-pink-600"
  },
  {
    title: "Custom SaaS & AI Systems",
    desc: "Intelligent workflows and custom software solutions that automate your business tasks and reduce costs.",
    icon: Search,
    href: "/services",
    color: "bg-teal-50 text-teal-600"
  }
];

const faqs = [
  {
    q: "Is your service affordable for small businesses?",
    a: "Yes! We specialize in working with growing brands and offer flexible payment plans that suit every business size."
  },
  {
    q: "How long does it take to build a website?",
    a: "A standard business website usually takes between 7 to 14 days from start to launch."
  },
  {
    q: "Do I need to be tech-savvy to work with you?",
    a: "Not at all. We handle all the difficult technical parts so you can focus on running your business."
  },
  {
    q: "Can I manage my social media myself after you set it up?",
    a: "Of course! We also provide training if you'd like to manage things yourself after our initial setup."
  }
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Trust & Simple Positioning */}
      <section className="py-24 border-b border-black/5 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs uppercase tracking-widest mb-6">
                Your Reliable Digital Partner
              </div>
              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9] lowercase italic">
                Grow your business <br />
                <span className="text-emerald-600">online, simply.</span>
              </h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                At Webhouse, we believe digital growth shouldn't be complicated or too expensive. We help African entrepreneurs, SMEs, and organizations build a strong online presence that actually brings results.
              </p>
              
              <div className="space-y-4 mb-10">
                {[
                  "Affordable prices for growing brands",
                  "Simple, easy-to-understand solutions",
                  "Fast support via WhatsApp and Phone",
                  "Trusted by 500+ businesses across Africa"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-slate-700">
                    <CheckCircle className="text-emerald-500 flex-shrink-0" size={20} />
                    {item}
                  </div>
                ))}
              </div>

              <Link href="/services" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-black text-lg hover:shadow-xl hover:shadow-emerald-500/20 transition-all">
                See Our Services <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="aspect-square bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
                    alt="African Business Growth"
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 z-20 hidden md:block">
                  <p className="text-4xl font-black text-emerald-600 mb-1">500+</p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Happy Clients</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest mb-6">
              Our Core Services
            </div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter italic lowercase leading-none">everything you need <br /> to <span className="text-emerald-600">grow.</span></h2>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
              We provide all the tools you need to build your brand and find more customers online with obsessive attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[2.5rem] border border-slate-100 hover:border-emerald-500/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all bg-white relative overflow-hidden flex flex-col h-full"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 shadow-inner bg-slate-50", s.color.split(' ')[1])}>
                  <s.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-emerald-600 transition-colors uppercase tracking-tight italic">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 flex-grow font-medium text-sm">{s.desc}</p>
                <Link href={s.href} className="text-emerald-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all border-b-2 border-emerald-50/0 hover:border-emerald-600 w-fit pb-1">
                   Get Started <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section (Process) */}
      <section className="py-24 bg-slate-900 text-white mx-4 md:mx-8 mb-20 rounded-[4rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.2),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight mb-6 lowercase italic leading-none">simple 3-step process.</h2>
            <p className="text-slate-400 text-lg mb-20 font-medium">Getting your business online has never been this easy.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
               {[
                 { step: "01", t: "Let's Chat", d: "Message us on WhatsApp. Tell us about your business and what you need." },
                 { step: "02", t: "The Plan", d: "We give you a simple, affordable plan and get to work immediately." },
                 { step: "03", t: "Launch & Grow", d: "We go live! We also provide support to make sure you keep growing." }
               ].map((p, i) => (
                 <div key={i} className="relative group">
                    <div className="text-8xl font-black text-white/5 absolute -top-10 left-1/2 -translate-x-1/2 group-hover:text-emerald-500/10 transition-colors">{p.step}</div>
                    <div className="relative z-10 p-8">
                       <h3 className="text-2xl font-bold mb-4">{p.t}</h3>
                       <p className="text-slate-400 leading-relaxed">{p.d}</p>
                    </div>
                 </div>
               ))}
            </div>
        </div>
      </section>

      {/* Course Slider Section */}
      <CourseTicker />

      {/* Industries Grid */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Who We Serve.</h2>
               <p className="text-slate-500">We understand the specific needs of local African brands.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
               {[
                 "Schools", "Churches", "Restaurants", "Startups", "NGOs", "Retail Shops", "Fashion Brands", "Logistics"
               ].map((ind, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-default">
                    {ind}
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <HelpCircle size={48} className="mx-auto text-emerald-500 mb-6" />
               <h2 className="text-4xl font-black tracking-tight mb-4">Common Questions.</h2>
            </div>
            <div className="space-y-6">
               {faqs.map((faq, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="text-xl font-bold mb-3 flex items-start gap-3">
                       <span className="text-emerald-500">Q.</span> {faq.q}
                    </h4>
                    <p className="text-slate-500 leading-relaxed pl-8 border-l-2 border-emerald-100">{faq.a}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Lead Magnet */}
      <LeadMagnet />

      <EnrollmentNotification />

      {/* Quick Contact / WhatsApp Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-600 rounded-[4rem] p-8 md:p-20 relative overflow-hidden text-center text-white">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
             <div className="relative z-10 max-w-3xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-10">
                   <MessageCircle size={40} className="fill-white/20" />
                </div>
                <h2 className="text-4xl lg:text-8xl font-black mb-8 leading-[0.85] tracking-tighter lowercase italic">
                  Ready to start? <br/> <span className="text-emerald-200">let's build together.</span>
                </h2>
                <p className="text-emerald-50 text-xl mb-12 leading-relaxed opacity-80">
                  Join hundreds of businesses growing with Webhouse. Message us today to get a free price quote.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                   <a href="https://wa.me/2348060180077" target="_blank" className="bg-white text-emerald-600 px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
                     Chat on WhatsApp <ArrowRight size={24} />
                   </a>
                   <Link href="/contact" className="bg-emerald-700 text-white px-10 py-5 rounded-full font-black text-xl hover:bg-emerald-800 transition-all">
                     Email Us
                   </Link>
                </div>
                <div className="mt-12 flex justify-center items-center gap-8 text-emerald-100/60 font-bold uppercase tracking-widest text-xs">
                   <span>Fast Response</span>
                   <div className="w-2 h-2 rounded-full bg-emerald-100/20"></div>
                   <span>Free Consultation</span>
                   <div className="w-2 h-2 rounded-full bg-emerald-100/20"></div>
                   <span>Friendly Support</span>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

