'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/src/context/AppContext';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const SERVICES = [
  "Website Development",
  "Custom SaaS Development",
  "AI Automation Systems",
  "Digital Sales Funnels",
  "Brand Identity Systems",
  "Social Media Management",
  "Others"
];

const BUDGETS = [
  "Less than $500",
  "$500 - $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Others"
];

const ContactContent = () => {
  const { submitLead } = useApp();
  const searchParams = useSearchParams();
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success'>('idle');
  
  const serviceParam = searchParams.get('service');
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: serviceParam || '',
    otherService: '',
    budget: '',
    otherBudget: '',
    message: '',
    twitter_handle: '' // Honeypot field
  });

  React.useEffect(() => {
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [serviceParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.twitter_handle) {
      console.warn('Bot detected by honeypot');
      setStatus('success'); // Fake success to bot
      return;
    }

    setStatus('submitting');
    
    const finalService = formData.service === 'Others' ? formData.otherService : formData.service;
    const finalBudget = formData.budget === 'Others' ? formData.otherBudget : formData.budget;

    const leadData = {
      ...formData,
      service: finalService,
      budget: finalBudget
    };
    
    try {
      await submitLead(leadData);
      
      const whatsappMessage = `Hello Webhouse Lab, I would like to request a quote.

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service:* ${finalService}
*Budget:* ${finalBudget}
*Message:* ${formData.message}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/2348152469749?text=${encodedMessage}`;
      
      setStatus('success');
      window.open(whatsappUrl, '_blank');
      
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="bg-white p-8 lg:p-12 rounded-[2rem] border border-black/5 shadow-2xl shadow-black/5 order-2 lg:order-1">
            {status === 'success' ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Redirecting to WhatsApp...</h3>
                <p className="text-black/60">If you weren't redirected, click the button below.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-emerald-600 font-semibold underline"
                >
                  Start over
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-3xl font-bold mb-8">Request a <span className="text-emerald-600">Quote</span></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Honeypot field - hidden from humans */}
                  <div className="hidden" aria-hidden="true">
                    <input 
                      type="text" 
                      name="twitter_handle" 
                      tabIndex={-1} 
                      autoComplete="off"
                      value={formData.twitter_handle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all"
                    placeholder="+234 ..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Service</label>
                    <select 
                      name="service" 
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all bg-white"
                    >
                      <option value="">Choose a service</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">What is your budget?</label>
                    <select 
                      name="budget" 
                      required
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all bg-white"
                    >
                      <option value="">Choose a budget range</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Details</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all resize-none"
                    placeholder="Tell us more about your project goals..."
                  />
                </div>

                <button 
                  disabled={status === 'submitting'}
                  className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 mb-12"
                >
                  {status === 'submitting' ? 'Processing...' : 'Submit to WhatsApp'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="pt-12 border-t border-black/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  { 
                    icon: Mail, 
                    label: "Email Us", 
                    value: "webhousemediastudio@gmail.com",
                    href: "mailto:webhousemediastudio@gmail.com?subject=Strategic%20Digital%20Growth%20Inquiry&body=Hi%20Webhouse%20Media%20Team%2C%0A%0AI'm%20interested%20in%20scaling%20my%20business%20digital%20infrastructure%20and%20would%20like%20to%20learn%20more%20about%20your%20services." 
                  },
                  { icon: Phone, label: "Call Us", value: "+234 815 246 9749", href: "tel:+2348152469749" },
                  { icon: MapPin, label: "Visit Us", value: "15 Ring Road, Ibadan, Oyo State, Nigeria" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-5 rounded-2xl bg-emerald-50/50 border border-emerald-500/10">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      <item.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-black/40 uppercase tracking-wider mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-semibold break-words hover:text-emerald-600 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold break-words">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h1 className="text-5xl font-bold mb-8">Let's Build Something <span className="text-emerald-600">Extraordinary</span></h1>
            <p className="text-xl text-black/60 mb-12 leading-relaxed">
              Whether you're a startup looking for a MVP or an enterprise needing a digital system overhaul, we're here to help you scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ContactPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContactContent />
        </Suspense>
    )
}
