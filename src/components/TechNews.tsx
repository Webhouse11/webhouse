import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Brain, Rocket, Lightbulb, Zap, Target, Globe, Users } from 'lucide-react';

const hotNews = [
  {
    caption: "AI agents are now capable of managing entire marketing departments autonomously.",
    time: "2m ago",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200"
  },
  {
    caption: "New breakthrough in quantum computing promises to revolutionize data encryption.",
    time: "15m ago",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200"
  },
  {
    caption: "Global digital ad spend projected to hit record highs in 2026.",
    time: "1h ago",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200"
  },
  {
    caption: "Social media platforms shifting focus towards long-form educational content.",
    time: "3h ago",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=200"
  },
  {
    caption: "Automation tools for small businesses see 300% growth in adoption rates.",
    time: "5h ago",
    image: "https://images.unsplash.com/photo-1551288049-bbbda546697a?auto=format&fit=crop&q=80&w=200"
  },
  {
    caption: "New SEO algorithms prioritize authentic human-first content over AI-generated spam.",
    time: "8h ago",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=200"
  },
  {
    caption: "The rise of decentralized social networks is changing how brands interact with audiences.",
    time: "12h ago",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=200"
  },
  {
    caption: "Voice search optimization becomes a critical factor for e-commerce success in 2026.",
    time: "1d ago",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=200"
  }
];

const buildingPoints = [
  { text: "Technology meets marketing", icon: Zap },
  { text: "AI powers business growth", icon: Target },
  { text: "Ideas become global brands", icon: Globe },
  { text: "Entrepreneurs become industry leaders", icon: Users }
];

export const TechNews = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hot News Feed Section */}
        <div className="mb-32">
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 mb-6"
            >
              <Zap className="w-6 h-6 animate-pulse" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tighter">..Breaking News</h2>
              <p className="text-emerald-600 text-sm font-bold uppercase tracking-[0.4em] mb-12">Real-time Industry Updates</p>
            </motion.div>

            {/* Tech News Hero Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-5xl aspect-[21/9] rounded-[2.5rem] overflow-hidden relative shadow-2xl mb-16 group"
            >
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200" 
                alt="Tech News"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 lg:p-12">
                <div className="flex items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">Global Network</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">Instant Updates</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotNews.map((news, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-4 bg-slate-50 rounded-2xl border border-black/5 hover:border-emerald-500/20 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all flex items-center gap-4 group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                  <img 
                    src={news.image} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{news.time}</span>
                  </div>
                  <p className="text-sm md:text-base font-bold text-black/80 leading-snug line-clamp-2">
                    {news.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What We Are Building Section */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-emerald-500 to-transparent mb-12" />
          
          <div className="pt-32 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                What We Are <span className="text-emerald-500 italic">Building</span>
              </h2>
              <p className="text-2xl text-black/60 mb-16 leading-relaxed">
                We are not just running a marketing agency. We are building a digital innovation hub where:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {buildingPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 hover:border-emerald-300 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <point.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-semibold text-emerald-900">{point.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
