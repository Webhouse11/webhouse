'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';

export function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[4rem] p-12 lg:p-24 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] -z-10 rounded-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-8 shadow-xl shadow-emerald-600/20"
              >
                <Zap size={32} />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                Get Your Free <br/> <span className="text-emerald-600 underline underline-offset-8 decoration-emerald-200">Growth Kit</span>.
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed mb-10">
                Join 1,000+ local entrepreneurs receiving weekly tips on how to build a professional brand and make more sales online.
              </p>
              
              <div className="space-y-4">
                {["5 Website Checklists", "Social Media Content Ideas", "WhatsApp Sales Guide"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-slate-700">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Check Your Email</h3>
                  <p className="text-slate-500">Your Growth Kit is on its way!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4 ml-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full h-18 pl-16 pr-6 rounded-3xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-0 transition-all text-lg font-bold text-slate-900 bg-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full h-18 bg-emerald-600 text-white rounded-3xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Me the Kit!'} 
                    <ArrowRight size={24} />
                  </button>
                  <p className="text-center text-xs font-medium text-slate-400 flex items-center justify-center gap-2">
                    <Shield size={14} /> We respect your privacy. No spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
