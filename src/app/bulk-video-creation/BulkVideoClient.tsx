'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  UploadCloud, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  Check, 
  ChevronDown, 
  MessageCircle, 
  ArrowRight, 
  Building, 
  Home, 
  BookOpen, 
  Users, 
  ShoppingBag, 
  Mic, 
  UserCheck, 
  Send, 
  Play,
  FileText,
  Music,
  Calendar,
  AlertCircle,
  HelpCircle,
  Award,
  Zap,
  TrendingUp,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { useCurrency } from '@/src/hooks/useCurrency';

// WHO WE SERVE data with icons
const WHO_WE_SERVE = [
  { name: 'Businesses', icon: Building, desc: 'Promote products, services, and corporate milestones.' },
  { name: 'Churches & Ministries', icon: Heart, desc: 'Spread faith-based messages and sermon highlights.' },
  { name: 'Educational Institutions', icon: BookOpen, desc: 'E-learning modules, courses, and school admissions.' },
  { name: 'Real Estate Professionals', icon: Home, desc: 'Property listings, virtual tours, and agent branding.' },
  { name: 'Authors', icon: BookOpen, desc: 'Book trailers, chapter previews, and storytelling reels.' },
  { name: 'Financial Educators', icon: Zap, desc: 'Simplify complex financial tips and market insights.' },
  { name: 'E-commerce Brands', icon: ShoppingBag, desc: 'High-converting product ads and buyer testimonials.' },
  { name: 'Speakers & Coaches', icon: Mic, desc: 'Keynote highlights, wisdom snippets, and course promos.' },
  { name: 'Content Creators', icon: Video, desc: 'Automate content scale and maintain daily audience touch.' },
  { name: 'Consultants', icon: UserCheck, desc: 'Establish thought leadership and attract premium clients.' },
];

// CONTENT TYPES data
const CONTENT_TYPES = [
  { title: 'Promotional Videos', desc: 'Boost sales with high-converting promotional assets.', category: 'Marketing' },
  { title: 'Business Adverts', desc: 'Direct-response adverts targeting your ideal customer segment.', category: 'Advertising' },
  { title: 'Social Media Reels', desc: 'Punchy 9:16 videos optimized for IG, TikTok, and FB algorithms.', category: 'Social' },
  { title: 'Educational Videos', desc: 'Informative walkthroughs and tutorials that establish expertise.', category: 'Learning' },
  { title: 'Ministry Content', desc: 'Inspirational sermon trims, quotes, and spiritual outreach.', category: 'Faith' },
  { title: 'Product Videos', desc: 'Cinematic close-ups and highlight reels showcasing key benefits.', category: 'E-commerce' },
  { title: 'AI Videos', desc: 'Cutting-edge AI-assisted animations and high-retention stories.', category: 'Tech' },
  { title: 'Personal Branding Videos', desc: 'Position yourself as an undisputed leader in your industry.', category: 'Authority' },
  { title: 'Explainer Videos', desc: 'Break down complex frameworks, SaaS, or products easily.', category: 'Corporate' },
  { title: 'Customer Testimonial Videos', desc: 'Build instant trust with polished client-generated reviews.', category: 'Social Proof' },
];

// WHY CHOOSE WEBHOUSE MEDIA
const WHY_CHOOSE_US = [
  { title: 'Professional Team', desc: 'Expert video creators, strategists, and editors dedicated to your brand\'s growth.' },
  { title: 'Fast Delivery', desc: 'Structured workflows ensure your bulk videos are ready to post without delay.' },
  { title: 'Affordable Packages', desc: 'Get premium content creation at a fraction of standard agency costs.' },
  { title: 'Creative Storytelling', desc: 'We capture attention instantly with high-retention script hooks.' },
  { title: 'AI-Powered Production', desc: 'State-of-the-art systems for rapid editing, captioning, and design.' },
  { title: 'Human Quality Control', desc: 'Meticulous human review ensures brand accuracy and flawless exports.' },
  { title: 'Content Strategy Support', desc: 'We help you plan what to create so that your videos actually convert.' },
  { title: 'Dedicated Customer Service', desc: 'A personal account representative to manage your requests in real-time.' },
];

