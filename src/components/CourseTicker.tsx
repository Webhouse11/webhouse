'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

const featuredCourses = [
  {
    id: 1,
    title: "AI Tools for Business Growth",
    price: "₦30,000",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    cat: "AI Mastery"
  },
  {
    id: 6,
    title: "AI SaaS Builder Guide",
    price: "₦120,000",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    cat: "Startup"
  },
  {
    id: 10,
    title: "AI Automation for Agencies",
    price: "₦125,000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    cat: "Agency"
  },
  {
    id: 12,
    title: "AI Agents & Workflows",
    price: "₦150,000",
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800",
    cat: "Automation"
  },
  {
    id: 16,
    title: "Smartphone Video Pro",
    price: "₦30,000",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    cat: "Content"
  },
  {
    id: 32,
    title: "Search Engine Optimization",
    price: "₦110,000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    cat: "SEO"
  }
];

import { useCurrency } from '@/src/hooks/useCurrency';

export default function CourseTicker() {
  const { formatPrice } = useCurrency();
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 lowercase italic">
            trending <span className="text-emerald-600">skills.</span>
          </h2>
          <p className="text-slate-500 font-medium">Join 1,200+ students mastering the digital economy.</p>
        </div>
        <Link href="/digitacademy" className="hidden md:flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
          View All Courses <ArrowRight size={20} />
        </Link>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused] w-max px-4">
          {[...featuredCourses, ...featuredCourses].map((course, i) => (
            <div 
              key={`${course.id}-${i}`}
              className="w-[300px] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-40">
                <Image 
                  src={course.image} 
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-sm">
                  {course.cat}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(star => <Star key={star} size={10} className="fill-emerald-500 text-emerald-500" />)}
                  <span className="text-[10px] font-bold text-slate-400 ml-1">5.0</span>
                </div>
                <h4 className="font-black text-slate-900 mb-4 line-clamp-1 group-hover:text-emerald-600 transition-colors uppercase tracking-tight text-sm italic">
                  {course.title}
                </h4>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-lg font-black text-slate-900">{formatPrice(course.price)}</div>
                  <Link 
                    href="/digitacademy" 
                    className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-emerald-600 transition-colors"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
