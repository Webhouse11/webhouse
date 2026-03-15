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
  Layers
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  format: 'Ebook' | 'Video Course' | 'Toolkit' | 'Template Pack' | 'Guide' | 'Playbook';
  price: number;
  icon: React.ElementType;
}

const PRODUCTS: Product[] = [
  {
    id: 'ai-blogging',
    title: "AI Blogging Automation Blueprint",
    description: "Learn how to build a fully automated blog that researches, writes, and posts high-quality SEO content daily.",
    benefits: ["Full automation workflow", "SEO optimization secrets", "Monetization strategies"],
    format: 'Guide',
    price: 99,
    icon: Cpu
  },
  {
    id: 'pinterest-traffic',
    title: "Pinterest Traffic Money Machine",
    description: "Drive thousands of visitors to your website using automated Pinterest marketing strategies.",
    benefits: ["Viral pin templates", "Automation tool setup", "Niche selection guide"],
    format: 'Playbook',
    price: 49,
    icon: TrendingUp
  },
  {
    id: 'fiverr-income',
    title: "Fiverr Income Playbook",
    description: "The complete guide to setting up a high-income freelancing business on Fiverr from scratch.",
    benefits: ["Gig optimization hacks", "Client communication scripts", "Scaling strategies"],
    format: 'Playbook',
    price: 39,
    icon: DollarSign
  },
  {
    id: 'fb-ads-profit',
    title: "Facebook Ads Profit Formula",
    description: "Master the art of high-converting Facebook ads for any business or niche.",
    benefits: ["Ad copy templates", "Targeting masterclass", "Retargeting strategies"],
    format: 'Video Course',
    price: 149,
    icon: Facebook
  },
  {
    id: 'agency-starter',
    title: "Digital Agency Starter Kit",
    description: "Everything you need to launch and scale your own digital marketing agency this year.",
    benefits: ["Service delivery templates", "Contract & proposal docs", "Lead gen system"],
    format: 'Toolkit',
    price: 199,
    icon: Rocket
  },
  {
    id: 'sales-funnel',
    title: "Small Business Sales Funnel Templates",
    description: "Plug-and-play funnel templates designed to convert cold traffic into loyal customers.",
    benefits: ["High-converting designs", "Email sequence included", "Landing page copy"],
    format: 'Template Pack',
    price: 79,
    icon: Layout
  },
  {
    id: 'whatsapp-marketing',
    title: "WhatsApp Marketing Mastery",
    description: "Turn your WhatsApp into a sales machine with these proven marketing and automation techniques.",
    benefits: ["Broadcast strategies", "Status selling secrets", "Automation tools"],
    format: 'Guide',
    price: 29,
    icon: MessageSquare
  },
  {
    id: 'landing-page',
    title: "High-Converting Landing Page Blueprint",
    description: "The psychological framework for building landing pages that convert at 20% or higher.",
    benefits: ["Copywriting framework", "Design principles", "A/B testing guide"],
    format: 'Guide',
    price: 59,
    icon: FileText
  },
  {
    id: 'lead-gen-sme',
    title: "Lead Generation System for SMEs",
    description: "A predictable system for generating high-quality leads for small and medium enterprises.",
    benefits: ["Multi-channel approach", "Lead magnet ideas", "CRM setup guide"],
    format: 'Toolkit',
    price: 129,
    icon: Target
  },
  {
    id: 'content-calendar',
    title: "Social Media Content Calendar Pack",
    description: "365 days of social media content ideas and templates for consistent brand growth.",
    benefits: ["Daily content prompts", "Engagement boosters", "Platform-specific tips"],
    format: 'Template Pack',
    price: 25,
    icon: Calendar
  },
  {
    id: 'ai-entrepreneurs',
    title: "AI Tools for Entrepreneurs",
    description: "The ultimate directory and guide to the best AI tools to save time and increase profit.",
    benefits: ["Top 50 AI tools", "Implementation guides", "Prompt engineering basics"],
    format: 'Toolkit',
    price: 45,
    icon: Zap
  },
  {
    id: 'course-creation',
    title: "Online Course Creation Blueprint",
    description: "Step-by-step guide to creating, launching, and selling your first online course.",
    benefits: ["Curriculum design", "Tech stack setup", "Marketing plan"],
    format: 'Video Course',
    price: 199,
    icon: Video
  },
  {
    id: 'product-launch',
    title: "Digital Product Launch Strategy",
    description: "The exact framework we use to launch digital products that generate 5-figure revenues.",
    benefits: ["Pre-launch buzz system", "Launch week schedule", "Post-launch scaling"],
    format: 'Playbook',
    price: 89,
    icon: ShoppingBag
  },
  {
    id: 'seo-domination',
    title: "SEO Traffic Domination Guide",
    description: "Rank your website on the first page of Google with these modern SEO strategies.",
    benefits: ["Keyword research hacks", "On-page SEO checklist", "Backlink strategies"],
    format: 'Guide',
    price: 69,
    icon: Search
  },
  {
    id: 'email-automation',
    title: "Email Marketing Automation Toolkit",
    description: "Build automated email sequences that sell your products while you sleep.",
    benefits: ["Welcome series templates", "Abandoned cart recovery", "Segmentation guide"],
    format: 'Toolkit',
    price: 55,
    icon: Mail
  },
  {
    id: 'personal-brand',
    title: "Personal Brand Growth System",
    description: "Build a powerful personal brand that attracts high-paying clients and opportunities.",
    benefits: ["Authority building", "Content strategy", "Networking hacks"],
    format: 'Playbook',
    price: 119,
    icon: Users
  },
  {
    id: 'freelancing-income',
    title: "Freelancing Income System",
    description: "How to transition from a 9-5 to a full-time freelancer with a steady income.",
    benefits: ["Pricing your services", "Finding high-ticket clients", "Portfolio building"],
    format: 'Guide',
    price: 35,
    icon: Globe
  },
  {
    id: 'affiliate-blueprint',
    title: "Affiliate Marketing Blueprint",
    description: "Start earning passive income by promoting other people's products the right way.",
    benefits: ["Product selection", "Traffic sources", "Conversion optimization"],
    format: 'Playbook',
    price: 49,
    icon: Layers
  },
  {
    id: 'chatgpt-business',
    title: "ChatGPT for Business Playbook",
    description: "Master ChatGPT to automate your business tasks, from emails to content creation.",
    benefits: ["100+ business prompts", "Workflow automation", "Custom GPT guide"],
    format: 'Playbook',
    price: 20,
    icon: MessageSquare
  },
  {
    id: 'startup-kit',
    title: "Online Business Startup Kit",
    description: "The complete roadmap to starting your online business from idea to first sale.",
    benefits: ["Business model selection", "Legal & tech setup", "First 90 days plan"],
    format: 'Toolkit',
    price: 159,
    icon: ShieldCheck
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

export const Resources = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [showPlaceholder, setShowPlaceholder] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setShowPlaceholder(true);
    // Auto-hide after 3 seconds
    setTimeout(() => setShowPlaceholder(false), 3000);
  };

  const filteredProducts = PRODUCTS; // For now, showing all. Could add category mapping.

  return (
    <div className="bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),transparent_70%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
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
            className="text-4xl lg:text-7xl font-bold text-white mb-8 leading-tight"
          >
            Digital Resources & <br />
            <span className="text-emerald-400">Info Products Hub</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Master high-income digital skills and accelerate your business growth with our premium guides, toolkits, and playbooks.
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
            <p className="text-black/60 text-lg">Premium resources to help you scale faster and smarter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i % 3 * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <product.icon className="w-7 h-7" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      {product.format}
                    </span>
                    <span className="text-2xl font-bold text-black">${product.price}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-black group-hover:text-emerald-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  <p className="text-black/60 text-sm mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {product.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs font-medium text-black/70">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => handleBuyNow(product)}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                >
                  Buy Now <ShoppingBag className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">Success Stories</h2>
            <p className="text-black/60 text-lg">Join 5,000+ entrepreneurs who have leveled up their business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Digital Marketer",
                content: "The AI Blogging Blueprint changed my life. I went from struggling to write one post a week to having 5 blogs running on autopilot.",
                image: "https://i.pravatar.cc/150?u=sarah"
              },
              {
                name: "Michael Chen",
                role: "Agency Owner",
                content: "The Digital Agency Starter Kit is pure gold. The contract templates alone saved me thousands in legal fees.",
                image: "https://i.pravatar.cc/150?u=michael"
              },
              {
                name: "Elena Rodriguez",
                role: "Freelancer",
                content: "I doubled my rates on Fiverr after following the Fiverr Income Playbook. The gig optimization tips actually work!",
                image: "https://i.pravatar.cc/150?u=elena"
              }
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-black/5">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-black/70 italic mb-8 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-black">{t.name}</h4>
                    <p className="text-xs text-black/40">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">Frequently Asked Questions</h2>
            <p className="text-black/60 text-lg">Everything you need to know about our digital products.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-black/5 p-6 shadow-sm">
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
              <p className="font-bold text-sm">Checkout Placeholder</p>
              <p className="text-xs text-white/60">Integration for "{selectedProduct?.title}" coming soon!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final CTA Banner */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-emerald-600 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl shadow-emerald-600/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Invest in Knowledge, <br />Grow Your Business Online</h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                The fastest way to reach your goals is to learn from those who have already done it. Start your journey today.
              </p>
              <button className="bg-white text-emerald-600 px-12 py-6 rounded-full font-bold text-xl hover:bg-emerald-50 transition-all shadow-2xl flex items-center gap-3 mx-auto">
                Start Learning & Growing Today <ArrowRight className="w-6 h-6" />
              </button>
              
              <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/60">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span className="text-sm font-medium">Instant Download</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Placeholder */}
      <div className="hidden">
        {/* This would be where a checkout modal or integration would live */}
        <p>Checkout integration placeholder</p>
      </div>
    </div>
  );
};
