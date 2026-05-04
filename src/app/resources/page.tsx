'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Video, 
  Wrench, 
  Layout, 
  FileText, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  HelpCircle,
  ShoppingBag,
  Download,
  ShieldCheck,
  Rocket,
  Globe,
  Users,
  MessageSquare,
  Mail,
  Search,
  Cpu,
  TrendingUp,
  DollarSign,
  Facebook,
  Instagram,
  Target,
  Calendar,
  Layers,
  X,
  Plus
} from 'lucide-react';

import { ShareButtons } from '@/src/components/ShareButtons';
import { cn } from '@/src/lib/utils';

interface Product {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  format: 'Ebook' | 'Video Course' | 'Toolkit' | 'Template Pack' | 'Guide' | 'Playbook';
  price: number;
  icon: React.ElementType;
  category: string;
  image?: string;
  selarLink?: string;
}

const BookCover = ({ title, category, icon: Icon, format, image }: { title: string, category: string, icon: React.ElementType, format: string, image?: string }) => {
  const getGradient = (cat: string) => {
    switch (cat) {
      case 'AI & Automation': return 'from-emerald-600/90 to-teal-900/95';
      case 'Digital Marketing & Sales': return 'from-blue-600/90 to-indigo-900/95';
      case 'Website & Digital Business': return 'from-slate-700/90 to-slate-950/95';
      case 'Digital Products & Online Income': return 'from-amber-500/90 to-orange-800/95';
      case 'Social Media & Content Creation': return 'from-rose-500/90 to-purple-900/95';
      case 'Business Systems & Productivity': return 'from-cyan-600/90 to-blue-900/95';
      case 'Branding & Creative': return 'from-violet-600/90 to-fuchsia-900/95';
      default: return 'from-emerald-600/90 to-emerald-900/95';
    }
  };

  return (
    <div className={`w-full h-full relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
      {/* Background Image */}
      {image && (
        <img 
          src={image} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      )}
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(category)} mix-blend-multiply opacity-80`}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      </div>

      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white mb-6">
            <Icon className="w-3 h-3" /> {category}
          </div>
          <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-2xl">
            {title}
          </h3>
          <div className="w-12 h-1 bg-white/40 rounded-full"></div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 mb-1">Premium Resource</p>
            <p className="text-sm font-bold text-white">{format}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Book Spine Effect */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-black/40"></div>
      <div className="absolute top-0 left-1.5 w-0.5 h-full bg-white/10"></div>
    </div>
  );
};

const PRODUCTS: Product[] = [
  {
    id: 'ai-blogging',
    title: "AI Blogging Automation Blueprint",
    description: "Learn how to build a fully automated blog that researches, writes, and posts high-quality SEO content daily.",
    benefits: ["Full automation workflow", "SEO optimization secrets", "Monetization strategies"],
    format: 'Guide',
    price: 15,
    icon: Cpu,
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800",
    selarLink: "https://selar.com/m77m2p31h2"
  },
  {
    id: 'pinterest-traffic',
    title: "Pinterest Traffic Money Machine",
    description: "Drive thousands of visitors to your website using automated Pinterest marketing strategies.",
    benefits: ["Viral pin templates", "Automation tool setup", "Niche selection guide"],
    format: 'Playbook',
    price: 15,
    icon: TrendingUp,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
    selarLink: "https://selar.com/7u6366e61c"
  },
  {
    id: 'fiverr-income',
    title: "Fiverr Income Playbook",
    description: "The complete guide to setting up a high-income freelancing business on Fiverr from scratch.",
    benefits: ["Gig optimization hacks", "Client communication scripts", "Scaling strategies"],
    format: 'Playbook',
    price: 15,
    icon: DollarSign,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'fb-ads-profit',
    title: "Facebook Ads Profit Formula",
    description: "Master the art of high-converting Facebook ads for any business or niche.",
    benefits: ["Ad copy templates", "Targeting masterclass", "Retargeting strategies"],
    format: 'Video Course',
    price: 19.5,
    icon: Facebook,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'agency-starter',
    title: "Digital Agency Starter Kit",
    description: "Everything you need to launch and scale your own digital marketing agency this year.",
    benefits: ["Service delivery templates", "Contract & proposal docs", "Lead gen system"],
    format: 'Toolkit',
    price: 15,
    icon: Rocket,
    category: "Website & Digital Business",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'sales-funnel',
    title: "Small Business Sales Funnel Templates",
    description: "Plug-and-play funnel templates designed to convert cold traffic into loyal customers.",
    benefits: ["High-converting designs", "Email sequence included", "Landing page copy"],
    format: 'Template Pack',
    price: 19.5,
    icon: Layout,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'whatsapp-marketing',
    title: "WhatsApp Marketing Mastery",
    description: "Turn your WhatsApp into a sales machine with these proven marketing and automation techniques.",
    benefits: ["Broadcast strategies", "Status selling secrets", "Automation tools"],
    format: 'Guide',
    price: 19.5,
    icon: MessageSquare,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1611744214246-9017400cd7a7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'landing-page-old',
    title: "High-Converting Landing Page Blueprint",
    description: "The psychological framework for building landing pages that convert at 20% or higher.",
    benefits: ["Copywriting framework", "Design principles", "A/B testing guide"],
    format: 'Guide',
    price: 15,
    icon: FileText,
    category: "Website & Digital Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'lead-gen-sme',
    title: "Lead Generation System for SMEs",
    description: "A predictable system for generating high-quality leads for small and medium enterprises.",
    benefits: ["Multi-channel approach", "Lead magnet ideas", "CRM setup guide"],
    format: 'Toolkit',
    price: 19.5,
    icon: Target,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'content-calendar',
    title: "Social Media Content Calendar Pack",
    description: "365 days of social media content ideas and templates for consistent brand growth.",
    benefits: ["Daily content prompts", "Engagement boosters", "Platform-specific tips"],
    format: 'Template Pack',
    price: 15,
    icon: Calendar,
    category: "Social Media & Content Creation",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'ai-entrepreneurs',
    title: "AI Tools for Entrepreneurs",
    description: "The ultimate directory and guide to the best AI tools to save time and increase profit.",
    benefits: ["Top 50 AI tools", "Implementation guides", "Prompt engineering basics"],
    format: 'Toolkit',
    price: 15,
    icon: Zap,
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  }
];

