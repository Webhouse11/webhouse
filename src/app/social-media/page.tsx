'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  Facebook, Instagram, Linkedin, MessageCircle, Youtube, Zap, 
  CheckCircle2, ArrowRight, Star, Shield, Users, BarChart3, 
  Target, Rocket, Globe, Zap as ZapIcon, Send, Mail, Phone
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

const platforms = [
  {
    id: 'facebook',
    name: 'Facebook Management',
    icon: Facebook,
    color: 'text-[#1877F2]',
    bg: 'bg-[#1877F2]/5',
    desc: 'Strategic content and community building to dominate the world\'s largest social network.',
    growth: 'Targeted Reach & Engagement'
  },
  {
    id: 'instagram',
    name: 'Instagram Management',
    icon: Instagram,
    color: 'text-[#E4405F]',
    bg: 'bg-[#E4405F]/5',
    desc: 'Visual storytelling and aesthetic curation that turns scrollers into loyal brand advocates.',
    growth: 'Visual Authority & Sales'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Management',
    icon: Linkedin,
    color: 'text-[#0077B5]',
    bg: 'bg-[#0077B5]/5',
    desc: 'Positioning your brand as an industry leader with professional, high-authority content.',
    growth: 'B2B Leads & Authority'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Marketing',
    icon: MessageCircle,
    color: 'text-[#25D366]',
    bg: 'bg-[#25D366]/5',
    desc: 'Direct commerce systems using the most intimate and high-conversion channel available.',
    growth: 'Instant Sales & Support'
  },
  {
    id: 'tiktok',
    name: 'TikTok Growth',
    icon: Zap,
    color: 'text-black',
    bg: 'bg-black/5',
    desc: 'Viral-optimized short-form video strategies that capture the attention of millions.',
    growth: 'Viral Identity & Trends'
  },
  {
    id: 'youtube',
    name: 'YouTube Management',
    icon: Youtube,
    color: 'text-[#FF0000]',
    bg: 'bg-[#FF0000]/5',
    desc: 'Building long-term video assets that generate passive leads and massive authority.',
    growth: 'SEO Traffic & Community'
  }
];

const tiers = [
  {
    name: "Starter Package",
    price: 99,
    period: "/month",
    bullets: [
      "12 posts monthly",
      "Basic graphics",
      "Caption writing",
      "Hashtag research",
      "Facebook & Instagram management",
      "Monthly analytics report"
    ],
    cta: "Get Started",
    accent: "border-slate-100"
  },
  {
    name: "Growth Package",
    price: 249,
    period: "/month",
    bullets: [
      "20 posts monthly",
      "Professional designs",
      "Reel/TikTok editing",
      "Community management",
      "LinkedIn management",
      "WhatsApp marketing support",
      "Growth strategy",
      "Weekly analytics"
    ],
    cta: "Start Scaling",
    accent: "border-blue-500 ring-2 ring-blue-500/10 shadow-2xl",
    popular: true
  },
  {
    name: "Premium Package",
    price: 499,
    period: "/month",
    bullets: [
      "Unlimited content strategy",
      "Daily posting",
      "Full multi-platform management",
      "YouTube optimization",
      "TikTok growth strategy",
      "Paid ads management",
      "Dedicated account manager",
      "Advanced analytics",
      "Priority support"
    ],
    cta: "Go Premium",
    accent: "border-slate-100"
  }
];

const testimonials = [
  {
    quote: "Webhouse Media completely transformed our online presence and customer engagement.",
    author: "Sarah Johnson",
    role: "CEO",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    quote: "Our sales increased within weeks after working with Webhouse Media.",
    author: "Michael Adams",
    role: "Founder, TechLaunch",
    image: "https://i.pravatar.cc/150?u=michael"
  },
  {
    quote: "Professional, creative, and very reliable social media team.",
    author: "Amanda Lee",
    role: "Marketing Director",
    image: "https://i.pravatar.cc/150?u=amanda"
  },
  {
    quote: "The strategic approach Webhouse Media took for our campaign was world-class.",
    author: "David Chen",
    role: "E-commerce Director",
    image: "https://i.pravatar.cc/150?u=david"
  }
];

