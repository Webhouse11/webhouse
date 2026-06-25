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
import { ServicesSlider } from '@/src/components/ServicesSlider';

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

      {/* Elegant Services Slider */}
      <ServicesSlider />

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
                   <a href="https://wa.me/2348152469749" target="_blank" className="bg-white text-emerald-600 px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
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

