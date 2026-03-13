import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '@/src/context/AppContext';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  const { submitLead } = useApp();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>('idle');

  const serviceName = searchParams.get('service');
  const initialMessage = serviceName ? `I am interested in inquiring about your ${serviceName} service.` : '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await submitLead(data);
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-bold mb-8">Let's Build Something <span className="text-black/40">Extraordinary</span></h1>
            <p className="text-xl text-black/60 mb-12 leading-relaxed">
              Whether you're a startup looking for a MVP or an enterprise needing a digital system overhaul, we're here to help you scale.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email Us", value: "olurantiprofile@gmail.com" },
                { icon: Phone, label: "Call Us", value: "+234 806 018 0077" },
                { icon: MapPin, label: "Visit Us", value: "Lagos, Nigeria" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black/40 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-[2rem] border border-black/5 shadow-2xl shadow-black/5">
            {status === 'success' ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-black/60">Our team will review your details and get back to you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-emerald-600 font-semibold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input 
                      name="name" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input 
                    name="phone" 
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all"
                    placeholder="+234 ..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4}
                    defaultValue={initialMessage}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button 
                  disabled={status === 'submitting'}
                  className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
