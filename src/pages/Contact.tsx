import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '@/src/context/AppContext';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

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

export const Contact = () => {
  const { submitLead } = useApp();
  const [searchParams] = useSearchParams();
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
    message: ''
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
    setStatus('submitting');
    
    const finalService = formData.service === 'Others' ? formData.otherService : formData.service;
    const finalBudget = formData.budget === 'Others' ? formData.otherBudget : formData.budget;

    const leadData = {
      ...formData,
      service: finalService,
      budget: finalBudget
    };
    
    try {
      // Still submit to our internal system
      await submitLead(leadData);
      
      // Format WhatsApp message
      const whatsappMessage = `Hello Webhouse Media, I would like to request a quote.

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service:* ${finalService}
*Budget:* ${finalBudget}
*Message:* ${formData.message}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/2348060180077?text=${encodedMessage}`;
      
      setStatus('success');
      
      // Redirect to WhatsApp
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
          {/* Form Column - Now First */}
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

                {formData.service === 'Others' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                    <label className="text-sm font-medium">What service do you have in mind?</label>
                    <input 
                      name="otherService" 
                      required
                      value={formData.otherService}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all"
                      placeholder="Describe the service..."
                    />
                  </motion.div>
                )}

                {formData.budget === 'Others' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                    <label className="text-sm font-medium">What budget do you have in mind?</label>
                    <input 
                      name="otherBudget" 
                      required
                      value={formData.otherBudget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emerald-500 focus:ring-0 transition-all"
                      placeholder="Enter your budget..."
                    />
                  </motion.div>
                )}

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

            {/* Contact Info - Now after the form button */}
            <div className="pt-12 border-t border-black/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Mail, label: "Email Us", value: "olurantiprofile@gmail.com" },
                { icon: Phone, label: "Call Us", value: "+234 806 018 0077" },
                { icon: MapPin, label: "Visit Us", value: "Lagos, Nigeria" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-2xl bg-emerald-50/50 border border-emerald-500/10">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-black/40 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm font-semibold break-words">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Column - Now only contains Image and Text */}
          <div className="order-1 lg:order-2">
            <div className="mb-12 rounded-[2.5rem] overflow-hidden border border-black/5 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=1000" 
                alt="Webhouse Media Executive" 
                className="w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

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
