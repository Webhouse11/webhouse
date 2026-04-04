import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, CheckCircle2, ArrowRight, Clock, ShieldCheck, Zap } from 'lucide-react';
import { useLocation, Link, Navigate } from 'react-router-dom';

export const OrderInstructions = () => {
  const location = useLocation();
  const { whatsappUrl, plan } = location.state || {};

  // If no data is present, redirect back to social plus
  if (!whatsappUrl) {
    return <Navigate to="/social-plus" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-blue-100"
        >
          {/* Header Status */}
          <div className="bg-blue-600 p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-4">Order Received!</h1>
              <p className="text-blue-100 font-medium text-lg">You're one step away from scaling your brand with <span className="text-white font-bold">Social Plus</span>.</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-12">
              <h2 className="text-xl font-bold text-blue-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">!</span>
                Important Next Steps
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">1. Finalize via WhatsApp</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Click the button below to send your order details to our team on WhatsApp. This is required to confirm your slot and start the onboarding process.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">2. Initial Review (24 Hours)</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Once we receive your message, our strategy team will review your business goals and social media links within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">3. Strategy Session</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      We will schedule a brief call to align on your content direction before we begin the page revamp and posting schedule.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Plan Summary */}
            <div className="bg-slate-50 rounded-3xl p-6 mb-12 border border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Selected Package</p>
                  <p className="text-lg font-black text-blue-900">{plan}</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
              </div>
            </div>

            <div className="space-y-4">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 text-lg group"
              >
                Complete Order on WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <p className="text-center text-slate-400 text-xs font-medium">
                By clicking, you will be redirected to WhatsApp with your pre-filled order details.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <Link to="/social-plus" className="text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors">
            ← Back to Social Plus
          </Link>
        </div>
      </div>
    </div>
  );
};
