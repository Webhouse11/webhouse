import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
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
  // PREVIOUS PRODUCTS (Restored)
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
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800"
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
  },
  {
    id: 'course-creation',
    title: "Online Course Creation Blueprint",
    description: "Step-by-step guide to creating, launching, and selling your first online course.",
    benefits: ["Curriculum design", "Tech stack setup", "Marketing plan"],
    format: 'Video Course',
    price: 19.5,
    icon: Video,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'product-launch',
    title: "Digital Product Launch Strategy",
    description: "The exact framework we use to launch digital products that generate 5-figure revenues.",
    benefits: ["Pre-launch buzz system", "Launch week schedule", "Post-launch scaling"],
    format: 'Playbook',
    price: 19.5,
    icon: ShoppingBag,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'seo-domination',
    title: "SEO Traffic Domination Guide",
    description: "Rank your website on the first page of Google with these modern SEO strategies.",
    benefits: ["Keyword research hacks", "On-page SEO checklist", "Backlink strategies"],
    format: 'Guide',
    price: 19.5,
    icon: Search,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'email-automation',
    title: "Email Marketing Automation Toolkit",
    description: "Build automated email sequences that sell your products while you sleep.",
    benefits: ["Welcome series templates", "Abandoned cart recovery", "Segmentation guide"],
    format: 'Toolkit',
    price: 15,
    icon: Mail,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'personal-brand-old',
    title: "Personal Brand Growth System",
    description: "Build a powerful personal brand that attracts high-paying clients and opportunities.",
    benefits: ["Authority building", "Content strategy", "Networking hacks"],
    format: 'Playbook',
    price: 19.5,
    icon: Users,
    category: "Social Media & Content Creation",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'freelancing-income',
    title: "Freelancing Income System",
    description: "How to transition from a 9-5 to a full-time freelancer with a steady income.",
    benefits: ["Pricing your services", "Finding high-ticket clients", "Portfolio building"],
    format: 'Guide',
    price: 15,
    icon: Globe,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'affiliate-blueprint',
    title: "Affiliate Marketing Blueprint",
    description: "Start earning passive income by promoting other people's products the right way.",
    benefits: ["Product selection", "Traffic sources", "Conversion optimization"],
    format: 'Playbook',
    price: 19.5,
    icon: Layers,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1556742049-02e1f740d0ff?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'chatgpt-business',
    title: "ChatGPT for Business Playbook",
    description: "Master ChatGPT to automate your business tasks, from emails to content creation.",
    benefits: ["100+ business prompts", "Workflow automation", "Custom GPT guide"],
    format: 'Playbook',
    price: 19.5,
    icon: MessageSquare,
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1676299081847-c0326a0333d5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'startup-kit',
    title: "Online Business Startup Kit",
    description: "The complete roadmap to starting your online business from idea to first sale.",
    benefits: ["Business model selection", "Legal & tech setup", "First 90 days plan"],
    format: 'Toolkit',
    price: 15,
    icon: ShieldCheck,
    category: "Website & Digital Business",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800"
  },

  // NEW PRODUCTS
  {
    id: 'web-no-code',
    title: "How To Build a High-Converting Website Without Coding",
    description: "Master the art of building professional websites using modern no-code tools and frameworks.",
    benefits: ["No technical skills required", "Drag-and-drop mastery", "Mobile-responsive design"],
    format: 'Video Course',
    price: 19.5,
    icon: Globe,
    category: "Website & Digital Business",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'web-sales-machine',
    title: "How To Turn Your Website Into a 24/7 Sales Machine",
    description: "Optimize your existing website to capture leads and close sales automatically while you sleep.",
    benefits: ["Conversion rate optimization", "Lead capture systems", "Automated follow-ups"],
    format: 'Playbook',
    price: 19.5,
    icon: TrendingUp,
    category: "Website & Digital Business",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'landing-page-buyers',
    title: "How To Create Landing Pages That Convert Visitors Into Buyers",
    description: "The psychological framework for building landing pages that turn cold traffic into hot leads.",
    benefits: ["Persuasive copywriting", "Visual hierarchy secrets", "A/B testing framework"],
    format: 'Guide',
    price: 19.5,
    icon: Layout,
    category: "Website & Digital Business",
    image: "https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'online-biz-30-days',
    title: "How To Start a Profitable Online Business From Scratch in 30 Days",
    description: "A step-by-step roadmap to launching your digital venture and making your first sale in a month.",
    benefits: ["Niche selection guide", "Low-cost startup tools", "First-sale strategy"],
    format: 'Playbook',
    price: 19.5,
    icon: Rocket,
    category: "Website & Digital Business",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800"
  },

  // DIGITAL MARKETING & SALES
  {
    id: 'fb-ig-leads',
    title: "How To Get Unlimited Leads From Facebook & Instagram Ads",
    description: "Master the ads platforms that drive the most growth for modern businesses.",
    benefits: ["High-ROI targeting", "Ad creative templates", "Budget scaling secrets"],
    format: 'Video Course',
    price: 19.5,
    icon: Facebook,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cbca86?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'sales-funnel-money',
    title: "How To Build a Sales Funnel That Prints Money Automatically",
    description: "The architecture of high-converting funnels that scale businesses to 6 and 7 figures.",
    benefits: ["Funnel mapping guide", "Upsell/Downsell strategy", "Tech stack setup"],
    format: 'Toolkit',
    price: 19.5,
    icon: Target,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'ai-seo-strategies',
    title: "How To Rank Your Business on Google Using AI SEO Strategies",
    description: "Use the power of AI to dominate search results and get free organic traffic.",
    benefits: ["AI keyword research", "Automated content SEO", "Backlink automation"],
    format: 'Guide',
    price: 19.5,
    icon: Search,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'social-followers-customers',
    title: "How To Turn Social Media Followers Into Paying Customers",
    description: "Stop chasing likes and start chasing sales with this social commerce framework.",
    benefits: ["Engagement to sales funnel", "DM closing scripts", "Community building"],
    format: 'Playbook',
    price: 19.5,
    icon: Users,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'viral-content-brand',
    title: "How To Create Viral Content That Explodes Your Brand Online",
    description: "The science behind virality and how to apply it to your personal or business brand.",
    benefits: ["Hook writing formulas", "Viral video structures", "Algorithm hacking"],
    format: 'Playbook',
    price: 19.5,
    icon: Zap,
    category: "Digital Marketing & Sales",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800"
  },

  // AI & AUTOMATION
  {
    id: 'ai-biz-autopilot',
    title: "How To Use AI Tools To Run Your Business on Autopilot",
    description: "The ultimate guide to business automation using the latest AI technology.",
    benefits: ["Workflow automation", "AI agent setup", "Time-saving hacks"],
    format: 'Toolkit',
    price: 19.5,
    icon: Cpu,
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'chatgpt-money-2026',
    title: "How To Make Money With ChatGPT and AI Tools in 2026",
    description: "Stay ahead of the curve with the most advanced AI monetization strategies.",
    benefits: ["New income streams", "Prompt engineering 2.0", "AI service delivery"],
    format: 'Playbook',
    price: 19.5,
    icon: MessageSquare,
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'ai-automation-sme',
    title: "How To Build AI Automation Systems for Small Businesses",
    description: "Help SMEs scale by implementing custom AI solutions and automated workflows.",
    benefits: ["Client acquisition plan", "System implementation", "Pricing your AI services"],
    format: 'Toolkit',
    price: 19.5,
    icon: Wrench,
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'ai-prompt-packs',
    title: "How To Create and Sell AI Prompt Packs for Passive Income",
    description: "Turn your prompt engineering skills into a scalable digital product business.",
    benefits: ["Prompt testing guide", "Packaging & branding", "Sales platform setup"],
    format: 'Template Pack',
    price: 19.5,
    icon: Layers,
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1684369175833-30390696e21b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'ai-content-marketing',
    title: "How To Use AI for Content Creation, Marketing & Sales",
    description: "A comprehensive guide to integrating AI into every stage of your marketing funnel.",
    benefits: ["AI copy mastery", "Visual content AI", "Sales automation"],
    format: 'Guide',
    price: 19.5,
    icon: Zap,
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800"
  },

  // DIGITAL PRODUCTS & ONLINE INCOME
  {
    id: 'digital-products-daily',
    title: "How To Create and Sell Digital Products That Generate Daily Income",
    description: "The blueprint for building a passive income stream through high-demand digital assets.",
    benefits: ["Product idea validation", "Rapid creation methods", "Automated sales setup"],
    format: 'Playbook',
    price: 19.5,
    icon: ShoppingBag,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1512428559083-a40ce9033afb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'online-course-zero',
    title: "How To Build a Profitable Online Course From Zero to Launch",
    description: "Turn your expertise into a scalable online course that people actually want to buy.",
    benefits: ["Curriculum design", "Filming & tech guide", "Launch strategy"],
    format: 'Video Course',
    price: 19.5,
    icon: Video,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'passive-templates',
    title: "How To Make Passive Income Selling Templates and Digital Assets",
    description: "Create once, sell forever. Master the art of template-based digital businesses.",
    benefits: ["Notion/Canva templates", "Marketplace selection", "SEO for assets"],
    format: 'Template Pack',
    price: 19.5,
    icon: FileText,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'side-hustle-dollars',
    title: "How To Start a Side Hustle That Pays You in Dollars Online",
    description: "Break geographical barriers and earn in stable currencies from anywhere in the world.",
    benefits: ["Global platform guide", "Payment setup", "High-value skill selection"],
    format: 'Guide',
    price: 19.5,
    icon: DollarSign,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'knowledge-money-product',
    title: "How To Turn Your Knowledge Into a Money-Making Digital Product",
    description: "Identify your unique value and package it into a product that solves real problems.",
    benefits: ["Expertise extraction", "Product formatting", "Pricing psychology"],
    format: 'Guide',
    price: 19.5,
    icon: BookOpen,
    category: "Digital Products & Online Income",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800"
  },

  // SOCIAL MEDIA & CONTENT CREATION
  {
    id: 'ig-100k-fast',
    title: "How To Grow Your Instagram Page to 100K Followers Fast",
    description: "The exact strategies used by top creators to explode their following in record time.",
    benefits: ["Reels algorithm hacks", "Engagement strategies", "Growth loops"],
    format: 'Playbook',
    price: 19.5,
    icon: Instagram,
    category: "Social Media & Content Creation",
    image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'youtube-monetize',
    title: "How To Start and Monetize a YouTube Channel From Scratch",
    description: "Build a loyal audience and multiple revenue streams on the world's largest video platform.",
    benefits: ["Channel setup & SEO", "Content planning", "Monetization beyond ads"],
    format: 'Video Course',
    price: 19.5,
    icon: Video,
    category: "Social Media & Content Creation",
    image: "https://images.unsplash.com/photo-1524704659699-9f654936694c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'short-videos-viral',
    title: "How To Create Short Videos That Go Viral on TikTok & Reels",
    description: "Master the art of short-form storytelling that captures attention and drives action.",
    benefits: ["Hook/Body/CTA formula", "Editing for retention", "Trend riding"],
    format: 'Playbook',
    price: 19.5,
    icon: Zap,
    category: "Social Media & Content Creation",
    image: "https://images.unsplash.com/photo-1540759786422-c60d5ecd57ad?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'personal-brand-attract',
    title: "How To Build a Personal Brand That Attracts Opportunities",
    description: "Become a magnet for high-paying clients, partnerships, and speaking gigs.",
    benefits: ["Authority positioning", "Content ecosystem", "Networking mastery"],
    format: 'Playbook',
    price: 19.5,
    icon: Users,
    category: "Social Media & Content Creation",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
  },

  // BUSINESS SYSTEMS & PRODUCTIVITY
  {
    id: 'biz-systems-run',
    title: "How To Build Business Systems That Run Without You",
    description: "Transition from operator to owner by implementing robust business systems.",
    benefits: ["System mapping", "Delegation framework", "Automation triggers"],
    format: 'Playbook',
    price: 15,
    icon: Layers,
    category: "Business Systems & Productivity",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'sops-scale',
    title: "How To Create SOPs That Scale Your Business Faster",
    description: "Document your success and empower your team to deliver consistent results.",
    benefits: ["SOP writing guide", "Process optimization", "Team training system"],
    format: 'Toolkit',
    price: 19.5,
    icon: FileText,
    category: "Business Systems & Productivity",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'notion-organize',
    title: "How To Use Notion to Organize and Grow Your Business",
    description: "Build your business second brain and manage everything in one powerful workspace.",
    benefits: ["Custom dashboard setup", "Project management", "Team collaboration"],
    format: 'Template Pack',
    price: 19.5,
    icon: Layout,
    category: "Business Systems & Productivity",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'automate-workflows',
    title: "How To Automate Your Daily Workflows and Save 10+ Hours Weekly",
    description: "Reclaim your time by automating repetitive tasks and focusing on high-impact work.",
    benefits: ["Zapier/Make mastery", "Email automation", "Task management"],
    format: 'Toolkit',
    price: 19.5,
    icon: Zap,
    category: "Business Systems & Productivity",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800"
  },

  // BRANDING & CREATIVE
  {
    id: 'brand-identity-attract',
    title: "How To Design a Powerful Brand Identity That Attracts Clients",
    description: "Create a visual and emotional brand that resonates with your ideal audience.",
    benefits: ["Brand strategy", "Visual design basics", "Messaging framework"],
    format: 'Guide',
    price: 19.5,
    icon: Target,
    category: "Branding & Creative",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'graphics-no-designer',
    title: "How To Create Stunning Graphics Without Being a Designer",
    description: "Master modern design tools to create professional assets for your business.",
    benefits: ["Canva mastery", "Design principles", "Asset creation guide"],
    format: 'Guide',
    price: 19.5,
    icon: Layout,
    category: "Branding & Creative",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'brand-story-sells',
    title: "How To Tell Your Brand Story in a Way That Sells",
    description: "Use the power of storytelling to build deep connections and drive conversions.",
    benefits: ["Storytelling framework", "Emotional triggers", "Content integration"],
    format: 'Guide',
    price: 19.5,
    icon: MessageSquare,
    category: "Branding & Creative",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=800"
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
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [showPlaceholder, setShowPlaceholder] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [currency, setCurrency] = React.useState({ code: 'NGN', symbol: '₦', rate: 1 });
  const [cart, setCart] = React.useState<Product[]>([]);
  const [isUpsellOpen, setIsUpsellOpen] = React.useState(false);

  React.useEffect(() => {
    // Attempt to detect currency based on IP
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.currency) {
          // For Nigeria, we'll use a fixed rate for the demo if it's NGN
          const rate = data.currency === 'NGN' ? 1 : 1; // Set to 1 to keep price at 100
          setCurrency({ 
            code: data.currency, 
            symbol: data.currency_symbol || '$', 
            rate: rate 
          });
        }
      })
      .catch(() => {
        // Fallback to USD
      });
  }, []);

  const handleBuyNow = (product: Product) => {
    setCart([product]);
    setIsUpsellOpen(true);
  };

  const addToCart = (product: Product) => {
    if (!cart.find(p => p.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(p => p.id !== productId));
  };

  const handleCheckout = () => {
    // Use product-specific link if available, otherwise fallback to default
    const productLink = cart[0]?.selarLink || "https://selar.com/37j713171k"; 
    
    setIsUpsellOpen(false);
    setShowPlaceholder(true);
    
    // Open Selar in a new tab
    window.open(productLink, '_blank');
    
    // Simulate redirect to upsell page after a short delay
    // In production, set your Selar "Success Redirect URL" to:
    // https://your-domain.com/upsell
    setTimeout(() => {
      setShowPlaceholder(false);
      navigate('/upsell');
    }, 2000);
  };

  const allProducts = React.useMemo(() => PRODUCTS.map(p => ({ ...p, price: 100 })), []);

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
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

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
    }).format(localPrice);
  };

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

      {/* Upsell Modal */}
      <AnimatePresence>
        {isUpsellOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col"
            >
              {/* Cart Summary */}
              <div className="p-8 lg:p-12 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-black">Your Selection</h2>
                  <button onClick={() => setIsUpsellOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-black/40" />
                  </button>
                </div>

                <div className="space-y-6 mb-12">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-black/5">
                      <div className="w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                        <BookCover title={item.title} category={item.category} icon={item.icon} format={item.format} image={item.image} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-black line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-black/40">{item.format}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-black/5">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-black/40 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                    <span className="text-3xl font-bold text-black">
                      {formatPrice(cart.reduce((sum, item) => sum + item.price, 0))}
                    </span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    Complete Purchase <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-[10px] text-black/40 mt-4">
                    You will be redirected to our secure payment partner, Selar.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
