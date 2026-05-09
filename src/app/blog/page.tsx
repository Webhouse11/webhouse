'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    title: "5 Tips for Setting Up Your First Business Website",
    excerpt: "You don't need a complicated site to start. Focus on these 5 things to build trust with your first customers.",
    date: "May 12, 2026",
    author: "Webhouse Team",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Why WhatsApp is the Secret Growth Tool for African SMEs",
    excerpt: "Learn how to use WhatsApp Status and Business tools to close more sales without spending a kobo on ads.",
    date: "April 28, 2026",
    author: "Growth Lab",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Making Your Brand Look Professional on a Budget",
    excerpt: "You don't need millions to have a great brand. Here is how to create a consistent look for your business.",
    date: "April 15, 2026",
    author: "Branding Team",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function BlogPage() {
  return (
    <div className="bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-2"
          >
            <div className="w-8 h-[2px] bg-emerald-600"></div> Business Tips & News
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8">
            The <span className="text-emerald-600">Growth</span> Blog.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Simple, practical tips to help you grow your business online and make more sales in the African market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer bg-slate-50 border border-slate-100 p-6 rounded-[3rem] hover:shadow-2xl hover:bg-white transition-all transform hover:-translate-y-2"
            >
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl">
                 <img 
                   src={post.image} 
                   alt={post.title}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                 />
                 <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20">
                       {post.category}
                    </span>
                 </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                 <div className="flex items-center gap-1"><Calendar size={14} /> {post.date}</div>
                 <div className="flex items-center gap-1"><User size={14} /> {post.author}</div>
              </div>
              <h2 className="text-2xl font-black mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                 {post.title}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6 font-medium text-sm">
                 {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                 Read Article <ArrowRight size={16} />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Categories/Search Bar Placeholder */}
        <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-wrap gap-4 justify-center md:justify-start">
             {["Web Design", "Marketing", "Social Media", "AI Tools"].map((cat) => (
               <button key={cat} className="px-6 py-3 rounded-full border border-slate-200 text-slate-500 font-bold hover:border-emerald-500 hover:text-emerald-600 transition-all text-sm">
                  {cat}
               </button>
             ))}
           </div>
           <div className="relative w-full max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Business Tips..." 
                className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500/20 font-medium text-sm"
              />
           </div>
        </div>
      </div>
    </div>
  );
}
