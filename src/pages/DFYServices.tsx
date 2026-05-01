import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  Palette, 
  Share2, 
  Layout, 
  Mail, 
  Youtube, 
  MessageCircle, 
  Search, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Users,
  X,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  {
    id: 'web-dev',
    name: 'Complete Business Website',
    icon: Globe,
    emoji: '🌐',
    promise: 'A professional online home that builds trust and turns visitors into customers.',
    bullets: [
      'Custom Modern Design',
      'Fully Mobile Optimized',
      'Contact Form & Lead Capture',
      'Up to 5 Business Pages',
      'Hosting & Domain Setup Guidance',
      'On-Page SEO Basics'
    ],
    perfectFor: 'Small businesses and professionals ready to move from Instagram/WhatsApp to a real brand.',
    price: 149,
    originalPrice: 180
  },
  {
    id: 'google-profile',
    name: 'Google Business Profile Setup & Optimization',
    icon: MapPin,
    emoji: '📍',
    promise: 'Get discovered on Google Maps and dominate your local market.',
    bullets: [
      'Full Profile Setup & Verification',
      'Photo Optimization (Store/Work)',
      'Strategic Keyword Integration',
      'Services & Product Listing',
      'Review Growth Strategy Guide',
      'Google Maps Ranking Audit'
    ],
    perfectFor: 'Shop owners, consultants, and local services who want more walk-in customers.',
    price: 49,
    originalPrice: 60
  },
  {
    id: 'brand-identity',
    name: 'Complete Brand Identity Package',
    icon: Palette,
    emoji: '🎨',
    promise: 'Stop looking like an amateur. Build a brand that people remember.',
    bullets: [
      'Premium Logo Design',
      'Professional Color Palette',
      'Typography & Font Pairing',
      'Modern Business Card Design',
      'Brand Guidelines PDF',
      'Social Media Logo Variants'
    ],
    perfectFor: 'Startups and entrepreneurs who want a high-premium "big company" feel.',
    price: 79,
    originalPrice: 100
  },
  {
    id: 'social-setup',
    name: 'Social Media Profile Setup (All Platforms)',
    icon: Share2,
    emoji: '📱',
    promise: 'A unified, professional presence across all major social networks.',
    bullets: [
      'Instagram & Facebook Optimization',
      'WhatsApp Business Profile Setup',
      'YouTube Channel Branding',
      'Bio/About Section Copywriting',
      'Professional Banners/Covers',
      '7-Day Content Starter Kit'
    ],
    perfectFor: 'Entrepreneurs starting fresh on social media who want to look professional from Day 1.',
    price: 59,
    originalPrice: 70
  },
  {
    id: 'landing-page',
    name: 'Landing Page + Lead Capture System',
    icon: Layout,
    emoji: '🚀',
    promise: 'One page. One goal. Maximum sales and high-quality leads.',
    bullets: [
      'Single High-Converting Page',
      'Floating WhatsApp CTA Button',
      'Email/Lead Capture Form',
      'Basic CRM/Automation Setup',
      'Fast Loading Speed Optimization',
      'Copywriting for Conversions'
    ],
    perfectFor: 'Course creators, consultants, and experts running paid ads or launches.',
    price: 99,
    originalPrice: 120
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing System Setup',
    icon: Mail,
    emoji: '📧',
    promise: 'Build an asset you own. Sell to your list repeatedly on autopilot.',
    bullets: [
      'ESP Configuration (Mailchimp/MailerLite)',
      'Email List Growth Setup',
      'Welcome Automation Sequence',
      '5 Strategic Automated Emails',
      'Mobile-Responsive Email Templates',
      'Sign-up Pop-up/Form Integration'
    ],
    perfectFor: 'Business owners who want to stop relying purely on social media algorithms.',
    price: 69,
    originalPrice: 85
  },
  {
    id: 'youtube-branding',
    name: 'YouTube Channel Setup & Branding',
    icon: Youtube,
    emoji: '🎬',
    promise: 'Start your YouTube journey with a channel that looks ready for 100k subscribers.',
    bullets: [
      'Premium Channel Banner & Icon',
      'SEO-Optimized "About" Section',
      'Keyword-Rich Channel Tags',
      'Playlist Structure & Organization',
      '5 Custom Thumbnail Templates',
      'Upload Defaults Configuration'
    ],
    perfectFor: 'Knowledge-givers and experts looking to build authority via video.',
    price: 79,
    originalPrice: 100
  },
  {
    id: 'whatsapp-automation',
    name: 'WhatsApp Business Automation Setup',
    icon: MessageSquare,
    emoji: '💬',
    promise: 'Handle customer inquiries 24/7. Never lose a lead again.',
    bullets: [
      'Advanced Business Profile Setup',
      'Automated Greeting & Away Messages',
      'Product/Service Catalog Mapping',
      'Organized Quick Reply Templates',
      'Basic Chatbot Flow Design',
      'Lead Labeling & Sorting System'
    ],
    perfectFor: 'Busy business owners who get too many WhatsApp messages to handle manually.',
    price: 59,
    originalPrice: 70
  },
  {
    id: 'local-seo',
    name: 'Local SEO Package',
    icon: Search,
    emoji: '🔍',
    promise: 'Be the #1 choice when people in your city search for your service.',
    bullets: [
      'Monthly Keyword Optimization',
      'Weekly Google Profile Internal Posts',
      'Local Citation & Directory Building',
      'Monthly Ranking & Traffic Report',
      'GMB Review Management Aid',
      'Localized Content Strategy'
    ],
    perfectFor: 'Establishments like clinics, salons, or stores that depend on city-based customers.',
    price: 99,
    originalPrice: 120,
    isRecurring: true
  },
  {
    id: 'ai-content',
    name: 'AI-Powered Content System Setup',
    icon: Cpu,
    emoji: '🤖',
    promise: 'Post high-quality content daily without spending hours on it.',
    bullets: [
      'Custom AI Tools & API Setup',
      'Weekly Batch Content Workflow',
      'SEO Blog/Article Templates',
      'AI Social Caption Generator System',
      'Email Newsletter Templates',
      'ChatGPT Training & SOPs'
    ],
    perfectFor: 'Solopreneurs who find content creation overwhelming and time-consuming.',
    price: 119,
    originalPrice: 145
  }
];

