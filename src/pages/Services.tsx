import React from 'react';
import { motion } from 'motion/react';
import { Globe, Cpu, BarChart3, Layers, Palette, Share2, Search, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Digital Marketing & AI Marketing",
    desc: "The best digital marketing agency in Nigeria, leveraging AI marketing tools for small businesses to drive explosive growth.",
    icon: BarChart3,
    features: ["Facebook Ads Expert", "Instagram Growth Africa", "WhatsApp Marketing", "AI Automation"]
  },
  {
    title: "Website & SaaS Development",
    desc: "Top-tier website development company in Nigeria. We build affordable website designs in Lagos and custom software for Africa.",
    icon: Globe,
    features: ["SaaS Development Africa", "Custom Software Nigeria", "E-commerce Solutions", "Performance SEO"]
  },
  {
    title: "Brand Design & Creative",
    desc: "Leading logo design company in Nigeria. We provide brand identity design services across Africa for startups and established brands.",
    icon: Palette,
    features: ["Logo Design Nigeria", "Brand Identity Africa", "Graphic Design Lagos", "Branding for Startups"]
  },
  {
    title: "Ghostwriting & Content",
    desc: "Professional ghostwriting services in Nigeria. We provide content writing and personal brand storytelling for businesses in Africa.",
    icon: Layers,
    features: ["Ghostwriting Nigeria", "Content Writing Africa", "Brand Storytelling", "SEO Copywriting"]
  },
  {
    title: "Consulting & Growth Strategy",
    desc: "Expert marketing consultant in Nigeria. We develop business growth strategies for startups across Africa to ensure sustainable scaling.",
    icon: Cpu,
    features: ["Growth Strategy Africa", "Marketing Consultant", "Business Automation", "Sales Funnel Design"]
  },
  {
    title: "Social Plus",
    desc: "Social Plus marketing services in Lagos. Strategic content and community management to build brand authority across Africa.",
    icon: Share2,
    features: ["Social Plus Lagos", "Community Growth", "Analytics Reporting", "Paid Advertising"]
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
