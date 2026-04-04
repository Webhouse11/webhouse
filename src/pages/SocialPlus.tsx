import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Instagram, Facebook, Twitter, Linkedin, MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    name: "BASIC PLAN",
    price: "₦50,000",
    features: [
      "3 Posts Per Week",
      "Page Revamp",
      "Community Management",
      "Followers / Post Engagement",
      "Hashtag Curation / Research",
      "Content Writing",
      "Monthly Report"
    ],
    color: "border-blue-200",
    buttonColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    name: "STANDARD PLAN",
    price: "₦100,000",
    features: [
      "5 Posts Per Week",
      "Page Revamp",
      "Community Management",
      "Daily Engagement",
      "Hashtag Curation / Research",
      "Content Writing",
      "Ad Management",
      "Monthly Report"
    ],
    popular: true,
    color: "border-[#d4af37]",
    buttonColor: "bg-[#d4af37] hover:bg-[#b8962e]"
  },
  {
    name: "PREMIUM PLAN",
    price: "₦150,000",
    features: [
      "7 Posts Per Week",
      "Page Revamp",
      "Daily Engagement",
      "Hashtag Curation / Research",
      "Community Management",
      "Content Writing",
      "Ad Management",
      "Monthly Report"
    ],
    color: "border-blue-200",
    buttonColor: "bg-blue-900 hover:bg-black"
  }
];

export const SocialPlus = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState("");
  const navigate = useNavigate();

  const openForm = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get('fullName');
    const business = formData.get('businessName');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const plan = formData.get('package');
    const industry = formData.get('industry');
    const platforms = Array.from(formData.getAll('platforms')).join(', ');
    const budget = formData.get('budget') || 'Not specified';
    const goals = formData.get('goals');
    const challenges = formData.get('challenges');
    const link = formData.get('link');
    const startDate = formData.get('startDate');

    const message = `Hello, I want Social Plus.

Name: ${name}
Business: ${business}
Phone: ${phone}
Email: ${email}
Package: ${plan}
Industry: ${industry}
Platforms: ${platforms}
Budget: ${budget}
Goals: ${goals}
Challenges: ${challenges}
Social Media Link/Name: ${link}
Start Date: ${startDate}`;

    const url = `https://wa.me/2348060180077?text=${encodeURIComponent(message)}`;
    
    // Redirect to instructions page with the data
    navigate('/order-instructions', { 
      state: { 
        whatsappUrl: url,
        plan: plan
      } 
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 skew-x-12 transform origin-top-right"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-blue-900 mb-6 tracking-tight"
            >
              Social <span className="text-[#d4af37]">Plus</span> Packages
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 font-medium"
            >
              Let’s Grow Your Brand
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-[2rem] p-8 border-2 ${pkg.color} shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full ${pkg.popular ? 'md:scale-105 z-20' : 'z-10'}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4af37] text-white px-6 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-blue-900">{pkg.price}</span>
                    <span className="text-slate-400 font-medium">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                      <Check className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openForm(pkg.name)}
                  className={`w-full py-4 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 ${pkg.buttonColor}`}
                >
                  Order Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-8 md:p-12"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-10">
                <p className="text-[#d4af37] font-bold text-sm mb-2 uppercase tracking-widest">👉 Serious business owners only — we work with brands ready to grow.</p>
                <h2 className="text-3xl font-black text-blue-900">Start Your Social Plus Growth</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input required name="fullName" type="text" className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Name</label>
                    <input required name="businessName" type="text" className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium" placeholder="Your Company Ltd" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number (WhatsApp)</label>
                    <input required name="phone" type="tel" className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium" placeholder="+234..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input required name="email" type="email" className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Package</label>
                    <select required name="package" defaultValue={selectedPlan} className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium">
                      <option value="BASIC PLAN">Basic Plan (₦50,000)</option>
                      <option value="STANDARD PLAN">Standard Plan (₦100,000)</option>
                      <option value="PREMIUM PLAN">Premium Plan (₦150,000)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Industry</label>
                    <select required name="industry" className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium">
                      <option value="Fashion">Fashion</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Crypto">Crypto</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Education">Education</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Platforms Needed</label>
                  <div className="flex flex-wrap gap-4">
                    {['Instagram', 'Facebook', 'TikTok', 'Twitter', 'LinkedIn'].map(platform => (
                      <label key={platform} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" name="platforms" value={platform} className="w-5 h-5 rounded border-slate-200 text-blue-600 focus:ring-blue-600" />
                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-900 transition-colors">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Budget for Ads (Optional)</label>
                    <input name="budget" type="text" className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium" placeholder="e.g. ₦50,000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Preferred Start Date</label>
                    <input required name="startDate" type="date" className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Social Media Link or Name</label>
                  <input required name="link" type="text" className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium" placeholder="e.g. @yourbrand or https://..." />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Goals</label>
                  <textarea required name="goals" rows={3} className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium resize-none" placeholder="What do you want to achieve?"></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Challenges</label>
                  <textarea required name="challenges" rows={3} className="w-full px-6 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 text-sm font-medium resize-none" placeholder="What are you struggling with?"></textarea>
                </div>

                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2">
                  Submit Order via WhatsApp <MessageCircle size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Webhouse Media</h2>
          <p className="text-blue-200 mb-8 max-w-md mx-auto">We help brands grow online with strategy and consistency</p>
          <div className="flex justify-center gap-6 mb-12">
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] transition-all"><Instagram size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] transition-all"><Facebook size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] transition-all"><Twitter size={20} /></a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] transition-all"><Linkedin size={20} /></a>
          </div>
          <div className="pt-12 border-t border-white/10">
            <p className="text-blue-300 font-bold mb-2">Contact us: +2348060180077</p>
            <p className="text-blue-400 text-sm">© 2026 Webhouse Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