const FAQS = [
  {
    question: "How do I receive my products after purchase?",
    answer: "Immediately after your payment is confirmed, you will receive an email with a secure download link. You can also access your products through your account dashboard if you created one."
  },
  {
    question: "Are these products suitable for beginners?",
    answer: "Yes! Most of our resources are designed to take you from zero to hero. We provide step-by-step instructions that are easy to follow even if you have no prior experience."
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the digital nature of our products, we generally do not offer refunds once the product has been downloaded. However, if you have any issues, please contact our support team and we'll do our best to help."
  },
  {
    question: "Can I get support if I have questions about a product?",
    answer: "Absolutely! Every purchase comes with access to our support email where you can ask any questions related to the product you purchased."
  }
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [showPlaceholder, setShowPlaceholder] = React.useState(false);
  const [currency, setCurrency] = React.useState({ code: 'USD', symbol: '$', rate: 1 });

  React.useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.currency) {
          const rate = data.currency === 'NGN' ? 1600 : 1;
          setCurrency({ 
            code: data.currency, 
            symbol: data.currency_symbol || '$', 
            rate: rate 
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleBuyNow = (product: Product) => {
    const productLink = product.selarLink || "https://selar.com/37j713171k";
    setShowPlaceholder(true);
    window.open(productLink, '_blank');
    
    setTimeout(() => {
      setShowPlaceholder(false);
    }, 2000);
  };

  const categories = [
    'All',
    'Website & Digital Business',
    'Digital Marketing & Sales',
    'AI & Automation',
    'Digital Products & Online Income',
    'Social Media & Content Creation',
    'Business Systems & Productivity',
    'Branding & Creative'
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const categoryNotes: Record<string, string> = {
    'AI & Automation': "👉 AI adoption and automation tools are exploding globally, with massive business demand",
    'Digital Products & Online Income': "👉 Online courses and templates are among the most profitable digital products right now",
    'Social Media & Content Creation': "👉 Viral content packs and creator tools are in huge demand right now"
  };

  const formatPrice = (usdPrice: number) => {
    const localPrice = usdPrice * currency.rate;
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 0
    }).format(localPrice);
  };

  return (
    <div className="bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_70%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Zap className="w-3 h-3" /> Invest in Your Growth
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            Digital Resources & <br />
            <span className="text-emerald-400">Marketing Toolkits in Nigeria</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Master high-income digital skills with the best digital marketing resources in Africa. From WhatsApp marketing for business in Nigeria to AI marketing tools for small businesses, we have everything you need to scale.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a 
              href="#products" 
              className="bg-emerald-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all inline-flex items-center gap-2 shadow-xl shadow-emerald-500/20"
            >
              Explore Digital Products <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-black leading-tight">
                Practical Knowledge from <br />
                <span className="text-emerald-600">Real-World Experience</span>
              </h2>
              <p className="text-lg text-black/60 mb-8 leading-relaxed">
                Our resource hub isn't just theory. Every guide, toolkit, and template we offer is born from years of building digital systems, scaling agencies, and automating businesses.
              </p>
              <div className="space-y-4">
                {[
                  "Proven frameworks used by our agency",
                  "Step-by-step implementation guides",
                  "Ready-to-use templates and toolkits",
                  "Regularly updated with latest trends"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium text-black/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000" 
                  alt="Digital Learning" 
                  className="w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-black/5 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Star className="text-emerald-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">4.9/5</p>
                    <p className="text-sm text-black/40">Average Rating</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-black/60 italic">"The best investment I've made for my agency."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">Featured Digital Products</h2>
            <p className="text-black/60 text-lg mb-8">Premium resources to help you scale faster and smarter.</p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'bg-white text-black/60 hover:bg-emerald-50 border border-black/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {categoryNotes[selectedCategory] && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-500/10 p-4 rounded-2xl mb-12 inline-block mx-auto"
              >
                <p className="text-emerald-700 font-bold text-sm">{categoryNotes[selectedCategory]}</p>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i % 3 * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <BookCover 
                    title={product.title} 
                    category={product.category} 
                    icon={product.icon} 
                    format={product.format} 
                    image={product.image}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-600 border border-emerald-500/10 shadow-sm">
                      {product.format}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-xs font-medium leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors flex-shrink-0">
                      <product.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-black">{formatPrice(product.price)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-black group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  
                  <ul className="space-y-3 mb-8 flex-1">
                    {product.benefits.slice(0, 3).map((benefit, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs font-medium text-black/70">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="line-clamp-1">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 mt-auto"
                  >
                    Buy Now <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">Frequently Asked Questions</h2>
            <p className="text-black/60 text-lg">Everything you need to know about our digital products.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl border border-black/5 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-emerald-500" />
                  {faq.question}
                </h3>
                <p className="text-black/60 leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Placeholder Toast */}
      <AnimatePresence>
        {showPlaceholder && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-8 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 min-w-[320px]"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm">Redirecting to Payment</p>
              <p className="text-xs text-white/60">Opening Selar checkout in a new tab...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