const FAQS = [
  {
    question: "Do you provide hosting and domain names?",
    answer: "We guide you through the process of purchasing your own hosting and domain so that everything remains in your name and control. We help you pick the most reliable and affordable providers for your budget."
  },
  {
    question: "What is the difference between Starter and Professional plans?",
    answer: "Starter plans are designed for early-stage entrepreneurs needing a solid foundation. Professional plans include more advanced designs, extended features, deeper strategy, and more complex automation setups for businesses that are ready to scale."
  },
  {
    question: "How long does it take to complete the services?",
    answer: "Most of our DFY services are delivered within 7 to 14 days. Complex projects like a Professional Website or Custom Software might take up to 21 days."
  },
  {
    question: "Do I need to be tech-savvy to maintain these systems?",
    answer: "No! We build these systems to be simple. We also provide basic training and handover documents so you or your team can manage daily tasks without any technical help."
  },
  {
    question: "Is there any ongoing monthly fee?",
    answer: "Most of our services are one-time setup fees. Services like Local SEO require a monthly retainer. For websites, you will only have your yearly domain and hosting renewals to pay directly to the service providers."
  },
  {
    question: "Can you handle my ads (Facebook/Google) as well?",
    answer: "Yes, we handle ad management as a separate recurring service. We usually recommend setting up your foundation (Website/Brand/Profile) first before spending money on ads."
  }
];

