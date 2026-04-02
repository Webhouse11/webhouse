import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login for demo purposes
    if (email === 'admin@webhouse.media' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-black/5">
          <div className="p-10 bg-emerald-500 text-white text-center">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6 shadow-xl">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black mb-2">Admin Access</h1>
            <p className="text-white/80 font-medium">Secure login for Webhouse Media</p>
          </div>

          <form onSubmit={handleLogin} className="p-10 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-500 text-sm font-bold rounded-2xl border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-black/40 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@webhouse.media"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-emerald-500 outline-none font-medium transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-black/40 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-black/5 border-none focus:ring-2 focus:ring-emerald-500 outline-none font-medium transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 group"
            >
              Authorize <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center pt-4">
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="text-sm font-bold text-black/40 hover:text-black transition-colors"
              >
                Back to Website
              </button>
            </div>
          </form>
        </div>
        
        <p className="text-center mt-8 text-black/20 text-xs font-bold uppercase tracking-[0.2em]">
          Protected by Webhouse Security Systems
        </p>
      </motion.div>
    </div>
  );
};