// FAQ data
const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'For bulk packages of 10-20 videos, initial drafts are delivered within 5 to 7 business days. For larger business and authority packages (50-100 videos), we deliver content in structured bi-weekly batches to maintain consistency and allow room for strategic adjustments.'
  },
  {
    q: 'Can you create content for any niche?',
    a: 'Yes! We have worked across diverse niches including Real Estate, E-commerce, Tech Startups, Religion/Ministries, Finance, Personal Coaching, and Education. Our dedicated research team crafts custom hooks and scripts tailored precisely to your specific target audience.'
  },
  {
    q: 'Do I need to provide scripts?',
    a: 'No, you do not! Our standard package includes full scriptwriting and content idea generation. You simply share your brand goal, outlines, or bullet points, and our professional scriptwriters handle the rest. If you already have scripts, we are happy to use them!'
  },
  {
    q: 'Can you upload content to my platforms?',
    a: 'Yes, with our Plus packages (Video Creation + Uploading), we handle the complete uploading workflow. This includes configuring YouTube, TikTok, Facebook, and Instagram, setting up titles, tags, custom thumbnails, scheduling, and basic video SEO.'
  },
  {
    q: 'Do you offer monthly subscriptions?',
    a: 'Absolutely. While we offer these standard packages for one-time batches, many of our clients partner with us on a monthly retainer for consistent content output and hands-free management. Contact our team to request a custom recurring schedule.'
  },
  {
    q: 'Can I request custom quantities?',
    a: 'Yes! If you need a specific number of videos (e.g., 15, 30, or over 150), simply fill out our request quote form or click "WhatsApp Us" to get a customized proposal aligned with your specific quantity requirements.'
  }
];

