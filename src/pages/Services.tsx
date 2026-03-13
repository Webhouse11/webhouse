import React from 'react';
import { motion } from 'motion/react';
import { Globe, Cpu, BarChart3, Layers, Palette, Share2, Search, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Website Development",
    desc: "High-converting websites and complex web applications built for scale. We focus on performance, SEO, and user experience.",
    icon: Globe,
    features: ["Custom UI/UX", "E-commerce Solutions", "Performance Optimization", "Responsive Design"]
  },
  {
    title: "Custom SaaS Development",
    desc: "End-to-end software as a service platforms with robust architecture, multi-tenancy, and secure payment integrations.",
    icon: Layers,
    features: ["Cloud Infrastructure", "Subscription Management", "API Development", "Scalable Backend"]
  },
  {
    title: "AI Automation Systems",
    desc: "Intelligent workflows that save time and reduce operational costs by automating repetitive business processes.",
    icon: Cpu,
    features: ["LLM Integration", "Workflow Automation", "Data Analysis", "Chatbot Development"]
  },
  {
    title: "Digital Sales Funnels",
    desc: "Automated marketing systems designed to convert visitors into loyal clients through strategic lead nurturing.",
    icon: BarChart3,
    features: ["Landing Pages", "Email Automation", "CRM Integration", "Conversion Tracking"]
  },
  {
    title: "Brand Identity Systems",
    desc: "Comprehensive visual identity and branding strategies that position your company as a market leader.",
    icon: Palette,
    features: ["Logo Design", "Brand Guidelines", "Visual Assets", "Brand Strategy"]
  },
  {
    title: "Social Media Management",
    desc: "Strategic content creation and community management to build brand authority across all major platforms.",
    icon: Share2,
    features: ["Content Strategy", "Community Growth", "Analytics Reporting", "Paid Advertising"]
  }
];

export const Services = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl font-bold mb-8">Digital Systems <span className="text-emerald-600">Engineered for Growth</span></h1>
          <p className="text-xl text-black/60 leading-relaxed">
            Webhouse Media and Marketing Solution builds integrated digital infrastructures that serve as the backbone of your business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] border border-black/5 bg-white hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-black/5 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
              <p className="text-black/60 mb-8 leading-relaxed">{s.desc}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                {s.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm font-medium text-black/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    {f}
                  </div>
                ))}
              </div>

              <Link 
                to={`/contact?service=${encodeURIComponent(s.title)}`} 
                className="inline-flex items-center gap-2 font-bold text-black border-b-2 border-emerald-500 pb-1 hover:gap-3 transition-all"
              >
                Inquire About This Service <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