export const DFYServices = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [currency, setCurrency] = React.useState({ code: 'USD', symbol: '$', rate: 1 });

  React.useEffect(() => {
    // Attempt to detect currency based on IP
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.currency) {
          // Default rate 1 if not USD, we might need a real API for production
          // But for this environment let's use some common ones
          let rate = 1;
          if (data.currency === 'INR') rate = 83.5;
          if (data.currency === 'NGN') rate = 1600;
          if (data.currency === 'GBP') rate = 0.79;
          if (data.currency === 'EUR') rate = 0.92;
          
          setCurrency({ 
            code: data.currency, 
            symbol: data.currency_symbol || '$', 
            rate: rate 
          });
        }
      })
      .catch(() => {});
  }, []);

  const formatPrice = (usdPrice: number) => {
    const localPrice = usdPrice * currency.rate;
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 0
    }).format(localPrice);
  };

  const handleInquiry = (serviceName: string) => {
    const message = `Hello Webhouse Media team! I am interested in your Done-For-You Service: ${serviceName}. Please provide more details on how we can get started.`;
    window.open(`https://wa.me/2348060180077?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleConsultation = () => {
    window.open('https://wa.me/2348060180077?text=Hello, I would like to book a free 20-minute discovery call for my business.', '_blank');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#0A0F2C]">
      {/* Hero Section */}
      <section className="bg-[#0A0F2C] text-white pt-32 pb-24 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F4A800_0%,transparent_50%)] blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#F4A800] text-xs font-bold uppercase tracking-widest mb-6"
          >
            Done-For-You Agency Services
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-8 leading-none tracking-tight max-w-5xl mx-auto"
          >
            Stop Struggling With Your Online Presence. <br/>
            <span className="text-[#F4A800]">We Build It All For You.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            No website? No customers? No clue where to start? <br/>
            We transform your local business into a digital powerhouse overnight.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <div className="flex flex-col items-center">
              <div className="px-10 py-5 bg-[#F4A800] text-[#0A0F2C] font-black rounded-xl text-lg flex items-center justify-center gap-2">
                Send Us Email <Mail className="w-5 h-5" />
              </div>
              <a href="mailto:webhousemediastudio@gmail.com" className="text-white hover:text-[#F4A800] transition-colors font-bold mt-2">
                webhousemediastudio@gmail.com
              </a>
            </div>
            <button 
              onClick={() => handleInquiry('General Inquiry')}
              className="px-10 py-5 bg-white/10 text-white font-black rounded-xl text-lg hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl font-medium leading-relaxed text-slate-700 italic">
            "We serve entrepreneurs, local business owners, coaches, and consultants who are ready to scale but don't have the time to learn complex technology. Our mission is to take the entire digital load off your shoulders. We do <span className="text-[#0A0F2C] font-black underline decoration-[#F4A800] decoration-4">EVERYTHING</span> for you—the design, the tech, the writing, and the setup—so you can focus 100% on what you do best: running your business."
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Our <span className="text-[#F4A800]">Done-For-You</span> Menu</h2>
            <p className="text-slate-500 font-medium">Premium execution. No technical headaches. Pick your system.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-[#0A0F2C]/5 transition-all group"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-inner">
                    {s.emoji}
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-400 line-through font-bold">
                        {formatPrice(s.originalPrice)}
                      </span>
                      <span className="px-3 py-1 bg-[#F4A800] text-[#0A0F2C] text-[10px] font-black uppercase rounded-lg">
                        BEST PRICE
                      </span>
                    </div>
                    <span className="text-2xl font-black text-[#0A0F2C]">
                      {formatPrice(s.price)}{s.isRecurring ? '/mo' : ''}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black mb-2 text-[#0A0F2C]">{s.name}</h3>
                <p className="font-bold text-slate-800 mb-6 border-l-4 border-[#F4A800] pl-4 italic">"{s.promise}"</p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600 font-medium leading-tight">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest bg-slate-50 p-3 rounded-lg inline-block">
                  🎯 Perfect for: {s.perfectFor}
                </p>

                <button 
                  onClick={() => handleInquiry(s.name)}
                  className="w-full py-5 bg-[#0A0F2C] text-[#F4A800] font-black rounded-xl hover:bg-[#1a2350] transition-all flex items-center justify-center gap-2 group-hover:shadow-lg shadow-[#0A0F2C]/10 uppercase"
                >
                  GET IT NOW! <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0F2C] skew-y-3 origin-left translate-y-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-[3.5rem] p-8 md:p-16 lg:p-20 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4A800]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="px-4 py-1 bg-red-100 text-red-600 font-black text-[10px] uppercase rounded-full mb-6 inline-block animate-pulse">
                  Best Value Offer
                </span>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                  The Complete Digital <br/>
                  <span className="text-[#F4A800]">Presence Bundle</span>
                </h2>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  Establish total digital dominance. We combine our 4 most powerful services into one giant growth system for your business.
                </p>
                
                <div className="space-y-4 mb-12">
                  {[
                    'Full 5-Page Premium Website',
                    'Brand Identity (Logo, Colors, Fonts)',
                    'Google Business Profile Optimization',
                    'Social Media Brand Setup (FB, IG, WA)',
                    'WhatsApp Business Automation',
                    'Lifetime Support Access'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-lg font-bold text-slate-800">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>

                <p className="text-red-500 font-black italic mb-2 tracking-widest text-sm uppercase">
                  ⚡ Limited spots available each month
                </p>
              </div>

              <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 text-center relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-8 py-2 rounded-full border border-slate-200 font-black text-xs uppercase tracking-widest text-slate-400">
                  Value: <span className="line-through">{formatPrice(720)}</span>
                </div>
                
                <div className="mb-10">
                  <p className="text-slate-500 font-bold mb-2">Bundle Investment</p>
                  <div className="flex flex-col items-center">
                    <span className="text-7xl md:text-8xl font-black text-[#0A0F2C] leading-none mb-2">{formatPrice(420)}</span>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">One-Time Payment</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-12 text-left bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#F4A800]" /> SAVE OVER 40% TODAY
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#F4A800]" /> 14-Day Delivery Guaranteed
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-[#F4A800]" /> Dedicated Success Manager
                  </li>
                </ul>

                <button 
                  onClick={() => handleInquiry('Complete Digital Presence Bundle')}
                  className="w-full py-6 bg-[#F4A800] text-[#0A0F2C] font-black rounded-[1.5rem] text-xl hover:scale-105 transition-all shadow-2xl shadow-[#F4A800]/30"
                >
                  Claim Your Bundle Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Why Entrepreneurs <br/> <span className="text-[#F4A800]">Trust Webhouse</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "We do everything for you", desc: "Just provide simple input, we handle 100% of the tech, design & writing.", icon: Users },
              { title: "Fast delivery (7–14 days)", desc: "We don't keep you waiting for months. Launch your business system fast.", icon: Clock },
              { title: "Ongoing support included", desc: "Launch is just the start. We stay with you for updates and queries.", icon: ShieldCheck },
              { title: "Trusted by YouTube community", desc: "Transparent, real, and verified by thousands of our regular viewers.", icon: Youtube }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <item.icon className="w-8 h-8 text-[#F4A800]" />
                </div>
                <h3 className="text-lg font-black mb-4 text-[#0A0F2C]">{item.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black">Frequently Asked <span className="text-[#F4A800]">Questions</span></h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-[#0A0F2C]">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 font-medium border-t border-slate-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[#0A0F2C] text-white overflow-hidden relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F4A800]/10 rounded-full blur-3xl -mb-48 -mr-48"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Ready to Build a Brand That <br/>
            <span className="text-[#F4A800]">Commands Respect & Revenue?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70 mb-12 font-medium">
            Stop waiting for "the right time." Your competitors are already online. <br/>
            Let us build your digital foundation while you sleep.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
            <button 
              onClick={() => handleInquiry('General DFY Inquiry')}
              className="w-full md:w-auto px-12 py-5 bg-[#F4A800] text-[#0A0F2C] font-black rounded-2xl text-xl hover:brightness-110 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6" /> WhatsApp Us Now
            </button>
            <div className="flex flex-col items-center">
              <div className="w-full md:w-auto px-12 py-5 bg-white text-[#0A0F2C] font-black rounded-2xl text-xl flex items-center justify-center gap-3">
                Send Us Email
              </div>
              <a href="mailto:webhousemediastudio@gmail.com" className="text-[#F4A800] hover:text-white transition-colors font-bold text-xl mt-3">
                webhousemediastudio@gmail.com
              </a>
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 inline-block">
            <p className="text-white/60 font-medium">
              🤔 Not sure which service you need? <br/>
              <a 
                href="mailto:webhousemediastudio@gmail.com"
                className="text-[#F4A800] font-black underline hover:text-[#ffb914] transition-colors"
              >
                Send us an email
              </a> and we will guide you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