export default function BulkVideoClient() {
  const { submitLead } = useApp();
  const { formatPrice, currency, loading } = useCurrency();
  const [pricingTab, setPricingTab] = useState<'creation-only' | 'creation-upload'>('creation-only');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '10 Videos',
    packageType: 'Video Creation Only',
    message: '',
    twitter_handle: '' // Honeypot
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.twitter_handle) {
      setFormStatus('success');
      return;
    }

    setFormStatus('submitting');

    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: `Bulk Video Creation: ${formData.packageType} (${formData.quantity})`,
      budget: formData.packageType === 'Video Creation Only' ? 'N80k - N750k' : 'N120k - N950k',
      message: `Selected Quantity: ${formData.quantity}\nPackage Type: ${formData.packageType}\n\nClient Notes: ${formData.message}`
    };

    try {
      await submitLead(leadData);

      // Construct a clean WhatsApp message
      const whatsappText = `Hello Webhouse Media & Marketing Solutions, I would like to request a quote for bulk video creation.

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone/WhatsApp:* ${formData.phone}
*Quantity Needed:* ${formData.quantity}
*Package Choice:* ${formData.packageType}
*My Brand/Goals:* ${formData.message}`;

      const encoded = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/2348152469749?text=${encoded}`;

      setFormStatus('success');
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error(err);
      setFormStatus('idle');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Nigerian Naira Prices mapped to original package structure
  const creationOnlyPackages = [
    { name: 'Starter Package', count: '10 Videos', price: 80000, label: '₦80,000', popular: false, desc: 'Perfect for testing out bulk content and establishing a base feed.' },
    { name: 'Growth Package', count: '20 Videos', price: 144000, label: '₦144,000', popular: false, desc: 'Ideal for serious personal brands aiming for regular weekly uploads.' },
    { name: 'Business Package', count: '50 Videos', price: 400000, label: '₦400,000', popular: true, desc: 'Our most popular setup for businesses and growing content channels.' },
    { name: 'Authority Package', count: '100 Videos', price: 750000, label: '₦750,000', popular: false, desc: 'The ultimate authority-building stack for market dominance.' },
  ];

  const creationUploadPackages = [
    { name: 'Starter Plus', count: '10 Videos + Uploading', price: 120000, label: '₦120,000', popular: false, desc: '10 high-quality videos completely written, edited, and posted for you.' },
    { name: 'Growth Plus', count: '20 Videos + Uploading', price: 200000, label: '₦200,000', popular: false, desc: '20 videos + uploading. Keeps your channels continuously active.' },
    { name: 'Business Plus', count: '50 Videos + Uploading', price: 550000, label: '₦550,000', popular: true, desc: 'Hands-off scaling with custom thumbnail creation and premium SEO support.' },
    { name: 'Authority Plus', count: '100 Videos + Uploading', price: 950000, label: '₦950,000', popular: false, desc: '100% managed content machinery. 100 videos uploaded, tagged, and distributed.' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 bg-slate-50 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-700 px-4 py-1.5 rounded-full font-black uppercase tracking-wider text-[10px] mb-8"
            >
              🎬 Bulk Video Creation & Content Management Services
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9] lowercase italic"
            >
              never run out of <span className="text-emerald-600">content</span> again.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-3xl mb-4 font-medium"
            >
              Professional Bulk Video Creation Services for Businesses, Personal Brands, Ministries, and Organizations.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl mb-12"
            >
              Need 10, 20, 50, or even 100 videos? <strong className="text-slate-800 font-bold">Webhouse Media & Marketing Solutions</strong> helps you create professional content consistently without the stress of planning, recording, editing, or uploading.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => scrollToSection('inquire-form')}
                className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl shadow-emerald-600/10 hover:bg-emerald-700 flex items-center gap-3 cursor-pointer"
              >
                🚀 Request a Quote
              </button>
              <a 
                href="https://wa.me/2348152469749?text=Hello%20Webhouse%20Media,%20I%27d%20like%20to%20speak%20with%20your%20team%20about%20Bulk%20Video%20Creation%20services." 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 text-white px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition-all hover:bg-black flex items-center gap-3"
              >
                📞 Speak With Our Team
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] block mb-2">The Content Struggle</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 lowercase italic leading-none">
              are you facing any of these challenges?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[
              { text: 'No time to create content', desc: 'Running your organization takes 100% of your energy. Video shouldn\'t steal your evenings.' },
              { text: 'Don\'t know what to post', desc: 'Failing to find viral topics or hooks that engage buyers and keep followers watching.' },
              { text: 'Inconsistent social media presence', desc: 'Posting once a month hurts your visibility. Algorithms favor creators who post daily.' },
              { text: 'Low audience engagement', desc: 'Struggling with bad audio, boring edits, or dry layouts that lead to instant scrolls.' },
              { text: 'Need videos regularly', desc: 'Keeping multiple platforms fed with high-quality content requires constant asset flow.' },
              { text: 'No dedicated content team', desc: 'Hiring full-time videographers, copywriters, and video editors is incredibly expensive.' },
              { text: 'Want to grow on YT, TikTok, FB, or IG', desc: 'Navigating different platform standards, formats, and algorithms is overwhelming.' }
            ].map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm hover:border-emerald-500/20 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mb-6">
                    <AlertCircle size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{challenge.text}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{challenge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-24 bg-slate-50 rounded-[4rem] mx-4 md:mx-8 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.06),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] block mb-2">Our Core Promise</span>
              <h2 className="text-4xl md:text-7xl font-black mb-8 italic lowercase tracking-tighter leading-none text-slate-900">
                we handle the content while you focus on growth.
              </h2>
              <div className="space-y-6 max-w-2xl text-lg text-slate-600 leading-relaxed font-medium">
                <p>
                  At <strong className="text-slate-900 font-bold">Webhouse Media & Marketing Solutions</strong>, we help brands create large volumes of professional content quickly and efficiently.
                </p>
                <p>
                  Whether you're building a personal brand, promoting a business, growing a ministry, launching a product, or educating an audience, we provide content solutions tailored specifically to your goals.
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('pricing-section')}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-full font-black text-base hover:scale-105 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  Explore Bulk Packages <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-square max-w-[440px] mx-auto rounded-[3.5rem] bg-slate-900 border-8 border-white shadow-2xl relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800" 
                  alt="Professional Video Editing Studio"
                  className="w-full h-full object-cover opacity-80 transition-transform group-hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="inline-block bg-emerald-500 text-black font-black uppercase text-[9px] tracking-widest px-3 py-1 rounded-full mb-3">
                    Streamlined Production
                  </span>
                  <h4 className="text-xl font-bold mb-1">Scale Content Machinery</h4>
                  <p className="text-white/60 text-xs">Ready-to-post high retention outputs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-24 bg-white" id="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] block mb-2">Service Models</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 lowercase italic leading-none mb-6">
              tailored to your operations.
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              Choose the service model that perfectly fits your team size and marketing capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Option 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-emerald-500/20 hover:shadow-xl transition-all"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mb-8 shadow-inner border border-slate-100">
                  <Video size={32} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2 lowercase italic">Option 1: Video Creation Only</h3>
                <p className="text-emerald-600 font-bold uppercase tracking-wider text-[11px] mb-8">
                  Perfect for clients who already manage their own platforms.
                </p>
                
                <div className="border-t border-slate-200/60 pt-8 space-y-4">
                  {[
                    'Content ideas',
                    'Script writing',
                    'Video creation',
                    'Professional editing',
                    'Captions',
                    'Background music',
                    'Ready-to-post delivery'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700 text-base font-medium">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12">
                <button 
                  onClick={() => {
                    setPricingTab('creation-only');
                    scrollToSection('pricing-section');
                  }}
                  className="bg-slate-900 text-white w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-black transition-all flex items-center justify-center gap-2"
                >
                  View Creation Packages <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Option 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-[3.5rem] bg-emerald-950 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:shadow-emerald-950/20 hover:shadow-3xl transition-all"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_40%)]" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center mb-8 border border-white/10">
                  <UploadCloud size={32} />
                </div>
                <h3 className="text-3xl font-black mb-2 lowercase italic">Option 2: Video Creation + Uploading</h3>
                <p className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] mb-8">
                  Perfect for busy business owners and professionals.
                </p>

                <div className="border-t border-white/10 pt-8 space-y-4">
                  {[
                    'Content ideas & script writing',
                    'Video creation & custom editing',
                    'Captions & background music',
                    'YouTube uploads & SEO optimization',
                    'TikTok uploads & Facebook distribution',
                    'Instagram uploads & scheduler sync',
                    'Thumbnail creation & custom graphic covers',
                    'Basic video SEO & hashtag alignment',
                    'Consistent content scheduling'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90 text-base font-medium">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center flex-shrink-0">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 relative z-10">
                <button 
                  onClick={() => {
                    setPricingTab('creation-upload');
                    scrollToSection('pricing-section');
                  }}
                  className="bg-emerald-500 text-slate-950 w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                >
                  View Management Packages <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bulk Video Packages Section */}
      <section className="py-24 bg-slate-50" id="pricing-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] block mb-2">Pricing Matrix</span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900 lowercase italic mb-6 leading-none">
              bulk video packages
            </h2>
            <p className="text-slate-500 font-medium text-lg mb-8">
              Select the option that aligns with your operations and scale your brand smoothly.
            </p>

            {loading ? (
              <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-xs font-medium mb-10 border border-slate-200">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" />
                <span>Detecting your regional currency...</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold mb-10 border border-emerald-100/60 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Prices automatically localized to <strong>{currency.code} ({currency.symbol})</strong> based on your IP address</span>
              </div>
            )}

            {/* Switcher Tab Buttons */}
            <div className="inline-flex bg-slate-200/80 p-1.5 rounded-full shadow-inner relative max-w-md w-full">
              <button
                onClick={() => setPricingTab('creation-only')}
                className={`flex-1 py-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-full transition-all relative z-10 cursor-pointer ${
                  pricingTab === 'creation-only' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                📹 Video Creation Only
              </button>
              <button
                onClick={() => setPricingTab('creation-upload')}
                className={`flex-1 py-3 text-xs md:text-sm font-black uppercase tracking-wider rounded-full transition-all relative z-10 cursor-pointer ${
                  pricingTab === 'creation-upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                🚀 Creation + Uploading
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {pricingTab === 'creation-only' ? (
              creationOnlyPackages.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-8 rounded-[3rem] bg-white border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between ${
                    p.popular ? 'border-emerald-500 border-2 relative lg:scale-105 z-10' : 'border-slate-200/80'
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">
                      Best Value
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block mb-2">{p.count}</span>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic mb-4">{p.name}</h3>
                    
                    <div className="text-4xl font-black text-slate-900 tracking-tighter italic mb-4 flex items-baseline">
                      <span>{formatPrice(p.price)}</span>
                    </div>

                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 border-b border-slate-100 pb-6">
                      {p.desc}
                    </p>

                    <ul className="space-y-4 mb-10">
                      {[
                        'Custom Content Ideas',
                        'Polished Script Writing',
                        'High-End Video Creation',
                        'Pro Editing & Color Grading',
                        'Aesthetic Captions/Subtitles',
                        'Royalty-Free Background Music',
                        'Ready-to-Post HD Files Delivery'
                      ].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs font-black text-slate-800 tracking-tight">
                          <div className="w-4 h-4 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                            <Check size={10} strokeWidth={4} />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        quantity: p.count,
                        packageType: 'Video Creation Only'
                      }));
                      scrollToSection('inquire-form');
                    }}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all ${
                      p.popular 
                        ? 'bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 shadow-emerald-500/25' 
                        : 'bg-slate-900 text-white hover:bg-black'
                    }`}
                  >
                    Select {p.name}
                  </button>
                </motion.div>
              ))
            ) : (
              creationUploadPackages.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-8 rounded-[3rem] bg-white border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between ${
                    p.popular ? 'border-emerald-500 border-2 relative lg:scale-105 z-10' : 'border-slate-200/80'
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block mb-2">{p.count}</span>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic mb-4">{p.name}</h3>
                    
                    <div className="text-4xl font-black text-slate-900 tracking-tighter italic mb-4 flex items-baseline">
                      <span>{formatPrice(p.price)}</span>
                    </div>

                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 border-b border-slate-100 pb-6">
                      {p.desc}
                    </p>

                    <ul className="space-y-4 mb-10">
                      {[
                        'Everything in Video Creation',
                        'YouTube Channel Uploads',
                        'TikTok & Facebook Uploads',
                        'Instagram Feed Posting',
                        'Custom Thumbnail & Covers',
                        'Advanced Video SEO (Tags)',
                        'Content Posting Scheduling'
                      ].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs font-black text-slate-800 tracking-tight">
                          <div className="w-4 h-4 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                            <Check size={10} strokeWidth={4} />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        quantity: p.count,
                        packageType: 'Video Creation + Uploading'
                      }));
                      scrollToSection('inquire-form');
                    }}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs transition-all ${
                      p.popular 
                        ? 'bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 shadow-emerald-500/25' 
                        : 'bg-slate-900 text-white hover:bg-black'
                    }`}
                  >
                    Select {p.name}
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] block mb-2">Our Clientele</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 lowercase italic leading-none">
              who we serve
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {WHO_WE_SERVE.map((item, i) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col justify-between group hover:bg-white hover:border-emerald-500/20 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-slate-100 mb-6 group-hover:scale-110 transition-transform">
                    <IconComp size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Types We Create Section */}
      <section className="py-24 bg-slate-50 rounded-[4rem] mx-4 md:mx-8 mb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] block mb-2">Diverse Formats</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 lowercase italic leading-none">
              content types we create
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CONTENT_TYPES.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-6 -mt-6 transition-all group-hover:scale-150" />
                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold text-[8px] uppercase tracking-widest rounded-md mb-4">
                    {type.category}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mb-2 italic">🎬 {type.title}</h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">{type.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Webhouse Media */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 sticky top-32">
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] block mb-2">The Webhouse Edge</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 lowercase italic leading-none mb-6">
                why choose webhouse media
              </h2>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                We combine creative scriptwriting, robust production workflows, and advanced optimization metrics to scale your digital presence efficiently.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {WHY_CHOOSE_US.map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-3xl bg-slate-50/50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 rounded-[4rem] mx-4 md:mx-8 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] block mb-2">FAQ Support</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 lowercase italic leading-none mb-4">
              frequently asked questions
            </h2>
            <p className="text-slate-500 font-medium">Have queries about how our bulk production works? Find quick answers below.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm transition-all">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center gap-4 cursor-pointer hover:bg-slate-50/40"
                  >
                    <span className="text-base md:text-lg font-bold text-slate-900">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-emerald-50 text-emerald-600' : ''}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-8 pb-6 text-sm md:text-base text-slate-500 leading-relaxed font-medium border-t border-slate-100 pt-4 bg-slate-50/20">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-24 bg-white" id="inquire-form">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] block mb-2">Get Started</span>
              <h2 className="text-4xl md:text-7xl font-black mb-6 italic lowercase leading-[0.95] tracking-tighter">
                request a <span className="text-emerald-600">quote</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                Fill out our secure quick form below to request pricing, specify requirements, or map out custom schedules. Our client success managers will evaluate your project details and follow up on WhatsApp within a few hours!
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Custom Retainers Available</h4>
                    <p className="text-slate-500 text-xs font-medium">Prefer monthly cycles? We craft dedicated brand plans.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Naira & Global Currencies</h4>
                    <p className="text-slate-500 text-xs font-medium">Securely make settlements locally in Naira or globally in USD/GHS/GBP.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
              {formStatus === 'success' ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner animate-bounce">
                    <MessageCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-4 lowercase italic tracking-tight text-slate-950">request submitted!</h3>
                  <p className="text-slate-500 font-medium mb-8">
                    We are redirecting you to WhatsApp to complete your quote discussion immediately. If the chat did not auto-launch, click below:
                  </p>
                  <a
                    href={`https://wa.me/2348152469749?text=${encodeURIComponent(
                      `Hello Webhouse Media, I submitted an inquiry for Bulk Video Creation.\n*Name:* ${formData.name}\n*Quantity:* ${formData.quantity}\n*Package:* ${formData.packageType}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-xl font-black hover:bg-emerald-700 transition-all text-sm uppercase tracking-wider"
                  >
                    💬 Chat on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        quantity: '10 Videos',
                        packageType: 'Video Creation Only',
                        message: '',
                        twitter_handle: ''
                      });
                    }}
                    className="block mt-6 text-xs text-slate-400 font-bold uppercase hover:text-slate-600 mx-auto"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input 
                      type="text" 
                      name="twitter_handle" 
                      value={formData.twitter_handle} 
                      onChange={handleInputChange} 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Your Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200/80 text-slate-900 focus:border-emerald-500 focus:ring-0 transition-all font-medium text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="e.g. john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200/80 text-slate-900 focus:border-emerald-500 focus:ring-0 transition-all font-medium text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">WhatsApp Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +234 815 ..."
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200/80 text-slate-900 focus:border-emerald-500 focus:ring-0 transition-all font-medium text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Package Preference</label>
                      <select
                        name="packageType"
                        value={formData.packageType}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200/80 text-slate-900 focus:border-emerald-500 focus:ring-0 transition-all font-medium text-sm bg-no-repeat"
                      >
                        <option value="Video Creation Only">Video Creation Only</option>
                        <option value="Video Creation + Uploading">Video Creation + Uploading</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Quantity Needed</label>
                      <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200/80 text-slate-900 focus:border-emerald-500 focus:ring-0 transition-all font-medium text-sm bg-no-repeat"
                      >
                        <option value="10 Videos">10 Videos</option>
                        <option value="20 Videos">20 Videos</option>
                        <option value="50 Videos">50 Videos</option>
                        <option value="100 Videos">100 Videos</option>
                        <option value="Custom Quantity">Custom Quantity</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-wider">Tell us about your brand / goals</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us what niche you are in, who your audience is, and what you want to achieve with these videos..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200/80 text-slate-900 focus:border-emerald-500 focus:ring-0 transition-all resize-none font-medium text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-wider text-sm hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/15"
                  >
                    {formStatus === 'submitting' ? 'Processing...' : 'Submit Request & Get Quote'}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-24 bg-slate-950 text-white rounded-t-[4rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.18),transparent_60%)] animate-pulse" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] block mb-2">Build Your Online Authority</span>
          <h2 className="text-4xl md:text-7xl font-black mb-8 italic lowercase leading-[0.95] tracking-tighter">
            ready to build a strong online presence?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Whether you need 10 videos or 100 videos, <strong className="text-emerald-400 font-bold">Webhouse Media & Marketing Solutions</strong> is ready to help you create professional content that attracts attention, builds authority, and grows your brand.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollToSection('inquire-form')}
              className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-full font-black text-base hover:scale-105 transition-all shadow-xl hover:bg-emerald-400 flex items-center gap-2 cursor-pointer"
            >
              📞 Contact Us
            </button>
            <a
              href="https://wa.me/2348152469749?text=Hello%20Webhouse%20Media,%20I%27d%20like%20to%20chat%20on%20WhatsApp%20about%20your%20Bulk%20Video%20Creation%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-full font-black text-base hover:scale-105 transition-all flex items-center gap-2 border border-white/10"
            >
              💬 WhatsApp Us
            </a>
            <button
              onClick={() => scrollToSection('inquire-form')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-black text-base hover:scale-105 transition-all flex items-center gap-2 border border-slate-800"
            >
              📧 Request a Custom Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
