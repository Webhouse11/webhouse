'use client';

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Search, Tag, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const router = useRouter();
  const bloggerUrl = "https://webhousemedia.blogspot.com/";

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = bloggerUrl;
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-emerald-600"
        >
          <ExternalLink size={40} />
        </motion.div>
        
        <h1 className="text-4xl font-black mb-6 lowercase italic tracking-tight">
          Moving to our <span className="text-emerald-600">new blog...</span>
        </h1>
        <p className="text-slate-500 mb-10 font-medium leading-relaxed">
          We are redirecting you to our official Business Tips & Growth blog on Blogger. If you are not redirected automatically, please click the button below.
        </p>

        <a 
          href={bloggerUrl}
          className="inline-flex items-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all"
        >
          Go to Blog <ArrowRight size={24} />
        </a>

        <div className="mt-12 flex justify-center items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