const stats = [
  { value: "500+", label: "Brands Managed", icon: Users },
  { value: "10M+", label: "Reach Generated", icon: BarChart3 },
  { value: "95%", label: "Client Satisfaction", icon: Star },
  { value: "1200+", label: "Campaigns Completed", icon: Rocket }
];

const whyChooseUs = [
  { title: "Creative Content", icon: ZapIcon, desc: "Bespoke content that resonates with your brand voice." },
  { title: "Fast Delivery", icon: Send, desc: "Quick turnaround without compromising on quality." },
  { title: "International Standards", icon: Globe, desc: "Global-level strategy tailored for your local market." },
  { title: "Growth Strategy", icon: Target, desc: "Data-driven plans built for long-term scalability." },
  { title: "Audience Engagement", icon: MessageCircle, desc: "Building real connections with your community." },
  { title: "Conversion Focused", icon: Shield, desc: "Every post is a step towards a measurable goal." }
];

export default function PostPilotPage() {
  const [currency, setCurrency] = React.useState({ code: 'USD', symbol: '$', rate: 1 });
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    project: 'SMM Starter Package',
    message: ''
  });

  React.useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code === 'NG') {
          setCurrency({ code: 'NGN', symbol: '₦', rate: 1600 }); // Approximate rate for business services
        } else if (data.currency === 'EUR') {
          setCurrency({ code: 'EUR', symbol: '€', rate: 0.95 });
        } else if (data.currency === 'GBP') {
          setCurrency({ code: 'GBP', symbol: '£', rate: 0.80 });
        } else if (data.currency && data.currency !== 'USD') {
          // Fallback for other standard currencies if API provides them
          setCurrency({ code: data.currency, symbol: data.currency_symbol || '$', rate: 1 });
        }
      } catch (error) {
        console.error('Location detection failed:', error);
      }
    };
    detectLocation();
  }, []);

  const formatDetectedPrice = (usdPrice: number) => {
    const converted = usdPrice * currency.rate;
    return new Intl.NumberFormat(currency.code === 'NGN' ? 'en-NG' : 'en-US', {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  const handleConsultation = () => {
    window.open('https://wa.me/2348060180077', '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `PostPilot Inquiry:\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject: ${formData.project}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/2348060180077?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-8">
                <ZapIcon className="w-4 h-4 fill-blue-600" /> New Era of Social Management
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1] text-slate-900">
                We Manage Your <span className="text-blue-600">Social Media</span> While You Grow.
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
                Professional social media management for modern brands, businesses, creators, and companies worldwide.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <button 
                  onClick={handleConsultation}
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25 flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleConsultation}
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all shadow-sm"
                >
                  Book Free Consultation
                </button>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <p className="text-sm font-bold text-slate-600">Loved by 500+ global brands</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-blue-400/20 blur-[120px] rounded-full"></div>
              <div className="relative bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-100">
                <div className="aspect-video rounded-2xl bg-slate-50 overflow-hidden relative mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop" 
                    alt="Social Analytics"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Engagement</p>
                    <p className="text-2xl font-black text-slate-900">+142%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Conversions</p>
                    <p className="text-2xl font-black text-slate-900">+89%</p>
                  </div>
                </div>
              </div>

              {/* Floating Social Icons */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-3xl border border-slate-50"
              >
                <Instagram className="w-10 h-10 text-[#E4405F]" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-3xl border border-slate-50"
              >
                <Facebook className="w-10 h-10 text-[#1877F2]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-black mb-2 text-slate-900">{stat.value}</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Platforms We Master</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              We don't just post content; we build ecosystems that thrive on the platforms where your audience lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-blue-500/20 hover:shadow-2xl transition-all"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", p.bg)}>
                  <p.icon className={cn("w-8 h-8", p.color)} />
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900">{p.name}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                  {p.desc}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-black uppercase tracking-widest text-[#0056B3]">{p.growth}</span>
                  <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Why Brands Choose <span className="text-blue-500">PostPilot.</span>
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed mb-12">
                We combine international standards with obsessive data tracking to ensure your social media isn't just a cost, but a revenue driver.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2671&auto=format&fit=crop" 
                alt="Creative Work"
                className="rounded-[3rem] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -right-10 bg-blue-600 p-8 rounded-[2rem] shadow-2xl z-20">
                <p className="text-4xl font-black mb-1">24/7</p>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Management & Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section id="pricing" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">Our POSTPILOT PLAN</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              Choose the package that aligns with your growth stage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "p-10 rounded-[3rem] border bg-white flex flex-col relative transition-all duration-500",
                  t.accent
                )}
              >
                {t.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20">
                    ⭐ Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-black mb-8 text-center uppercase tracking-widest text-slate-400">{t.name}</h3>
                
                <div className="text-center mb-10 pb-10 border-b border-slate-50">
                  <span className="text-5xl font-black text-slate-900">
                    {formatDetectedPrice(t.price)}
                  </span>
                  <span className="text-slate-400 font-bold text-sm tracking-tighter ml-1">{t.period}</span>
                </div>

                <div className="space-y-4 mb-12 flex-grow">
                  {t.bullets.map((b, j) => (
                    <div key={j} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                      <CheckCircle2 className={cn("w-5 h-5 flex-shrink-0", t.popular ? "text-blue-600" : "text-slate-300")} />
                      {b}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleConsultation}
                  className={cn(
                    "w-full py-5 rounded-2xl font-black text-lg text-center transition-all uppercase tracking-widest",
                    t.popular ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700" : "bg-slate-900 text-white hover:bg-black"
                  )}
                >
                  {t.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Global Success Stories</h2>
          <div className="flex justify-center gap-1 text-amber-400">
             {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
          </div>
        </div>

        {/* Animated Marquee */}
        <div className="relative flex overflow-hidden">
          <motion.div 
            className="flex gap-8 py-4 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[400px] p-10 rounded-[2.5rem] bg-white shadow-2xl shadow-blue-500/5 border border-slate-100 flex flex-col"
              >
                <div className="mb-8">
                  {[1,2,3,4,5].map(j => <Star key={j} className="inline w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />)}
                </div>
                <p className="text-lg font-bold italic text-slate-800 mb-10 flex-grow">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-md">
                    <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{t.author}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-[3.5rem] p-8 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready To Grow Your Brand Online?</h2>
                <p className="text-blue-100 text-lg mb-12 max-w-md">
                  Stop stressing about what to post. Partner with the experts and watch your engagement soar.
                </p>
                
                <div className="space-y-6">
                  <a href="mailto:webhousemediastudio@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <span className="font-bold">webhousemediastudio@gmail.com</span>
                  </a>
                  <a href="tel:+2348060180077" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <span className="font-bold">+234 806 018 0077</span>
                  </a>
                  <button 
                    onClick={handleConsultation}
                    className="flex items-center gap-4 group text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <span className="font-bold">Chat with us on WhatsApp</span>
                  </button>
                </div>


              </div>

              <div className="bg-white rounded-3xl p-8 text-slate-900">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                       <input 
                        type="email" 
                        required
                        className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Project Type</label>
                    <select 
                      className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      value={formData.project}
                      onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    >
                      <option>SMM Starter Package</option>
                      <option>Growth Package</option>
                      <option>Premium Enterprise</option>
                      <option>Custom Request</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Message</label>
                    <textarea 
                      rows={4} 
                      required
                      className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
                      placeholder="Tell us about your brand..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest">
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
